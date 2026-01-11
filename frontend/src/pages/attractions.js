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
  IconButton,
  Alert
} from '@mui/material';
import { Search, AccessTime, LocationOn, ArrowForward, Favorite, Star, ConfirmationNumber } from '@mui/icons-material';

// Mock Data - Singapore Attractions
const mockAttractions = [
  {
    id: 1,
    name: "Singapore Cable Car",
    description: "Enjoy breathtaking aerial views of Singapore's cityscape and harbor.",
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop",
    location: "Mount Faber",
    category: "Sightseeing",
    price: "From $21",
    duration: "30 min",
    rating: 4.5,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Universal Studios Singapore",
    description: "Experience thrilling rides and entertainment at Southeast Asia's first Universal Studios.",
    image: "https://images.unsplash.com/photo-1509537257950-20f9d14db2dd?w=800&h=600&fit=crop",
    location: "Sentosa",
    category: "Theme Park",
    price: "From $78",
    duration: "Full Day",
    rating: 4.8,
    isRecommended: true
  },
  {
    id: 3,
    name: "Night Safari",
    description: "World's first nocturnal wildlife park with over 2,500 animals.",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop",
    location: "Mandai",
    category: "Wildlife",
    price: "From $49",
    duration: "3-4 hours",
    rating: 4.7,
    isBestSeller: true
  },
  {
    id: 4,
    name: "Gardens by the Bay",
    description: "Iconic garden featuring the stunning Supertree Grove and Cloud Forest.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    location: "Marina Bay",
    category: "Nature",
    price: "From $35",
    duration: "2-3 hours",
    rating: 4.9,
    isRecommended: true
  },
  {
    id: 5,
    name: "Singapore Flyer",
    description: "Giant observation wheel offering panoramic views of the city.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    location: "Marina Centre",
    category: "Sightseeing",
    price: "From $33",
    duration: "30 min",
    rating: 4.6
  },
  {
    id: 6,
    name: "S.E.A. Aquarium",
    description: "One of the world's largest aquariums with over 100,000 marine animals.",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&h=600&fit=crop",
    location: "Sentosa",
    category: "Aquarium",
    price: "From $40",
    duration: "2-3 hours",
    rating: 4.7
  }
];

const categories = ["All", "Sightseeing", "Theme Park", "Wildlife", "Nature", "Aquarium"];

