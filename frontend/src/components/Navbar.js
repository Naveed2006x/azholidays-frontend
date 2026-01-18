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
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Menu,
  MenuItem,
  Collapse,
  Avatar,
  Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AttractionsIcon from '@mui/icons-material/Attractions';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import SecurityIcon from '@mui/icons-material/Security';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import {
  Person as PersonIcon,
  BookmarkBorder as BookingsIcon,
  CardGiftcard as RewardsIcon,
  LocalOfferOutlined as PromoCodesIcon,
  RateReviewOutlined as ReviewsIcon,
  ShareOutlined as ReferralIcon,
  SettingsOutlined as SettingsIcon
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isProduction } from '../contexts/ToastContext';
import Logo from '../Images/logo.png';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [profileImageKey, setProfileImageKey] = useState(Date.now()); // Force re-render of avatar
  const [profileImageSrc, setProfileImageSrc] = useState(null); // Store computed image source
  const [timeLeft, setTimeLeft] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--'
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  // Listen for storage changes to update profile image
  useEffect(() => {
    const refreshProfileImage = () => {
      const newSrc = getProfileImageSrc();
      setProfileImageSrc(newSrc);
      setProfileImageKey(Date.now());
    };
    
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        refreshProfileImage();
      }
    };
    
    const handleProfileImageUpdate = () => {
      refreshProfileImage();
    };
    
    const handleUserUpdate = (e) => {
      refreshProfileImage();
    };
    
    // Initial load and when user changes
    refreshProfileImage();
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileImageUpdated', handleProfileImageUpdate);
    window.addEventListener('userUpdated', handleUserUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileImageUpdated', handleProfileImageUpdate);
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, [user]); // Add user dependency

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleServicesClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleServicesClose = () => {
    setAnchorEl(null);
  };

  const handleServiceNavigation = (path) => {
    navigate(path);
    handleServicesClose();
  };

  const handleMobileServicesToggle = () => {
    setServicesOpen(!servicesOpen);
  };

  const handleMobileProfileToggle = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    handleDrawerToggle();
  };

  const getProfileImageSrc = () => {
    // Read directly from localStorage to get latest profile image
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Check both possible field names
        const imageUrl = userData?.profileImage || userData?.profile_image_url;
        if (imageUrl) {
          // Add cache-busting timestamp to force browser to reload image
          const timestamp = userData?._imageRefresh || Date.now();
          return `${imageUrl}?t=${timestamp}`;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    return null;
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
    { label: 'Services', path: null, hasDropdown: true },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const services = [
    { label: 'Attractions', path: '/attractions', icon: AttractionsIcon },
    { label: 'Flights', path: '/flights', icon: FlightIcon },
    { label: 'Hotels', path: '/hotels', icon: HotelIcon },
    { label: 'Travel Insurance', path: '/insurance', icon: SecurityIcon },
    { label: 'Airport & Coach Transport', path: '/transport', icon: DirectionsBusIcon },
    { label: 'Cruise Packages', path: '/cruises', icon: DirectionsBoatIcon },
    { label: 'Travel Packages', path: '/packages', icon: CardGiftcardIcon }
  ];

  const profileMenuItems = [
    { label: 'Profile', path: '/profile', icon: <PersonIcon /> },
    { label: 'Bookings', path: '/bookings', icon: <BookingsIcon /> },
    { label: 'AZ Rewards', path: '/rewards', icon: <RewardsIcon /> },
    { label: 'Promo Codes', path: '/promo-codes', icon: <PromoCodesIcon /> },
    { label: 'Reviews', path: '/reviews', icon: <ReviewsIcon /> },
    { label: 'Referral', path: '/referral', icon: <ReferralIcon /> },
    { label: 'Settings', path: '/settings', icon: <SettingsIcon /> }
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
          <Box key={item.label}>
            {item.hasDropdown ? (
              <>
                <ListItem
                  disablePadding
                  sx={{ marginBottom: '0' }}
                >
                  <Box
                    onClick={handleMobileServicesToggle}
                    sx={{
                      width: '100%',
                      textDecoration: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 16px',
                      backgroundColor: 'transparent',
                      border: '2px solid transparent',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#2c5aa0',
                        backgroundColor: 'rgba(44, 90, 160, 0.08)',
                        border: '2px solid rgba(44, 90, 160, 0.2)'
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        ...fontStyle,
                        color: '#333',
                        fontSize: '1.1rem',
                        fontWeight: 500
                      }}
                    >
                      {item.label}
                    </Typography>
                    {servicesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </Box>
                </ListItem>
                <Collapse in={servicesOpen} timeout="auto" unmountOnExit>
                  <List sx={{ pl: 2 }}>
                    {services.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <ListItem
                          key={service.path}
                          disablePadding
                          sx={{ mb: 1 }}
                        >
                          <Box
                            component={Link}
                            to={service.path}
                            onClick={handleDrawerToggle}
                            sx={{
                              width: '100%',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              padding: '12px 16px',
                              backgroundColor: location.pathname === service.path ? 'rgba(44, 90, 160, 0.1)' : 'transparent',
                              borderRadius: '8px',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: 'rgba(44, 90, 160, 0.08)'
                              }
                            }}
                          >
                            <IconComponent sx={{ 
                              fontSize: 20, 
                              color: location.pathname === service.path ? '#2c5aa0' : '#666'
                            }} />
                            <Typography
                              sx={{
                                ...fontStyle,
                                color: location.pathname === service.path ? '#2c5aa0' : '#555',
                                fontSize: '0.95rem',
                                fontWeight: location.pathname === service.path ? 600 : 500
                              }}
                            >
                              {service.label}
                            </Typography>
                          </Box>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem
                disablePadding
                sx={{ marginBottom: '0' }}
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
            )}

            {index < navItems.length - 1 && (
              <Divider sx={{ margin: '8px 0', backgroundColor: '#f0f0f0' }} />
            )}
          </Box>
        ))}
      </List>

      {/* Auth Section or User Profile Section */}
      {!isAuthenticated ? (
        // Auth Buttons when user is NOT logged in
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
      ) : (
        // User Profile Section when user IS logged in
        <Box sx={{ 
          marginTop: 'auto',
          padding: '16px 0',
          borderTop: '1px solid #f0f0f0'
        }}>
          {/* User Profile Header - Clickable to expand/collapse */}
          <Box 
            onClick={handleMobileProfileToggle}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              padding: '16px 20px',
              cursor: 'pointer',
              borderRadius: '12px',
              margin: '0 16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(44, 90, 160, 0.08)'
              }
            }}
          >
            <Avatar 
              key={profileImageKey}
              src={profileImageSrc}
              sx={{ 
                bgcolor: '#f0f0f0', 
                width: 50, 
                height: 50,
                color: '#666'
              }}
            >
              <PersonIcon sx={{ fontSize: '1.5rem' }} />
            </Avatar>
            <Typography
              sx={{
                ...fontStyle,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#333',
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {user?.firstName || 'User'}
            </Typography>
            {profileMenuOpen ? (
              <ExpandMoreIcon sx={{ color: '#2c5aa0', fontSize: '1.8rem', flexShrink: 0 }} />
            ) : (
              <ExpandLessIcon sx={{ color: '#2c5aa0', fontSize: '1.8rem', flexShrink: 0 }} />
            )}
          </Box>

          {/* Profile Menu Items - Collapsible */}
          <Collapse in={profileMenuOpen} timeout="auto" unmountOnExit>
            <List sx={{ padding: '0 20px', marginTop: '8px', marginBottom: '16px' }}>
              {profileMenuItems.map((item, index) => (
                <Box key={item.label}>
                  <ListItem 
                    disablePadding
                    sx={{ marginBottom: '0' }}
                  >
                    <Box
                      component={isProduction() ? 'div' : Link}
                      to={!isProduction() ? item.path : undefined}
                      onClick={isProduction() ? undefined : handleDrawerToggle}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '14px 20px',
                        textDecoration: 'none',
                        color: location.pathname === item.path ? '#2c5aa0' : '#333',
                        backgroundColor: location.pathname === item.path ? 'rgba(44, 90, 160, 0.1)' : 'transparent',
                        border: location.pathname === item.path ? '2px solid #2c5aa0' : '2px solid transparent',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        cursor: isProduction() ? 'not-allowed' : 'pointer',
                        opacity: isProduction() ? 0.7 : 1,
                        '&:hover': {
                          backgroundColor: 'rgba(44, 90, 160, 0.08)',
                          color: '#2c5aa0',
                          border: '2px solid rgba(44, 90, 160, 0.2)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <ListItemIcon sx={{ 
                          minWidth: '40px', 
                          color: 'inherit',
                          '& .MuiSvgIcon-root': {
                            fontSize: '1.3rem'
                          }
                        }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          sx={{
                            '& .MuiTypography-root': {
                              ...fontStyle,
                              color: 'inherit',
                              fontSize: '1rem',
                              fontWeight: location.pathname === item.path ? 600 : 500,
                            }
                          }}
                        />
                      </Box>
                      {isProduction() && (
                        <Chip 
                          label="Coming Soon" 
                          size="small"
                          sx={{ 
                            ...fontStyle,
                            fontSize: '0.65rem',
                            height: '20px',
                            backgroundColor: '#373277',
                            color: '#fff',
                            fontWeight: 600
                          }}
                        />
                      )}
                    </Box>
                  </ListItem>

                  {index < profileMenuItems.length - 1 && (
                    <Divider sx={{ margin: '8px 0', backgroundColor: '#f0f0f0' }} />
                  )}
                </Box>
              ))}
            </List>

            {/* Logout Button - Inside Collapse */}
            <Box sx={{ padding: '0 16px', marginBottom: '16px' }}>
              <Button
                variant="text"
                onClick={handleLogout}
                sx={{
                  ...fontStyle,
                  color: '#d9534f',
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '12px 24px',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'rgba(217, 83, 79, 0.1)',
                    border: '2px solid rgba(217, 83, 79, 0.2)'
                  }
                }}
              >
                Log out
              </Button>
            </Box>
          </Collapse>

          {/* Contact Info */}
          <Box sx={{ padding: '16px', marginTop: profileMenuOpen ? '0' : '16px', borderTop: '1px solid #f0f0f0' }}>
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
      )}
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
        width: '100vw',
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
        padding: { xs: '0 16px', md: '0 24px' },
        minHeight: { xs: '64px', md: '80px' },
        boxSizing: 'border-box',
        overflow: 'visible'
      }}>
        {/* Logo */}
        <Box 
          sx={{ 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            flex: { xs: 'auto', md: 1 },
            justifyContent: 'flex-start',
            minWidth: 'fit-content',
            mr: { xs: 1, md: 0 }
          }}
          component={Link}
          to="/"
        >
          <img 
            src={Logo} 
            alt="AZ Holidays" 
            style={{ 
              height: window.innerWidth < 768 ? '45px' : '60px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </Box>

          {/* Desktop Navigation */}
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
              item.hasDropdown ? (
                <Box
                  key={item.label}
                  onMouseEnter={handleServicesClick}
                  onMouseLeave={handleServicesClose}
                  sx={{ position: 'relative' }}
                >
                  <Typography
                    sx={{
                      ...fontStyle,
                      color: '#333',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'color 0.3s ease',
                      position: 'relative',
                      textDecoration: 'none',
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      '&:hover': {
                        color: '#2c5aa0',
                        textDecoration: 'none'
                      }
                    }}
                  >
                    {item.label}
                    <ExpandMoreIcon sx={{ fontSize: '1.2rem' }} />
                  </Typography>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleServicesClose}
                    MenuListProps={{
                      onMouseLeave: handleServicesClose,
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                        minWidth: '260px',
                        border: '1px solid #f0f0f0'
                      }
                    }}
                  >
                    {services.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <MenuItem
                          key={service.path}
                          onClick={() => handleServiceNavigation(service.path)}
                          sx={{
                            ...fontStyle,
                            py: 1.5,
                            px: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            '&:hover': {
                              backgroundColor: 'rgba(44, 90, 160, 0.08)',
                              color: '#2c5aa0',
                              '& .MuiSvgIcon-root': {
                                color: '#2c5aa0'
                              }
                            }
                          }}
                        >
                          <IconComponent sx={{ fontSize: 22, color: '#666' }} />
                          <Typography sx={{ ...fontStyle, fontSize: '0.95rem' }}>
                            {service.label}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </Box>
              ) : (
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
              )
            ))}
          </Box>

          {/* Right Side - Auth Buttons or User Profile */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flex: 1
            }}
          >
            {!isAuthenticated ? (
              // Show Login/Signup when user is NOT logged in
              <>
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
              </>
            ) : (
              // Show Profile Avatar when user IS logged in
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton onClick={handleProfileMenuOpen} sx={{ padding: 0 }}>
                  <Avatar 
                    key={profileImageKey}
                    src={profileImageSrc}
                    sx={{ 
                      bgcolor: '#f0f0f0', 
                      width: 55, 
                      height: 55,
                      color: '#666',
                      border: '2px solid #e0e0e0'
                    }}
                  >
                    <PersonIcon sx={{ fontSize: '2rem' }} />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={profileAnchorEl}
                  open={Boolean(profileAnchorEl)}
                  onClose={handleProfileMenuClose}
                  sx={{
                    '& .MuiPaper-root': {
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      marginTop: '8px',
                      minWidth: '220px'
                    }
                  }}
                >
                  {profileMenuItems.map((item) => (
                    <MenuItem 
                      key={item.label}
                      onClick={() => {
                        if (!isProduction()) {
                          handleProfileMenuClose();
                          navigate(item.path);
                        }
                      }}
                      disabled={isProduction()}
                      sx={{ 
                        ...fontStyle,
                        padding: '10px 16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        opacity: isProduction() ? 0.7 : 1,
                        cursor: isProduction() ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemIcon sx={{ 
                          minWidth: '40px',
                          color: '#000',
                          '& .MuiSvgIcon-root': {
                            fontSize: '1.3rem'
                          }
                        }}>
                          {item.icon}
                        </ListItemIcon>
                        {item.label}
                      </Box>
                      {isProduction() && (
                        <Chip 
                          label="Coming Soon" 
                          size="small"
                          sx={{ 
                            ...fontStyle,
                            fontSize: '0.6rem',
                            height: '18px',
                            backgroundColor: '#ff9800',
                            color: '#fff',
                            fontWeight: 600,
                            ml: 1
                          }}
                        />
                      )}
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ 
                      ...fontStyle, 
                      color: '#d9534f',
                      padding: '10px 16px',
                      justifyContent: 'center',
                      fontWeight: 600
                    }}
                  >
                    Log out
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>

          {/* Mobile Menu Button */}
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

        {/* Countdown Announcement Bar - Hidden on auth pages */}
        {!location.pathname.match(/^\/(login|signup|verify-otp|verify-login-otp|verify-reset-otp|forgot-password|reset-password)$/) && (
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
              fontSize: { xs: '0.75rem', md: '0.95rem' },
              fontWeight: 600,
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Website Launching Soon! | Attraction Ticket Booking Coming Soon! 🎟️
          </Typography>
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 600,
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
              display: { xs: 'block', sm: 'none' }
            }}
          >
            Launching Soon! 🎟️
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: '10px', md: '15px' }, alignItems: 'center' }}>
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
        )}
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

      {/* Add spacing for fixed navbar + announcement bar (or just navbar on auth pages) */}
      <Toolbar sx={{ minHeight: location.pathname.match(/^\/(login|signup|verify-otp|verify-login-otp|verify-reset-otp|forgot-password|reset-password)$/) ? { xs: '64px', md: '80px' } : { xs: '114px', md: '140px' } }} />
    </>
  );
};

export default Navbar;