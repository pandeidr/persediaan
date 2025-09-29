const jwt = require('jsonwebtoken');
const { models } = require('../config/database');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        error: 'Access Denied',
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await models.User.findByPk(decoded.id, {
      include: [{
        model: models.Company,
        attributes: ['id', 'name', 'is_active', 'subscription_plan']
      }],
      attributes: { exclude: ['password'] }
    });

    if (!user || !user.is_active) {
      return res.status(401).json({
        error: 'Access Denied',
        message: 'Invalid token or user deactivated'
      });
    }

    if (!user.Company || !user.Company.is_active) {
      return res.status(401).json({
        error: 'Access Denied',
        message: 'Company is inactive'
      });
    }

    req.user = user;
    req.company = user.Company;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token Expired',
        message: 'Please login again'
      });
    }
    
    return res.status(401).json({
      error: 'Invalid Token',
      message: 'Please provide a valid token'
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication Required',
        message: 'Please authenticate first'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Insufficient Permissions',
        message: `Access denied. Required roles: ${roles.join(', ')}`
      });
    }

    next();
  };
};

const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication Required',
        message: 'Please authenticate first'
      });
    }

    // Admin always has all permissions
    if (req.user.role === 'admin') {
      return next();
    }

    // Check specific permission
    const userPermissions = req.user.permissions || {};
    if (!userPermissions[permission]) {
      return res.status(403).json({
        error: 'Insufficient Permissions',
        message: `Permission required: ${permission}`
      });
    }

    next();
  };
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await models.User.findByPk(decoded.id, {
        include: [{
          model: models.Company,
          attributes: ['id', 'name', 'is_active']
        }],
        attributes: { exclude: ['password'] }
      });

      if (user && user.is_active && user.Company && user.Company.is_active) {
        req.user = user;
        req.company = user.Company;
      }
    }
    
    next();
  } catch (error) {
    // For optional auth, we don't throw errors
    next();
  }
};

module.exports = {
  auth,
  authorize,
  checkPermission,
  optionalAuth
};