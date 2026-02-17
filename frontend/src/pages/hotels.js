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
  Fade,
  Grow,
  Alert,
  Rating
} from '@mui/material';
import { Search, Hotel, LocationOn, Star, Wifi, LocalParking, OpenInNew } from '@mui/icons-material';

const mockHotels = [
  {
    id: 1,
    name: "Marina Bay Sands",
    location: "Marina Bay, Singapore",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
    price: "From $450/night",
    rating: 4.8,
    amenities: ["WiFi", "Pool", "Spa"]
  },
  {
    id: 2,
    name: "Raffles Hotel",
    location: "Beach Road, Singapore",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    price: "From $600/night",
    rating: 4.9,
    amenities: ["WiFi", "Restaurant", "Bar"]
  },
  {
    id: 3,
    name: "Shangri-La Singapore",
    location: "Orchard Road, Singapore",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    price: "From $380/night",
    rating: 4.7,
    amenities: ["WiFi", "Garden", "Gym"]
  },
  {
    id: 4,
    name: "The Fullerton Hotel",
    location: "Downtown, Singapore",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    price: "From $420/night",
    rating: 4.8,
    amenities: ["WiFi", "Pool", "Spa"]
  },
  {
    id: 5,
    name: "Capella Singapore",
    location: "Sentosa Island",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
    price: "From $550/night",
    rating: 4.9,
    amenities: ["WiFi", "Beach", "Pool"]
  },
  {
    id: 6,
    name: "Mandarin Oriental",
    location: "Marina Square",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    price: "From $400/night",
    rating: 4.7,
    amenities: ["WiFi", "Spa", "Restaurant"]
  }
];

const Hotels = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHotels = mockHotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          background: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=900&fit=crop&auto=format")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          mixBlendMode: 'overlay'
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in timeout={800}>
            <Box>
              <Chip label="Hotel Reservations" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '0.85rem', mb: 3, px: 2, py: 1, backdropFilter: 'blur(10px)', fontFamily: "'Poppins', sans-serif" }} />
              <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                Book Your Dream Stay
              </Typography>
              <Typography variant="h5" sx={{ mb: { xs: 4, md: 5 }, opacity: 0.9, maxWidth: '700px', mx: 'auto', fontWeight: 300, fontFamily: "'Poppins', sans-serif", fontSize: { xs: '1.1rem', md: '1.4rem' }, px: 2 }}>
                Find and book hotels worldwide with the best rates
              </Typography>
            </Box>
          </Fade>

          <Fade in timeout={1000}>
            <Box sx={{ maxWidth: { xs: '100%', sm: '600px' }, mx: 'auto', px: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by hotel name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.95)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  '& .MuiOutlinedInput-root': { borderRadius: '20px', fontFamily: "'Poppins', sans-serif", fontSize: '1.1rem', height: '60px', '& fieldset': { borderColor: 'rgba(255,255,255,0.3)', borderWidth: '2px' }, '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)', borderWidth: '2px' }, '&.Mui-focused fieldset': { borderColor: 'white', borderWidth: '2px' } }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ ml: 1 }}>
                      <Search sx={{ color: '#2c5aa0', fontSize: 28 }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end" sx={{ mr: 1 }}>
                      <Button onClick={() => setSearchTerm('')} sx={{ color: '#2c5aa0', textTransform: 'none', fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>Clear</Button>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3, md: 4 } }}>
        
        {/* Hotel Search Widget */}
        <Fade in timeout={600}>
          <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ 
              width: '100%', 
              maxWidth: '920px', 
              borderRadius: '24px', 
              boxShadow: '0 12px 40px rgba(44, 90, 160, 0.12)',
              overflow: 'hidden',
              border: '1px solid rgba(44, 90, 160, 0.1)'
            }}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
                color: 'white',
                p: 2.5,
                textAlign: 'center'
              }}>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif", 
                  fontWeight: 700, 
                  fontSize: '1.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1
                }}>
                  <Hotel /> Search & Book Hotels
                </Typography>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif", 
                  fontSize: '0.9rem', 
                  opacity: 0.9,
                  mt: 0.5
                }}>
                  Powered by Trip.com - Find the best deals on hotels worldwide
                </Typography>
              </Box>
              <Box sx={{ 
                p: 2,
                display: 'flex', 
                justifyContent: 'center',
                bgcolor: '#fafcff',
                minHeight: '220px',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}>
                <iframe border="0" src="https://www.trip.com/partners/ad/S12449558?Allianceid=7838195&SID=295303450&trip_sub1=" frameborder="0" scrolling="no" id="S12449558"></iframe>
                {/* <Button
                  variant="outlined"
                  startIcon={<OpenInNew />}
                  href="https://www.trip.com/partners/ad/S12449558?Allianceid=7838195&SID=295303450&trip_sub1="
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    color: '#2c5aa0',
                    borderColor: '#2c5aa0',
                    '&:hover': {
                      borderColor: '#1e3d6f',
                      bgcolor: 'rgba(44, 90, 160, 0.05)'
                    }
                  }}
                >
                  Open Hotel Search in New Window
                </Button> */}
              </Box>
            </Card>
          </Box>
        </Fade>

        {/* Info Alert */}
        <Fade in timeout={800}>
          <Alert severity="info" icon={<Hotel />} sx={{ mb: 4, borderRadius: '16px', border: '2px solid #2c5aa0', bgcolor: '#e0f2fe', '& .MuiAlert-icon': { color: '#2c5aa0' }, '& .MuiAlert-message': { fontFamily: "'Poppins', sans-serif", fontSize: '1rem', fontWeight: 500, color: '#1e293b' } }}>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.1rem', mb: 0.5, color: '#2c5aa0' }}>
              Book with Confidence! 🏨
            </Typography>
            Search and book hotels worldwide through our trusted partner Trip.com. Get the best deals and exclusive offers!
          </Alert>
        </Fade>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', maxWidth: '1200px', margin: '0 auto', marginBottom: '60px' }} className="hotels-grid">
          <style>{`
            @media (max-width: 1200px) { .hotels-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 768px) { .hotels-grid { grid-template-columns: 1fr !important; gap: 24px !important; padding: 0 16px; } }
          `}</style>
          {filteredHotels.map((hotel, index) => (
            <Grow in timeout={800 + index * 100} key={hotel.id}>
              <div>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '24px', boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)', transition: 'all 0.4s ease', overflow: 'hidden', '&:hover': { transform: 'translateY(-12px)', boxShadow: '0 24px 60px rgba(44, 90, 160, 0.2)' } }}>
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                    <CardMedia component="img" image={hotel.image} alt={hotel.name} sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.05)' } }} />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: '#1a1a1a', mb: 1, fontSize: '1.3rem' }}>{hotel.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                      <LocationOn sx={{ fontSize: 16, color: '#2c5aa0' }} />
                      <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", color: '#666' }}>{hotel.location}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                      <Rating value={hotel.rating} readOnly precision={0.1} size="small" sx={{ color: '#ffa726' }} />
                      <Typography variant="caption" sx={{ fontFamily: "'Poppins', sans-serif", color: '#666', fontWeight: 600 }}>{hotel.rating}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      {hotel.amenities.map((amenity, i) => (
                        <Chip key={i} label={amenity} size="small" sx={{ bgcolor: '#f0f7ff', color: '#2c5aa0', fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem' }} />
                      ))}
                    </Box>

                    <Typography sx={{ color: '#2c5aa0', fontWeight: 700, fontFamily: "'Poppins', sans-serif", fontSize: '1.3rem' }}>{hotel.price}</Typography>
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
                      Search Hotels
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

export default Hotels;
