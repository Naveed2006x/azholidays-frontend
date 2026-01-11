import React from 'react';
import { Box, Container, Typography, Card, Chip, Fade, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Button } from '@mui/material';
import { DirectionsBus, Phone, Email, CheckCircle, AirportShuttle, LocalTaxi } from '@mui/icons-material';

const Transport = () => {
  const services = [
    "Airport pickup & drop-off",
    "Hotel transfers",
    "City tours with coach",
    "Private car services",
    "Group transportation",
    "Long-distance travel"
  ];

  return (
    <Box sx={{ bgcolor: '#fafcff', minHeight: '90vh', background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)' }}>
      <Box sx={{ position: 'relative', background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)', color: 'white', pt: { xs: 10, md: 8 }, pb: { xs: 10, md: 8 }, borderRadius: { xs: '0 0 40px 40px', md: '0 0 60px 60px' }, mb: { xs: 4, md: 8 }, overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&h=900&fit=crop&auto=format")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, mixBlendMode: 'overlay' } }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in timeout={800}>
            <Box>
              <Chip label="Airport & Coach Transport" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '0.85rem', mb: 3, px: 2, py: 1, backdropFilter: 'blur(10px)', fontFamily: "'Poppins', sans-serif" }} />
              <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                Reliable Transport Services
              </Typography>
              <Typography variant="h5" sx={{ mb: { xs: 4, md: 5 }, opacity: 0.9, maxWidth: '700px', mx: 'auto', fontWeight: 300, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '1.1rem', md: '1.4rem' }, px: 2 }}>
                Comfortable and convenient transportation for all your travel needs
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)', height: '100%' }}>
              <DirectionsBus sx={{ fontSize: 48, color: '#2c5aa0', mb: 2 }} />
              <Typography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                Our Transport Services
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: '#666', lineHeight: 1.8, mb: 3 }}>
                We provide reliable airport transfers and coach transport services throughout Singapore and beyond. Whether you need a private car or group transportation, we've got you covered.
              </Typography>
              <List>
                {services.map((service, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon><CheckCircle sx={{ color: '#2c5aa0' }} /></ListItemIcon>
                    <ListItemText primary={service} primaryTypographyProps={{ sx: { fontFamily: "'Poppins', sans-serif", fontWeight: 500 } }} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

   <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: '24px', boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)', height: '100%', background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)', color: 'white', display: 'flex', flexDirection: 'column', width: '100%' }}>
              <AirportShuttle sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 2 }}>
                Book Your Transport
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", lineHeight: 1.8, mb: 4, opacity: 0.9 }}>
                Contact us to arrange your airport transfer or coach service. Our team will ensure a smooth and comfortable journey.
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
                Call to Book Now
              </Button>
            </Paper>
          </Grid>
          
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 6, color: '#1a1a1a' }}>
            Why Choose Us?
          </Typography>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '800px', margin: '0 auto' }} className="transport-benefits-grid">
            <style>{`
              @media (max-width: 768px) { .transport-benefits-grid { grid-template-columns: 1fr !important; max-width: 400px !important; } }
            `}</style>
            {[
              { title: "Professional Drivers", desc: "Experienced and courteous drivers" },
              { title: "Clean Vehicles", desc: "Well-maintained and comfortable fleet" },
              { title: "On-Time Service", desc: "Punctual pickups and drop-offs" },
              { title: "Competitive Rates", desc: "Affordable pricing for all services" }
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

export default Transport;
