import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  TextField, 
  InputAdornment, 
  Chip, 
  Stack,
  Fade,
  Grow,
  Alert,
  Grid
} from '@mui/material';
import { Search, Flight, LocationOn, CalendarToday, Person, FlightTakeoff } from '@mui/icons-material';

const mockFlights = [
  {
    id: 1,
    route: "Singapore → Tokyo",
    airline: "Singapore Airlines",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
    duration: "7h 15m",
    price: "From $450",
    class: "Economy",
    stops: "Direct"
  },
  {
    id: 2,
    route: "Singapore → Bali",
    airline: "AirAsia",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop",
    duration: "2h 30m",
    price: "From $180",
    class: "Economy",
    stops: "Direct"
  },
  {
    id: 3,
    route: "Singapore → London",
    airline: "British Airways",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    duration: "13h 45m",
    price: "From $980",
    class: "Business",
    stops: "Direct"
  },
  {
    id: 4,
    route: "Singapore → Bangkok",
    airline: "Thai Airways",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop",
    duration: "2h 15m",
    price: "From $150",
    class: "Economy",
    stops: "Direct"
  },
  {
    id: 5,
    route: "Singapore → Sydney",
    airline: "Qantas",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop",
    duration: "8h 30m",
    price: "From $520",
    class: "Economy",
    stops: "Direct"
  },
  {
    id: 6,
    route: "Singapore → Dubai",
    airline: "Emirates",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    duration: "7h 45m",
    price: "From $650",
    class: "Business",
    stops: "Direct"
  }
];

