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
  IconButton
} from '@mui/material';
import { Search, LocationOn, Flight, ArrowForward, Favorite, Star } from '@mui/icons-material';

// --- Mock Data ---
const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    description: "Paradise island with pristine beaches, ancient temples, and vibrant culture.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    country: "Indonesia",
    continent: "Asia",
    price: "From $899",
    duration: "5 Days",
    rating: 4.8,
    popular: true
  },
  {
    id: 2,
    name: "Santorini, Greece",
    description: "Iconic white-washed buildings and stunning sunsets over the Aegean Sea.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
    country: "Greece",
    continent: "Europe",
    price: "From $1,299",
    duration: "7 Days",
    rating: 4.9,
    popular: true
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    description: "Modern metropolis blending tradition with cutting-edge technology.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    country: "Japan",
    continent: "Asia",
    price: "From $1,499",
    duration: "6 Days",
    rating: 4.7,
    popular: false
  },
  {
    id: 4,
    name: "Dubai, UAE",
    description: "Luxury shopping, ultramodern architecture, and desert adventures.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    country: "UAE",
    continent: "Asia",
    price: "From $1,099",
    duration: "4 Days",
    rating: 4.6,
    popular: true
  },
  {
    id: 5,
    name: "Paris, France",
    description: "The City of Light, home to art, fashion, and romantic ambiance.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    country: "France",
    continent: "Europe",
    price: "From $1,399",
    duration: "5 Days",
    rating: 4.8,
    popular: false
  },
  {
    id: 6,
    name: "Maldives",
    description: "Tropical paradise with crystal-clear waters and luxurious overwater villas.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
    country: "Maldives",
    continent: "Asia",
    price: "From $1,899",
    duration: "6 Days",
    rating: 4.9,
    popular: true
  },
  {
    id: 7,
    name: "New York, USA",
    description: "The city that never sleeps, filled with iconic landmarks and culture.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    country: "USA",
    continent: "North America",
    price: "From $1,599",
    duration: "5 Days",
    rating: 4.7,
    popular: false
  },
  {
    id: 8,
    name: "Sydney, Australia",
    description: "Harbor city famous for its Opera House, beaches, and vibrant lifestyle.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop",
    country: "Australia",
    continent: "Oceania",
    price: "From $1,799",
    duration: "7 Days",
    rating: 4.8,
    popular: false
  }
];

