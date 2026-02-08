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
  Button,
  Alert
} from '@mui/material';
import { 
  ArrowBack,
  AttachMoney,
  CheckCircle,
  Cancel,
  Info,
  Gavel,
  CreditCard
} from '@mui/icons-material';

const PricingRefund = () => {
  const navigate = useNavigate();

  const visaPricing = [
    {
      type: 'Tourist e-Visa (30 days)',
      governmentFee: 'USD $25',
      serviceFee: 'SGD $50',
      totalFee: 'SGD $85 (approx)',
      processing: '3-5 business days',
      entries: 'Double Entry'
    },
    {
      type: 'Tourist e-Visa (1 year)',
      governmentFee: 'USD $40',
      serviceFee: 'SGD $80',
      totalFee: 'SGD $140 (approx)',
      processing: '3-5 business days',
      entries: 'Multiple Entry'
    },
    {
      type: 'Business e-Visa',
      governmentFee: 'USD $80',
      serviceFee: 'SGD $100',
      totalFee: 'SGD $210 (approx)',
      processing: '3-5 business days',
      entries: 'Multiple Entry'
    },
    {
      type: 'Medical e-Visa',
      governmentFee: 'USD $80',
      serviceFee: 'SGD $120',
      totalFee: 'SGD $230 (approx)',
      processing: '3-5 business days',
      entries: 'Triple Entry'
    }
  ];

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
              label="Transparent Pricing" 
              icon={<AttachMoney sx={{ fontSize: '18px !important', color: '#065f46 !important' }} />}
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
              Pricing & Refund Policy
            </Typography>
            <Typography sx={{ 
              fontSize: '1.1rem',
              color: '#64748b',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7,
              fontFamily: "'Poppins', sans-serif"
            }}>
              Clear, honest pricing with no hidden fees. Know exactly what you're paying for.
            </Typography>
          </Box>
        </Fade>

        {/* Pricing Section */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 6 }}>
            <Typography sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '1.75rem',
              color: '#1a1a1a',
              mb: 3,
              textAlign: 'center'
            }}>
              India e-Visa Pricing
            </Typography>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <style>{`
                @media (max-width: 960px) {
                  .pricing-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>

              {visaPricing.map((visa, index) => (
                <Card key={index} sx={{ 
                  p: 4,
                  borderRadius: '20px',
                  boxShadow: '0 8px 24px rgba(44, 90, 160, 0.08)',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#2c5aa0',
                    boxShadow: '0 12px 32px rgba(44, 90, 160, 0.15)',
                    transform: 'translateY(-4px)'
                  }
                }} className="pricing-grid">
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: '#2c5aa0',
                    mb: 3
                  }}>
                    {visa.type}
                  </Typography>

                  <Stack spacing={2}>
                    <Box>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.85rem',
                        color: '#64748b',
                        mb: 0.5
                      }}>
                        Indian Government Fee
                      </Typography>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: '#1a1a1a'
                      }}>
                        {visa.governmentFee}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.85rem',
                        color: '#64748b',
                        mb: 0.5
                      }}>
                        Our Service Fee
                      </Typography>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: '#1a1a1a'
                      }}>
                        {visa.serviceFee}
                      </Typography>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.85rem',
                        color: '#64748b',
                        mb: 0.5
                      }}>
                        Total Fee
                      </Typography>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1.5rem',
                        color: '#10b981'
                      }}>
                        {visa.totalFee}
                      </Typography>
                    </Box>

                    <Box sx={{ pt: 2 }}>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.9rem',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1
                      }}>
                        <CheckCircle sx={{ fontSize: 18, color: '#10b981' }} />
                        {visa.processing}
                      </Typography>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.9rem',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <CheckCircle sx={{ fontSize: 18, color: '#10b981' }} />
                        {visa.entries}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              ))}
            </div>

            <Alert severity="info" sx={{ 
              borderRadius: '12px',
              fontFamily: "'Poppins', sans-serif",
              '& .MuiAlert-message': {
                fontFamily: "'Poppins', sans-serif"
              }
            }}>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 1 }}>
                💡 What's Included in Our Service Fee?
              </Typography>
              <Stack spacing={0.5} sx={{ pl: 2 }}>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  • Application review & error checking by visa specialists
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  • Document verification & submission to Indian authorities
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  • Real-time status updates via email
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  • 24/7 customer support throughout the process
                </Typography>
              </Stack>
            </Alert>
          </Box>
        </Fade>

        {/* Refund Policy */}
        <Fade in timeout={1000}>
          <Card sx={{ 
            p: { xs: 4, md: 6 },
            borderRadius: '24px',
            boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)',
            mb: 4,
            border: '1px solid rgba(44, 90, 160, 0.08)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <Gavel sx={{ fontSize: 32, color: '#2c5aa0' }} />
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '1.75rem',
                color: '#1a1a1a'
              }}>
                Refund Policy
              </Typography>
            </Box>

            <Stack spacing={4}>
              {/* Refundable */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <CheckCircle sx={{ fontSize: 24, color: '#10b981' }} />
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    color: '#10b981'
                  }}>
                    100% Refundable (Service Fee Only)
                  </Typography>
                </Box>
                <Box sx={{ 
                  bgcolor: '#f0fdf4',
                  borderRadius: '12px',
                  p: 3,
                  border: '1px solid #bbf7d0'
                }}>
                  <Stack spacing={1.5}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#065f46' }}>
                      <strong>Scenario 1:</strong> You are found <strong>NOT ELIGIBLE</strong> for India e-Visa after eligibility check
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#047857', pl: 2 }}>
                      → Full refund of service fee (government fee not applicable)
                    </Typography>
                    <Divider />
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#065f46' }}>
                      <strong>Scenario 2:</strong> Application cancelled <strong>BEFORE</strong> submission to Indian authorities
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#047857', pl: 2 }}>
                      → Full refund of service fee (government fee not paid yet)
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              {/* Partially Refundable */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Info sx={{ fontSize: 24, color: '#f59e0b' }} />
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    color: '#f59e0b'
                  }}>
                    Partially Refundable
                  </Typography>
                </Box>
                <Box sx={{ 
                  bgcolor: '#fffbeb',
                  borderRadius: '12px',
                  p: 3,
                  border: '1px solid #fde68a'
                }}>
                  <Stack spacing={1.5}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#92400e' }}>
                      <strong>Scenario 3:</strong> Application <strong>REJECTED</strong> by Indian immigration authorities
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#b45309', pl: 2 }}>
                      → Government fee is NON-REFUNDABLE (paid to Indian govt)
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#b45309', pl: 2 }}>
                      → Service fee is NON-REFUNDABLE (application processing work completed)
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              {/* Non-Refundable */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Cancel sx={{ fontSize: 24, color: '#ef4444' }} />
                  <Typography sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    color: '#ef4444'
                  }}>
                    Non-Refundable
                  </Typography>
                </Box>
                <Box sx={{ 
                  bgcolor: '#fef2f2',
                  borderRadius: '12px',
                  p: 3,
                  border: '1px solid #fecaca'
                }}>
                  <Stack spacing={1.5}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#7f1d1d' }}>
                      <strong>Scenario 4:</strong> Application successfully <strong>SUBMITTED</strong> to Indian authorities
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#991b1b', pl: 2 }}>
                      → Once submitted, government fee is non-refundable
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#991b1b', pl: 2 }}>
                      → Service fee is non-refundable (work completed)
                    </Typography>
                    <Divider />
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#7f1d1d' }}>
                      <strong>Scenario 5:</strong> Applicant provided <strong>INCORRECT INFORMATION</strong>
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', color: '#991b1b', pl: 2 }}>
                      → No refund (applicant responsibility)
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Stack>

            <Divider sx={{ my: 4 }} />

            {/* Important Notes */}
            <Box>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '1.1rem',
                color: '#1a1a1a',
                mb: 2
              }}>
                ⚠️ Important Notes
              </Typography>
              <Stack spacing={1.5}>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                  • All refund requests must be submitted within 30 days of payment
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                  • Refunds are processed within 7-10 business days to the original payment method
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                  • Government fees are determined by the Indian Ministry of Home Affairs and may change without notice
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                  • We are an independent visa application service. We are NOT affiliated with the Indian government
                </Typography>
              </Stack>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Payment Methods */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <CreditCard sx={{ fontSize: 28, color: '#2c5aa0' }} />
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: '#1a1a1a'
                }}>
                  Accepted Payment Methods
                </Typography>
              </Box>
              <Stack spacing={1}>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                  • Credit Cards (Visa, Mastercard, Amex)
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                  • Debit Cards
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                  • PayNow
                </Typography>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', color: '#64748b' }}>
                  • Bank Transfer (for corporate clients)
                </Typography>
              </Stack>
            </Box>
          </Card>
        </Fade>

        {/* Contact Section */}
        <Alert severity="info" sx={{ 
          borderRadius: '16px',
          fontFamily: "'Poppins', sans-serif",
          '& .MuiAlert-message': {
            fontFamily: "'Poppins', sans-serif",
            width: '100%'
          }
        }}>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, mb: 1 }}>
            Questions about pricing or refunds?
          </Typography>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem' }}>
            Contact our support team at <strong>enquiry@azholidays.com</strong> or call <strong>+65 9126 3786</strong>
          </Typography>
        </Alert>
      </Container>
    </Box>
  );
};

export default PricingRefund;
