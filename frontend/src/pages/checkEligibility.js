import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Card,
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Fade,
  Grow,
  Alert,
  Chip
} from '@mui/material';
import { 
  CheckCircle,
  Cancel,
  Security,
  Speed,
  Support,
  NavigateNext,
  ArrowBack
} from '@mui/icons-material';

const CheckEligibility = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    nationality: '',
    passportType: '',
    travelPurpose: ''
  });

  // Result state
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Eligibility data
  const allowedCountries = [
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

  const passportTypes = [
    { value: "Regular", label: "Regular/Ordinary Passport" },
    { value: "Diplomatic", label: "Diplomatic Passport" },
    { value: "Official", label: "Official/Service Passport" }
  ];

  const travelPurposes = [
    { value: "Tourist", label: "Tourist (Leisure, Sightseeing)" },
    { value: "Business", label: "Business (Meetings, Conferences)" },
    { value: "Medical", label: "Medical (Treatment in India)" }
  ];

  // Eligibility check logic
  const checkEligibility = (e) => {
    e.preventDefault();

    const { nationality, passportType, travelPurpose } = formData;

    // Check nationality
    if (!allowedCountries.includes(nationality)) {
      setResult({
        eligible: false,
        reason: "Unfortunately, your nationality is not currently eligible for India e-Visa.",
        suggestion: "Please contact the nearest Indian Embassy or High Commission for visa options."
      });
      setShowResult(true);
      return;
    }

    // Check passport type
    if (passportType !== "Regular") {
      setResult({
        eligible: false,
        reason: "Only holders of Regular/Ordinary passports are eligible for India e-Visa.",
        suggestion: "Diplomatic and Official passport holders must apply through embassy channels."
      });
      setShowResult(true);
      return;
    }

    // Check travel purpose
    if (!["Tourist", "Business", "Medical"].includes(travelPurpose)) {
      setResult({
        eligible: false,
        reason: "Selected travel purpose is not eligible for India e-Visa.",
        suggestion: "India e-Visa is only available for Tourist, Business, and Medical purposes."
      });
      setShowResult(true);
      return;
    }

    // All checks passed
    setResult({
      eligible: true,
      reason: "Great news! You are eligible for India e-Visa.",
      visaType: travelPurpose === "Tourist" ? "Tourist e-Visa (30 days, 1 year, or 5 years)" :
                travelPurpose === "Business" ? "Business e-Visa (up to 1 year validity)" :
                "Medical e-Visa (60 days, triple entry)",
      nextSteps: [
        "Complete the full application form",
        "Upload passport copy and photo",
        "Pay the visa fee securely",
        "Receive e-Visa via email in 3-5 days"
      ]
    });
    setShowResult(true);
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    // Reset result when form changes
    if (showResult) {
      setShowResult(false);
      setResult(null);
    }
  };

  const resetForm = () => {
    setFormData({
      nationality: '',
      passportType: '',
      travelPurpose: ''
    });
    setResult(null);
    setShowResult(false);
  };

  const isFormComplete = formData.nationality && formData.passportType && formData.travelPurpose;

  return (
    <Box sx={{ 
      bgcolor: '#fafcff', 
      minHeight: '90vh',
      background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)',
      py: { xs: 4, md: 6 }
    }}>
      <Container maxWidth="md">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/india-visa')}
          startIcon={<ArrowBack />}
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: '#2c5aa0',
            mb: 3,
            '&:hover': {
              bgcolor: 'rgba(44, 90, 160, 0.05)'
            }
          }}
        >
          Back to India e-Visa
        </Button>

        {/* Header */}
        <Fade in timeout={600}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Chip 
              label="Free Eligibility Check" 
              sx={{ 
                bgcolor: '#ecfdf5', 
                color: '#065f46',
                fontWeight: 600,
                fontSize: '0.85rem',
                mb: 2,
                px: 2,
                py: 1,
                border: '1px solid #10b981',
                fontFamily: "'Poppins', sans-serif"
              }}
            />
            <Typography variant="h1" sx={{ 
              fontWeight: 700, 
              mb: 2,
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              lineHeight: 1.2,
              color: '#1a1a1a'
            }}>
              Check Your India e-Visa Eligibility in 1 Minute
            </Typography>
            <Typography sx={{ 
              fontSize: { xs: '1rem', md: '1.15rem' },
              color: '#64748b',
              maxWidth: '650px',
              mx: 'auto',
              lineHeight: 1.7,
              fontFamily: "'Poppins', sans-serif",
              mb: 1
            }}>
              Answer 3 simple questions to see if you qualify for India e-Visa. 
              This check is instant, free, and doesn't submit an application.
            </Typography>
            
            {/* Trust badges */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2}
              sx={{ 
                justifyContent: 'center',
                mt: 3,
                flexWrap: 'wrap'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b' }}>
                <Security sx={{ fontSize: 18, color: '#2c5aa0' }} />
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  100% Secure
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b' }}>
                <Speed sx={{ fontSize: 18, color: '#2c5aa0' }} />
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  Instant Results
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b' }}>
                <Support sx={{ fontSize: 18, color: '#2c5aa0' }} />
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  Singapore Support
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Fade>

        {/* Form Card */}
        <Grow in timeout={800}>
          <Card sx={{ 
            p: { xs: 3, md: 5 },
            borderRadius: '24px',
            boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)',
            mb: 4
          }}>
            <form onSubmit={checkEligibility}>
              <Stack spacing={4}>
                {/* Question 1: Nationality */}
                <Box>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#1a1a1a',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Box sx={{ 
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: '#2c5aa0',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 700
                    }}>
                      1
                    </Box>
                    What is your passport nationality?
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>
                      Select your country
                    </InputLabel>
                    <Select
                      value={formData.nationality}
                      label="Select your country"
                      onChange={handleChange('nationality')}
                      sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        borderRadius: '12px'
                      }}
                    >
                      {allowedCountries.map((country) => (
                        <MenuItem 
                          key={country} 
                          value={country}
                          sx={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.85rem',
                    color: '#64748b',
                    mt: 1,
                    fontStyle: 'italic'
                  }}>
                    Select the country that issued your passport
                  </Typography>
                </Box>

                {/* Question 2: Passport Type */}
                <Box>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#1a1a1a',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Box sx={{ 
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: '#2c5aa0',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 700
                    }}>
                      2
                    </Box>
                    What type of passport do you hold?
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>
                      Select passport type
                    </InputLabel>
                    <Select
                      value={formData.passportType}
                      label="Select passport type"
                      onChange={handleChange('passportType')}
                      sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        borderRadius: '12px'
                      }}
                    >
                      {passportTypes.map((type) => (
                        <MenuItem 
                          key={type.value} 
                          value={type.value}
                          sx={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.85rem',
                    color: '#64748b',
                    mt: 1,
                    fontStyle: 'italic'
                  }}>
                    Check your passport cover – most people have Regular passports
                  </Typography>
                </Box>

                {/* Question 3: Travel Purpose */}
                <Box>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#1a1a1a',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Box sx={{ 
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: '#2c5aa0',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 700
                    }}>
                      3
                    </Box>
                    What is your main reason for visiting India?
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: "'Poppins', sans-serif" }}>
                      Select travel purpose
                    </InputLabel>
                    <Select
                      value={formData.travelPurpose}
                      label="Select travel purpose"
                      onChange={handleChange('travelPurpose')}
                      sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        borderRadius: '12px'
                      }}
                    >
                      {travelPurposes.map((purpose) => (
                        <MenuItem 
                          key={purpose.value} 
                          value={purpose.value}
                          sx={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {purpose.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.85rem',
                    color: '#64748b',
                    mt: 1,
                    fontStyle: 'italic'
                  }}>
                    Choose the option that best matches your travel plans
                  </Typography>
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!isFormComplete}
                  endIcon={<NavigateNext />}
                  sx={{
                    bgcolor: '#2c5aa0',
                    color: 'white',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    py: 2,
                    borderRadius: '12px',
                    textTransform: 'none',
                    mt: 2,
                    '&:hover': {
                      bgcolor: '#1e3d6f',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(44, 90, 160, 0.25)'
                    },
                    '&:disabled': {
                      bgcolor: '#e2e8f0',
                      color: '#94a3b8'
                    }
                  }}
                >
                  Check My Eligibility
                </Button>
              </Stack>
            </form>
          </Card>
        </Grow>

        {/* Result Display */}
        {showResult && result && (
          <Fade in timeout={600}>
            <Card sx={{ 
              p: { xs: 3, md: 5 },
              borderRadius: '24px',
              boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)',
              border: result.eligible ? '2px solid #10b981' : '2px solid #ef4444',
              bgcolor: result.eligible ? '#f0fdf4' : '#fef2f2'
            }}>
              <Box sx={{ textAlign: 'center' }}>
                {result.eligible ? (
                  <>
                    <CheckCircle sx={{ 
                      fontSize: 64, 
                      color: '#10b981', 
                      mb: 2 
                    }} />
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      color: '#065f46',
                      mb: 2
                    }}>
                      {result.reason}
                    </Typography>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.1rem',
                      color: '#047857',
                      mb: 1
                    }}>
                      You can apply for: <strong>{result.visaType}</strong>
                    </Typography>

                    {/* Next Steps */}
                    <Box sx={{ 
                      bgcolor: 'white',
                      borderRadius: '16px',
                      p: 3,
                      my: 4,
                      textAlign: 'left',
                      border: '1px solid #d1fae5'
                    }}>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: '#1a1a1a',
                        mb: 2
                      }}>
                        Next Steps:
                      </Typography>
                      <Stack spacing={1.5}>
                        {result.nextSteps.map((step, index) => (
                          <Box key={index} sx={{ display: 'flex', gap: 2 }}>
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
                              {index + 1}
                            </Box>
                            <Typography sx={{ 
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: '0.95rem',
                              color: '#475569',
                              pt: 0.3
                            }}>
                              {step}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                    {/* CTA Buttons */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/india-visa')}
                        sx={{
                          bgcolor: '#10b981',
                          color: 'white',
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          px: 5,
                          py: 2,
                          borderRadius: '12px',
                          textTransform: 'none',
                          '&:hover': {
                            bgcolor: '#059669',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 32px rgba(16, 185, 129, 0.3)'
                          }
                        }}
                      >
                        Start My Application Now
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={resetForm}
                        sx={{
                          borderColor: '#10b981',
                          color: '#047857',
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          px: 5,
                          py: 2,
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
                        Check Another Passport
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Cancel sx={{ 
                      fontSize: 64, 
                      color: '#ef4444', 
                      mb: 2 
                    }} />
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      color: '#991b1b',
                      mb: 2
                    }}>
                      Not Eligible for India e-Visa
                    </Typography>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.05rem',
                      color: '#7f1d1d',
                      mb: 3
                    }}>
                      {result.reason}
                    </Typography>

                    {/* Suggestion Box */}
                    <Alert severity="info" sx={{ 
                      borderRadius: '12px',
                      mb: 3,
                      textAlign: 'left',
                      '& .MuiAlert-message': {
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.95rem'
                      }
                    }}>
                      <strong>What you can do:</strong><br />
                      {result.suggestion}
                    </Alert>

                    {/* Actions */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={resetForm}
                        sx={{
                          borderColor: '#ef4444',
                          color: '#991b1b',
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          fontSize: '1rem',
                          px: 4,
                          py: 1.5,
                          borderRadius: '12px',
                          textTransform: 'none',
                          borderWidth: '2px',
                          '&:hover': {
                            borderColor: '#dc2626',
                            bgcolor: 'rgba(239, 68, 68, 0.05)',
                            borderWidth: '2px'
                          }
                        }}
                      >
                        Check Another Passport
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/contact')}
                        sx={{
                          borderColor: '#2c5aa0',
                          color: '#2c5aa0',
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          fontSize: '1rem',
                          px: 4,
                          py: 1.5,
                          borderRadius: '12px',
                          textTransform: 'none',
                          borderWidth: '2px',
                          '&:hover': {
                            borderColor: '#1e3d6f',
                            bgcolor: 'rgba(44, 90, 160, 0.05)',
                            borderWidth: '2px'
                          }
                        }}
                      >
                        Contact Support
                      </Button>
                    </Stack>
                  </>
                )}
              </Box>
            </Card>
          </Fade>
        )}

        {/* Disclaimer */}
        <Box sx={{ 
          mt: 5,
          p: 3,
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '16px',
          border: '1px solid #e2e8f0'
        }}>
          <Typography sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.85rem',
            color: '#64748b',
            textAlign: 'center',
            lineHeight: 1.6
          }}>
            <Security sx={{ fontSize: 16, mb: -0.3, mr: 0.5 }} />
            <strong>Important:</strong> This eligibility check is for pre-qualification purposes only. 
            Final visa approval is determined by the Government of India. We are a Singapore-registered 
            travel agency providing professional visa assistance services.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckEligibility;
