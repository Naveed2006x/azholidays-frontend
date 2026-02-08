import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Grid
} from '@mui/material';
import { 
  Search, 
  LocationOn, 
  CheckCircle, 
  Schedule,
  Description,
  VerifiedUser,
  Send,
  Email,
  Public
} from '@mui/icons-material';

// --- Visa Countries Data ---
const visaCountries = [
  {
    id: 1,
    country: "India",
    visaType: "e-Visa",
    processingTime: "3-5 working days",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
    continent: "Asia",
    status: "available",
    popular: true,
    path: "/india-visa"
  },
  {
    id: 2,
    country: "Turkey",
    visaType: "e-Visa",
    processingTime: "1-3 working days",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop",
    continent: "Asia",
    status: "coming_soon",
    popular: true
  },
  {
    id: 3,
    country: "UAE",
    visaType: "e-Visa",
    processingTime: "2-4 working days",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    continent: "Asia",
    status: "coming_soon",
    popular: true
  },
  {
    id: 4,
    country: "Australia",
    visaType: "ETA",
    processingTime: "1-2 working days",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop",
    continent: "Oceania",
    status: "coming_soon",
    popular: false
  },
  {
    id: 5,
    country: "Sri Lanka",
    visaType: "ETA",
    processingTime: "2-3 working days",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    continent: "Asia",
    status: "coming_soon",
    popular: false
  },
  {
    id: 6,
    country: "Vietnam",
    visaType: "e-Visa",
    processingTime: "3-5 working days",
    image: "https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&h=600&fit=crop",
    continent: "Asia",
    status: "coming_soon",
    popular: true
  },
  {
    id: 7,
    country: "Kenya",
    visaType: "e-Visa",
    processingTime: "5-7 working days",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=600&fit=crop",
    continent: "Africa",
    status: "coming_soon",
    popular: false
  },
  {
    id: 8,
    country: "Egypt",
    visaType: "e-Visa",
    processingTime: "3-5 working days",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&h=600&fit=crop",
    continent: "Africa",
    status: "coming_soon",
    popular: false
  },
  {
    id: 9,
    country: "Cambodia",
    visaType: "e-Visa",
    processingTime: "2-4 working days",
    image: "https://images.unsplash.com/photo-1545169882-f323535181e5?w=800&h=600&fit=crop",
    continent: "Asia",
    status: "coming_soon",
    popular: false
  },
  {
    id: 10,
    country: "New Zealand",
    visaType: "ETA",
    processingTime: "1-2 working days",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop",
    continent: "Oceania",
    status: "coming_soon",
    popular: false
  }
];

const continents = ["All", "Asia", "Africa", "Oceania"];

// --- Service Steps Data ---
const serviceSteps = [
  {
    icon: <Description sx={{ fontSize: 48 }} />,
    title: "Apply Online",
    description: "Fill out a simple application form with your travel details and personal information. No embassy visits required."
  },
  {
    icon: <VerifiedUser sx={{ fontSize: 48 }} />,
    title: "We Review & Verify",
    description: "Our expert team reviews your documents and ensures everything meets the official requirements before submission."
  },
  {
    icon: <Send sx={{ fontSize: 48 }} />,
    title: "Submit to Government",
    description: "We handle the entire submission process to the relevant government authorities on your behalf."
  },
  {
    icon: <Email sx={{ fontSize: 48 }} />,
    title: "Get Visa by Email",
    description: "Receive your approved e-Visa directly to your email. Print it out and you're ready to travel!"
  }
];

