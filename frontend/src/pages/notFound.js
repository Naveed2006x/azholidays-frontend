import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  const fontStyle = {
    fontFamily: "'Poppins', sans-serif"
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px 20px'
        }}
      >

        {/* 404 Text */}
        <Typography
          variant="h1"
          sx={{
            ...fontStyle,
            fontSize: { xs: '72px', md: '120px' },
            fontWeight: 700,
            color: '#0e4da1',
            marginBottom: '10px',
            lineHeight: 1
          }}
        >
          404
        </Typography>

        {/* Error Message */}
        <Typography
          variant="h4"
          sx={{
            ...fontStyle,
            fontSize: { xs: '24px', md: '32px' },
            fontWeight: 600,
            color: '#333',
            marginBottom: '15px'
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            ...fontStyle,
            fontSize: { xs: '16px', md: '18px' },
            color: '#666',
            marginBottom: '40px',
            maxWidth: '600px',
            lineHeight: 1.6
          }}
        >
          Oops! The page you're looking for seems to have gone on vacation. 
          Let us help you find your way back to planning your next adventure!
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            startIcon={<HomeIcon />}
            sx={{
              ...fontStyle,
              backgroundColor: '#0e4da1',
              padding: '12px 30px',
              fontSize: '16px',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#0a3a7a'
              }
            }}
          >
            Back to Home
          </Button>

          <Button
            component={Link}
            to="/destinations"
            variant="outlined"
            sx={{
              ...fontStyle,
              borderColor: '#0e4da1',
              color: '#0e4da1',
              padding: '12px 30px',
              fontSize: '16px',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                borderColor: '#0a3a7a',
                backgroundColor: 'rgba(14, 77, 161, 0.05)'
              }
            }}
          >
            Explore Destinations
          </Button>
        </Box>
      </Box>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default NotFound;
