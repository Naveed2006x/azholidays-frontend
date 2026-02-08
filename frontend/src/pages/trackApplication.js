import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField,
  Button, 
  Card,
  Alert,
  Chip,
  Stack,
  Fade,
  Divider,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';
import { 
  Search,
  CheckCircle,
  HourglassEmpty,
  Send,
  Verified,
  Cancel,
  ArrowBack,
  Email,
  Phone,
  Assignment
} from '@mui/icons-material';

const TrackApplication = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    referenceNumber: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [applicationData, setApplicationData] = useState(null);

  // Application status mapping
  const statusConfig = {
    'received': {
      label: 'Application Received',
      color: '#3b82f6',
      icon: <Assignment />,
      step: 0,
      message: 'We have received your application and will review it within 24 hours.'
    },
    'in-progress': {
      label: 'Under Review',
      color: '#f59e0b',
      icon: <HourglassEmpty />,
      step: 1,
      message: 'Our visa specialists are reviewing your application for completeness.'
    },
    'submitted': {
      label: 'Submitted to Indian Authorities',
      color: '#8b5cf6',
      icon: <Send />,
      step: 2,
      message: 'Your application has been submitted to Indian immigration authorities.'
    },
    'approved': {
      label: 'e-Visa Approved',
      color: '#10b981',
      icon: <Verified />,
      step: 3,
      message: 'Congratulations! Your e-Visa has been approved and sent to your email.'
    },
    'rejected': {
      label: 'Application Rejected',
      color: '#ef4444',
      icon: <Cancel />,
      step: 3,
      message: 'Unfortunately, your application was rejected by Indian authorities. Check your email for details.'
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!searchData.referenceNumber.trim() || !searchData.email.trim()) {
      setError('Please enter both Reference Number and Email Address');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(searchData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/visa/track', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(searchData)
      // });
      // const data = await response.json();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock data - replace with actual API response
      setApplicationData({
        referenceNumber: searchData.referenceNumber,
        applicantName: 'John Doe',
        status: 'submitted',
        submittedDate: '2026-01-15',
        lastUpdated: '2026-01-20',
        visaType: 'Tourist e-Visa (30 days)',
        purposeOfVisit: 'Tourism',
        estimatedProcessing: '3-5 business days',
        contactEmail: 'enquiry@azholidays.com',
        contactPhone: '+65 9126 3786'
      });

    } catch (err) {
      console.error('Error tracking application:', err);
      setError('Application not found. Please check your reference number and email address.');
      setApplicationData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (event) => {
    setSearchData({
      ...searchData,
      [field]: event.target.value
    });
    setError('');
  };

  const steps = ['Received', 'Under Review', 'Submitted to Authority', 'Approved/Rejected'];

  return (
    <Box sx={{ 
      bgcolor: '#fafcff', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)',
      py: { xs: 6, md: 8 }
    }}>
      <Container maxWidth="lg">
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
              label="Track Your Application" 
              icon={<Search sx={{ fontSize: '18px !important', color: '#2c5aa0 !important' }} />}
              sx={{ 
                bgcolor: '#e0f2fe', 
                color: '#0c4a6e',
                fontWeight: 600,
                fontSize: '0.9rem',
                mb: 3,
                px: 2.5,
                py: 2.5,
                height: 'auto',
                border: '2px solid #3b82f6',
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
              Track Your Application
            </Typography>
            <Typography sx={{ 
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
              fontFamily: "'Poppins', sans-serif"
            }}>
              Enter your reference number and email address to check the status of your India e-Visa application.
            </Typography>
          </Box>
        </Fade>

        {/* Search Form */}
        <Fade in timeout={800}>
          <Card sx={{ 
            p: { xs: 4, md: 6 },
            borderRadius: '24px',
            boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)',
            mb: 4,
            maxWidth: '600px',
            mx: 'auto',
            border: '1px solid rgba(44, 90, 160, 0.08)'
          }}>
            <form onSubmit={handleSearch}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Reference Number"
                  placeholder="e.g., AZVISA12345678"
                  value={searchData.referenceNumber}
                  onChange={handleChange('referenceNumber')}
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
                      '&:hover': { bgcolor: '#f1f5f9' },
                      '&.Mui-focused': { bgcolor: 'white' }
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  placeholder="email@example.com"
                  value={searchData.email}
                  onChange={handleChange('email')}
                  required
                  helperText="Enter the email address you used when applying"
                  sx={{ 
                    '& .MuiInputLabel-root': { 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500
                    },
                    '& .MuiInputBase-root': { 
                      fontFamily: "'Poppins', sans-serif",
                      borderRadius: '12px',
                      bgcolor: '#f8fafc',
                      '&:hover': { bgcolor: '#f1f5f9' },
                      '&.Mui-focused': { bgcolor: 'white' }
                    }
                  }}
                />

                {error && (
                  <Alert severity="error" sx={{ 
                    borderRadius: '12px',
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Search />}
                  sx={{
                    bgcolor: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    py: 1.8,
                    borderRadius: '12px',
                    textTransform: 'none',
                    boxShadow: '0 4px 16px rgba(44, 90, 160, 0.3)',
                    '&:hover': {
                      bgcolor: '#1e3d6f',
                      boxShadow: '0 6px 24px rgba(44, 90, 160, 0.4)'
                    },
                    '&:disabled': {
                      bgcolor: '#94a3b8'
                    }
                  }}
                >
                  {loading ? 'Searching...' : 'Track Application'}
                </Button>
              </Stack>
            </form>
          </Card>
        </Fade>

        {/* Application Status Result */}
        {applicationData && (
          <Fade in timeout={1000}>
            <Box>
              {/* Status Card */}
              <Card sx={{ 
                p: { xs: 4, md: 6 },
                borderRadius: '24px',
                boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)',
                mb: 4,
                border: `2px solid ${statusConfig[applicationData.status].color}`
              }}>
                {/* Current Status Header */}
                <Box sx={{ 
                  textAlign: 'center',
                  mb: 4,
                  pb: 4,
                  borderBottom: '2px solid #f1f5f9'
                }}>
                  <Box sx={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: `${statusConfig[applicationData.status].color}15`,
                    mb: 2
                  }}>
                    {React.cloneElement(statusConfig[applicationData.status].icon, {
                      sx: { fontSize: 40, color: statusConfig[applicationData.status].color }
                    })}
                  </Box>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                    color: statusConfig[applicationData.status].color,
                    mb: 1
                  }}>
                    {statusConfig[applicationData.status].label}
                  </Typography>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1rem',
                    color: '#64748b',
                    maxWidth: '500px',
                    mx: 'auto'
                  }}>
                    {statusConfig[applicationData.status].message}
                  </Typography>
                </Box>

                {/* Progress Stepper */}
                <Box sx={{ mb: 4 }}>
                  <Stepper activeStep={statusConfig[applicationData.status].step} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel
                          StepIconProps={{
                            sx: {
                              fontFamily: "'Poppins', sans-serif",
                              '&.Mui-active': { color: '#2c5aa0' },
                              '&.Mui-completed': { color: '#10b981' }
                            }
                          }}
                        >
                          <Typography sx={{ 
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: { xs: '0.75rem', sm: '0.9rem' },
                            fontWeight: 500
                          }}>
                            {label}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

                {/* Application Details */}
                <Box sx={{ 
                  bgcolor: '#f8fafc',
                  borderRadius: '16px',
                  p: 3,
                  mb: 3
                }}>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#1a1a1a',
                    mb: 2
                  }}>
                    Application Details
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#64748b' }}>
                        Reference Number:
                      </Typography>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
                        {applicationData.referenceNumber}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#64748b' }}>
                        Applicant Name:
                      </Typography>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
                        {applicationData.applicantName}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#64748b' }}>
                        Visa Type:
                      </Typography>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
                        {applicationData.visaType}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#64748b' }}>
                        Purpose:
                      </Typography>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
                        {applicationData.purposeOfVisit}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#64748b' }}>
                        Submitted On:
                      </Typography>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
                        {new Date(applicationData.submittedDate).toLocaleDateString('en-GB')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#64748b' }}>
                        Last Updated:
                      </Typography>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
                        {new Date(applicationData.lastUpdated).toLocaleDateString('en-GB')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#64748b' }}>
                        Processing Time:
                      </Typography>
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#1a1a1a' }}>
                        {applicationData.estimatedProcessing}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                {/* Contact Support */}
                <Alert severity="info" sx={{ 
                  borderRadius: '12px',
                  '& .MuiAlert-message': {
                    fontFamily: "'Poppins', sans-serif",
                    width: '100%'
                  }
                }}>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    mb: 1
                  }}>
                    Need Help?
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Email sx={{ fontSize: 18, color: '#64748b' }} />
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                        {applicationData.contactEmail}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone sx={{ fontSize: 18, color: '#64748b' }} />
                      <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                        {applicationData.contactPhone}
                      </Typography>
                    </Box>
                  </Stack>
                </Alert>
              </Card>
            </Box>
          </Fade>
        )}

        {/* Help Section */}
        <Card sx={{ 
          p: { xs: 3, md: 4 },
          borderRadius: '20px',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid #e2e8f0'
        }}>
          <Typography sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#1a1a1a',
            mb: 2
          }}>
            📌 Important Notes
          </Typography>
          <Stack spacing={1.5}>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
              • Check your email (including spam folder) for the reference number
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
              • Processing time is typically 3-5 business days after submission
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
              • You will receive email notifications at each status update
            </Typography>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
              • For urgent queries, contact our support team directly
            </Typography>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default TrackApplication;
