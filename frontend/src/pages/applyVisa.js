import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField,
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip,
  Stack,
  Fade,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  CheckCircle,
  Security,
  ArrowBack,
  ArrowForward,
  Save,
  Person,
  Flight,
  ContactMail,
  Description,
  Support
} from '@mui/icons-material';

const ApplyVisa = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [alertModal, setAlertModal] = useState({ open: false, title: '', message: '', type: 'info' });
  const [loadProgressModal, setLoadProgressModal] = useState({ open: false, data: null });

  const steps = ['Personal Information', 'Passport Details', 'Travel Details', 'Contact Information'];

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    
    // Passport Details
    passportNumber: '',
    passportType: 'Regular',
    passportIssueDate: '',
    passportExpiryDate: '',
    
    // Travel Details
    purposeOfVisit: '',
    arrivalDate: '',
    departureDate: '',
    portOfArrival: '',
    
    // Contact Information
    email: '',
    phoneNumber: '',
    emergencyContact: ''
  });

  // Eligible countries (same as check eligibility)
  const countries = [
    "Singapore", "United States", "United Kingdom", "Australia", "Canada", 
    "Germany", "France", "Italy", "Spain", "Netherlands", "Japan", "South Korea",
    "Malaysia", "Thailand", "Indonesia", "Philippines", "Vietnam", "New Zealand",
    "Switzerland", "Sweden", "Norway", "Denmark", "Finland", "Belgium", "Austria",
    "Ireland", "Portugal", "Greece", "Poland", "Czech Republic", "Hungary",
    "Romania", "Bulgaria", "Croatia", "Slovakia", "Slovenia", "Lithuania",
    "Latvia", "Estonia", "Luxembourg", "Malta", "Cyprus", "Iceland",
    "Brazil", "Argentina", "Mexico", "Chile", "Colombia", "Peru",
    "South Africa", "Israel", "United Arab Emirates", "Saudi Arabia", "Qatar",
    "Kuwait", "Bahrain", "Oman", "Jordan", "Russia", "China", "Hong Kong"
  ].sort();

  const indianAirports = [
    "Delhi (Indira Gandhi International Airport)",
    "Mumbai (Chhatrapati Shivaji Maharaj International Airport)",
    "Bangalore (Kempegowda International Airport)",
    "Chennai (Chennai International Airport)",
    "Hyderabad (Rajiv Gandhi International Airport)",
    "Kolkata (Netaji Subhas Chandra Bose International Airport)",
    "Goa (Dabolim Airport)",
    "Kochi (Cochin International Airport)",
    "Ahmedabad (Sardar Vallabhbhai Patel International Airport)",
    "Pune (Pune Airport)",
    "Jaipur (Jaipur International Airport)",
    "Trivandrum (Trivandrum International Airport)",
    "Calicut (Calicut International Airport)",
    "Amritsar (Sri Guru Ram Dass Jee International Airport)",
    "Lucknow (Chaudhary Charan Singh International Airport)",
    "Varanasi (Lal Bahadur Shastri International Airport)",
    "Guwahati (Lokpriya Gopinath Bordoloi International Airport)",
    "Mangalore (Mangalore International Airport)",
    "Port Blair (Veer Savarkar International Airport)",
    "Tiruchirapalli (Tiruchirappalli International Airport)"
  ];

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  // Validation functions
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      // Personal Information validation
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    } else if (step === 1) {
      // Passport Details validation
      if (!formData.passportNumber.trim()) newErrors.passportNumber = 'Passport number is required';
      if (!formData.passportIssueDate) newErrors.passportIssueDate = 'Issue date is required';
      if (!formData.passportExpiryDate) newErrors.passportExpiryDate = 'Expiry date is required';
      
      // Check passport expiry (should be at least 6 months from today)
      const today = new Date();
      const expiryDate = new Date(formData.passportExpiryDate);
      const sixMonthsFromNow = new Date(today.setMonth(today.getMonth() + 6));
      
      if (expiryDate < sixMonthsFromNow) {
        newErrors.passportExpiryDate = 'Passport must be valid for at least 6 months';
      }
    } else if (step === 2) {
      // Travel Details validation
      if (!formData.purposeOfVisit) newErrors.purposeOfVisit = 'Purpose of visit is required';
      if (!formData.arrivalDate) newErrors.arrivalDate = 'Arrival date is required';
      if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
      if (!formData.portOfArrival) newErrors.portOfArrival = 'Port of arrival is required';
      
      // Check that arrival is before departure
      if (formData.arrivalDate && formData.departureDate) {
        if (new Date(formData.arrivalDate) >= new Date(formData.departureDate)) {
          newErrors.departureDate = 'Departure date must be after arrival date';
        }
      }
    } else if (step === 3) {
      // Contact Information validation
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^\+?[\d\s\-()]+$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) {
      return;
    }

    try {
      // Generate reference number
      const refNumber = 'AZVISA' + Date.now().toString().slice(-8);
      setReferenceNumber(refNumber);

      // TODO: Replace with actual API call
      // const response = await fetch('/api/visa/apply', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setShowConfirmation(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      setAlertModal({
        open: true,
        title: 'Submission Error',
        message: 'There was an error submitting your application. Please try again.',
        type: 'error'
      });
    }
  };

  const handleSaveProgress = () => {
    localStorage.setItem('indiaVisaApplication', JSON.stringify(formData));
    setAlertModal({
      open: true,
      title: 'Progress Saved Successfully',
      message: 'Your application progress has been securely saved to your browser. You can safely close this page and return anytime to continue from where you left off. Your data will remain saved on this device.',
      type: 'success'
    });
  };

  // Load saved progress on mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('indiaVisaApplication');
    if (savedData) {
      setLoadProgressModal({ open: true, data: JSON.parse(savedData) });
    }
  }, []);

  const handleLoadProgress = (shouldLoad) => {
    if (shouldLoad && loadProgressModal.data) {
      setFormData(loadProgressModal.data);
    }
    setLoadProgressModal({ open: false, data: null });
  };

  // Confirmation Dialog
  if (showConfirmation) {
    return (
      <Box sx={{ 
        bgcolor: '#fafcff', 
        minHeight: '90vh',
        background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)',
        py: { xs: 6, md: 10 }
      }}>
        <Container maxWidth="md">
          <Fade in timeout={600}>
            <Card sx={{ 
              p: { xs: 4, md: 6 },
              borderRadius: '24px',
              boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)',
              textAlign: 'center',
              border: '2px solid #10b981'
            }}>
              <CheckCircle sx={{ 
                fontSize: 80, 
                color: '#10b981', 
                mb: 3 
              }} />
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                color: '#065f46',
                mb: 2
              }}>
                Application Submitted Successfully!
              </Typography>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#047857',
                mb: 4
              }}>
                Thank you for submitting your India e-Visa application.
              </Typography>

              {/* Reference Number */}
              <Box sx={{ 
                bgcolor: '#f0fdf4',
                borderRadius: '16px',
                p: 3,
                mb: 4,
                border: '1px solid #bbf7d0'
              }}>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.9rem',
                  color: '#065f46',
                  mb: 1
                }}>
                  Your Reference Number:
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#047857',
                  letterSpacing: '2px'
                }}>
                  {referenceNumber}
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.85rem',
                  color: '#065f46',
                  mt: 1,
                  fontStyle: 'italic'
                }}>
                  Please save this number for tracking your application
                </Typography>
              </Box>

              {/* Next Steps */}
              <Box sx={{ 
                textAlign: 'left',
                bgcolor: 'white',
                borderRadius: '16px',
                p: 3,
                mb: 4,
                border: '1px solid #e2e8f0'
              }}>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: '#1a1a1a',
                  mb: 2
                }}>
                  What Happens Next:
                </Typography>
                <Stack spacing={2}>
                  {[
                    { num: 1, text: 'Our visa specialists will review your application within 24 hours' },
                    { num: 2, text: 'You will receive an email confirmation with payment instructions' },
                    { num: 3, text: 'Once payment is received, we will submit to Indian authorities' },
                    { num: 4, text: 'Expect your e-Visa approval within 3-5 business days' },
                    { num: 5, text: 'Your e-Visa will be sent to your email address' }
                  ].map((step) => (
                    <Box key={step.num} sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ 
                        minWidth: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: '#10b981',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        fontFamily: "'Poppins', sans-serif"
                      }}>
                        {step.num}
                      </Box>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.95rem',
                        color: '#475569',
                        pt: 0.3
                      }}>
                        {step.text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/')}
                  sx={{
                    bgcolor: '#10b981',
                    color: 'white',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#059669'
                    }
                  }}
                >
                  Return to Homepage
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/profile')}
                  sx={{
                    borderColor: '#10b981',
                    color: '#047857',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    borderWidth: '2px',
                    '&:hover': {
                      borderColor: '#059669',
                      bgcolor: 'rgba(16, 185, 129, 0.05)',
                      borderWidth: '2px'
                    }
                  }}
                >
                  Check Application Status
                </Button>
              </Stack>
            </Card>
          </Fade>
        </Container>
      </Box>
    );
  }

  // Render step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '1.5rem',
                color: '#1a1a1a',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}>
                <Person sx={{ color: '#2c5aa0', fontSize: 32 }} />
                Personal Information
              </Typography>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.95rem',
                color: '#64748b',
                mb: 3
              }}>
                Please provide your personal details exactly as they appear on your passport.
              </Typography>
            </Box>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-grid">
              <style>{`
                @media (max-width: 600px) { 
                  .form-grid { 
                    grid-template-columns: 1fr !important; 
                  } 
                }
              `}</style>
              
              <div>
                <TextField
                  fullWidth
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  required
                  sx={{ 
                    '& .MuiInputLabel-root': { 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500
                    },
                    '& .MuiInputBase-root': { 
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': {
                        bgcolor: '#f1f5f9'
                      },
                      '&.Mui-focused': {
                        bgcolor: 'white'
                      }
                    }
                  }}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  required
                  sx={{ 
                    '& .MuiInputLabel-root': { 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500
                    },
                    '& .MuiInputBase-root': { 
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': {
                        bgcolor: '#f1f5f9'
                      },
                      '&.Mui-focused': {
                        bgcolor: 'white'
                      }
                    }
                  }}
                />
              </div>

              <div>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange('dateOfBirth')}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ 
                    '& .MuiInputLabel-root': { 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500
                    },
                    '& .MuiInputBase-root': { 
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': {
                        bgcolor: '#f1f5f9'
                      },
                      '&.Mui-focused': {
                        bgcolor: 'white'
                      }
                    }
                  }}
                />
              </div>

              <div>
                <FormControl fullWidth error={!!errors.gender} required>
                  <InputLabel sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>Gender</InputLabel>
                  <Select
                    value={formData.gender}
                    label="Gender"
                    onChange={handleChange('gender')}
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': {
                        bgcolor: '#f1f5f9'
                      },
                      '&.Mui-focused': {
                        bgcolor: 'white'
                      }
                    }}
                  >
                    <MenuItem value="Male" sx={{ fontFamily: "'Poppins', sans-serif" }}>Male</MenuItem>
                    <MenuItem value="Female" sx={{ fontFamily: "'Poppins', sans-serif" }}>Female</MenuItem>
                    <MenuItem value="Other" sx={{ fontFamily: "'Poppins', sans-serif" }}>Other</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.75rem',
                      color: '#d32f2f',
                      mt: 0.5,
                      ml: 1.5
                    }}>
                      {errors.gender}
                    </Typography>
                  )}
                </FormControl>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <FormControl fullWidth error={!!errors.nationality} required>
                  <InputLabel sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>Nationality</InputLabel>
                  <Select
                    value={formData.nationality}
                    label="Nationality"
                    onChange={handleChange('nationality')}
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': {
                        bgcolor: '#f1f5f9'
                      },
                      '&.Mui-focused': {
                        bgcolor: 'white'
                      }
                    }}
                  >
                    {countries.map((country) => (
                      <MenuItem 
                        key={country} 
                        value={country}
                        sx={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.nationality && (
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.75rem',
                      color: '#d32f2f',
                      mt: 0.5,
                      ml: 1.5
                    }}>
                      {errors.nationality}
                    </Typography>
                  )}
                </FormControl>
              </div>
            </div>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '1.5rem',
                color: '#1a1a1a',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}>
                <Description sx={{ color: '#2c5aa0', fontSize: 32 }} />
                Passport Details
              </Typography>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.95rem',
                color: '#64748b',
                mb: 3
              }}>
                Enter your passport information exactly as shown on your document.
              </Typography>
            </Box>

            <div style={{ display: 'grid', gap: '24px' }}>
              <style>{`
                @media (max-width: 600px) {
                  .form-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>
              
              <div>
                <TextField
                  fullWidth
                  label="Passport Number"
                  placeholder="e.g., A1234567"
                  value={formData.passportNumber}
                  onChange={handleChange('passportNumber')}
                  error={!!errors.passportNumber}
                  helperText={errors.passportNumber || "Enter your passport number exactly as shown on your passport"}
                  required
                  sx={{ 
                    '& .MuiInputLabel-root': { fontFamily: "'Poppins', sans-serif", fontWeight: 500 },
                    '& .MuiInputBase-root': { 
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': { bgcolor: '#f1f5f9' },
                      '&.Mui-focused': { bgcolor: 'white' }
                    }
                  }}
                />
              </div>

              <div>
                <FormControl fullWidth disabled>
                  <InputLabel sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>Passport Type</InputLabel>
                  <Select
                    value={formData.passportType}
                    label="Passport Type"
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: '12px',
                      bgcolor: '#f8fafc'
                    }}
                  >
                    <MenuItem value="Regular" sx={{ fontFamily: "'Poppins', sans-serif" }}>Regular/Ordinary Passport</MenuItem>
                  </Select>
                </FormControl>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.75rem',
                  color: '#64748b',
                  mt: 1,
                  ml: 1.5
                }}>
                  Only Regular passports are eligible for India e-Visa
                </Typography>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-grid">
                <div>
                  <TextField
                    fullWidth
                    label="Passport Issue Date"
                    type="date"
                    value={formData.passportIssueDate}
                    onChange={handleChange('passportIssueDate')}
                    error={!!errors.passportIssueDate}
                    helperText={errors.passportIssueDate}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiInputLabel-root': { fontFamily: "'Poppins', sans-serif", fontWeight: 500 },
                      '& .MuiInputBase-root': { 
                        fontFamily: "'Poppins', sans-serif",
                        borderRadius: '12px',
                        bgcolor: '#f8fafc',
                        '&:hover': { bgcolor: '#f1f5f9' },
                        '&.Mui-focused': { bgcolor: 'white' }
                      }
                    }}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    label="Passport Expiry Date"
                    type="date"
                    value={formData.passportExpiryDate}
                    onChange={handleChange('passportExpiryDate')}
                    error={!!errors.passportExpiryDate}
                    helperText={errors.passportExpiryDate || "Must be valid for at least 6 months"}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ 
                      '& .MuiInputLabel-root': { fontFamily: "'Poppins', sans-serif", fontWeight: 500 },
                      '& .MuiInputBase-root': { 
                        fontFamily: "'Poppins', sans-serif",
                        borderRadius: '12px',
                        bgcolor: '#f8fafc',
                        '&:hover': { bgcolor: '#f1f5f9' },
                        '&.Mui-focused': { bgcolor: 'white' }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Flight sx={{ color: '#2c5aa0', fontSize: 28 }} />
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '1.2rem',
                color: '#1a1a1a'
              }}>
                Travel Details
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <div style={{ display: 'grid', gap: '24px' }} className="form-grid">
              <style>{`
                @media (max-width: 600px) {
                  .form-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>

              {/* Purpose of Visit - Full Width */}
              <div>
                <FormControl fullWidth error={!!errors.purposeOfVisit} required>
                  <InputLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>Purpose of Visit</InputLabel>
                  <Select
                    value={formData.purposeOfVisit}
                    label="Purpose of Visit"
                    onChange={handleChange('purposeOfVisit')}
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': { bgcolor: '#f1f5f9' },
                      '&.Mui-focused': { bgcolor: 'white' }
                    }}
                  >
                    <MenuItem value="Tourist" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                      Tourist (Leisure, Sightseeing)
                    </MenuItem>
                    <MenuItem value="Business" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                      Business (Meetings, Conferences)
                    </MenuItem>
                    <MenuItem value="Medical" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                      Medical (Treatment in India)
                    </MenuItem>
                  </Select>
                  {errors.purposeOfVisit && (
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.75rem',
                      color: '#d32f2f',
                      mt: 0.5,
                      ml: 1.5
                    }}>
                      {errors.purposeOfVisit}
                    </Typography>
                  )}
                </FormControl>
              </div>

              {/* Date Fields - 2 Column Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="form-grid">
                <TextField
                  fullWidth
                  label="Expected Arrival Date"
                  type="date"
                  value={formData.arrivalDate}
                  onChange={handleChange('arrivalDate')}
                  error={!!errors.arrivalDate}
                  helperText={errors.arrivalDate}
                  required
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: new Date().toISOString().split('T')[0] }}
                  sx={{ 
                    '& .MuiInputLabel-root': { fontFamily: "'Poppins', sans-serif" },
                    '& .MuiInputBase-root': { 
                      fontFamily: "'Poppins', sans-serif", 
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': { bgcolor: '#f1f5f9' },
                      '&.Mui-focused': { bgcolor: 'white' }
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Expected Departure Date"
                  type="date"
                  value={formData.departureDate}
                  onChange={handleChange('departureDate')}
                  error={!!errors.departureDate}
                  helperText={errors.departureDate}
                  required
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: formData.arrivalDate || new Date().toISOString().split('T')[0] }}
                  sx={{ 
                    '& .MuiInputLabel-root': { fontFamily: "'Poppins', sans-serif" },
                    '& .MuiInputBase-root': { 
                      fontFamily: "'Poppins', sans-serif", 
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': { bgcolor: '#f1f5f9' },
                      '&.Mui-focused': { bgcolor: 'white' }
                    }
                  }}
                />
              </div>

              {/* Port of Arrival - Full Width */}
              <div>
                <FormControl fullWidth error={!!errors.portOfArrival} required>
                  <InputLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>Port of Arrival in India</InputLabel>
                  <Select
                    value={formData.portOfArrival}
                    label="Port of Arrival in India"
                    onChange={handleChange('portOfArrival')}
                    sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': { bgcolor: '#f1f5f9' },
                      '&.Mui-focused': { bgcolor: 'white' }
                    }}
                  >
                    {indianAirports.map((airport) => (
                      <MenuItem 
                        key={airport} 
                        value={airport}
                        sx={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {airport}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.portOfArrival && (
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.75rem',
                      color: '#d32f2f',
                      mt: 0.5,
                      ml: 1.5
                    }}>
                      {errors.portOfArrival}
                    </Typography>
                  )}
                </FormControl>
              </div>
            </div>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ContactMail sx={{ color: '#2c5aa0', fontSize: 28 }} />
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '1.2rem',
                color: '#1a1a1a'
              }}>
                Contact Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <div style={{ display: 'grid', gap: '24px' }}>
              {/* All fields full-width */}
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                helperText={errors.email || "Your e-Visa will be sent to this email address"}
                required
                sx={{ 
                  '& .MuiInputLabel-root': { fontFamily: "'Poppins', sans-serif" },
                  '& .MuiInputBase-root': { 
                    fontFamily: "'Poppins', sans-serif", 
                    borderRadius: '12px',
                    bgcolor: '#f8fafc',
                    '&:hover': { bgcolor: '#f1f5f9' },
                    '&.Mui-focused': { bgcolor: 'white' }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Phone Number (with country code)"
                value={formData.phoneNumber}
                onChange={handleChange('phoneNumber')}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber || "e.g., +65 1234 5678"}
                required
                placeholder="+65 1234 5678"
                sx={{ 
                  '& .MuiInputLabel-root': { fontFamily: "'Poppins', sans-serif" },
                  '& .MuiInputBase-root': { 
                    fontFamily: "'Poppins', sans-serif", 
                    borderRadius: '12px',
                    bgcolor: '#f8fafc',
                    '&:hover': { bgcolor: '#f1f5f9' },
                    '&.Mui-focused': { bgcolor: 'white' }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Emergency Contact (Optional)"
                value={formData.emergencyContact}
                onChange={handleChange('emergencyContact')}
                helperText="Name and phone number of person to contact in case of emergency"
                sx={{ 
                  '& .MuiInputLabel-root': { fontFamily: "'Poppins', sans-serif" },
                  '& .MuiInputBase-root': { 
                    fontFamily: "'Poppins', sans-serif", 
                    borderRadius: '12px',
                    bgcolor: '#f8fafc',
                    '&:hover': { bgcolor: '#f1f5f9' },
                    '&.Mui-focused': { bgcolor: 'white' }
                  }
                }}
              />

              <Alert severity="info" sx={{ 
                borderRadius: '12px',
                '& .MuiAlert-message': {
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.9rem'
                }
              }}>
                <strong>Privacy Notice:</strong> All information provided is encrypted and securely processed. 
                We only share your data with Indian immigration authorities as required for visa processing.
              </Alert>
            </div>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      bgcolor: '#fafcff', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)',
      py: { xs: 6, md: 8 }
    }}>
      <Container maxWidth="md">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/india-visa')}
          startIcon={<ArrowBack />}
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: '#2c5aa0',
            mb: 4,
            fontWeight: 500,
            '&:hover': {
              bgcolor: 'rgba(44, 90, 160, 0.05)'
            }
          }}
        >
          Back to India e-Visa
        </Button>

        {/* Header */}
        <Fade in timeout={600}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip 
              label="Secure Application Form" 
              icon={<Security sx={{ fontSize: '18px !important', color: '#065f46 !important' }} />}
              sx={{ 
                bgcolor: '#ecfdf5', 
                color: '#065f46',
                fontWeight: 600,
                fontSize: '0.9rem',
                mb: 3,
                px: 2.5,
                py: 2.5,
                height: 'auto',
                border: '2px solid #10b981',
                fontFamily: "'Poppins', sans-serif",
                '& .MuiChip-icon': {
                  ml: 1
                }
              }}
            />
            <Typography variant="h1" sx={{ 
              fontWeight: 800, 
              mb: 2,
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '2.25rem', md: '2.75rem' },
              lineHeight: 1.2,
              color: '#1a1a1a',
              letterSpacing: '-0.5px'
            }}>
              India e-Visa Application
            </Typography>
            <Typography sx={{ 
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.7,
              fontFamily: "'Poppins', sans-serif"
            }}>
              Fast, secure, and professional guidance for your India e-Visa. We'll guide you through every step.
            </Typography>
          </Box>
        </Fade>

        {/* Progress Indicators */}
        <Box sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2, justifyContent: 'center' }}>
            {steps.map((label, index) => (
              <Box
                key={label}
                sx={{
                  flex: 1,
                  maxWidth: '120px',
                  textAlign: 'center'
                }}
              >
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: index <= activeStep ? '#2c5aa0' : '#e2e8f0',
                  color: index <= activeStep ? 'white' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  mx: 'auto',
                  mb: 1,
                  transition: 'all 0.3s ease',
                  boxShadow: index <= activeStep ? '0 4px 12px rgba(44, 90, 160, 0.3)' : 'none'
                }}>
                  {index + 1}
                </Box>
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: { xs: '0.7rem', sm: '0.85rem' },
                  fontWeight: index === activeStep ? 600 : 400,
                  color: index <= activeStep ? '#1a1a1a' : '#94a3b8',
                  display: { xs: 'none', sm: 'block' }
                }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Box sx={{ position: 'relative', height: 2, bgcolor: '#e2e8f0', borderRadius: 1, maxWidth: '400px', mx: 'auto' }}>
            <Box sx={{
              position: 'absolute',
              height: '100%',
              bgcolor: '#2c5aa0',
              borderRadius: 1,
              width: `${((activeStep + 1) / steps.length) * 100}%`,
              transition: 'width 0.3s ease'
            }} />
          </Box>
        </Box>

        {/* Form Card */}
        <Fade in timeout={800}>
          <Card sx={{ 
            p: { xs: 3, sm: 4, md: 6 },
            borderRadius: '32px',
            boxShadow: '0 20px 60px rgba(44, 90, 160, 0.12)',
            mb: 4,
            border: '1px solid rgba(44, 90, 160, 0.08)'
          }}>
            {/* Form Content */}
            <Box sx={{ mb: 5 }}>
              {renderStepContent(activeStep)}
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              pt: 3,
              borderTop: '2px solid #f1f5f9'
            }}>
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#64748b',
                    px: 3,
                    py: 1.5,
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    '&:hover': {
                      bgcolor: '#f8fafc',
                      borderColor: '#cbd5e1'
                    }
                  }}
                >
                  Back
                </Button>
              )}
              
              <Box sx={{ flex: 1 }} />
              
              <Button
                onClick={handleSaveProgress}
                startIcon={<Save />}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#64748b',
                  px: 3,
                  py: 1.5,
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                    borderColor: '#cbd5e1'
                  }
                }}
              >
                Save Progress
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  endIcon={<CheckCircle />}
                  sx={{
                    bgcolor: '#10b981',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    px: 5,
                    py: 1.8,
                    borderRadius: '12px',
                    textTransform: 'none',
                    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
                    '&:hover': {
                      bgcolor: '#059669',
                      boxShadow: '0 6px 24px rgba(16, 185, 129, 0.4)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Submit Application
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    px: 5,
                    py: 1.8,
                    borderRadius: '12px',
                    textTransform: 'none',
                    boxShadow: '0 4px 16px rgba(44, 90, 160, 0.3)',
                    '&:hover': {
                      bgcolor: '#1e3d6f',
                      boxShadow: '0 6px 24px rgba(44, 90, 160, 0.4)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Continue
                </Button>
              )}
            </Box>
          </Card>
        </Fade>

        {/* Trust Badges */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3}
          sx={{ 
            justifyContent: 'center',
            mb: 4
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#64748b' }}>
            <Security sx={{ fontSize: 22, color: '#2c5aa0' }} />
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', fontWeight: 500 }}>
              256-bit SSL Encryption
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#64748b' }}>
            <CheckCircle sx={{ fontSize: 22, color: '#2c5aa0' }} />
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', fontWeight: 500 }}>
              PDPA Compliant
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#64748b' }}>
            <Support sx={{ fontSize: 22, color: '#2c5aa0' }} />
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', fontWeight: 500 }}>
              24/7 Support Available
            </Typography>
          </Box>
        </Stack>

        {/* Security Notice */}
        <Box sx={{ 
          maxWidth: '700px',
          mx: 'auto',
          p: 3,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.9rem',
            color: '#64748b',
            textAlign: 'center',
            lineHeight: 1.7
          }}>
            <strong style={{ color: '#1a1a1a' }}>Your data is secure.</strong> All information is encrypted and handled in compliance with Singapore's PDPA. 
            We only share your data with Indian immigration authorities for visa processing.
          </Typography>
        </Box>
      </Container>

      {/* Alert Modal */}
      <Dialog
        open={alertModal.open}
        onClose={() => setAlertModal({ ...alertModal, open: false })}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            p: 0
          }
        }}
      >
        <DialogTitle sx={{ 
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#1a1a1a',
          pt: 4,
          px: 4,
          pb: 2
        }}>
          {alertModal.title}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ px: 4, pt: 3, pb: 2 }}>
          <Typography sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1rem',
            color: '#64748b',
            lineHeight: 1.7
          }}>
            {alertModal.message}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 4, pt: 2 }}>
          <Button
            onClick={() => setAlertModal({ ...alertModal, open: false })}
            variant="contained"
            fullWidth
            sx={{
              fontFamily: "'Poppins', sans-serif",
              bgcolor: '#2c5aa0',
              color: 'white',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '12px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1e3d6f',
                boxShadow: '0 8px 20px rgba(44, 90, 160, 0.3)'
              }
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Load Progress Confirmation Modal */}
      <Dialog
        open={loadProgressModal.open}
        onClose={() => handleLoadProgress(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            p: 0
          }
        }}
      >
        <DialogTitle sx={{ 
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#1a1a1a',
          pt: 4,
          px: 4,
          pb: 2
        }}>
          Resume Previous Application?
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ px: 4, pt: 3, pb: 2 }}>
          <Typography sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1rem',
            color: '#64748b',
            lineHeight: 1.7
          }}>
            We found a saved application on this device. Would you like to continue where you left off, or start a fresh application?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 4, pt: 2, gap: 2 }}>
          <Button
            onClick={() => handleLoadProgress(false)}
            variant="outlined"
            fullWidth
            sx={{
              fontFamily: "'Poppins', sans-serif",
              borderColor: '#e2e8f0',
              color: '#64748b',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '12px',
              textTransform: 'none',
              borderWidth: '2px',
              '&:hover': {
                borderColor: '#cbd5e1',
                bgcolor: '#f8fafc',
                borderWidth: '2px'
              }
            }}
          >
            Start Fresh
          </Button>
          <Button
            onClick={() => handleLoadProgress(true)}
            variant="contained"
            fullWidth
            sx={{
              fontFamily: "'Poppins', sans-serif",
              bgcolor: '#2c5aa0',
              color: 'white',
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '12px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#1e3d6f',
                boxShadow: '0 8px 20px rgba(44, 90, 160, 0.3)'
              }
            }}
          >
            Continue Previous
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplyVisa;
