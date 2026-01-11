import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  Fade,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import { Security, Phone, Email, CheckCircle, Verified } from '@mui/icons-material';

const Insurance = () => {
  const coverageFeatures = [
    "Medical expenses coverage",
    "Trip cancellation protection",
    "Lost baggage compensation",
    "Emergency evacuation",
    "24/7 assistance hotline",
    "Personal accident coverage"
  ];

  return (
    <Box sx={{ bgcolor: '#fafcff', minHeight: '90vh', background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)' }}>
      
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
          background: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop&auto=format")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          mixBlendMode: 'overlay'
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in timeout={800}>
            <Box>
              <Chip label="Travel Insurance" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '0.85rem', mb: 3, px: 2, py: 1, backdropFilter: 'blur(10px)', fontFamily: "'Poppins', sans-serif" }} />
              <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                Travel with Confidence
              </Typography>
              <Typography variant="h5" sx={{ mb: { xs: 4, md: 5 }, opacity: 0.9, maxWidth: '700px', mx: 'auto', fontWeight: 300, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '1.1rem', md: '1.4rem' }, px: 2 }}>
                Comprehensive travel insurance coverage for your peace of mind
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3, md: 4 } }}>
        
        {/* Info Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)', height: '100%' }}>
              <Security sx={{ fontSize: 48, color: '#2c5aa0', mb: 2 }} />
              <Typography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                Comprehensive Coverage
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#666', lineHeight: 1.8, mb: 3 }}>
                We offer comprehensive travel insurance plans that protect you against unforeseen circumstances during your trips. Our policies are designed to give you complete peace of mind while traveling.
              </Typography>
              <List>
                {coverageFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: '#2c5aa0' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature}
                      primaryTypographyProps={{
                        sx: { fontFamily: "'Poppins', sans-serif", fontWeight: 500 }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)', height: '100%', background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)', color: 'white' }}>
              <Verified sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 2 }}>
                Get a Quote Today
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", lineHeight: 1.8, mb: 4, opacity: 0.9 }}>
                Contact our insurance specialists to get a personalized quote tailored to your travel needs. We'll help you find the perfect coverage for your trip.
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Phone sx={{ fontSize: 24 }} />
                  <Box>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', opacity: 0.8 }}>Call us at</Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.3rem', fontWeight: 700 }}>+65 9126 3786</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email sx={{ fontSize: 24 }} />
                  <Box>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', opacity: 0.8 }}>Email us at</Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.1rem', fontWeight: 600 }}>enquiry@azholidays.com.sg</Typography>
                  </Box>
                </Box>
              </Box>

              <Button 
                variant="contained" 
                fullWidth
                href="tel:+6591263786"
                sx={{ 
                  bgcolor: 'white', 
                  color: '#2c5aa0', 
                  py: 1.5, 
                  fontFamily: "'Poppins', sans-serif", 
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                }}
              >
                Call Now for Quote
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Why Choose Us */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
            Why Choose Our Insurance?
          </Typography>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#666', maxWidth: '600px', mx: 'auto', mb: 6 }}>
            We partner with leading insurance providers to offer you the best coverage at competitive rates.
          </Typography>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '800px', margin: '0 auto' }} className="insurance-benefits-grid">
            <style>{`
              @media (max-width: 768px) { .insurance-benefits-grid { grid-template-columns: 1fr !important; max-width: 400px !important; } }
            `}</style>
            {[
              { title: "Instant Coverage", desc: "Get insured immediately upon purchase" },
              { title: "Flexible Plans", desc: "Choose from various coverage options" },
              { title: "24/7 Support", desc: "Round-the-clock assistance worldwide" },
              { title: "Easy Claims", desc: "Quick and hassle-free claim process" }
            ].map((item, index) => (
              <Card key={index} sx={{ p: 3, height: '100%', borderRadius: '16px', boxShadow: '0 8px 24px rgba(44, 90, 160, 0.08)' }}>
                <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1, color: '#2c5aa0' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", color: '#666' }}>
                  {item.desc}
                </Typography>
              </Card>
            ))}
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default Insurance;