const EVisaServices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');

  const filteredCountries = visaCountries.filter((country) => {
    const matchesSearch = country.country.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          country.visaType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = selectedContinent === 'All' || country.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

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
              <Chip 
                label="Trusted e-Visa Service" 
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
                Fast & Hassle-Free e-Visa Services
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
                We handle your visa applications, document verification, and government submission. Get your e-Visa without the stress.
              </Typography>
            </Box>
          </Fade>

          {/* Search Bar */}
          <Fade in timeout={1000}>
            <Box sx={{ maxWidth: { xs: '100%', sm: '600px' }, mx: 'auto', px: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search countries..."
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
        
        {/* What We Do Section */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <Fade in timeout={600}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontWeight: 800,
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                How It Works
              </div>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto',
                fontSize: '1.25rem'
              }}>
                Simple, secure, and stress-free visa application process
              </div>
            </div>
          </Fade>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: { xs: 3, md: 4 },
            maxWidth: '1400px',
            margin: '0 auto',
            px: { xs: 2, sm: 3, md: 0 }
          }}>
            {serviceSteps.map((step, index) => (
              <Grow in timeout={800 + index * 150} key={index}>
                <Card sx={{
                  height: '100%',
                  borderRadius: '24px',
                  boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)',
                  transition: 'all 0.4s ease',
                  textAlign: 'center',
                  p: { xs: 3, md: 4 },
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 24px 60px rgba(44, 90, 160, 0.2)',
                  }
                }}>
                  <Box sx={{
                    width: { xs: '80px', md: '100px' },
                    height: { xs: '80px', md: '100px' },
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    color: 'white',
                    '& svg': {
                      fontSize: { xs: '40px !important', md: '48px !important' }
                    }
                  }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h6" sx={{
                    fontWeight: 700,
                    fontFamily: "'Poppins', sans-serif",
                    color: '#1a1a1a',
                    mb: 2,
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{
                    fontFamily: "'Poppins', sans-serif",
                    color: '#666',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem', md: '1rem' }
                  }}>
                    {step.description}
                  </Typography>
                </Card>
              </Grow>
            ))}
          </Box>
        </Box>

        {/* Continent Filter */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Fade in timeout={600}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h2" sx={{
                fontWeight: 800,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: '2rem', md: '3rem' },
                color: '#1a1a1a',
                mb: 2
              }}>
                Supported Countries
              </Typography>
              <Typography variant="h6" sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
                color: '#666',
                maxWidth: '600px',
                mx: 'auto'
              }}>
                We process e-Visas for travelers visiting these destinations
              </Typography>
            </Box>
          </Fade>

          <Stack 
            direction="row" 
            spacing={{ xs: 1, sm: 1.5, md: 2 }}
            sx={{ 
              overflowX: 'auto', 
              pb: 5,
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

        {/* Countries Grid */}
        {filteredCountries.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
            marginBottom: '60px'
          }}
          className="countries-grid"
          >
            <style>{`
              @media (max-width: 1200px) {
                .countries-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
              @media (max-width: 768px) {
                .countries-grid {
                  grid-template-columns: 1fr !important;
                  gap: 24px !important;
                  padding: 0 16px;
                }
              }
            `}</style>
            {filteredCountries.map((country, index) => (
              <Grow in timeout={800 + index * 100} key={country.id}>
                <div>
                  <Card sx={{ 
                    height: '100%',
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: '24px',
                    boxShadow: '0 12px 40px rgba(44, 90, 160, 0.08)',
                    transition: 'all 0.4s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    opacity: country.status === 'coming_soon' ? 0.9 : 1,
                    '&:hover': country.status === 'available' ? {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 24px 60px rgba(44, 90, 160, 0.2)',
                      '& .country-card-image': {
                        transform: 'scale(1.08)'
                      }
                    } : {}
                  }}>
                    {/* Image */}
                    <Box sx={{ 
                      position: 'relative', 
                      overflow: 'hidden', 
                      height: '220px'
                    }}>
                      <CardMedia
                        component="img"
                        className="country-card-image"
                        image={country.image}
                        alt={country.country}
                        sx={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s ease',
                          filter: country.status === 'coming_soon' ? 'grayscale(70%) brightness(0.6)' : 'none'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop';
                        }}
                      />
                      
                      {/* Coming Soon Overlay */}
                      {country.status === 'coming_soon' && (
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
                      )}
                      
                      {/* Status Badge */}
                      <Chip 
                        label={country.status === 'available' ? 'Available' : 'Coming Soon'} 
                        size="small"
                        icon={country.status === 'available' ? <CheckCircle sx={{ fontSize: 16 }} /> : undefined}
                        sx={{ 
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: country.status === 'available' ? '#4caf50' : '#ff9800',
                          color: 'white',
                          fontWeight: 700,
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.75rem',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          backdropFilter: 'blur(10px)',
                          zIndex: 2,
                          '& .MuiChip-icon': {
                            color: 'white'
                          }
                        }} 
                      />
                      
                      {/* Popular Badge */}
                      {country.popular && country.status === 'available' && (
                        <Chip 
                          label="Popular" 
                          size="small"
                          sx={{ 
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            bgcolor: '#ff6b6b',
                            color: 'white',
                            fontWeight: 700,
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.75rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            zIndex: 2
                          }} 
                        />
                      )}
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      {/* Country Name */}
                      <Stack 
                        direction="row" 
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 2 }}
                      >
                        <Public sx={{ fontSize: 20, color: '#2c5aa0' }} />
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 700, 
                            fontFamily: "'Poppins', sans-serif",
                            color: '#1a1a1a',
                            lineHeight: 1.2
                          }}
                        >
                          {country.country}
                        </Typography>
                      </Stack>

                      {/* Visa Type */}
                      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Box sx={{ 
                          bgcolor: '#f0f7ff',
                          px: 2,
                          py: 1,
                          borderRadius: '12px',
                          display: 'inline-block'
                        }}>
                          <Typography sx={{
                            color: '#2c5aa0',
                            fontWeight: 700,
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.95rem'
                          }}>
                            {country.visaType}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Processing Time */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        mb: 3,
                        flexGrow: 1
                      }}>
                        <Schedule sx={{ fontSize: 18, color: '#666' }} />
                        <Typography variant="body2" sx={{
                          fontFamily: "'Poppins', sans-serif",
                          color: '#666',
                          fontWeight: 500
                        }}>
                          {country.processingTime}
                        </Typography>
                      </Box>
                    </CardContent>

                    {/* Footer */}
                    <Box sx={{ 
                      p: 3, 
                      pt: 2,
                      borderTop: '1px solid #f0f0f0'
                    }}>
                      <Button 
                        fullWidth
                        variant={country.status === 'available' ? 'contained' : 'outlined'}
                        disabled={country.status === 'coming_soon'}
                        onClick={() => {
                          if (country.status === 'available' && country.path) {
                            navigate(country.path);
                          }
                        }}
                        sx={{ 
                          background: country.status === 'available' ? 
                            'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)' : 
                            'transparent',
                          color: country.status === 'available' ? 'white' : '#999',
                          textTransform: 'none',
                          fontWeight: 600,
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          py: 1.5,
                          borderRadius: '12px',
                          border: country.status === 'coming_soon' ? '2px solid #e0e0e0' : 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': country.status === 'available' ? {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(44, 90, 160, 0.3)'
                          } : {},
                          '&.Mui-disabled': {
                            color: '#999',
                            borderColor: '#e0e0e0'
                          }
                        }}
                      >
                        {country.status === 'available' ? 'Apply for e-Visa' : 'Coming Soon'}
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
                No countries found
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
                We couldn't find any countries matching your search. Try different keywords or browse all regions.
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
                Browse All Countries
              </Button>
            </Box>
          </Fade>
        )}
        
        {/* Results Count */}
        {filteredCountries.length > 0 && (
          <Fade in timeout={500}>
            <Box sx={{ 
              textAlign: 'center',
              color: '#666',
              fontFamily: "'Poppins', sans-serif",
              mb: 4
            }}>
              <Typography variant="body1" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                Showing <strong>{filteredCountries.length}</strong> of <strong>{visaCountries.length}</strong> countries
              </Typography>
            </Box>
          </Fade>
        )}

        {/* Trust Section */}
        <Fade in timeout={600}>
          <Box sx={{ 
            textAlign: 'center',
            py: { xs: 6, md: 10 },
            px: 3,
            background: 'linear-gradient(135deg, #f0f7ff, #ffffff)',
            borderRadius: '32px',
            maxWidth: '900px',
            mx: 'auto',
            mt: { xs: 6, md: 10 }
          }}>
            <VerifiedUser sx={{ fontSize: 64, color: '#2c5aa0', mb: 3 }} />
            <Typography variant="h3" sx={{
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              color: '#1a1a1a',
              mb: 3,
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}>
              Why Choose Our e-Visa Service?
            </Typography>
            <Typography variant="h6" sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 300,
              color: '#666',
              lineHeight: 1.8,
              maxWidth: '700px',
              mx: 'auto',
              mb: 4
            }}>
              We understand that applying for a visa can be overwhelming, especially if it's your first time. 
              Our expert team handles all the complex paperwork, ensuring your application is complete, 
              accurate, and submitted on time. Focus on planning your trip while we take care of your visa.
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{
                  fontWeight: 800,
                  fontFamily: "'Poppins', sans-serif",
                  color: '#2c5aa0'
                }}>
                  98%
                </Typography>
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: '#666',
                  fontWeight: 500
                }}>
                  Success Rate
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{
                  fontWeight: 800,
                  fontFamily: "'Poppins', sans-serif",
                  color: '#2c5aa0'
                }}>
                  5K+
                </Typography>
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: '#666',
                  fontWeight: 500
                }}>
                  Visas Processed
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{
                  fontWeight: 800,
                  fontFamily: "'Poppins', sans-serif",
                  color: '#2c5aa0'
                }}>
                  24/7
                </Typography>
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: '#666',
                  fontWeight: 500
                }}>
                  Support
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default EVisaServices;
