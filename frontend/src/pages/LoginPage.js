import React, { useState, useEffect } from 'react';
import { Navigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  Divider,
  Grid
} from '@mui/material';
import { AccountBalance as AccountBalanceIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await login(formData.email, formData.password);
    
    setIsSubmitting(false);
    
    if (!result.success) {
      // Error handling is done in the auth context
    }
  };

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <AccountBalanceIcon 
              sx={{ 
                fontSize: 48, 
                color: 'primary.main', 
                mb: 2 
              }} 
            />
            <Typography variant="h4" component="h1" gutterBottom>
              Persediaan
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Complete Accounting Software
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to access your accounting dashboard
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                New to Persediaan?
              </Typography>
            </Divider>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="body2"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Create a new account
                </Link>
              </Grid>
            </Grid>
          </Box>

          {/* Demo Credentials */}
          <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Demo Credentials:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: admin@demo.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Password: password123
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;