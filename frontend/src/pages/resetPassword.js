import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authAPI } from '../api/auth';
import { GLOBAL_FONT_FAMILY, useToast } from '../contexts/ToastContext';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { email, resetToken } = location.state || {};

  // Use useEffect to handle navigation on component mount
  useEffect(() => {
    if (!email || !resetToken) {
      console.log('Missing email or resetToken, redirecting to forgot-password');
      navigate('/forgot-password');
    }
  }, [email, resetToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.newPassword || !formData.confirmPassword) {
      showToast('Please fill in all fields', 'error');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.resetPassword(resetToken, formData.newPassword, email);

      if (response.data.success) {
        showToast(response.data.message || 'Password reset successfully!', 'success');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to reset password', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Don't render the form if we don't have the required data
  if (!email || !resetToken) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#ffffff',
        padding: { xs: 2, sm: 3 }
      }}>
        <Container maxWidth="sm">
          <Paper elevation={24} sx={{ 
            p: { xs: 3, sm: 5 }, 
            borderRadius: 4, 
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)'
          }}>
            <CircularProgress />
            <Typography sx={{ mt: 2, fontFamily: GLOBAL_FONT_FAMILY }}>
              Redirecting...
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#ffffff',
      padding: { xs: 2, sm: 3 }
    }}>
      <Container maxWidth="sm">
        <Paper elevation={24} sx={{ 
          p: { xs: 3, sm: 5 }, 
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontFamily: GLOBAL_FONT_FAMILY, 
              fontWeight: 800, 
              color: '#2c3e50',
              fontSize: { xs: '1.75rem', sm: '2.125rem' },
              mb: 2
            }}
          >
            Set New Password
          </Typography>
          
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              fontFamily: GLOBAL_FONT_FAMILY, 
              mb: 4, 
              color: '#666',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            Create a new password for your account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  fontFamily: GLOBAL_FONT_FAMILY,
                  backgroundColor: '#f8f9fa',
                  '& fieldset': {
                    borderColor: '#ddd',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#2c5aa0'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2c5aa0',
                    borderWidth: '3px'
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#fff'
                  }
                },
                '& .MuiInputLabel-root': {
                  fontFamily: GLOBAL_FONT_FAMILY,
                  '&.Mui-focused': {
                    color: '#2c5aa0'
                  }
                }
              }}
            />

            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  fontFamily: GLOBAL_FONT_FAMILY,
                  backgroundColor: '#f8f9fa',
                  '& fieldset': {
                    borderColor: '#ddd',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#2c5aa0'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2c5aa0',
                    borderWidth: '3px'
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#fff'
                  }
                },
                '& .MuiInputLabel-root': {
                  fontFamily: GLOBAL_FONT_FAMILY,
                  '&.Mui-focused': {
                    color: '#2c5aa0'
                  }
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                fontFamily: GLOBAL_FONT_FAMILY,
                py: { xs: 1.5, sm: 2 },
                borderRadius: '12px',
                background: '#204278',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(32,66,120,0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#1a3560',
                  boxShadow: '0 12px 32px rgba(32,66,120,0.5)',
                  transform: 'translateY(-2px)'
                },
                '&:disabled': {
                  background: '#ccc'
                },
                mb: 3
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Reset Password'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link
              component="button"
              type="button"
              onClick={() => navigate('/login')}
              sx={{
                fontFamily: GLOBAL_FONT_FAMILY,
                color: '#204278',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                '&:hover': { 
                  textDecoration: 'underline',
                  background: 'rgba(32,66,120,0.1)'
                }
              }}
            >
              Back to Login
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;