import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Button,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Images/logo.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--'
  });
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const launchDate = new Date(2026, 2, 1, 0, 0, 0).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = launchDate - now;

      if (timeLeft < 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days < 10 ? '0' + days : days.toString(),
        hours: hours < 10 ? '0' + hours : hours.toString(),
        minutes: minutes < 10 ? '0' + minutes : minutes.toString(),
        seconds: seconds < 10 ? '0' + seconds : seconds.toString()
      });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Attractions', path: '/attractions' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  // Font configuration
  const fontStyle = {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: 500
  };

  const drawer = (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        overflowX: 'hidden'
      }}
    >
      {/* Header with Close Button */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 20px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Box
          component={Link}
          to="/"
          onClick={handleDrawerToggle}
          sx={{ cursor: 'pointer' }}
        >
          <img
            src={Logo}
            alt="AZ Holidays"
            style={{
              height: '35px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: '#333',
            padding: '8px'
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <List sx={{
        marginTop: '1rem',
        padding: '0 20px',
        overflowY: 'auto',
        flex: 1
      }}>
        {navItems.map((item, index) => (
          <Box key={item.path}>
            <ListItem
              disablePadding
              sx={{
                marginBottom: '0',
              }}
            >
              <Box
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  width: '100%',
                  textDecoration: 'none',
                  display: 'block',
                  padding: '16px 16px',
                  backgroundColor: location.pathname === item.path ? 'rgba(44, 90, 160, 0.1)' : 'transparent',
                  border: location.pathname === item.path ? '2px solid #2c5aa0' : '2px solid transparent',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#2c5aa0',
                    backgroundColor: 'rgba(44, 90, 160, 0.08)',
                    border: '2px solid rgba(44, 90, 160, 0.2)',
                    textDecoration: 'none'
                  }
                }}
              >
                <Typography
                  sx={{
                    ...fontStyle,
                    color: location.pathname === item.path ? '#2c5aa0' : '#333',
                    fontSize: '1.1rem',
                    fontWeight: location.pathname === item.path ? 600 : 500,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'none'
                    }
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </ListItem>

            {/* Add grey line between items (except after last item) */}
            {index < navItems.length - 1 && (
              <Divider
                sx={{
                  margin: '8px 0',
                  backgroundColor: '#f0f0f0'
                }}
              />
            )}
          </Box>
        ))}
      </List>

      {/* Auth Section */}
      <Box sx={{ 
        marginTop: 'auto', 
        padding: '24px 20px',
        borderTop: '1px solid #f0f0f0'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          marginBottom: '16px'
        }}>
          <Button
            variant="outlined"
            component={Link}
            to="/login"
            onClick={handleDrawerToggle}
            sx={{
              ...fontStyle,
              color: '#2c5aa0',
              borderColor: '#2c5aa0',
              padding: '12px 24px',
              '&:hover': {
                backgroundColor: 'rgba(44, 90, 160, 0.1)',
                borderColor: '#2c5aa0'
              }
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/signup"
            onClick={handleDrawerToggle}
            sx={{
              ...fontStyle,
              backgroundColor: '#2c5aa0',
              padding: '12px 24px',
              '&:hover': {
                backgroundColor: '#1e3d6f'
              }
            }}
          >
            Sign Up
          </Button>
        </Box>
        
        {/* Contact Info */}
        <Typography
          sx={{
            ...fontStyle,
            fontSize: '0.9rem',
            color: '#666',
            textAlign: 'center',
            marginBottom: '8px',
            textDecoration: 'none'
          }}
        >
          Need help? Call us at
        </Typography>
        <Typography
          sx={{
            ...fontStyle,
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#2c5aa0',
            textAlign: 'center',
            textDecoration: 'none'
          }}
        >
          +65 9126 3786
        </Typography>
      </Box>
    </Box>
  );

return (
  <>
    <AppBar 
      position="fixed" 
      sx={{
        background: 'rgba(255, 255, 255, 1)',
        backdropFilter: 'blur(0.5px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        left: 0,
        right: 0,
        width: '100vw', // Use viewport width
        margin: 0,
      }}
    >
      <Toolbar sx={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: { xs: '0 16px', md: '0 24px' }, // Add some padding back
        minHeight: { xs: '64px', md: '80px' },
        boxSizing: 'border-box',
        overflow: 'visible' // Ensure content isn't clipped
      }}>
        {/* Logo - Left Side with proper spacing */}
        <Box 
          sx={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            flex: { xs: 1, md: 1 },
            justifyContent: 'flex-start',
            minWidth: 'fit-content'
          }}
          component={Link}
          to="/"
        >
          <img 
            src={Logo} 
            alt="AZ Holidays" 
            style={{ 
              height: '60px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </Box>

          {/* Centered Desktop Navigation */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: '2rem',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 2,
              margin: '0 40px'
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  ...fontStyle,
                  color: location.pathname === item.path ? '#2c5aa0' : '#333',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  textDecoration: 'none',
                  padding: '8px 0',
                  '&:hover': {
                    color: '#2c5aa0',
                    textDecoration: 'none'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: location.pathname === item.path ? '100%' : '0',
                    height: '3px',
                    bottom: '0',
                    left: '50%',
                    backgroundColor: '#2c5aa0',
                    transition: 'all 0.3s ease',
                    transform: 'translateX(-50%)',
                    borderRadius: '2px'
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* Right Side - Auth Buttons */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flex: 1
            }}
          >
            <Button
              variant="outlined"
              component={Link}
              to="/login"
              sx={{
                ...fontStyle,
                color: '#2c5aa0',
                borderColor: '#2c5aa0',
                '&:hover': {
                  backgroundColor: 'rgba(44, 90, 160, 0.1)',
                  borderColor: '#2c5aa0'
                }
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/signup"
              sx={{
                ...fontStyle,
                backgroundColor: '#2c5aa0',
                '&:hover': {
                  backgroundColor: '#1e3d6f'
                }
              }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Mobile Menu Button - Right Side */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                color: '#333',
                padding: '8px'
              }}
            >
              <MenuIcon sx={{ fontSize: '28px' }} />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Countdown Announcement Bar */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2c5aa0, #1e3d6f)',
            color: 'white',
            padding: { xs: '10px 16px', md: '12px 24px' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: '12px', md: '20px' },
            flexWrap: 'wrap',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '0.8rem', md: '0.95rem' },
              fontWeight: 600,
              margin: 0,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Launching Soon!
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: '10px', md: '15px' }, alignItems: 'center' }}>
            {/*
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Min' },
              { value: timeLeft.seconds, label: 'Sec' }
            */}
            {Object.entries(timeLeft).map(([key, value], index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: { xs: '40px', md: '50px' }
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontWeight: 700,
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: { xs: '5px 10px', md: '6px 12px' },
                    borderRadius: '6px',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.6rem', md: '0.7rem' },
                    marginTop: '3px',
                    opacity: 0.9,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1, 10)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            borderRight: '1px solid #f0f0f0',
            overflowX: 'hidden'
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Add spacing for fixed navbar + announcement bar */}
      <Toolbar sx={{ minHeight: { xs: '114px', md: '140px' } }} />
    </>
  );
};

export default Navbar;