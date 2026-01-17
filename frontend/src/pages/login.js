import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../api/auth';
import { GLOBAL_FONT_FAMILY, useToast } from '../contexts/ToastContext';
import background from '../Images/background.jpeg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Already authenticated, redirecting to home');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Handle messages from redirect (signup success, OTP verification, etc.)
  useEffect(() => {
    if (location.state?.message) {
      showToast(
        location.state.message,
        location.state.verified ? 'success' : 'info'
      );

      // Clear the state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location, showToast]);

  // Prevent scrolling on mount and cleanup on unmount
  useEffect(() => {
    // Save the original styles
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalHtmlStyle = window.getComputedStyle(document.documentElement).overflow;

    // Disable scrolling on both body and html
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = originalHtmlStyle;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Backend login API call using authAPI service
      const response = await authAPI.login(formData.email, formData.password);

      console.log('Login successful:', response.data);

      if (response.data.success) {
        if (response.data.requiresOTP) {
          // Redirect to OTP verification for login
          navigate('/verify-login-otp', {
            state: {
              email: formData.email,
              tempToken: response.data.tempToken,
              message: 'Please enter the OTP sent to your email'
            }
          });
        } else {
          // Direct login without OTP
          const { token, user } = response.data;
          login(token, user);

          // Small delay to ensure state is updated before navigation
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 100);
        }
      }

    } catch (error) {
      console.error('Login failed:', error);

      let errorMessage = 'Login failed. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Please make sure the backend is running.';
      }

      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      fontFamily: GLOBAL_FONT_FAMILY,
      '&:hover fieldset': {
        borderColor: '#2c5aa0',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2c5aa0',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#2c5aa0',
    }
  };

  const buttonStyle = {
    fontFamily: GLOBAL_FONT_FAMILY,
    py: 1.5,
    borderRadius: '12px',
    backgroundColor: '#2c5aa0',
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#1e3d6f',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(44, 90, 160, 0.3)'
    },
    transition: 'all 0.3s ease',
    mb: 3,
    '&:disabled': {
      backgroundColor: '#cccccc'
    }
  };

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }
        }}
      >
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            position: 'relative',
            zIndex: 1,
            maxHeight: '90vh',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(255, 255, 255, 0.5)',
            }
          }}
        >
          <Paper
            elevation={8}
            sx={{
              padding: { xs: '2rem', md: '3rem' },
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontFamily: GLOBAL_FONT_FAMILY,
                  fontWeight: 700,
                  color: '#2c5aa0',
                  mb: 1
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: GLOBAL_FONT_FAMILY,
                  color: '#666',
                  fontSize: '1.1rem'
                }}
              >
                Sign in to your AZ Holidays account
              </Typography>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#2c5aa0' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  ...textFieldStyle
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#2c5aa0' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  ...textFieldStyle
                }}
              />

              {/* Remember Me & Forgot Password */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      sx={{
                        color: '#2c5aa0',
                        '&.Mui-checked': {
                          color: '#2c5aa0',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontFamily: GLOBAL_FONT_FAMILY, fontSize: '0.9rem' }}>
                      Remember me
                    </Typography>
                  }
                />

                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{
                    fontFamily: GLOBAL_FONT_FAMILY,
                    color: '#2c5aa0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={buttonStyle}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>

              {/* Sign Up Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: GLOBAL_FONT_FAMILY,
                    color: '#666',
                    fontSize: '1rem'
                  }}
                >
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/signup"
                    sx={{
                      fontFamily: GLOBAL_FONT_FAMILY,
                      color: '#2c5aa0',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Login;