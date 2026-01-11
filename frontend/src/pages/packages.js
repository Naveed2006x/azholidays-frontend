import React from 'react';
import { Box, Container, Typography, Card, Chip, Fade, Grid, Paper, Button } from '@mui/material';
import { CardGiftcard, Phone, Email, Explore, TravelExplore } from '@mui/icons-material';

const Packages = () => {
  const packageTypes = [
    { title: "Family Holidays", desc: "Fun-filled vacations for the whole family", popular: true },
    { title: "Adventure Tours", desc: "Thrilling experiences for adventurers", popular: true  },
    { title: "Cultural Expeditions", desc: "Immersive cultural experiences" },
    { title: "Beach Escapes", desc: "Relaxing tropical destinations" },
    { title: "City Breaks", desc: "Short urban exploration trips" },
    { title: "Group Tours", desc: "Guided tours with like-minded travelers" },
    { title: "Honeymoon Packages", desc: "Romantic getaways for newlyweds"},
    { title: "Custom Packages", desc: "Tailored to your preferences" }
  ];

  return (
    <Box sx={{ bgcolor: '#fafcff', minHeight: '90vh', background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)' }}>
      <Box sx={{ position: 'relative', background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)', color: 'white', pt: { xs: 10, md: 8 }, pb: { xs: 10, md: 8 }, borderRadius: { xs: '0 0 40px 40px', md: '0 0 60px 60px' }, mb: { xs: 4, md: 8 }, overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=900&fit=crop&auto=format")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, mixBlendMode: 'overlay' } }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in timeout={800}>
            <Box>
              <Chip label="Travel Packages" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '0.85rem', mb: 3, px: 2, py: 1, backdropFilter: 'blur(10px)', fontFamily: "'Poppins', sans-serif" }} />
              <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                All-Inclusive Travel Packages
              </Typography>
              <Typography variant="h5" sx={{ mb: { xs: 4, md: 5 }, opacity: 0.9, maxWidth: '700px', mx: 'auto', fontWeight: 300, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '1.1rem', md: '1.4rem' }, px: 2 }}>
                Curated vacation packages for every type of traveler
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3, md: 4 } }}>
        
        {/* Package Types Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }} justifyContent="center">
          {packageTypes.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Card sx={{ p: 3, height: '100%', borderRadius: '16px', boxShadow: '0 8px 24px rgba(44, 90, 160, 0.08)', border: pkg.popular ? '2px solid #2c5aa0' : 'none', position: 'relative', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 32px rgba(44, 90, 160, 0.15)', transition: 'all 0.3s ease' } }}>
                {pkg.popular && <Chip label="Popular" size="small" sx={{ position: 'absolute', top: 12, right: 12, bgcolor: '#2c5aa0', color: 'white', fontFamily: "'Poppins', sans-serif", fontWeight: 600 }} />}
                <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1, color: '#2c5aa0', mt: pkg.popular ? 2 : 0 }}>
                  {pkg.title}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", color: '#666' }}>
                  {pkg.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Contact Section */}
        <Paper sx={{ p: 5, borderRadius: '24px', boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)', background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)', color: 'white', textAlign: 'center' }}>
          <TravelExplore sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 2 }}>
            Let's Plan Your Dream Vacation
          </Typography>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif", lineHeight: 1.8, mb: 4, opacity: 0.9, maxWidth: '700px', mx: 'auto', fontSize: '1.1rem' }}>
            Our travel experts will work with you to create the perfect itinerary tailored to your preferences, budget, and schedule. Contact us today to start planning!
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Grid container spacing={3} sx={{ maxWidth: '600px' }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 32 }} />
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', opacity: 0.8, textAlign: 'center' }}>Call us</Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.3rem', fontWeight: 700, textAlign: 'center' }}>+65 9126 3786</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 32 }} />
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.9rem', opacity: 0.8, textAlign: 'center' }}>Email us</Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.1rem', fontWeight: 600, textAlign: 'center', wordBreak: 'break-word' }}>enquiry@azholidays.com.sg</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" href="tel:+6591263786" sx={{ bgcolor: 'white', color: '#2c5aa0', py: 1.5, px: 4, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1rem', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>
              Call Now
            </Button>
            <Button variant="outlined" href="mailto:enquiry@azholidays.com.sg" sx={{ borderColor: 'white', color: 'white', py: 1.5, px: 4, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1rem', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
              Send Email
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Packages;
