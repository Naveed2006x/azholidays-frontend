import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  TextField
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../api/auth';
import { GLOBAL_FONT_FAMILY } from '../contexts/ToastContext';

const VerifyLoginOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const inputRefs = useRef([]);

  const { email, tempToken, message } = location.state || {};

  const handleChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const otpString = otp.join('');

    try {
      const response = await authAPI.verifyLoginOTP(email, otpString);

      if (response.data.success) {
        const { accessToken, user } = response.data;
        
        // Make sure user object exists before logging in
        if (accessToken && user) {
          login(accessToken, user);
          
          navigate('/', { 
            replace: true,
            state: { 
              message: 'Login successful! Welcome back.',
              verified: true
            } 
          });
        } else {
          setError('Invalid response from server');
        }
      } else {
        setError(response.data.message || 'Verification failed');
      }

    } catch (error) {
      console.error('OTP verification error:', error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');

    try {
      await authAPI.resendOTP(email, 'login');
      setError('OTP resent successfully! Please check your email.');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) {
    navigate('/login');
    return null;
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
            Login Verification
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
            Enter the 6-digit code sent to<br />
            <strong style={{ color: '#2c5aa0' }}>{email}</strong>
          </Typography>

          {error && (
            <Alert severity={error.includes('successfully') ? 'success' : 'error'} sx={{ mb: 3, fontFamily: GLOBAL_FONT_FAMILY, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleVerify}>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2 }, 
                justifyContent: 'center', 
                mb: 4,
                px: { xs: 0, sm: 2 }
              }}
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  inputProps={{
                    maxLength: 1,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    style: {
                      textAlign: 'center',
                      fontSize: { xs: '1.5rem', sm: '2rem' },
                      fontWeight: 700,
                      fontFamily: GLOBAL_FONT_FAMILY,
                      padding: 0
                    }
                  }}
                  sx={{
                    width: { xs: '45px', sm: '60px' },
                    height: { xs: '50px', sm: '65px' },
                    '& .MuiOutlinedInput-root': {
                      height: '100%',
                      borderRadius: '12px',
                      fontFamily: GLOBAL_FONT_FAMILY,
                      backgroundColor: '#f8f9fa',
                      transition: 'all 0.3s ease',
                      '& fieldset': {
                        borderColor: digit ? '#2c5aa0' : '#ddd',
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
                        backgroundColor: '#fff',
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(44,90,160,0.2)'
                      }
                    },
                    '& input': {
                      fontSize: { xs: '1.5rem', sm: '2rem' },
                      padding: '0',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }}
                />
              ))}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || otp.join('').length !== 6}
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
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Verify & Login'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ fontFamily: GLOBAL_FONT_FAMILY, color: '#666', mb: 1 }}>
              Didn't receive the code?
            </Typography>
            <Button
              onClick={handleResendOTP}
              disabled={resendLoading}
              sx={{
                fontFamily: GLOBAL_FONT_FAMILY,
                color: '#204278',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                '&:hover': {
                  background: 'rgba(32,66,120,0.1)'
                }
              }}
            >
              {resendLoading ? <CircularProgress size={16} /> : 'Resend Code'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerifyLoginOTP;