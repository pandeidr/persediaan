const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { models } = require('../config/database');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        message: errors.array().map(e => e.msg).join(', ')
      });
    }

    const { email, password } = req.body;

    // Find user with company
    const user = await models.User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({
        error: 'Invalid Credentials',
        message: 'Invalid email or password'
      });
    }

    // Get user with company details
    const userWithCompany = await models.User.findByPk(user.id, {
      include: [{
        model: models.Company,
        attributes: ['id', 'name', 'logo', 'subscription_plan', 'is_active']
      }]
    });

    if (!userWithCompany.Company || !userWithCompany.Company.is_active) {
      return res.status(401).json({
        error: 'Access Denied',
        message: 'Company account is inactive'
      });
    }

    // Update last login
    await user.update({ last_login: new Date() });

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: userWithCompany.toSafeJSON(),
      company: userWithCompany.Company
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Login failed'
    });
  }
});

// @route   POST /api/auth/register
// @desc    Register new user (admin only for now)
// @access  Public (will be restricted in production)
router.post('/register', [
  body('username').isLength({ min: 3 }).matches(/^[a-zA-Z0-9_]+$/),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('first_name').isLength({ min: 1 }),
  body('last_name').isLength({ min: 1 }),
  body('company_name').isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        message: errors.array().map(e => e.msg).join(', ')
      });
    }

    const { 
      username, 
      email, 
      password, 
      first_name, 
      last_name, 
      company_name,
      role = 'admin'
    } = req.body;

    // Check if user already exists
    const existingUser = await models.User.findOne({
      where: {
        $or: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User Exists',
        message: 'User with this email or username already exists'
      });
    }

    // Create company first
    const company = await models.Company.create({
      name: company_name,
      subscription_plan: 'trial',
      subscription_expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    // Create user
    const user = await models.User.create({
      username,
      email,
      password,
      first_name,
      last_name,
      role,
      company_id: company.id,
      email_verified: true // Auto-verify for demo
    });

    const token = generateToken(user);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: user.toSafeJSON(),
      company: company
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: 'Duplicate Entry',
        message: 'Username or email already exists'
      });
    }
    
    res.status(500).json({
      error: 'Server Error',
      message: 'Registration failed'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await models.User.findByPk(req.user.id, {
      include: [{
        model: models.Company,
        attributes: ['id', 'name', 'logo', 'subscription_plan', 'is_active']
      }],
      attributes: { exclude: ['password'] }
    });

    res.json({
      user: user.toSafeJSON(),
      company: user.Company
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to get user information'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', auth, (req, res) => {
  res.json({
    message: 'Logout successful'
  });
});

// @route   POST /api/auth/change-password
// @desc    Change user password
// @access  Private
router.post('/change-password', [
  auth,
  body('current_password').isLength({ min: 6 }),
  body('new_password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        message: errors.array().map(e => e.msg).join(', ')
      });
    }

    const { current_password, new_password } = req.body;

    const user = await models.User.findByPk(req.user.id);
    
    const isCurrentPasswordValid = await user.validatePassword(current_password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        error: 'Invalid Password',
        message: 'Current password is incorrect'
      });
    }

    await user.update({ password: new_password });

    res.json({
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'Failed to change password'
    });
  }
});

module.exports = router;