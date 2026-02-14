import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Card,
  Stack,
  Chip,
  Fade,
  Divider,
  Button
} from '@mui/material';
import { 
  ArrowBack,
  Shield,
  Storage,
  VpnKey,
  PersonRemove,
  Email,
  Security
} from '@mui/icons-material';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

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
              label="PDPA Compliant" 
              icon={<Shield sx={{ fontSize: '18px !important', color: '#7c3aed !important' }} />}
              sx={{ 
                bgcolor: '#f5f3ff', 
                color: '#5b21b6',
                fontWeight: 600,
                fontSize: '0.9rem',
                mb: 3,
                px: 2.5,
                py: 2.5,
                height: 'auto',
                border: '2px solid #8b5cf6',
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
              Privacy Policy
            </Typography>
            <Typography sx={{ 
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
              fontFamily: "'Poppins', sans-serif"
            }}>
              Your privacy matters. Learn how we collect, use, and protect your personal data.
            </Typography>
            <Typography sx={{ 
              fontSize: '0.9rem',
              color: '#94a3b8',
              mt: 2,
              fontFamily: "'Poppins', sans-serif",
              fontStyle: 'italic'
            }}>
              Last Updated: January 21, 2026
            </Typography>
          </Box>
        </Fade>

        {/* Main Content */}
        <Fade in timeout={800}>
          <Card sx={{ 
            p: { xs: 4, md: 6 },
            borderRadius: '24px',
            boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)',
            mb: 4,
            border: '1px solid rgba(44, 90, 160, 0.08)'
          }}>
            <Stack spacing={5}>
              {/* Introduction */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 2
                }}>
                  1. Introduction
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8,
                  mb: 2
                }}>
                  AZ Holidays Pte Ltd (UEN: 200901908E) ("we," "us," or "our") is committed to protecting your personal data in accordance with Singapore's Personal Data Protection Act 2012 (PDPA).
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8
                }}>
                  This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our India e-Visa application services.
                </Typography>
              </Box>

              <Divider />

              {/* What We Collect */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Storage sx={{ fontSize: 28, color: '#2c5aa0' }} />
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: '#1a1a1a'
                  }}>
                    2. Information We Collect
                  </Typography>
                </Box>

                <Box sx={{ 
                  bgcolor: '#f8fafc',
                  borderRadius: '12px',
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
                    Personal Information:
                  </Typography>
                  <Stack spacing={1}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Full name (as per passport)
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Date of birth
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Gender
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Nationality
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Email address
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Phone number
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ 
                  bgcolor: '#f8fafc',
                  borderRadius: '12px',
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
                    Passport Information:
                  </Typography>
                  <Stack spacing={1}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Passport number
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Passport type
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Issue and expiry dates
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ 
                  bgcolor: '#f8fafc',
                  borderRadius: '12px',
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
                    Travel Information:
                  </Typography>
                  <Stack spacing={1}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Purpose of visit
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Intended arrival and departure dates
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Port of arrival in India
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ 
                  bgcolor: '#f8fafc',
                  borderRadius: '12px',
                  p: 3
                }}>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#1a1a1a',
                    mb: 2
                  }}>
                    Technical Information:
                  </Typography>
                  <Stack spacing={1}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • IP address
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Browser type and version
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Device information
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      • Cookies and usage data
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              <Divider />

              {/* How We Use Data */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <VpnKey sx={{ fontSize: 28, color: '#2c5aa0' }} />
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: '#1a1a1a'
                  }}>
                    3. How We Use Your Information
                  </Typography>
                </Box>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8,
                  mb: 2
                }}>
                  We use your personal data for the following purposes:
                </Typography>

                <Stack spacing={2}>
                  <Box sx={{ 
                    bgcolor: '#f0f9ff',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #bae6fd'
                  }}>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#0c4a6e',
                      mb: 1
                    }}>
                      ✓ Visa Application Processing
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#475569' }}>
                      To submit and process your India e-Visa application with Indian immigration authorities.
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    bgcolor: '#f0f9ff',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #bae6fd'
                  }}>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#0c4a6e',
                      mb: 1
                    }}>
                      ✓ Communication
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#475569' }}>
                      To send you application status updates, confirmations, and customer support responses.
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    bgcolor: '#f0f9ff',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #bae6fd'
                  }}>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#0c4a6e',
                      mb: 1
                    }}>
                      ✓ Payment Processing
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#475569' }}>
                      To process payments for government fees and our service fees.
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    bgcolor: '#f0f9ff',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #bae6fd'
                  }}>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#0c4a6e',
                      mb: 1
                    }}>
                      ✓ Legal Compliance
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#475569' }}>
                      To comply with legal obligations and respond to government requests.
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    bgcolor: '#f0f9ff',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #bae6fd'
                  }}>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#0c4a6e',
                      mb: 1
                    }}>
                      ✓ Service Improvement
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#475569' }}>
                      To analyze usage patterns and improve our website and services.
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Divider />

              {/* Data Sharing */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  4. How We Share Your Information
                </Typography>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8,
                  mb: 3
                }}>
                  We may share your personal data with:
                </Typography>

                <Stack spacing={2}>
                  <Box sx={{ pl: 2 }}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', mb: 0.5 }}>
                      <strong>• Indian Government:</strong> Required for visa processing through official channels
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', mb: 0.5 }}>
                      <strong>• Payment Processors:</strong> Stripe, PayPal for secure payment processing
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', mb: 0.5 }}>
                      <strong>• Service Providers:</strong> Hosting, email services, analytics (Google Analytics, Meta Pixel)
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', mb: 0.5 }}>
                      <strong>• Legal Authorities:</strong> When required by law or court order
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ 
                  bgcolor: '#fff7ed',
                  borderRadius: '12px',
                  p: 3,
                  mt: 3,
                  border: '1px solid #fed7aa'
                }}>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: '#9a3412',
                    mb: 1
                  }}>
                    ⚠️ Important
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#7c2d12' }}>
                    We DO NOT sell, rent, or trade your personal information to third parties for marketing purposes.
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Data Security */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Security sx={{ fontSize: 28, color: '#2c5aa0' }} />
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: '#1a1a1a'
                  }}>
                    5. Data Security
                  </Typography>
                </Box>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8,
                  mb: 2
                }}>
                  We implement industry-standard security measures to protect your data:
                </Typography>

                <Stack spacing={1.5}>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    🔒 256-bit SSL/TLS encryption for data transmission
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    🔒 Encrypted database storage
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    🔒 Regular security audits and penetration testing
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    🔒 Access controls and employee training
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    🔒 Secure payment processing (PCI-DSS compliant)
                  </Typography>
                </Stack>
              </Box>

              <Divider />

              {/* Data Retention */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  6. Data Retention
                </Typography>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8,
                  mb: 2
                }}>
                  We retain your personal data for:
                </Typography>

                <Stack spacing={1.5}>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    • <strong>Active applications:</strong> Duration of visa processing + 6 months
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    • <strong>Completed applications:</strong> 7 years (as required by Singapore law for financial records)
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    • <strong>Marketing data:</strong> Until you withdraw consent
                  </Typography>
                </Stack>
              </Box>

              <Divider />

              {/* Your Rights */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <PersonRemove sx={{ fontSize: 28, color: '#2c5aa0' }} />
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: '#1a1a1a'
                  }}>
                    7. Your Rights Under PDPA
                  </Typography>
                </Box>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8,
                  mb: 3
                }}>
                  You have the following rights regarding your personal data:
                </Typography>

                <Stack spacing={2}>
                  <Box sx={{ 
                    bgcolor: '#ecfdf5',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #a7f3d0'
                  }}>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#065f46',
                      mb: 1
                    }}>
                      Right to Access
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#047857' }}>
                      Request a copy of your personal data we hold
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    bgcolor: '#ecfdf5',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #a7f3d0'
                  }}>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#065f46',
                      mb: 1
                    }}>
                      Right to Correction
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#047857' }}>
                      Request correction of inaccurate or incomplete data
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    bgcolor: '#ecfdf5',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #a7f3d0'
                  }}>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#065f46',
                      mb: 1
                    }}>
                      Right to Withdraw Consent
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#047857' }}>
                      Withdraw consent for data processing (where applicable)
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    bgcolor: '#ecfdf5',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #a7f3d0'
                  }}>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#065f46',
                      mb: 1
                    }}>
                      Right to Data Portability
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#047857' }}>
                      Request transfer of your data to another service provider
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    bgcolor: '#ecfdf5',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #a7f3d0'
                  }}>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#065f46',
                      mb: 1
                    }}>
                      Right to Deletion
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#047857' }}>
                      Request deletion of your data (subject to legal obligations)
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ 
                  bgcolor: '#f8fafc',
                  borderRadius: '12px',
                  p: 3,
                  mt: 3
                }}>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: '#1a1a1a',
                    mb: 1
                  }}>
                    To exercise your rights:
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    Email us at <strong>enquiry@azholidays.com</strong> with your request. We will respond within 30 days.
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Cookies */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  8. Cookies and Tracking
                </Typography>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8,
                  mb: 2
                }}>
                  We use cookies and similar technologies for:
                </Typography>

                <Stack spacing={1.5}>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    • Session management and authentication
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    • Analytics (Google Analytics, Meta Pixel)
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    • Advertising and remarketing
                  </Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    • User preferences and settings
                  </Typography>
                </Stack>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#64748b',
                  mt: 2
                }}>
                  You can disable cookies in your browser settings, but this may affect website functionality.
                </Typography>
              </Box>

              <Divider />

              {/* Contact */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Email sx={{ fontSize: 28, color: '#2c5aa0' }} />
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: '#1a1a1a'
                  }}>
                    9. Contact Us
                  </Typography>
                </Box>

                <Box sx={{ 
                  bgcolor: '#f8fafc',
                  borderRadius: '12px',
                  p: 3
                }}>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1rem',
                    color: '#64748b',
                    mb: 2
                  }}>
                    For privacy-related questions or to exercise your rights:
                  </Typography>
                  <Stack spacing={1.5}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#1a1a1a' }}>
                      <strong>AZ Holidays Pte Ltd</strong>
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      Email: enquiry@azholidays.com
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      Address: [113 Dunlop St, Singapore 209432]
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      UEN: 200901908E
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              <Divider />

              {/* Updates */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 2
                }}>
                  10. Policy Updates
                </Typography>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8
                }}>
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We will notify you of significant changes via email or website notice.
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
