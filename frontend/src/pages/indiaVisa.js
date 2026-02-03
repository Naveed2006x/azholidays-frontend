import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Button, 
  Chip, 
  Stack,
  Fade,
  Grow,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material';
import { 
  ExpandMore,
  CheckCircle,
  Security,
  Speed,
  Support,
  VerifiedUser,
  Description,
  Payment,
  LocationOn,
  Business,
  WhatsApp,
  Email
} from '@mui/icons-material';

const IndiaVisa = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };


  const faqs = [
    {
      question: "Is this the official Government of India website?",
      answer: "No, we are not a government website. We are a Singapore-registered travel agency that provides professional assistance with India e-Visa applications. The official government website is separate. We help streamline your application process with expert review and support."
    },
    {
      question: "How long does the India e-Visa take?",
      answer: "Typically, India e-Visas are processed within 3-5 business days. However, processing times can vary. We recommend applying at least 1-2 weeks before your intended travel date. Urgent applications may be possible depending on the type of visa."
    },
    {
      question: "Can I get a refund if my visa is rejected?",
      answer: "Government fees are non-refundable once submitted to Indian authorities. Our service fee is partially refundable if the rejection was due to an error in our processing. If rejection occurs due to incorrect information provided by the applicant, refunds cannot be issued."
    },
    {
      question: "What happens if my visa application is rejected?",
      answer: "If your application is rejected, we'll inform you immediately and provide the reason for rejection. We can help you understand what went wrong and assist with reapplication if eligible. Note that government fees are not refundable."
    },
    {
      question: "Is my passport and personal data safe?",
      answer: "Yes, absolutely. We use bank-level encryption (SSL 256-bit) to protect all data transmitted through our system. Your information is only used for visa processing and is never shared with third parties except the Indian authorities as required for your application."
    },
    {
      question: "What types of India e-Visa are available?",
      answer: "India offers e-Visas for Tourist, Business, and Medical purposes. Tourist e-Visas are available for 30 days (single/double entry), 1 year (multiple entry), or 5 years (multiple entry). Business and Medical e-Visas have specific validity periods based on purpose."
    },
    {
      question: "Do I need to print my e-Visa?",
      answer: "Yes, it's recommended to carry a printed copy of your e-Visa when traveling to India. You should also keep a digital copy on your phone as backup. Immigration officers may request to see it upon arrival."
    },
  ];

  return (
    <Box sx={{ 
      bgcolor: '#fafcff', 
      minHeight: '90vh',
      background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)',
    }}>
      
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
        color: 'white', 
        pt: { xs: 10, md: 8 }, 
        pb: { xs: 10, md: 8 },
        borderRadius: { xs: '0 0 40px 40px', md: '0 0 60px 60px' },
        mb: { xs: 4, md: 8 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&h=900&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          mixBlendMode: 'overlay'
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in timeout={800}>
            <Box>
              <Chip 
                label="India e-Visa Services" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  mb: 3,
                  px: 2,
                  py: 1,
                  backdropFilter: 'blur(10px)',
                  fontFamily: "'Poppins', sans-serif"
                }}
              />
              <Typography variant="h1" sx={{ 
                fontWeight: 800, 
                mb: 3,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                lineHeight: 1.1,
                textShadow: '0 2px 20px rgba(0,0,0,0.3)'
              }}>
                India e-Visa Application Assistance
              </Typography>
              <Typography variant="h5" sx={{ 
                mb: 2, 
                opacity: 0.95, 
                maxWidth: '800px', 
                mx: 'auto',
                fontWeight: 300,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                px: 2,
                lineHeight: 1.6
              }}>
                Fast, secure, and professional help with your India e-Visa application.<br />
                Expert guidance from start to finish.
              </Typography>
              <Typography sx={{ 
                mb: { xs: 4, md: 5 }, 
                opacity: 0.85, 
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}>
                Transparent pricing • Singapore-based support • 3-5 day processing
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', px: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/apply-visa')}
                  sx={{
                    bgcolor: 'white',
                    color: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    px: 5,
                    py: 2,
                    borderRadius: '12px',
                    textTransform: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    '&:hover': {
                      bgcolor: '#f8f9fa',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Apply for India e-Visa
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/check-eligibility')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    px: 5,
                    py: 2,
                    borderRadius: '12px',
                    textTransform: 'none',
                    borderWidth: '2px',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderWidth: '2px'
                    }
                  }}
                >
                  Check Eligibility
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3, md: 4 } }}>
        
        {/* Trust & Legitimacy Section */}
        <Fade in timeout={600}>
          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" sx={{ 
              textAlign: 'center',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: '#1a1a1a',
              mb: 1
            }}>
              Your Trusted Visa Partner in Singapore
            </Typography>
            <Typography sx={{ 
              textAlign: 'center',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.1rem',
              color: '#64748b',
              mb: 5,
              maxWidth: '700px',
              mx: 'auto'
            }}>
              Licensed and registered travel agency providing professional visa services
            </Typography>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto 32px' }} className="trust-grid">
              <style>{`
                @media (max-width: 900px) { .trust-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 600px) { .trust-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              <Grow in timeout={800}>
                <div>
                  <Card sx={{ 
                    textAlign: 'center', 
                    p: 3,
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(44, 90, 160, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 40px rgba(44, 90, 160, 0.15)'
                    }
                  }}>
                    <Business sx={{ fontSize: 48, color: '#2c5aa0', mb: 2 }} />
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: '#1e3a8a',
                      mb: 1
                    }}>
                      Singapore-Registered
                    </Typography>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.95rem',
                      color: '#64748b'
                    }}>
                      Licensed Travel Agency<br />
                      UEN: 	200901908E
                    </Typography>
                  </Card>
                </div>
              </Grow>

              <Grow in timeout={900}>
                <div>
                  <Card sx={{ 
                    textAlign: 'center', 
                    p: 3,
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(44, 90, 160, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 40px rgba(44, 90, 160, 0.15)'
                    }
                  }}>
                    <LocationOn sx={{ fontSize: 48, color: '#2c5aa0', mb: 2 }} />
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: '#1e3a8a',
                      mb: 1
                    }}>
                      Local Office
                    </Typography>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.95rem',
                      color: '#64748b'
                    }}>
                      113 Dunlop Street<br />
                      Singapore 209432
                    </Typography>
                  </Card>
                </div>
              </Grow>

              <Grow in timeout={1000}>
                <div>
                  <Card sx={{ 
                    textAlign: 'center', 
                    p: 3,
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(44, 90, 160, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 40px rgba(44, 90, 160, 0.15)'
                    }
                  }}>
                    <Payment sx={{ fontSize: 48, color: '#2c5aa0', mb: 2 }} />
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: '#1e3a8a',
                      mb: 1
                    }}>
                      Secure Payments
                    </Typography>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.95rem',
                      color: '#64748b'
                    }}>
                      Visa • Mastercard<br />
                      Stripe Payment Gateway
                    </Typography>
                  </Card>
                </div>
              </Grow>

              <Grow in timeout={1100}>
                <div>
                  <Card sx={{ 
                    textAlign: 'center', 
                    p: 3,
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(44, 90, 160, 0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 40px rgba(44, 90, 160, 0.15)'
                    }
                  }}>
                    <Support sx={{ fontSize: 48, color: '#2c5aa0', mb: 2 }} />
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: '#1e3a8a',
                      mb: 1
                    }}>
                      Local Support
                    </Typography>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.95rem',
                      color: '#64748b'
                    }}>
                      WhatsApp & Email<br />
                      Singapore Business Hours
                    </Typography>
                  </Card>
                </div>
              </Grow>
            </div>

            {/* Disclaimer */}
            <Box sx={{ 
              maxWidth: '900px',
              mx: 'auto',
              bgcolor: '#fff3cd',
              border: '2px solid #ffc107',
              borderRadius: '16px',
              p: 3,
              textAlign: 'center'
            }}>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.95rem',
                color: '#856404',
                lineHeight: 1.7
              }}>
                <strong>Important Disclosure:</strong> We are not affiliated with the Government of India or any official government entity. 
                We provide professional visa assistance services to help you successfully complete your India e-Visa application.
              </Typography>
            </Box>
          </Box>
        </Fade>

        {/* What is India e-Visa Section */}
        <Box sx={{ mb: 8, bgcolor: 'white', borderRadius: '32px', p: { xs: 4, md: 6 } }}>
          <Typography variant="h3" sx={{ 
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: '#1a1a1a',
            mb: 1
          }}>
            What is India e-Visa?
          </Typography>
          <Typography sx={{ 
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            color: '#64748b',
            mb: 5,
            maxWidth: '700px',
            mx: 'auto'
          }}>
            An electronic visa that allows you to visit India for tourism, business, or medical purposes
          </Typography>

          <Box sx={{ 
            bgcolor: '#f8fafc',
            borderRadius: '20px',
            p: 4,
            mb: 4
          }}>
            <Typography sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#475569',
              mb: 4
            }}>
              The India e-Visa is an official electronic travel authorization issued by the Government of India. 
              It allows eligible foreign nationals to enter India without visiting an embassy or consulate. 
              The e-Visa is linked electronically to your passport and delivered via email.
            </Typography>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="visa-types-grid">
              <style>{`
                @media (max-width: 900px) { .visa-types-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 600px) { .visa-types-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              <Card sx={{ 
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#2c5aa0',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(44, 90, 160, 0.12)'
                }
              }}>
                <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>✈️</Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  mb: 1,
                  color: '#1a1a1a'
                }}>
                  Tourist e-Visa
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.9rem',
                  color: '#64748b',
                  lineHeight: 1.6
                }}>
                  For leisure, sightseeing, casual visits (30 days, 1 year, or 5 years validity)
                </Typography>
              </Card>

              <Card sx={{ 
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#2c5aa0',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(44, 90, 160, 0.12)'
                }
              }}>
                <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>💼</Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  mb: 1,
                  color: '#1a1a1a'
                }}>
                  Business e-Visa
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.9rem',
                  color: '#64748b',
                  lineHeight: 1.6
                }}>
                  For business meetings, conferences, trade fairs (up to 1 year validity)
                </Typography>
              </Card>

              <Card sx={{ 
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#2c5aa0',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(44, 90, 160, 0.12)'
                }
              }}>
                <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>🏥</Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  mb: 1,
                  color: '#1a1a1a'
                }}>
                  Medical e-Visa
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.9rem',
                  color: '#64748b',
                  lineHeight: 1.6
                }}>
                  For medical treatment in India (60 days, triple entry)
                </Typography>
              </Card>

              <Card sx={{ 
                p: 2.5,
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#2c5aa0',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(44, 90, 160, 0.12)'
                }
              }}>
                <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>🛂</Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  mb: 1,
                  color: '#1a1a1a'
                }}>
                  28 Entry Points
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.9rem',
                  color: '#64748b',
                  lineHeight: 1.6
                }}>
                  Valid at 28 designated airports and 5 seaports across India
                </Typography>
              </Card>
            </div>
          </Box>
        </Box>

        {/* How It Works Section */}
        <Box sx={{ mb: 8, bgcolor: '#f8fafc', borderRadius: '32px', p: { xs: 4, md: 6 } }}>
          <Typography variant="h3" sx={{ 
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: '#1a1a1a',
            mb: 1
          }}>
            How It Works
          </Typography>
          <Typography sx={{ 
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            color: '#64748b',
            mb: 5,
            maxWidth: '700px',
            mx: 'auto'
          }}>
            A simple 4-step process to get your India e-Visa approved
          </Typography>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }} className="steps-grid">
            <style>{`
              @media (max-width: 900px) { .steps-grid { grid-template-columns: repeat(2, 1fr) !important; } }
              @media (max-width: 600px) { .steps-grid { grid-template-columns: 1fr !important; } }
            `}</style>
            {[
              { num: 1, title: 'Submit Application Online', desc: 'Complete our simple online form with your personal details and travel information. Takes about 10 minutes.' },
              { num: 2, title: 'Upload Documents Securely', desc: 'Upload your passport copy and photo through our encrypted portal. We verify format and quality requirements.' },
              { num: 3, title: 'Expert Review & Submission', desc: 'Our team reviews your application for errors, then submits it to Indian immigration authorities on your behalf.' },
              { num: 4, title: 'Receive e-Visa by Email', desc: 'Once approved (typically 3-5 days), receive your e-Visa via email. Print and carry it when traveling to India.' }
            ].map((step, index) => (
              <Grow in timeout={800 + index * 100} key={step.num}>
                <div>
                  <Card sx={{ 
                    p: 3,
                    borderRadius: '20px',
                    height: '100%',
                    textAlign: 'center',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#2c5aa0',
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 40px rgba(44, 90, 160, 0.15)'
                    }
                  }}>
                    <Box sx={{ 
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: '#2c5aa0',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      mx: 'auto',
                      mb: 2
                    }}>
                      {step.num}
                    </Box>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.15rem',
                      mb: 1.5,
                      color: '#1a1a1a'
                    }}>
                      {step.title}
                    </Typography>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.9rem',
                      color: '#64748b',
                      lineHeight: 1.6
                    }}>
                      {step.desc}
                    </Typography>
                  </Card>
                </div>
              </Grow>
            ))}
          </div>
        </Box>

        {/* Why Apply With Us Section */}
        <Box sx={{ mb: 8, bgcolor: 'white', borderRadius: '32px', p: { xs: 4, md: 6 } }}>
          <Typography variant="h3" sx={{ 
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: '#1a1a1a',
            mb: 1
          }}>
            Why Apply With Us?
          </Typography>
          <Typography sx={{ 
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            color: '#64748b',
            mb: 5,
            maxWidth: '700px',
            mx: 'auto'
          }}>
            More than just a form submission – we're your visa success partner
          </Typography>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1200px', margin: '0 auto' }} className="benefits-grid">
            <style>{`
              @media (max-width: 900px) { .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; } }
              @media (max-width: 600px) { .benefits-grid { grid-template-columns: 1fr !important; } }
            `}</style>
            {[
              { icon: <VerifiedUser sx={{ fontSize: 40 }} />, title: 'Human Expert Review', desc: 'Every application is reviewed by experienced visa specialists to catch errors before submission.' },
              { icon: <CheckCircle sx={{ fontSize: 40 }} />, title: 'Error Prevention', desc: 'We check for common mistakes that cause rejections – wrong dates, photo issues, missing information.' },
              { icon: <LocationOn sx={{ fontSize: 40 }} />, title: 'Local Singapore Support', desc: 'Based in Singapore with local WhatsApp and email support during business hours.' },
              { icon: <WhatsApp sx={{ fontSize: 40 }} />, title: 'WhatsApp Assistance', desc: 'Quick responses to your questions via WhatsApp – no long wait times or confusing phone menus.' },
              { icon: <Description sx={{ fontSize: 40 }} />, title: 'Document Guidance', desc: 'Clear instructions on photo requirements, passport scans, and supporting documents.' },
              { icon: <Speed sx={{ fontSize: 40 }} />, title: 'Fast Processing', desc: 'We submit your application promptly and monitor status updates on your behalf.' }
            ].map((benefit, index) => (
              <Grow in timeout={800 + index * 100} key={index}>
                <div>
                  <Card sx={{ 
                    p: 3,
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#2c5aa0',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(44, 90, 160, 0.12)'
                    }
                  }}>
                    <Box sx={{ color: '#2c5aa0', mb: 2 }}>
                      {benefit.icon}
                    </Box>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      mb: 1,
                      color: '#1e3a8a'
                    }}>
                      {benefit.title}
                    </Typography>
                    <Typography sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.95rem',
                      color: '#64748b',
                      lineHeight: 1.6
                    }}>
                      {benefit.desc}
                    </Typography>
                  </Card>
                </div>
              </Grow>
            ))}
          </div>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ mb: 8, bgcolor: '#f8fafc', borderRadius: '32px', p: { xs: 4, md: 6 } }}>
          <Typography variant="h3" sx={{ 
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: '#1a1a1a',
            mb: 1
          }}>
            Transparent Pricing
          </Typography>
          <Typography sx={{ 
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            color: '#64748b',
            mb: 5,
            maxWidth: '700px',
            mx: 'auto'
          }}>
            Clear breakdown of all fees – no hidden charges or surprises
          </Typography>

          <Box sx={{ maxWidth: '700px', mx: 'auto' }}>
            <TableContainer component={Paper} sx={{ 
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(44, 90, 160, 0.08)',
              overflow: 'hidden'
            }}>
              <Table>
                <TableBody>
                  <TableRow sx={{ bgcolor: '#2c5aa0' }}>
                    <TableCell sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      color: 'white',
                      fontSize: '1rem',
                      py: 2
                    }}>
                      Fee Type
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      color: 'white',
                      fontSize: '1rem',
                      py: 2
                    }}>
                      Amount (SGD)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ py: 2.5 }}>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Government Fee
                      </Typography>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.85rem',
                        color: '#64748b'
                      }}>
                        (Paid directly to Indian authorities)
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2.5 }}>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: '#2c5aa0'
                      }}>
                        $80.00
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ py: 2.5 }}>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Service Fee
                      </Typography>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.85rem',
                        color: '#64748b'
                      }}>
                        (Expert review, submission & support)
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2.5 }}>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: '#2c5aa0'
                      }}>
                        $45.00
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    <TableCell sx={{ py: 2.5 }}>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: '#1a1a1a'
                      }}>
                        Total Fee
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2.5 }}>
                      <Typography sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1.3rem',
                        color: '#2c5aa0'
                      }}>
                        $125.00
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ 
              mt: 3,
              p: 2.5,
              bgcolor: '#ecfdf5',
              borderRadius: '12px',
              border: '1px solid #10b981',
              textAlign: 'center'
            }}>
              <Typography sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#065f46'
              }}>
                ✓ No Hidden Charges  •  ✓ Secure Payment  •  ✓ Transparent Breakdown
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mb: 8, bgcolor: 'white', borderRadius: '32px', p: { xs: 4, md: 6 } }}>
          <Typography variant="h3" sx={{ 
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: '#1a1a1a',
            mb: 1
          }}>
            Frequently Asked Questions
          </Typography>
          <Typography sx={{ 
            textAlign: 'center',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            color: '#64748b',
            mb: 5,
            maxWidth: '700px',
            mx: 'auto'
          }}>
            Everything you need to know about India e-Visa applications
          </Typography>

          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            {faqs.map((faq, index) => (
              <Accordion 
                key={index}
                expanded={openFAQ === index}
                onChange={() => toggleFAQ(index)}
                sx={{ 
                  mb: 2,
                  borderRadius: '12px !important',
                  border: '1px solid #e2e8f0',
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    margin: '0 0 16px 0'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    color: '#1a1a1a',
                    '&:hover': {
                      bgcolor: '#f8fafc'
                    }
                  }}
                >
                  {faq.question}
                </AccordionSummary>
                <AccordionDetails sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: 1.8,
                  pt: 0
                }}>
                  {faq.answer}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

        {/* Final CTA Section */}
        <Box sx={{ 
          mb: 4,
          background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
          borderRadius: '32px',
          p: { xs: 4, md: 8 },
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&h=900&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            mixBlendMode: 'overlay'
          }
        }}>
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h2" sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2
            }}>
              Ready to Apply for Your India e-Visa?
            </Typography>
            <Typography sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.2rem',
              mb: 1.5,
              opacity: 0.95
            }}>
              Join hundreds of satisfied travelers who've successfully obtained their India e-Visa through us.
            </Typography>
            <Typography sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              mb: 4,
              opacity: 0.85
            }}>
              Fast processing • Expert review • Local Singapore support
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/apply-visa')}
              sx={{
                bgcolor: 'white',
                color: '#2c5aa0',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '1.2rem',
                px: 6,
                py: 2.5,
                borderRadius: '12px',
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                '&:hover': {
                  bgcolor: '#f8f9fa',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
                }
              }}
            >
              Start My India e-Visa Application
            </Button>

            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              sx={{ 
                justifyContent: 'center',
                mt: 4,
                opacity: 0.9
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security sx={{ fontSize: 20 }} />
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  SSL Encrypted
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle sx={{ fontSize: 20 }} />
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  Singapore Registered
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Payment sx={{ fontSize: 20 }} />
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  Secure Payment
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Support sx={{ fontSize: 20 }} />
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem' }}>
                  24/7 Support
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IndiaVisa;
