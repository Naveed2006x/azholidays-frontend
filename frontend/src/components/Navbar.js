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
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        padding: '0 24px'
      }}
    >
      {/* Header with Close Button */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Box
          component={Link}
          to="/"
          // onClick={handleDrawerToggle}
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
          // onClick={handleDrawerToggle}
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
        padding: '0'
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
                // onClick={handleDrawerToggle}
                sx={{
                  width: '100%',
                  textDecoration: 'none',
                  display: 'block',
                  padding: '16px 20px',
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
                  margin: '8px 20px',
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
        padding: '24px 16px',
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
            // onClick={handleDrawerToggle}
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
            // onClick={handleDrawerToggle}
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
        }}
      >
        <Toolbar sx={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: { xs: '0 16px', md: '0 24px' }
        }}>
          {/* Logo - Left Side */}
          <Box 
            sx={{ 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'flex-start'
            }}
            component={Link}
            to="/"
          >
            <img 
              src={Logo} 
              alt="AZ Holidays" 
              style={{ 
                height: '80px', 
                width: 'auto',
                objectFit: 'contain'
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
              justifyContent: 'flex-end',
              flex: 1
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              // onClick={handleDrawerToggle}
              sx={{
                color: '#333',
                padding: '8px'
              }}
            >
              <MenuIcon sx={{ fontSize: '28px' }} />
            </IconButton>
          </Box>
        </Toolbar>
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
            borderRight: '1px solid #f0f0f0'
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Add spacing for fixed navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;