const Attractions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState({});

  const filteredAttractions = mockAttractions.filter((attr) => {
    const matchesSearch = attr.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          attr.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || attr.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFavorite = (attrId) => {
    setFavorites(prev => ({
      ...prev,
      [attrId]: !prev[attrId]
    }));
  };

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
          background: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=900&fit=crop&auto=format")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          mixBlendMode: 'overlay'
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in timeout={800}>
            <Box>
              <Chip 
                label="Singapore Attractions" 
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
                Explore Amazing Attractions
              </Typography>
              <Typography variant="h5" sx={{ 
                mb: { xs: 4, md: 5 }, 
                opacity: 0.9, 
                maxWidth: '700px', 
                mx: 'auto',
                fontWeight: 300,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                px: 2
              }}>
                Discover the best experiences Singapore has to offer
              </Typography>
            </Box>
          </Fade>

          {/* Search Bar */}
          <Fade in timeout={1000}>
            <Box sx={{ maxWidth: { xs: '100%', sm: '600px' }, mx: 'auto', px: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search attractions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.95)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.1rem',
                    height: '60px',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.3)', borderWidth: '2px' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)', borderWidth: '2px' },
                    '&.Mui-focused fieldset': { borderColor: 'white', borderWidth: '2px' },
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ ml: 1 }}>
                      <Search sx={{ color: '#2c5aa0', fontSize: 28 }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end" sx={{ mr: 1 }}>
                      <Button onClick={() => setSearchTerm('')} sx={{ color: '#2c5aa0', textTransform: 'none', fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
                        Clear
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3, md: 4 } }}>
        
        {/* Coming Soon Alert */}
        <Fade in timeout={600}>
          <Alert 
            severity="info" 
            icon={<ConfirmationNumber />}
            sx={{ 
              mb: 4,
              borderRadius: '16px',
              border: '2px solid #2c5aa0',
              bgcolor: '#e0f2fe',
              '& .MuiAlert-icon': { color: '#2c5aa0' },
              '& .MuiAlert-message': { 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                fontWeight: 500,
                color: '#1e293b'
              }
            }}
          >
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1.1rem', mb: 0.5, color: '#2c5aa0' }}>
              Attraction Ticket Booking Coming Soon! 🎟️
            </Typography>
            We're working hard to bring you the best deals on Singapore attractions. Soon you'll be able to book your favorite experiences directly through our platform. Stay tuned!
          </Alert>
        </Fade>

        {/* Category Filter */}
        <Box sx={{ mb: { xs: 5, md: 7 }, pb: 2 }}>
          <Stack direction="row" spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ overflowX: 'auto', pb: 8, justifyContent: { xs: 'flex-start', sm: 'center' }, px: { xs: 1, md: 0 }, '&::-webkit-scrollbar': { height: '6px', backgroundColor: 'transparent' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#d0d7ff', borderRadius: '3px' } }}>
            {categories.map((cat, index) => (
              <Grow in timeout={500 + index * 100} key={cat}>
                <Chip label={cat} onClick={() => setSelectedCategory(cat)} sx={{ fontFamily: "'Poppins', sans-serif", fontSize: { xs: '0.9rem', md: '1rem' }, py: { xs: 2.5, md: 3 }, px: { xs: 2, md: 3 }, bgcolor: selectedCategory === cat ? '#2c5aa0' : 'white', color: selectedCategory === cat ? 'white' : '#555', border: '2px solid', borderColor: selectedCategory === cat ? '#2c5aa0' : '#e0e7ff', fontWeight: selectedCategory === cat ? 700 : 600, boxShadow: selectedCategory === cat ? '0 10px 30px rgba(44, 90, 160, 0.2)' : '0 4px 15px rgba(44, 90, 160, 0.1)', cursor: 'pointer', transition: 'all 0.3s ease', '&:hover': { bgcolor: selectedCategory === cat ? '#1e3d6f' : 'white', borderColor: '#2c5aa0', transform: 'translateY(-4px)', boxShadow: '0 15px 40px rgba(44, 90, 160, 0.25)' } }} />
              </Grow>
            ))}
          </Stack>
        </Box>

        {/* Attractions Grid */}
        {filteredAttractions.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '60px' }} className="attractions-grid">
            <style>{`
              @media (max-width: 1200px) { .attractions-grid { grid-template-columns: repeat(2, 1fr) !important; } }
              @media (max-width: 768px) { .attractions-grid { grid-template-columns: 1fr !important; gap: 24px !important; padding: 0 16px; } }
            `}</style>
            {filteredAttractions.map((attr, index) => (
              <Grow in timeout={800 + index * 100} key={attr.id}>
                <div>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '24px', boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)', transition: 'all 0.4s ease', overflow: 'hidden', '&:hover': { transform: 'translateY(-12px)', boxShadow: '0 24px 60px rgba(44, 90, 160, 0.2)', '& .attr-card-image': { transform: 'scale(1.08)' }, '& .book-button': { color: '#2c5aa0', '& .MuiSvgIcon-root': { transform: 'translateX(6px)' } } } }}>
                    {/* Image */}
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                      <CardMedia component="img" className="attr-card-image" image={attr.image} alt={attr.name} sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', filter: 'grayscale(70%) brightness(0.6)' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop'; }} />
                      
                      {/* Coming Soon Overlay */}
                      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(44, 90, 160, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography sx={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Poppins', sans-serif", textShadow: '0 2px 8px rgba(0,0,0,0.3)', mb: 0.5 }}>Coming Soon</Typography>
                          <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>Booking Available Soon</Typography>
                        </Box>
                      </Box>
                      
                      {/* Badges */}
                      {(attr.isBestSeller || attr.isRecommended) && (
                        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                          {attr.isBestSeller && <Chip label="Best Seller" size="small" sx={{ bgcolor: '#ff6b6b', color: 'white', fontWeight: 700, fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)', mb: 0.5 }} />}
                          {attr.isRecommended && <Chip label="Recommended" size="small" sx={{ bgcolor: '#2c5aa0', color: 'white', fontWeight: 700, fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)' }} />}
                        </Box>
                      )}
                      
                      {/* Favorite Button */}
                      <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                        <IconButton size="small" onClick={() => handleFavorite(attr.id)} sx={{ bgcolor: 'rgba(255,255,255,0.95)', '&:hover': { bgcolor: 'white' } }}>
                          <Favorite sx={{ fontSize: 18, color: favorites[attr.id] ? '#ff4757' : '#888' }} />
                        </IconButton>
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      {/* Location & Rating */}
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOn sx={{ fontSize: 16, color: '#2c5aa0' }} /> 
                          <Typography variant="caption" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif", color: '#666' }}>{attr.location}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Star sx={{ fontSize: 16, color: '#ffa726' }} />
                          <Typography variant="caption" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif", color: '#666' }}>{attr.rating}</Typography>
                        </Box>
                      </Stack>

                      {/* Title */}
                      <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: '#1a1a1a', lineHeight: 1.4, fontSize: '1.25rem', mb: 2 }}>{attr.name}</Typography>
                      
                      {/* Description */}
                      <Typography variant="body2" sx={{ fontFamily: "'Poppins', sans-serif", lineHeight: 1.6, fontSize: '0.95rem', color: '#555', mb: 3, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{attr.description}</Typography>

                      {/* Duration & Price */}
                      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Chip icon={<AccessTime sx={{ fontSize: 16 }} />} label={attr.duration} size="small" sx={{ bgcolor: '#f0f7ff', color: '#2c5aa0', fontFamily: "'Poppins', sans-serif", fontWeight: 600 }} />
                        <Typography sx={{ color: '#2c5aa0', fontWeight: 700, fontFamily: "'Poppins', sans-serif", fontSize: '1.1rem' }}>{attr.price}</Typography>
                      </Stack>
                    </CardContent>

                    {/* Footer */}
                    <Box sx={{ p: 3, pt: 2, borderTop: '1px solid #f0f0f0' }}>
                      <Button className="book-button" fullWidth endIcon={<ArrowForward />} disabled sx={{ color: '#999', bgcolor: '#f5f5f5', textTransform: 'none', fontWeight: 600, fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', py: 1.5, transition: 'all 0.3s ease', cursor: 'not-allowed', '& .MuiSvgIcon-root': { transition: 'transform 0.3s ease', fontSize: '1.2rem' } }}>Book Now (Coming Soon)</Button>
                    </Box>
                  </Card>
                </div>
              </Grow>
            ))}
          </div>
        ) : (
          <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center', py: 15, background: 'linear-gradient(135deg, #f8faff, #ffffff)', borderRadius: '32px', border: '2px dashed #d0d7ff', mx: { xs: 2, md: 4 } }}>
              <Box sx={{ width: '120px', height: '120px', borderRadius: '50%', bgcolor: '#f0f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 4 }}>
                <Search sx={{ fontSize: 48, color: '#2c5aa0', opacity: 0.7 }} />
              </Box>
              <Typography variant="h4" sx={{ color: '#2c5aa0', mb: 2, fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>No attractions found</Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: 4, fontFamily: "'Poppins', sans-serif", maxWidth: '500px', mx: 'auto' }}>We couldn't find any attractions matching your search. Try different keywords or browse all categories.</Typography>
              <Button variant="contained" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} startIcon={<Search />} sx={{ background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)', color: 'white', fontFamily: "'Poppins', sans-serif", fontWeight: 600, px: 5, py: 1.8, borderRadius: '50px', textTransform: 'none', fontSize: '1rem', boxShadow: '0 10px 30px rgba(44, 90, 160, 0.3)', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 15px 40px rgba(44, 90, 160, 0.4)' } }}>Browse All Attractions</Button>
            </Box>
          </Fade>
        )}
        
        {/* Results Count */}
        {filteredAttractions.length > 0 && (
          <Fade in timeout={500}>
            <Box sx={{ textAlign: 'center', color: '#666', fontFamily: "'Poppins', sans-serif" }}>
              <Typography variant="body1" sx={{ fontFamily: "'Poppins', sans-serif" }}>Showing <strong>{filteredAttractions.length}</strong> of <strong>{mockAttractions.length}</strong> attractions</Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );    
};

export default Attractions;