import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Link
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import { GLOBAL_FONT_FAMILY } from '../contexts/ToastContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.forgotPassword(email);

      if (response.data.success) {
        setSuccess(response.data.message);
        // Redirect to OTP verification page
        setTimeout(() => {
          navigate('/verify-reset-otp', {
            state: {
              email: email,
              message: response.data.message
            }
          });
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send reset OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        padding: { xs: 2, sm: 3 },
        overflow: 'hidden'
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontFamily: GLOBAL_FONT_FAMILY,
                fontWeight: 800,
                color: '#2c3e50',
                fontSize: { xs: '1.75rem', sm: '2.125rem' },
                mb: 2
              }}
            >
              Reset Your Password
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: GLOBAL_FONT_FAMILY,
                color: '#666',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Enter your email to receive a reset OTP
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, fontFamily: GLOBAL_FONT_FAMILY, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3, fontFamily: GLOBAL_FONT_FAMILY, borderRadius: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
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
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Send Reset OTP'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                component={RouterLink}
                to="/login"
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
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;