import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import GroupsIcon from '@mui/icons-material/Groups';
import FlightIcon from '@mui/icons-material/Flight';
import DescriptionIcon from '@mui/icons-material/Description';
import HotelIcon from '@mui/icons-material/Hotel';
import SecurityIcon from '@mui/icons-material/Security';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #4b5ba2 100%)',
  padding: '80px 0 80px',
  color: 'white',
  textAlign: 'center'
}));

const ValueCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
  }
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
  }
}));

const About = () => {
  const values = [
    {
      icon: <ExploreIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Adventure',
      description: 'We believe in creating unforgettable experiences that push boundaries and inspire exploration.'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Passion',
      description: 'Our love for travel drives us to curate the most authentic and enriching journeys for our clients.'
    },
    {
      icon: <StarIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Excellence',
      description: 'We are committed to delivering exceptional service and creating memories that last a lifetime.'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Community',
      description: 'We foster connections between travelers and local communities for meaningful cultural exchanges.'
    }
  ];

  const services = [
    {
      icon: <FlightIcon sx={{ fontSize: 50, color: '#2c5aa0' }} />,
      title: 'Air Ticket Bookings'
    },
    {
      icon: <DescriptionIcon sx={{ fontSize: 50, color: '#2c5aa0' }} />,
      title: 'Visa Services'
    },
    {
      icon: <HotelIcon sx={{ fontSize: 50, color: '#2c5aa0' }} />,
      title: 'Worldwide Hotel Reservations'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 50, color: '#2c5aa0' }} />,
      title: 'Travel Insurance'
    },
    {
      icon: <ConfirmationNumberIcon sx={{ fontSize: 50, color: '#2c5aa0' }} />,
      title: 'Attraction Tickets'
    },
    {
      icon: <DirectionsBoatIcon sx={{ fontSize: 50, color: '#2c5aa0' }} />,
      title: 'Cruise Packages'
    },
    {
      icon: <DirectionsBusIcon sx={{ fontSize: 50, color: '#2c5aa0' }} />,
      title: 'Airport & Coach Transport'
    },
    {
      icon: <FamilyRestroomIcon sx={{ fontSize: 50, color: '#2c5aa0' }} />,
      title: 'Family Holidays'
    },
    {
      icon: <FavoriteBorderIcon sx={{ fontSize: 50, color: '#2c5aa0' }} />,
      title: 'Honeymoon Packages'
    },
    {
      icon: <BusinessCenterIcon sx={{ fontSize: 50, color: '#2c5aa0' }} />,
      title: 'Corporate Travel Solutions'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            About Az Holidays
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              maxWidth: '800px',
              margin: '0 auto',
              opacity: 0.95
            }}
          >
            Crafting extraordinary travel experiences across the globe
          </Typography>
        </Container>
      </HeroSection>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            mb: 3,
            textAlign: 'center',
            color: '#2d3748'
          }}
        >
          Our Story
        </Typography>
        <Grid container spacing={4} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#4a5568',
                mb: 2
              }}
            >
              AZ Holidays Tours & Travel is a trusted travel agency in Singapore with over 19 years 
              of experience in providing complete travel solutions. What started as a commitment to 
              exceptional service has grown into a comprehensive travel partner for thousands of 
              satisfied customers across Singapore.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#4a5568'
              }}
            >
              We specialize in air ticket bookings, visa services, worldwide hotel reservations, and 
              travel insurance for both leisure and business travelers. Our experienced team also offers 
              attraction tickets, cruise packages, and airport or coach transport services at competitive 
              prices, ensuring a smooth and reliable travel experience from start to finish.
            </Typography>
          </Grid>
        </Grid>

        {/* Services Grid */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
              color: '#323c4d'
            }}
          >
            Our Services
          </Typography>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
            '@media (max-width: 1200px)': {
              gridTemplateColumns: 'repeat(3, 1fr)'
            },
            '@media (max-width: 768px)': {
              gridTemplateColumns: 'repeat(2, 1fr)'
            }
          }}>
            {services.map((service, index) => (
              <div key={index}>
                <ServiceCard elevation={0} sx={{ border: '1px solid #e0e0e0', height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {service.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        color: '#2d3748',
                        fontSize: '0.9rem'
                      }}
                    >
                      {service.title}
                    </Typography>
                  </CardContent>
                </ServiceCard>
              </div>
            ))}
          </div>
        </Box>
      </Container>


      {/* Stats Section */}
      <Box sx={{ bgcolor: '#2c5aa0', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1 }}>
                19+
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", opacity: 0.9 }}>
                Years of Experience
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1 }}>
                10,000+
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", opacity: 0.9 }}>
                Happy Travelers
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1 }}>
                100%
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: "'Poppins', sans-serif", opacity: 0.9 }}>
                Trusted Service
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Values Section */}
      <Box sx={{ bgcolor: '#f7fafc', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
              color: '#2d3748'
            }}
          >
            Our Values
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              textAlign: 'center',
              mb: 6,
              color: '#4a5568',
              fontSize: '1.1rem'
            }}
          >
            The principles that guide everything we do
          </Typography>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {values.map((value, index) => (
              <div key={index}>
                <ValueCard>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ mb: 2 }}>{value.icon}</Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        mb: 2,
                        color: '#2d3748'
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        color: '#4a5568',
                        lineHeight: 1.7
                      }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </ValueCard>
              </div>
            ))}
          </div>
        </Container>
      </Box>


      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              mb: 3,
              color: '#2d3748'
            }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.2rem',
              lineHeight: 1.8,
              color: '#4a5568',
              mb: 4
            }}
          >
            To provide complete, reliable, and competitive travel solutions for both leisure and 
            business travelers. Whether you're planning a family holiday, romantic honeymoon, or 
            corporate trip, AZ Holidays is committed to making your journey smooth, affordable, and 
            memorable. With over 19 years of expertise, we ensure every aspect of your travel is 
            handled with care and professionalism.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: '#4a5568'
            }}
          >
            Visit us at <strong>113 Dunlop Street, Singapore</strong> or contact us at{' '}
            <strong>+65 9126 3786</strong> to start planning your next adventure.
          </Typography>
        </Box>
      </Container>

    </Box>
  );
};

export default About;
