import React from 'react';
import { useEffect } from 'react';
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
  Button,
  Alert
} from '@mui/material';
import { 
  ArrowBack,
  Gavel,
  Warning,
  CheckCircle,
  Info
} from '@mui/icons-material';

const TermsConditions = () => {
  const navigate = useNavigate();

  // Set SEO title
  useEffect(() => {
    document.title = 'Terms & Conditions - AZ Holidays Singapore';
  }, []);

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
              label="Legal Terms" 
              icon={<Gavel sx={{ fontSize: '18px !important', color: '#0c4a6e !important' }} />}
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
              Terms & Conditions
            </Typography>
            <Typography sx={{ 
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
              fontFamily: "'Poppins', sans-serif"
            }}>
              Please read these terms carefully before using our visa application services.
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

        {/* Important Notice */}
        <Alert severity="warning" sx={{ 
          mb: 4,
          borderRadius: '16px',
          fontFamily: "'Poppins', sans-serif",
          '& .MuiAlert-message': {
            fontFamily: "'Poppins', sans-serif",
            width: '100%'
          }
        }}>
          <Typography sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            mb: 1
          }}>
            ⚠️ Critical Notice
          </Typography>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem' }}>
            <strong>WE ARE NOT THE INDIAN GOVERNMENT.</strong> AZ Holidays Pte Ltd is an independent visa application assistance service. We are NOT affiliated with, endorsed by, or representing the Government of India. We provide application support services only.
          </Typography>
        </Alert>

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
              {/* Agreement */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 2
                }}>
                  1. Agreement to Terms
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8,
                  mb: 2
                }}>
                  By accessing and using the services of AZ Holidays Pte Ltd (UEN: 200901908E) ("Company," "we," "us," or "our"), you agree to be bound by these Terms and Conditions.
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8
                }}>
                  If you do not agree to these terms, you must not use our services.
                </Typography>
              </Box>

              <Divider />

              {/* Services Description */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  2. Services Provided
                </Typography>

                <Box sx={{ 
                  bgcolor: '#f0f9ff',
                  borderRadius: '12px',
                  p: 3,
                  mb: 3,
                  border: '1px solid #bae6fd'
                }}>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#0c4a6e',
                    mb: 2
                  }}>
                    We Provide:
                  </Typography>
                  <Stack spacing={1}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#475569' }}>
                      ✓ Assistance with completing India e-Visa application forms
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#475569' }}>
                      ✓ Document verification and error checking
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#475569' }}>
                      ✓ Submission of applications to Indian immigration authorities
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#475569' }}>
                      ✓ Application status tracking and updates
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#475569' }}>
                      ✓ Customer support throughout the process
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ 
                  bgcolor: '#fef2f2',
                  borderRadius: '12px',
                  p: 3,
                  border: '1px solid #fecaca'
                }}>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#7f1d1d',
                    mb: 2
                  }}>
                    We DO NOT:
                  </Typography>
                  <Stack spacing={1}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#991b1b' }}>
                      ✗ Guarantee visa approval (decision is made by Indian authorities)
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#991b1b' }}>
                      ✗ Represent the Government of India in any capacity
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#991b1b' }}>
                      ✗ Have authority to issue or deny visas
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#991b1b' }}>
                      ✗ Provide legal or immigration advice
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              <Divider />

              {/* User Responsibilities */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  3. Your Responsibilities
                </Typography>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: 1.8,
                  mb: 2
                }}>
                  As a user of our services, you agree to:
                </Typography>

                <Stack spacing={2}>
                  <Box sx={{ pl: 2 }}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', mb: 1 }}>
                      <strong>✓ Accuracy:</strong> Provide true, accurate, current, and complete information
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', mb: 1 }}>
                      <strong>✓ Documentation:</strong> Submit valid and genuine supporting documents
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', mb: 1 }}>
                      <strong>✓ Eligibility:</strong> Ensure you meet India e-Visa eligibility requirements
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', mb: 1 }}>
                      <strong>✓ Compliance:</strong> Comply with all Indian immigration laws and regulations
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', mb: 1 }}>
                      <strong>✓ Confidentiality:</strong> Keep your login credentials secure
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', mb: 1 }}>
                      <strong>✓ Communication:</strong> Respond promptly to requests for additional information
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
                    Providing false or misleading information is a criminal offense in India and may result in visa denial, deportation, or legal action.
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Fees and Payments */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  4. Fees and Payment
                </Typography>

                <Stack spacing={2}>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>4.1 Fee Structure:</strong> Our total fee consists of:
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • <strong>Government Fee:</strong> Paid to Indian authorities (non-refundable)
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • <strong>Service Fee:</strong> Payment for our application assistance services
                    </Typography>
                  </Box>

                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>4.2 Payment Terms:</strong> Payment is required before application submission.
                  </Typography>

                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>4.3 Refund Policy:</strong> See our separate <Button onClick={() => navigate('/pricing-refund')} sx={{ textTransform: 'none', p: 0, minWidth: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#2c5aa0' }}>Pricing & Refund Policy</Button> for complete details.
                  </Typography>

                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>4.4 Fee Changes:</strong> We reserve the right to change our service fees. Price changes will not affect applications already paid for.
                  </Typography>
                </Stack>
              </Box>

              <Divider />

              {/* No Guarantees */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Warning sx={{ fontSize: 28, color: '#ef4444' }} />
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: '#1a1a1a'
                  }}>
                    5. No Guarantee of Approval
                  </Typography>
                </Box>

                <Box sx={{ 
                  bgcolor: '#fef2f2',
                  borderRadius: '12px',
                  p: 4,
                  border: '2px solid #fca5a5'
                }}>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.05rem',
                    color: '#7f1d1d',
                    lineHeight: 1.8,
                    mb: 2
                  }}>
                    <strong>IMPORTANT:</strong> We provide application assistance services only. We <strong>DO NOT</strong> and <strong>CANNOT</strong> guarantee that your visa will be approved.
                  </Typography>
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.95rem',
                    color: '#991b1b',
                    lineHeight: 1.8
                  }}>
                    The final decision on visa approval or rejection is made solely by the <strong>Ministry of Home Affairs, Government of India</strong>. We have no control over or influence on this decision.
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Processing Time */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  6. Processing Time
                </Typography>

                <Stack spacing={2}>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>6.1 Standard Processing:</strong> Typical processing time is 3-5 business days after submission to Indian authorities.
                  </Typography>

                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>6.2 Delays:</strong> Processing time may be longer due to:
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • High application volume
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Additional document requests
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Security or background checks
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Public holidays in India
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Technical issues with government systems
                    </Typography>
                  </Box>

                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>6.3 No Liability:</strong> We are not liable for delays caused by Indian immigration authorities or circumstances beyond our control.
                  </Typography>
                </Stack>
              </Box>

              <Divider />

              {/* Limitation of Liability */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  7. Limitation of Liability
                </Typography>

                <Stack spacing={2}>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', lineHeight: 1.8 }}>
                    <strong>7.1</strong> We are not liable for visa rejection, travel disruptions, or any losses arising from:
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Decisions made by Indian immigration authorities
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Inaccurate or false information provided by you
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Processing delays beyond our control
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Flight cancellations, hotel bookings, or other travel arrangements
                    </Typography>
                  </Box>

                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', lineHeight: 1.8 }}>
                    <strong>7.2</strong> Our maximum liability is limited to the service fee paid (excluding government fees).
                  </Typography>

                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b', lineHeight: 1.8 }}>
                    <strong>7.3</strong> We are not liable for indirect, consequential, or punitive damages.
                  </Typography>
                </Stack>
              </Box>

              <Divider />

              {/* Intellectual Property */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 2
                }}>
                  8. Intellectual Property
                </Typography>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: 1.8
                }}>
                  All content on our website (text, graphics, logos, code) is the property of AZ Holidays Pte Ltd and protected by copyright laws. You may not reproduce, distribute, or create derivative works without written permission.
                </Typography>
              </Box>

              <Divider />

              {/* Data Privacy */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 2
                }}>
                  9. Data Privacy
                </Typography>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: 1.8
                }}>
                  Your use of our services is subject to our <Button onClick={() => navigate('/privacy-policy')} sx={{ textTransform: 'none', p: 0, minWidth: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#2c5aa0' }}>Privacy Policy</Button>, which explains how we collect, use, and protect your personal data in compliance with Singapore's PDPA.
                </Typography>
              </Box>

              <Divider />

              {/* Termination */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  10. Termination
                </Typography>

                <Stack spacing={2}>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>10.1</strong> We reserve the right to refuse or terminate service if you:
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Violate these Terms & Conditions
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Provide false or fraudulent information
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Engage in abusive or threatening behavior toward our staff
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#64748b' }}>
                      • Use our services for illegal purposes
                    </Typography>
                  </Box>

                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>10.2</strong> You may cancel your application before submission for a full refund of the service fee.
                  </Typography>
                </Stack>
              </Box>

              <Divider />

              {/* Governing Law */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 2
                }}>
                  11. Governing Law
                </Typography>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: 1.8
                }}>
                  These Terms & Conditions are governed by the laws of the Republic of Singapore. Any disputes will be subject to the exclusive jurisdiction of Singapore courts.
                </Typography>
              </Box>

              <Divider />

              {/* Dispute Resolution */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  12. Dispute Resolution
                </Typography>

                <Stack spacing={2}>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>12.1 Contact Us First:</strong> Please contact our support team to resolve any issues before taking legal action.
                  </Typography>

                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>12.2 Mediation:</strong> If informal resolution fails, we agree to attempt mediation before litigation.
                  </Typography>

                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                    <strong>12.3 Arbitration:</strong> For disputes over SGD $10,000, parties agree to binding arbitration under Singapore law.
                  </Typography>
                </Stack>
              </Box>

              <Divider />

              {/* Changes to Terms */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 2
                }}>
                  13. Changes to Terms
                </Typography>

                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: 1.8
                }}>
                  We may update these Terms & Conditions from time to time. Significant changes will be notified via email or website notice. Continued use of our services after changes constitutes acceptance of the new terms.
                </Typography>
              </Box>

              <Divider />

              {/* Contact */}
              <Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#1a1a1a',
                  mb: 3
                }}>
                  14. Contact Information
                </Typography>

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
                    For questions about these Terms & Conditions:
                  </Typography>
                  <Stack spacing={1.5}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#1a1a1a' }}>
                      <strong>AZ Holidays Pte Ltd</strong>
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      Email: legal@azholidays.com
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      Support: enquiry@azholidays.com
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                      Phone: +65 9126 3786
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

              {/* Acceptance */}
              <Box sx={{ 
                bgcolor: '#ecfdf5',
                borderRadius: '12px',
                p: 4,
                border: '2px solid #10b981'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <CheckCircle sx={{ fontSize: 32, color: '#10b981' }} />
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#065f46'
                  }}>
                    Acceptance of Terms
                  </Typography>
                </Box>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#047857',
                  lineHeight: 1.8
                }}>
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions and our Privacy Policy.
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default TermsConditions;