const Flights = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFlights = mockFlights.filter((flight) =>
    flight.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '90vh'}}>
      
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
        color: 'white', 
        pt: { xs: 10, md: 8 }, 
        pb: { xs: 12, md: 14 },
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
          background: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&fit=crop&auto=format")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          mixBlendMode: 'overlay'
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in timeout={800}>
            <Box>
              <Chip label="Flight Bookings" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '0.85rem', mb: 3, px: 2, py: 1, backdropFilter: 'blur(10px)', fontFamily: "'Poppins', sans-serif" }} />
              <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                Find Your Perfect Flight
              </Typography>
              <Typography variant="h5" sx={{ mb: { xs: 4, md: 5 }, opacity: 0.9, maxWidth: '700px', mx: 'auto', fontWeight: 300, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '1.1rem', md: '1.4rem' }, px: 2 }}>
                Search and book flights to destinations worldwide
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Flight Search Widget - Between Hero and Content */}
      <Container maxWidth="lg" sx={{ mt: { xs: -15, md: -18 }, mb: { xs: 4, md: 6 }, position: 'relative', zIndex: 10, px: { xs: 2, sm: 3 } }}>
        <Fade in timeout={600}>
          <Card sx={{ 
            borderRadius: '20px', 
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12), 0 8px 48px rgba(44, 90, 160, 0.16)',
            overflow: 'hidden',
            bgcolor: 'white'
          }}>
            <Box sx={{ 
              p: { xs: 2, sm: 3 },
              display: 'flex', 
              justifyContent: 'center',
              bgcolor: 'white',
              minHeight: { xs: '340px', sm: '220px' }
            }}>
              {/* Desktop Flight Search */}
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <iframe 
                  border="0" 
                  src="https://www.trip.com/partners/ad/S12446562?Allianceid=7838195&SID=295303450&trip_sub1=" 
                  style={{width:'900px',height:'200px',border:'none',maxWidth:'100%'}} 
                  frameBorder="0" 
                  scrolling="no" 
                  id="S12446562"
                  title="Flight Search Desktop"
                ></iframe>
              </Box>
              
              {/* Mobile Flight Search */}
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <iframe 
                  border="0" 
                  src="https://www.trip.com/partners/ad/S12457314?Allianceid=7838195&SID=295303450&trip_sub1=" 
                  style={{width:'320px',height:'320px',border:'none',maxWidth:'100%'}} 
                  frameBorder="0" 
                  scrolling="no" 
                  id="S12457314"
                  title="Flight Search Mobile"
                ></iframe>
              </Box>
            </Box>
          </Card>
        </Fade>
      </Container>

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3, md: 4 } }}>
              
        {/* Info Alerts */}
        <Fade in timeout={800}>
          <Alert severity="info" icon={<FlightTakeoff />} sx={{ mb: 3, borderRadius: '16px', border: '2px solid #2c5aa0', bgcolor: '#e0f2fe', '& .MuiAlert-icon': { color: '#2c5aa0' }, '& .MuiAlert-message': { fontFamily: "'Poppins', sans-serif", fontSize: '1rem', fontWeight: 500, color: '#1e293b' } }}>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.1rem', mb: 0.5, color: '#2c5aa0' }}>
              Book with Confidence! ✈️
            </Typography>
            Search and book flights to destinations worldwide through our trusted partner Trip.com. Get the best deals and exclusive offers!
          </Alert>
        </Fade>

        <Fade in timeout={900}>
          <Alert severity="warning" sx={{ mb: 4, borderRadius: '16px', bgcolor: '#fff3e0', '& .MuiAlert-message': { fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', fontWeight: 500, color: '#1e293b' } }}>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>
              🛡️ Can't see the search box above?
            </Typography>
            Please disable your ad blocker for this site. Some ad blockers prevent the flight search widget from loading properly.
          </Alert>
        </Fade>

        {/* Flights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', maxWidth: '1200px', margin: '0 auto', marginBottom: '60px' }} className="flights-grid">
          <style>{`
            @media (max-width: 1200px) { .flights-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 768px) { .flights-grid { grid-template-columns: 1fr !important; gap: 24px !important; padding: 0 16px; } }
          `}</style>
          {filteredFlights.map((flight, index) => (
            <Grow in timeout={800 + index * 100} key={flight.id}>
              <div>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '24px', boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)', transition: 'all 0.4s ease', overflow: 'hidden', '&:hover': { transform: 'translateY(-12px)', boxShadow: '0 24px 60px rgba(44, 90, 160, 0.2)' } }}>
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: '180px' }}>
                    <CardMedia component="img" image={flight.image} alt={flight.route} sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.05)' } }} />
                    
                    <Chip label={flight.stops} size="small" sx={{ position: 'absolute', top: 16, right: 16, bgcolor: '#2c5aa0', color: 'white', fontWeight: 700, fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }} />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: '#1a1a1a', mb: 1, fontSize: '1.4rem' }}>{flight.route}</Typography>
                    <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", color: '#666', mb: 2 }}>{flight.airline}</Typography>
                    
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarToday sx={{ fontSize: 16, color: '#2c5aa0' }} />
                          <Typography variant="caption" sx={{ fontFamily: "'Poppins', sans-serif", color: '#666' }}>{flight.duration}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Person sx={{ fontSize: 16, color: '#2c5aa0' }} />
                          <Typography variant="caption" sx={{ fontFamily: "'Poppins', sans-serif", color: '#666' }}>{flight.class}</Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Typography sx={{ color: '#2c5aa0', fontWeight: 700, fontFamily: "'Poppins', sans-serif", fontSize: '1.3rem', mb: 2 }}>{flight.price}</Typography>
                  </CardContent>

                  <Box sx={{ p: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
                    <Button 
                      fullWidth 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      sx={{ 
                        color: 'white', 
                        bgcolor: '#2c5aa0', 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        fontFamily: "'Poppins', sans-serif", 
                        fontSize: '0.95rem', 
                        py: 1.5,
                        '&:hover': {
                          bgcolor: '#1e3d6f',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(44, 90, 160, 0.3)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Search Flights
                    </Button>
                  </Box>
                </Card>
              </div>
            </Grow>
          ))}
        </div>
      </Container>
    </Box>
  );
};

export default Flights;
