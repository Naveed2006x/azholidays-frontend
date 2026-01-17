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
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import { GLOBAL_FONT_FAMILY } from '../contexts/ToastContext';
import background from '../Images/background.jpeg';

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: true,
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const steps = ['Personal Info', 'Account Details', 'Preferences'];

  const getPhoneValidationRules = (phoneNumber) => {
    // Extract country code from the formatted phone number
    const countryCodeMatch = phoneNumber.match(/^\+\d+/);
    const countryCode = countryCodeMatch ? countryCodeMatch[0] : '';

    const rules = {
      '+65': { // Singapore
        minLength: 8,
        maxLength: 8,
        pattern: /^[689]\d{7}$/,
        message: 'Singapore phone number must be 8 digits starting with 6, 8, or 9'
      },
      '+60': { // Malaysia
        minLength: 9,
        maxLength: 10,
        pattern: /^[1-9]\d{1,9}$/,
        message: 'Malaysia phone number must be 9-10 digits'
      },
      '+62': { // Indonesia
        minLength: 9,
        maxLength: 12,
        pattern: /^[1-9]\d{1,11}$/,
        message: 'Indonesia phone number must be 9-12 digits'
      },
      '+63': { // Philippines
        minLength: 9,
        maxLength: 10,
        pattern: /^[1-9]\d{1,9}$/,
        message: 'Philippines phone number must be 9-10 digits'
      },
      '+66': { // Thailand
        minLength: 8,
        maxLength: 9,
        pattern: /^[1-9]\d{1,8}$/,
        message: 'Thailand phone number must be 8-9 digits'
      },
      '+84': { // Vietnam
        minLength: 9,
        maxLength: 10,
        pattern: /^[1-9]\d{1,9}$/,
        message: 'Vietnam phone number must be 9-10 digits'
      },
      '+86': { // China
        minLength: 10,
        maxLength: 11,
        pattern: /^1[3-9]\d{9}$/,
        message: 'China phone number must be 11 digits starting with 1'
      }
    };

    return rules[countryCode] || {
      minLength: 6,
      maxLength: 15,
      pattern: /^\d+$/,
      message: 'Please enter a valid phone number'
    };
  };
  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return 'Phone number is required';
    }

    // Basic international format validation
    if (!matchIsValidTel(phoneNumber)) {
      return 'Please enter a valid international phone number';
    }

    const rules = getPhoneValidationRules(phoneNumber);

    // Extract just the digits (remove all non-digit characters)
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // Remove the country code (first 1-4 digits)
    // For Singapore (+65), country code is '65' (2 digits)
    const countryCodeLength = phoneNumber.split(' ')[0].replace(/\D/g, '').length;
    const numberWithoutCode = digitsOnly.slice(countryCodeLength);

    // Check length
    if (numberWithoutCode.length < rules.minLength) {
      return `Phone number must be at least ${rules.minLength} digits`;
    }

    if (numberWithoutCode.length > rules.maxLength) {
      return `Phone number must be at most ${rules.maxLength} digits`;
    }

    // Check pattern
    if (!rules.pattern.test(numberWithoutCode)) {
      return rules.message;
    }

    return '';
  };
  // Prevent scrolling on mount and cleanup on unmount
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalHtmlStyle = window.getComputedStyle(document.documentElement).overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = originalHtmlStyle;
    };
  }, []);

  // Show snackbar when server error changes
  useEffect(() => {
    if (serverError) {
      setSnackbarOpen(true);
    }
  }, [serverError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (serverError) setServerError('');
  };

  const handlePhoneChange = (newPhone) => {
    setFormData(prev => ({
      ...prev,
      phone: newPhone
    }));

    // Clear phone error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setServerError('');
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }

      // Phone validation with country-specific rules
      const phoneError = validatePhoneNumber(formData.phone);
      if (phoneError) {
        newErrors.phone = phoneError;
      }
    }

    if (step === 1) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!formData.terms) {
        newErrors.terms = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (validateStep(activeStep)) {
      setLoading(true);

      try {
        // Extract just the phone number digits for backend (remove country code and formatting)
        const phoneDigits = formData.phone.replace(/\D/g, '').replace(/^\d{1,4}/, '');

        const response = await authAPI.signup(
          formData.firstName,
          formData.lastName || '',
          formData.email,
          formData.password,
          formData.phone,
          formData.newsletter
        );

        console.log('Signup successful:', response.data);

        if (response.data.success && response.data.requiresOTP) {
          navigate('/verify-otp', {
            state: {
              email: formData.email,
              purpose: 'signup',
              firstName: formData.firstName,
              lastName: formData.lastName || '',
              phone: phoneDigits,
              countryCode: formData.phone.split(' ')[0],
              newsletter: formData.newsletter,
              otp: response.data.otp
            }
          });
        } else {
          navigate('/login', {
            state: { message: 'Account created successfully! Please login.' }
          });
        }

      } catch (error) {
        console.error('Signup failed:', error);
        if (error.response?.data?.message) {
          setServerError(error.response.data.message);
        } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
          setServerError('Cannot connect to server. Please make sure the backend is running.');
        } else {
          setServerError('Signup failed. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Responsive styles
  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      fontFamily: GLOBAL_FONT_FAMILY,
      fontSize: isMobile ? '16px' : 'inherit',
      '&:hover fieldset': { borderColor: '#2c5aa0' },
      '&.Mui-focused fieldset': { borderColor: '#2c5aa0' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#2c5aa0' }
  };

  const phoneInputStyle = {
    width: '100%',
    '& .MuiTelInput-TextField': {
      '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        fontFamily: GLOBAL_FONT_FAMILY,
        fontSize: isMobile ? '16px' : 'inherit',
        '&:hover fieldset': { borderColor: '#2c5aa0' },
        '&.Mui-focused fieldset': { borderColor: '#2c5aa0' },
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#2c5aa0',
        fontFamily: GLOBAL_FONT_FAMILY
      },
      '& .MuiInputLabel-root': {
        fontFamily: GLOBAL_FONT_FAMILY
      },
      '& .MuiOutlinedInput-input': {
        fontFamily: GLOBAL_FONT_FAMILY,
        fontSize: isMobile ? '16px' : 'inherit',
      }
    }
  };

  const checkboxStyle = {
    color: '#2c5aa0',
    '&.Mui-checked': { color: '#2c5aa0' },
  };

  const linkStyle = {
    color: '#2c5aa0',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
    fontSize: isMobile ? '0.9rem' : 'inherit'
  };

  const buttonStyle = {
    fontFamily: GLOBAL_FONT_FAMILY,
    px: isMobile ? 3 : 4,
    py: isMobile ? 1.2 : 1.5,
    borderRadius: '12px',
    backgroundColor: '#2c5aa0',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: 600,
    textTransform: 'none',
    minWidth: isMobile ? '100px' : 'auto',
    '&:hover': {
      backgroundColor: '#1e3d6f',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(44, 90, 160, 0.3)'
    },
    transition: 'all 0.3s ease',
    '&:disabled': {
      backgroundColor: '#cccccc'
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Box sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              mb: 2
            }}>
              <TextField
                fullWidth
                label="First Name *"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                sx={textFieldStyle}
                placeholder="Optional"
              />
            </Box>

            <MuiTelInput
              label="Phone Number *"
              value={formData.phone}
              onChange={handlePhoneChange}
              defaultCountry="SG"
              preferredCountries={['SG', 'MY', 'ID', 'TH', 'VN', 'PH', 'CN', 'JP', 'KR', 'IN']}
              forceCallingCode
              focusOnSelectCountry
              error={!!errors.phone}
              helperText={errors.phone || "Select your country and enter your phone number"}
              sx={phoneInputStyle}
            />

            {/* Phone number requirements hint */}
            {formData.phone && (
              <Typography variant="caption" sx={{
                fontFamily: GLOBAL_FONT_FAMILY,
                color: '#666',
                mt: 1,
                display: 'block',
                fontSize: isMobile ? '0.7rem' : '0.75rem'
              }}>
                {getPhoneValidationRules(formData.phone).message}
              </Typography>
            )}
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Email Address *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#2c5aa0', fontSize: isMobile ? '1.2rem' : 'inherit' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ ...textFieldStyle, mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password *"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#2c5aa0', fontSize: isMobile ? '1.2rem' : 'inherit' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ fontSize: isMobile ? '1.2rem' : 'inherit' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ ...textFieldStyle, mb: 2 }}
            />

            <TextField
              fullWidth
              label="Confirm Password *"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#2c5aa0', fontSize: isMobile ? '1.2rem' : 'inherit' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                      sx={{ fontSize: isMobile ? '1.2rem' : 'inherit' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyle}
            />

            <Typography variant="body2" sx={{
              fontFamily: GLOBAL_FONT_FAMILY,
              color: '#666',
              mt: 1,
              fontSize: isMobile ? '0.75rem' : '0.8rem',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              Password must be at least 8 characters with uppercase, lowercase, and numbers
            </Typography>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  sx={checkboxStyle}
                  size={isMobile ? "small" : "medium"}
                />
              }
              label={
                <Typography sx={{ fontFamily: GLOBAL_FONT_FAMILY, fontSize: isMobile ? '0.9rem' : 'inherit' }}>
                  Send me travel deals and promotional offers
                </Typography>
              }
              sx={{ mb: 2, width: '100%' }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  sx={checkboxStyle}
                  size={isMobile ? "small" : "medium"}
                />
              }
              label={
                <Typography sx={{ fontFamily: GLOBAL_FONT_FAMILY, fontSize: isMobile ? '0.9rem' : 'inherit' }}>
                  I agree to the{' '}
                  <Link href="#" sx={linkStyle}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" sx={linkStyle}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ width: '100%' }}
            />
            {errors.terms && (
              <Typography color="error" variant="body2" sx={{ fontFamily: GLOBAL_FONT_FAMILY, mt: 1, fontSize: isMobile ? '0.8rem' : 'inherit' }}>
                {errors.terms}
              </Typography>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile-optimized Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: isMobile ? 'bottom' : 'top',
          horizontal: isMobile ? 'center' : 'right'
        }}
        sx={{
          position: 'fixed',
          zIndex: 9999,
          ...(isMobile ? {
            bottom: '20px !important',
            left: '16px !important',
            right: '16px !important'
          } : {
            top: '20px !important',
            right: '16px !important'
          })
        }}
      >
        <Alert
          severity="error"
          sx={{
            fontFamily: GLOBAL_FONT_FAMILY,
            borderRadius: '12px',
            boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
            width: isMobile ? '100%' : '300px',
            fontSize: isMobile ? '0.85rem' : '0.9rem'
          }}
          onClose={handleSnackbarClose}
        >
          {serverError}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'auto',
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
          maxWidth="md"
          sx={{
            position: 'relative',
            zIndex: 1,
            maxHeight: '90vh',
            overflow: 'auto',
            px: isMobile ? 1 : 2,
            py: isMobile ? 1 : 0,
            '&::-webkit-scrollbar': {
              width: '6px',
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
            elevation={isMobile ? 4 : 8}
            sx={{
              padding: isMobile ? '1.5rem' : (isTablet ? '2rem' : '3rem'),
              borderRadius: isMobile ? '12px' : '16px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              margin: isMobile ? '0.5rem' : 0
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: isMobile ? 2 : 4 }}>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  fontFamily: GLOBAL_FONT_FAMILY,
                  fontWeight: 700,
                  color: '#2c5aa0',
                  mb: 1
                }}
              >
                Create Account
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: GLOBAL_FONT_FAMILY,
                  color: '#666',
                  fontSize: isMobile ? '0.9rem' : '1.1rem'
                }}
              >
                Join AZ Holidays and start your journey
              </Typography>
            </Box>

            {/* Stepper - Hidden on mobile */}
            {!isMobile && (
              <Stepper
                activeStep={activeStep}
                orientation="horizontal"
                sx={{ mb: 4 }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontFamily: GLOBAL_FONT_FAMILY,
                          fontSize: '0.875rem',
                          '&.Mui-active': { fontWeight: 600 },
                          '&.Mui-completed': { fontWeight: 500 }
                        }
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>
              {renderStepContent(activeStep)}

              {/* Navigation Buttons - Stacked on mobile */}
              <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column-reverse' : 'row',
                justifyContent: 'space-between',
                gap: isMobile ? 2 : 0,
                mt: isMobile ? 3 : 4
              }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0 || loading}
                  sx={{
                    fontFamily: GLOBAL_FONT_FAMILY,
                    color: '#2c5aa0',
                    textTransform: 'none',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    '&:hover': { backgroundColor: 'rgba(44, 90, 160, 0.1)' },
                    '&:disabled': { color: '#cccccc' },
                    ...(isMobile && {
                      width: '100%',
                      py: 1.5
                    })
                  }}
                >
                  Back
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      ...buttonStyle,
                      ...(isMobile && {
                        width: '100%',
                        py: 1.5
                      })
                    }}
                  >
                    {loading ? <CircularProgress size={isMobile ? 20 : 24} /> : 'Create Account'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    sx={{
                      ...buttonStyle,
                      ...(isMobile && {
                        width: '100%',
                        py: 1.5
                      })
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>

              {/* Login Link */}
              <Box sx={{ textAlign: 'center', mt: isMobile ? 2 : 3 }}>
                <Typography variant="body1" sx={{
                  fontFamily: GLOBAL_FONT_FAMILY,
                  color: '#666',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" sx={linkStyle}>
                    Sign in
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

export default Signup;