const continents = ["All", "Asia", "Europe", "North America", "Oceania"];

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [favorites, setFavorites] = useState({});

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dest.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = selectedContinent === 'All' || dest.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  const handleFavorite = (destId) => {
    setFavorites(prev => ({
      ...prev,
      [destId]: !prev[destId]
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
                label="Explore the World" 
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
                Discover Amazing Destinations
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
                From tropical paradises to bustling cities, find your perfect getaway
              </Typography>
            </Box>
          </Fade>

          {/* Search Bar */}
          <Fade in timeout={1000}>
            <Box sx={{ maxWidth: { xs: '100%', sm: '600px' }, mx: 'auto', px: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search destinations..."
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
                    '& fieldset': { 
                      borderColor: 'rgba(255,255,255,0.3)',
                      borderWidth: '2px'
                    },
                    '&:hover fieldset': { 
                      borderColor: 'rgba(255,255,255,0.5)',
                      borderWidth: '2px'
                    },
                    '&.Mui-focused fieldset': { 
                      borderColor: 'white',
                      borderWidth: '2px'
                    },
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
                      <Button 
                        onClick={() => setSearchTerm('')}
                        sx={{ 
                          color: '#2c5aa0',
                          textTransform: 'none',
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 500
                        }}
                      >
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
        
        {/* Continent Filter */}
        <Box sx={{ mb: { xs: 5, md: 7 }, pb: 2 }}>
          <Stack 
            direction="row" 
            spacing={{ xs: 1, sm: 1.5, md: 2 }}
            sx={{ 
              overflowX: 'auto', 
              pb: 8,
              justifyContent: { xs: 'flex-start', sm: 'center' },
              px: { xs: 1, md: 0 },
              '&::-webkit-scrollbar': { 
                height: '6px',
                backgroundColor: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#d0d7ff',
                borderRadius: '3px'
              }
            }}
          >
            {continents.map((continent, index) => (
              <Grow in timeout={500 + index * 100} key={continent}>
                <Chip
                  label={continent}
                  onClick={() => setSelectedContinent(continent)}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    py: { xs: 2.5, md: 3 },
                    px: { xs: 2, md: 3 },
                    bgcolor: selectedContinent === continent ? '#2c5aa0' : 'white',
                    color: selectedContinent === continent ? 'white' : '#555',
                    border: '2px solid',
                    borderColor: selectedContinent === continent ? '#2c5aa0' : '#e0e7ff',
                    fontWeight: selectedContinent === continent ? 700 : 600,
                    boxShadow: selectedContinent === continent ? 
                      '0 10px 30px rgba(44, 90, 160, 0.2)' : 
                      '0 4px 15px rgba(44, 90, 160, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: selectedContinent === continent ? '#1e3d6f' : 'white',
                      borderColor: '#2c5aa0',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 15px 40px rgba(44, 90, 160, 0.25)'
                    }
                  }}
                />
              </Grow>
            ))}
          </Stack>
        </Box>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            marginBottom: '60px'
          }}
          className="destinations-grid"
          >
            <style>{`
              @media (max-width: 1200px) {
                .destinations-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
              @media (max-width: 768px) {
                .destinations-grid {
                  grid-template-columns: 1fr !important;
                  gap: 24px !important;
                  padding: 0 16px;
                }
              }
            `}</style>
            {filteredDestinations.map((dest, index) => (
              <Grow in timeout={800 + index * 100} key={dest.id}>
                <div>
                  <Card sx={{ 
                    height: '100%',
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: '24px',
                    boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)',
                    transition: 'all 0.4s ease',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 24px 60px rgba(44, 90, 160, 0.2)',
                      '& .dest-card-image': {
                        transform: 'scale(1.08)'
                      },
                      '& .explore-button': {
                        color: '#2c5aa0',
                        '& .MuiSvgIcon-root': {
                          transform: 'translateX(6px)'
                        }
                      }
                    }
                  }}>
                    {/* Image */}
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                      <CardMedia
                        component="img"
                        className="dest-card-image"
                        image={dest.image}
                        alt={dest.name}
                        sx={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                          filter: 'grayscale(70%) brightness(0.6)'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop';
                        }}
                      />
                      
                      {/* Coming Soon Overlay */}
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(44, 90, 160, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(2px)'
                      }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography sx={{
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            fontFamily: "'Poppins', sans-serif",
                            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            mb: 0.5
                          }}>
                            Coming Soon
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Popular Badge */}
                      {dest.popular && (
                        <Chip 
                          label="Popular" 
                          size="small"
                          sx={{ 
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            bgcolor: '#ff6b6b',
                            color: 'white',
                            fontWeight: 700,
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.75rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 2
                          }} 
                        />
                      )}
                      
                      {/* Favorite Button */}
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 16, 
                        left: 16,
                        zIndex: 2
                      }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleFavorite(dest.id)}
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.95)',
                            '&:hover': { bgcolor: 'white' }
                          }}
                        >
                          <Favorite sx={{ 
                            fontSize: 18, 
                            color: favorites[dest.id] ? '#ff4757' : '#888'
                          }} />
                        </IconButton>
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      {/* Location & Rating */}
                      <Stack 
                        direction="row" 
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 2 }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOn sx={{ fontSize: 16, color: '#2c5aa0' }} /> 
                          <Typography variant="caption" sx={{ 
                            fontWeight: 600, 
                            fontFamily: "'Poppins', sans-serif",
                            color: '#666'
                          }}>
                            {dest.country}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Star sx={{ fontSize: 16, color: '#ffa726' }} />
                          <Typography variant="caption" sx={{ 
                            fontWeight: 600, 
                            fontFamily: "'Poppins', sans-serif",
                            color: '#666'
                          }}>
                            {dest.rating}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Title */}
                      <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="h2" 
                        sx={{ 
                          fontWeight: 700, 
                          fontFamily: "'Poppins', sans-serif",
                          color: '#1a1a1a',
                          lineHeight: 1.4,
                          fontSize: '1.25rem',
                          mb: 2
                        }}
                      >
                        {dest.name}
                      </Typography>
                      
                      {/* Description */}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          lineHeight: 1.6,
                          fontSize: '0.95rem',
                          color: '#555',
                          mb: 3,
                          flexGrow: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {dest.description}
                      </Typography>

                      {/* Duration & Price */}
                      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Chip 
                          icon={<Flight sx={{ fontSize: 16 }} />}
                          label={dest.duration}
                          size="small"
                          sx={{ 
                            bgcolor: '#f0f7ff',
                            color: '#2c5aa0',
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 600
                          }}
                        />
                        <Typography sx={{
                          color: '#2c5aa0',
                          fontWeight: 700,
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '1.1rem'
                        }}>
                          {dest.price}
                        </Typography>
                      </Stack>
                    </CardContent>

                    {/* Footer */}
                    <Box sx={{ 
                      p: 3, 
                      pt: 0,
                      borderTop: '1px solid #f0f0f0'
                    }}>
                      <Button 
                        className="explore-button"
                        fullWidth
                        endIcon={<ArrowForward />}
                        sx={{ 
                          color: '#666',
                          textTransform: 'none',
                          fontWeight: 600,
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          py: 1.5,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'transparent'
                          },
                          '& .MuiSvgIcon-root': {
                            transition: 'transform 0.3s ease',
                            fontSize: '1.2rem'
                          }
                        }}
                      >
                        Explore Destination
                      </Button>
                    </Box>
                  </Card>
                </div>
              </Grow>
            ))}
          </div>
        ) : (
          // Empty State
          <Fade in timeout={800}>
            <Box sx={{ 
              textAlign: 'center', 
              py: 15,
              background: 'linear-gradient(135deg, #f8faff, #ffffff)',
              borderRadius: '32px',
              border: '2px dashed #d0d7ff',
              mx: { xs: 2, md: 4 }
            }}>
              <Box sx={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%',
                bgcolor: '#f0f7ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 4
              }}>
                <Search sx={{ fontSize: 48, color: '#2c5aa0', opacity: 0.7 }} />
              </Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#2c5aa0', 
                  mb: 2,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700
                }}
              >
                No destinations found
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666', 
                  mb: 4,
                  fontFamily: "'Poppins', sans-serif",
                  maxWidth: '500px',
                  mx: 'auto'
                }}
              >
                We couldn't find any destinations matching your search. Try different keywords or browse all continents.
              </Typography>
              <Button 
                variant="contained"
                onClick={() => { setSearchTerm(''); setSelectedContinent('All'); }}
                startIcon={<Search />}
                sx={{ 
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
                  color: 'white',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  px: 5,
                  py: 1.8,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: '0 10px 30px rgba(44, 90, 160, 0.3)',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 15px 40px rgba(44, 90, 160, 0.4)'
                  }
                }}
              >
                Browse All Destinations
              </Button>
            </Box>
          </Fade>
        )}
        
        {/* Results Count */}
        {filteredDestinations.length > 0 && (
          <Fade in timeout={500}>
            <Box sx={{ 
              textAlign: 'center',
              color: '#666',
              fontFamily: "'Poppins', sans-serif"
            }}>
              <Typography variant="body1" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                Showing <strong>{filteredDestinations.length}</strong> of <strong>{destinations.length}</strong> destinations
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Destinations;
