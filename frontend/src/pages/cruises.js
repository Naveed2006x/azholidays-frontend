import React from 'react';
import { Box, Container, Typography, Card, Chip, Fade, Grid, Paper, Button } from '@mui/material';
import { DirectionsBoat, Phone, Email, Sailing, Anchor } from '@mui/icons-material';

const Cruises = () => {
  const popularRoutes = [
    { route: "Singapore - Thailand - Vietnam", duration: "5-7 Days", line: "Royal Caribbean" },
    { route: "Southeast Asia Explorer", duration: "10-14 Days", line: "Princess Cruises" },
    { route: "Singapore - Malaysia - Indonesia", duration: "4-6 Days", line: "Dream Cruises" },
    { route: "Asian Coastal Cruise", duration: "7-10 Days", line: "Celebrity Cruises" }
  ];

  return (
    <Box sx={{ bgcolor: '#fafcff', minHeight: '90vh', background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)' }}>
      <Box sx={{ position: 'relative', background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)', color: 'white', pt: { xs: 10, md: 8 }, pb: { xs: 10, md: 8 }, borderRadius: { xs: '0 0 40px 40px', md: '0 0 60px 60px' }, mb: { xs: 4, md: 8 }, overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url("https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1600&h=900&fit=crop&auto=format")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, mixBlendMode: 'overlay' } }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in timeout={800}>
            <Box>
              <Chip label="Cruise Packages" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '0.85rem', mb: 3, px: 2, py: 1, backdropFilter: 'blur(10px)', fontFamily: "'Poppins', sans-serif" }} />
              <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                Sail the Seas in Style
              </Typography>
              <Typography variant="h5" sx={{ mb: { xs: 4, md: 5 }, opacity: 0.9, maxWidth: '700px', mx: 'auto', fontWeight: 300, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '1.1rem', md: '1.4rem' }, px: 2 }}>
                Luxury cruise packages to exotic destinations
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)', height: '100%' }}>
              <DirectionsBoat sx={{ fontSize: 48, color: '#2c5aa0', mb: 2 }} />
              <Typography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                Popular Cruise Routes
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#666', lineHeight: 1.8, mb: 3 }}>
                Explore Asia's beautiful coastlines and islands with our carefully curated cruise packages. From short getaways to extended voyages, we offer a variety of options.
              </Typography>
              {popularRoutes.map((cruise, index) => (
                <Card key={index} sx={{ p: 2, mb: 2, borderRadius: '12px', boxShadow: '0 4px 12px rgba(44, 90, 160, 0.08)' }}>
                  <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: '#2c5aa0', mb: 0.5 }}>
                    {cruise.route}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", color: '#666', mb: 0.5 }}>
                    {cruise.duration} • {cruise.line}
                  </Typography>
                </Card>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)', height: '100%', background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)', color: 'white', display: 'flex', flexDirection: 'column' }}>
              <Sailing sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 2 }}>
                Book Your Cruise
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", lineHeight: 1.8, mb: 4, opacity: 0.9 }}>
                Contact our cruise specialists to find the perfect voyage for you. We work with all major cruise lines to offer you the best deals and itineraries.
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

              <Button variant="contained" fullWidth href="tel:+6591263786" sx={{ bgcolor: 'white', color: '#2c5aa0', py: 1.5, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1rem', mt: 'auto', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>
                Inquire Now
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 6, color: '#1a1a1a' }}>
            Why Book with Us?
          </Typography>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '800px', margin: '0 auto' }} className="cruise-benefits-grid">
            <style>{`
              @media (max-width: 768px) { .cruise-benefits-grid { grid-template-columns: 1fr !important; max-width: 400px !important; } }
            `}</style>
            {[
              { title: "Best Prices", desc: "Exclusive deals with major cruise lines" },
              { title: "Expert Advice", desc: "Personalized cruise recommendations" },
              { title: "Easy Booking", desc: "Hassle-free reservation process" },
              { title: "Full Support", desc: "Assistance before, during, and after" }
            ].map((item, index) => (
              <Card key={index} sx={{ p: 3, height: '100%', borderRadius: '16px', boxShadow: '0 8px 24px rgba(44, 90, 160, 0.08)' }}>
                <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1, color: '#2c5aa0' }}>{item.title}</Typography>
                <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", color: '#666' }}>{item.desc}</Typography>
              </Card>
            ))}
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default Cruises;
