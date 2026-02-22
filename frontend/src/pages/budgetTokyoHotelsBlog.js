import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Chip,
  Divider,
  Button,
  Stack,
  Fade,
  Link,
  List,
  ListItem,
  ListItemText,
  Fab,
  CardMedia,
  Collapse,
  IconButton,
  Grid
} from '@mui/material';
import { 
  Hotel, 
  Flight,
  Train,
  LocalDining,
  ExpandMore,
  ArrowForward,
  KeyboardArrowUp,
  MenuBook,
  CheckCircle,
  Cancel,
  Star,
  Warning,
  LocationOn,
  ContentCopy,
  Map
} from '@mui/icons-material';

const BudgetTokyoHotelsBlog = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [tocSticky, setTocSticky] = useState(false);
  const [showToc, setShowToc] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Set SEO title
  useEffect(() => {
    document.title = 'Best Budget Hotels in Tokyo Under SGD 150 (2026 Guide) | Az Holidays';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setShowBackToTop(scrollPosition > 300);
      
      // Calculate footer position
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const footerHeight = 500; // Approximate footer height
      const footerStart = documentHeight - windowHeight - footerHeight;
      
      // Make TOC sticky after scrolling past hero (400px)
      setTocSticky(scrollPosition > 400);
      
      // Hide TOC when near footer
      setShowToc(scrollPosition < footerStart);
      
      // Calculate scroll progress
      const scrollHeight = documentHeight - windowHeight;
      const progress = scrollHeight > 0 ? (scrollPosition / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 70;
      const offset = 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ 
      bgcolor: '#fafcff', 
      minHeight: '90vh',
      background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)',
    }}>
      
      {/* Reading Progress Bar */}
      <Box sx={{
        position: 'fixed',
        top: { xs: '72px', md: '81px' },
        left: 0,
        width: '100%',
        height: '4px',
        backgroundColor: 'rgba(44, 90, 160, 0.1)',
        zIndex: 1101,
        overflow: 'hidden'
      }}>
        <Box sx={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #2c5aa0 0%, #1e3d6f 100%)',
          transition: 'width 0.1s ease-out',
          boxShadow: '0 0 10px rgba(44, 90, 160, 0.5)'
        }} />
      </Box>
      
      {/* SEO Meta Information */}
      <Box sx={{ display: 'none' }}>
        <meta 
          name="title" 
          content="Best Budget Hotels in Tokyo Under SGD 150 for Singapore Travellers 2026 | Az Holidays" 
        />
        <meta 
          name="description" 
          content="Discover the best budget hotels in Tokyo under SGD 150 perfect for Singapore travellers. Affordable, clean, and conveniently located hotels with SGD prices. Book your budget Tokyo stay today!" 
        />
        <meta 
          name="keywords" 
          content="budget hotels Tokyo, cheap hotels Tokyo, affordable hotels Tokyo, Tokyo hotels under SGD 150, budget accommodation Tokyo, cheap Tokyo hotels Singapore" 
        />
      </Box>

      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
        color: 'white', 
        pt: { xs: 10, md: 8 }, 
        pb: { xs: 8, md: 6 },
        borderRadius: { xs: '0 0 40px 40px', md: '0 0 60px 60px' },
        mb: { xs: 4, md: 6 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&h=900&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          mixBlendMode: 'overlay'
        }
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in timeout={800}>
            <Box>
              <Chip 
                label="Budget Travel Guide 2026" 
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
                mb: 2,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
                lineHeight: 1.2,
                textShadow: '0 2px 20px rgba(0,0,0,0.3)'
              }}>
                Best Budget Hotels in Tokyo for Singapore Travellers
              </Typography>
              <Typography variant="h6" sx={{ 
                opacity: 0.95, 
                fontWeight: 300,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: '1rem', md: '1.2rem' },
              }}>
                Quality Accommodation Under SGD 150 Per Night
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ px: { xs: 3, md: 4 }, py: { xs: 4, md: 6 }, position: 'relative' }}>
        
        {/* Desktop & Tablet: Sticky TOC Sidebar on Left */}
        <Box sx={{ 
          display: showToc ? { xs: 'none', lg: 'block' } : 'none',
          position: tocSticky ? 'fixed' : 'absolute',
          left: tocSticky ? { 
            lg: 'calc(50% - 710px)',
            xl: 'calc(50% - 740px)'
          } : {
            lg: 'calc(-280px)',
            xl: 'calc(-310px)'
          },
          top: tocSticky ? 110 : 0,
          width: '260px',
          maxHeight: 'calc(100vh - 130px)',
          overflowY: 'auto',
          zIndex: 10,
          transition: 'all 0.3s ease',
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#2c5aa0',
              borderRadius: '3px'
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '3px'
            }
          }}>
          <Card sx={{ 
            borderRadius: '16px',
            border: '2px solid #e0e7ff',
            background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)'
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <MenuBook sx={{ fontSize: 24, color: '#2c5aa0' }} />
                <Typography variant="h6" sx={{ 
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.1rem',
                  color: '#1a1a1a',
                  m: 0
                }}>
                  Contents
                </Typography>
              </Stack>
              
              <List sx={{ pl: 0 }}>
                <ListItem 
                  button 
                  onClick={() => scrollToSection('introduction')}
                  sx={{ 
                    cursor: 'pointer',
                    borderRadius: '8px',
                    mb: 0.5,
                    py: 0.75,
                    px: 1.5,
                    '&:hover': { bgcolor: '#f0f7ff' }
                  }}
                >
                  <ListItemText 
                    primary="Introduction"
                    primaryTypographyProps={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.85rem',
                      color: '#2c5aa0'
                    }}
                  />
                </ListItem>
                
                <ListItem 
                  button 
                  onClick={() => scrollToSection('budget-hotels')}
                  sx={{ 
                    cursor: 'pointer',
                    borderRadius: '8px',
                    mb: 0.5,
                    py: 0.75,
                    px: 1.5,
                    '&:hover': { bgcolor: '#f0f7ff' }
                  }}
                >
                  <ListItemText 
                    primary="Top Budget Hotels"
                    primaryTypographyProps={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.85rem',
                      color: '#2c5aa0'
                    }}
                  />
                </ListItem>
                
                <List component="div" disablePadding sx={{ pl: 2 }}>
                  <ListItem button onClick={() => scrollToSection('apa-hotel')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="APA Hotel Shinjuku" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('richmond-hotel')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="Richmond Asakusa" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('tokyu-stay')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="Tokyu Stay" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('super-hotel')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="Super Hotel" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('mystays')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="Hotel Mystays" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('millennials')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="The Millennials" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                </List>
                
                <ListItem 
                  button 
                  onClick={() => scrollToSection('tips')}
                  sx={{ 
                    cursor: 'pointer',
                    borderRadius: '8px',
                    mb: 0.5,
                    py: 0.75,
                    px: 1.5,
                    '&:hover': { bgcolor: '#f0f7ff' }
                  }}
                >
                  <ListItemText 
                    primary="Money-Saving Tips"
                    primaryTypographyProps={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.85rem',
                      color: '#2c5aa0'
                    }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>
        
        {/* Mobile: Sticky Collapsible TOC at top */}
        <Box sx={{ 
          display: { xs: 'block', md: 'none' },
          position: 'sticky',
          top: 80,
          zIndex: 100,
          mb: 4
        }}>
          <Card sx={{ 
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(44,90,160,0.1)',
            border: '2px solid #e0e7ff',
            background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)'
          }}>
            <CardContent 
              onClick={() => setTocOpen(!tocOpen)}
              sx={{ 
                p: 2, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <MenuBook sx={{ fontSize: 24, color: '#2c5aa0' }} />
                <Typography variant="h6" sx={{ 
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.1rem',
                  color: '#1a1a1a',
                  m: 0
                }}>
                  Table of Contents
                </Typography>
              </Stack>
              <IconButton size="small">
                <ExpandMore sx={{ 
                  transform: tocOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }} />
              </IconButton>
            </CardContent>
            <Collapse in={tocOpen}>
              <CardContent sx={{ pt: 0, pb: 2 }}>
                <List sx={{ pl: 1 }}>
                  <ListItem 
                    button 
                    onClick={(e) => { e.stopPropagation(); scrollToSection('introduction'); }}
                    sx={{ 
                      cursor: 'pointer',
                      borderRadius: '8px',
                      mb: 0.5,
                      py: 0.5,
                      '&:hover': { bgcolor: '#f0f7ff' }
                    }}
                  >
                    <ListItemText 
                      primary="Introduction"
                      primaryTypographyProps={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: '#2c5aa0'
                      }}
                    />
                  </ListItem>
                  
                  <ListItem 
                    button 
                    onClick={(e) => { e.stopPropagation(); scrollToSection('budget-hotels'); }}
                    sx={{ 
                      cursor: 'pointer',
                      borderRadius: '8px',
                      mb: 0.5,
                      py: 0.5,
                      '&:hover': { bgcolor: '#f0f7ff' }
                    }}
                  >
                    <ListItemText 
                      primary="Top Budget Hotels in Tokyo"
                      primaryTypographyProps={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: '#2c5aa0'
                      }}
                    />
                  </ListItem>
                  
                  <List component="div" disablePadding sx={{ pl: 3 }}>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('apa-hotel'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="1. APA Hotel Shinjuku" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('richmond-hotel'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="2. Richmond Hotel Asakusa" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('tokyu-stay'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="3. Tokyu Stay Shinjuku" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('super-hotel'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="4. Super Hotel Asakusa" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('mystays'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="5. Hotel Mystays Asakusa" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('millennials'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="6. The Millennials Shibuya" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                  </List>
                  
                  <ListItem 
                    button 
                    onClick={(e) => { e.stopPropagation(); scrollToSection('tips'); }}
                    sx={{ 
                      cursor: 'pointer',
                      borderRadius: '8px',
                      mb: 0.5,
                      py: 0.5,
                      '&:hover': { bgcolor: '#f0f7ff' }
                    }}
                  >
                    <ListItemText 
                      primary="Money-Saving Tips"
                      primaryTypographyProps={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: '#2c5aa0'
                      }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Collapse>
          </Card>
        </Box>

        {/* Introduction */}
        <Box id="introduction" sx={{ mb: 6 }}>
          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            Let's be honest, Tokyo has a reputation for being expensive. For Singaporeans planning a trip to Japan's vibrant capital, accommodation costs can quickly eat into your budget. Hotel rooms that cost SGD 300, 400, or even 600 per night are common, especially during peak travel seasons like cherry blossom time or autumn foliage. For more travel planning resources, visit the <Link href="https://www.japan.travel/en/" target="_blank" rel="noopener noreferrer" sx={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Japan National Tourism Organization</Link>.
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            But here's the good news: <strong>you don't need to break the bank to enjoy a comfortable stay in Tokyo</strong>. With careful planning and smart choices, you can find clean, convenient, and well-located budget hotels for under SGD 150 per night without sacrificing quality or comfort.
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            In this guide, we've handpicked the best budget-friendly hotels in Tokyo that offer excellent value for money. These aren't dingy hostels or cramped capsule hotels (though those have their place too). These are genuine, quality hotels with private rooms, modern amenities, and locations near major train stations. For comprehensive guides on Tokyo's attractions and neighborhoods, check out the official <Link href="https://www.gotokyo.org/en/" target="_blank" rel="noopener noreferrer" sx={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Tokyo Convention & Visitors Bureau</Link>. All hotels featured here are priced affordably for Singapore travellers watching their budget.
          </Typography>

          <Box sx={{ 
            bgcolor: '#fff8e1',
            border: '2px solid #ffc107',
            borderRadius: '16px',
            p: 3,
            mb: 4
          }}>
            <Typography variant="h6" sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: '#f57c00',
              mb: 2,
              fontSize: '1.1rem'
            }}>
              💡 Budget Travel Tip
            </Typography>
            <Typography variant="body2" sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#555'
            }}>
              The hotels we've selected are all under SGD 150 per night during regular seasons. However, prices can spike during <strong>cherry blossom season (late March to early April)</strong>, <strong>Golden Week (late April to early May)</strong>, and <strong>autumn foliage (November)</strong>. Book at least 3-4 months in advance during these periods to lock in better rates.
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            Whether you're a solo backpacker, a couple on a romantic getaway, or a family trying to stretch your travel dollars, this guide will help you find the perfect budget accommodation in Tokyo. For detailed destination guides and budget travel tips throughout Japan, explore <Link href="https://www.japan-guide.com/" target="_blank" rel="noopener noreferrer" sx={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Japan-Guide.com</Link>. Let's save some money and spend it where it matters - on ramen, sushi, shopping, and unforgettable experiences!
          </Typography>

          {/* Internal Link Box */}
          <Card sx={{ 
            borderRadius: '16px',
            boxShadow: '0 6px 25px rgba(44,90,160,0.12)',
            border: '2px solid #e3f2fd',
            background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
            mb: 4
          }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Hotel sx={{ fontSize: 32, color: '#2c5aa0' }} />
                <Box>
                  <Typography variant="h6" sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    color: '#1a1a1a',
                    fontSize: '1.2rem',
                    mb: 0.5
                  }}>
                    Looking for More Hotel Options?
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    fontFamily: "'Poppins', sans-serif",
                    color: '#666',
                    fontSize: '0.95rem'
                  }}>
                    If budget isn't your main concern, check out our comprehensive guide
                  </Typography>
                </Box>
              </Stack>
              <Button 
                variant="contained"
                fullWidth
                onClick={() => window.open('/blogs/tokyo-hotels-singapore-travellers', '_blank')}
                endIcon={<ArrowForward />}
                sx={{ 
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1e3d6f 0%, #2c5aa0 100%)',
                  }
                }}
              >
                Read: Best Hotels in Tokyo for Singapore Travellers
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Budget Hotels Section */}
        <Box id="budget-hotels" sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            color: '#1a1a1a',
            mb: 4,
            pb: 2,
            borderBottom: '3px solid #2c5aa0'
          }}>
            Top 6 Budget Hotels in Tokyo Under SGD 150
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: '#555',
            mb: 5
          }}>
            All hotels listed below are clean, safe, and conveniently located near major train stations. They offer private rooms with en-suite bathrooms, free Wi-Fi, and modern amenities that are perfect for budget-conscious travellers who don't want to compromise on comfort. To plan your train routes and estimate travel times between hotels and attractions, use <Link href="https://www.hyperdia.com/en/" target="_blank" rel="noopener noreferrer" sx={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Hyperdia</Link> for accurate train schedules.
          </Typography>

          {/* Quick Comparison Table */}
          <Card sx={{ 
            mb: 5,
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(44,90,160,0.12)',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
              color: 'white',
              p: 2.5
            }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.3rem'
              }}>
                Quick Comparison: Budget Hotels at a Glance
              </Typography>
            </Box>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ overflowX: 'auto' }}>
                <Box component="table" sx={{ 
                  width: '100%',
                  borderCollapse: 'collapse',
                  '& th': {
                    bgcolor: '#f0f7ff',
                    color: '#1a1a1a',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    p: 2,
                    textAlign: 'left',
                    borderBottom: '2px solid #2c5aa0'
                  },
                  '& td': {
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.9rem',
                    p: 2,
                    borderBottom: '1px solid #e0e0e0',
                    color: '#555'
                  },
                  '& tr:hover': {
                    bgcolor: '#fafcff'
                  }
                }}>
                  <thead>
                    <tr>
                      <th>Hotel</th>
                      <th>Area</th>
                      <th>Price Range</th>
                      <th>Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>APA Hotel Shinjuku</strong></td>
                      <td>Shinjuku</td>
                      <td><strong>SGD 90–130</strong></td>
                      <td>Central location, nightlife</td>
                    </tr>
                    <tr>
                      <td><strong>Richmond Asakusa</strong></td>
                      <td>Asakusa</td>
                      <td><strong>SGD 130–200</strong></td>
                      <td>Families, culture lovers</td>
                    </tr>
                    <tr>
                      <td><strong>Tokyu Stay Shinjuku</strong></td>
                      <td>Shinjuku</td>
                      <td><strong>SGD 110–160</strong></td>
                      <td>Extended stays, laundry</td>
                    </tr>
                    <tr>
                      <td><strong>Super Hotel Asakusa</strong></td>
                      <td>Asakusa</td>
                      <td><strong>SGD 80–130</strong></td>
                      <td>Free breakfast, onsen</td>
                    </tr>
                    <tr>
                      <td><strong>Mystays Asakusa</strong></td>
                      <td>Asakusa</td>
                      <td><strong>SGD 90–160</strong></td>
                      <td>Reliable chain, good value</td>
                    </tr>
                    <tr>
                      <td><strong>Millennials Shibuya</strong></td>
                      <td>Shibuya</td>
                      <td><strong>SGD 70–120</strong></td>
                      <td>Solo travelers, social vibe</td>
                    </tr>
                  </tbody>
                </Box>
              </Box>
              <Box sx={{ p: 2, bgcolor: '#fffbf0', borderTop: '1px solid #ffe0b2' }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.85rem',
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  💡 <strong>Pro Tip:</strong> Prices vary by season. Book 3-4 months ahead for best rates. Peak seasons (cherry blossoms, autumn) can be 30-50% higher.
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Hotel 1: APA Hotel Shinjuku Kabukicho Tower */}
          <Card id="apa-hotel" sx={{ 
            mb: 4,
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(44,90,160,0.12)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(44,90,160,0.18)'
            }
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
              color: 'white',
              p: 3
            }}>
              <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'flex-start' }} justifyContent="space-between" spacing={2}>
                <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
                  <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ mb: 2.5, flexWrap: 'wrap' }}>
                    <Hotel sx={{ fontSize: { xs: 28, sm: 32 } }} />
                    <Typography variant="h3" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                      APA Hotel Shinjuku Kabukicho Tower
                    </Typography>
                  </Stack>
                  
                  {/* Address with Copy Functionality */}
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={1} 
                    sx={{ 
                      cursor: 'pointer',
                      opacity: 0.9,
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 1 }
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText('1 Chome-20-2 Kabukicho, Shinjuku Ward, Tokyo, 160-0021, Japan');
                    }}
                  >
                    <LocationOn sx={{ fontSize: { xs: 14, sm: 16 }, flexShrink: 0 }} />
                    <Typography sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      flexWrap: 'wrap',
                      wordBreak: 'break-word'
                    }}>
                        1 Chome-20-2 Kabukicho, Shinjuku Ward, Tokyo, 160-0021, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                {/* Google Maps Button */}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://maps.app.goo.gl/GAFRXTM7pSwibRLbA', '_blank', 'noopener,noreferrer')}
                  sx={{
                    bgcolor: 'white',
                    color: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    width: { xs: '100%', md: 'auto' },
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Show on Map
                </Button>
              </Stack>
            </Box>
            <CardContent sx={{ p: 4 }}>
              {/* Urgency Alert */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: '#fff3e0',
                border: '1px solid #ffb74d',
                borderRadius: '8px',
                p: 2,
                mb: 3
              }}>
                <Warning sx={{ color: '#f57c00', fontSize: 24 }} />
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#e65100',
                  fontWeight: 500
                }}>
                  Popular budget choice - often fills up during weekends and peak seasons
                </Typography>
              </Box>
              
              {/* Hotel Image with Overlays */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/APA+Hotel.webp"
                  alt="APA Hotel Shinjuku Kabukicho Tower - Modern budget hotel in central Shinjuku"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                
                {/* Star Rating Chip - Top Left */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  left: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="3-Star Hotel" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Best For Chip - Top Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="Best for Budget Travelers" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Review Rating - Below Best For Chip on Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 36, sm: 52 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="20,000+ reviews" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>
              </Box>

              {/* Second Hotel Image with CTA Button */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/APA+Hotel+2nd+Image.jpg"
                  alt="APA Hotel Shinjuku - Compact functional room with modern amenities"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                {/* CTA Button Overlay */}
                <Box sx={{
                  position: 'absolute',
                  bottom: { xs: 12, sm: 20 },
                  right: { xs: 12, sm: 20 }
                }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => window.open('https://www.trip.com/t/oMg8vM3IcT2', '_blank', 'noopener,noreferrer')}
                    sx={{
                      bgcolor: '#2c5aa0',
                      color: 'white',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: '0.65rem', sm: '0.95rem' },
                      px: { xs: 1.5, sm: 3 },
                      py: { xs: 0.8, sm: 1.5 },
                      borderRadius: '10px',
                      textTransform: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: '#1e3f70',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 30px rgba(44,90,160,0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    See real-time room photos & availability
                  </Button>
                </Box>
              </Box>
              
              <Typography variant="body1" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#333',
                mb: 3
              }}>
                APA Hotels are Japan's answer to affordable, no-frills accommodation done right. This massive tower in Shinjuku's Kabukicho district offers incredible value for money. While rooms are compact (as expected in Tokyo), they're smartly designed with everything you need: comfortable bed, flat-screen TV, desk, and a modern bathroom with powerful shower.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Why Stay Here
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                Location is king here. You're literally in the heart of Shinjuku, Tokyo's busiest district, with endless restaurants, shops, and nightlife at your doorstep. Despite being budget-friendly, the hotel offers excellent amenities including a large public bath (onsen-style), a gym, and coin laundry facilities. The beds are surprisingly comfortable, and the rooms are cleaned daily to Japanese standards, meaning spotless.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Food Nearby
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                You're spoiled for choice in Shinjuku. Omoide Yokocho (Memory Lane) is a 10-minute walk away, a narrow alley packed with tiny yakitori joints and izakayas that feel like stepping back in time. For ramen lovers, Fuunji serves incredible tsukemen (dipping ramen). Don Quijote mega store is next door for late-night snacks and shopping. Family Mart and 7-Eleven are within 2 minutes for quick meals.
              </Typography>

              {/* Pros and Cons */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#f0f7ff',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Pros
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Unbeatable central location in Shinjuku
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Large public bath (onsen) on-site
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Very clean and well-maintained
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ 24-hour front desk with English support
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Coin laundry and vending machines
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#fff3f3',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Cancel sx={{ color: '#ff5252', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Cons
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Rooms are small (typical for Tokyo)
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Can be noisy due to Kabukicho location
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Limited storage space for big luggage
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Breakfast not included (costs extra)
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ 
                bgcolor: '#e8f5e9',
                border: '2px solid #4caf50',
                borderRadius: '12px',
                p: 2.5,
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#2e7d32',
                  fontWeight: 600,
                  mb: 1
                }}>
                  👥 Best For:
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Solo travellers, couples, and business travellers who want to be in the thick of the action. Perfect if you plan to explore Tokyo late into the night and appreciate having countless food and entertainment options right outside your door.
                </Typography>
              </Box>

              <Box sx={{ 
                bgcolor: '#f0f7ff',
                p: 2,
                borderRadius: '12px',
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#1976d2',
                  fontWeight: 600
                }}>
                  💰 Approximate Price: SGD $90 - $130 per night
                </Typography>
              </Box>

              {/* Affiliate Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hid=936623"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/3MLmXIB"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#003580',
                    color: '#003580',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/t/oMg8vM3IcT2"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)',
                    borderWidth: 2
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 2: Richmond Hotel Asakusa */}
          <Card id="richmond-hotel" sx={{ 
            mb: 4,
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(44,90,160,0.12)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(44,90,160,0.18)'
            }
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
              color: 'white',
              p: 3
            }}>
              <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'flex-start' }} justifyContent="space-between" spacing={2}>
                <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
                  <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ mb: 2.5, flexWrap: 'wrap' }}>
                    <Hotel sx={{ fontSize: { xs: 28, sm: 32 } }} />
                    <Typography variant="h3" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                      Richmond Hotel Premier Asakusa International
                    </Typography>
                  </Stack>
                  
                  {/* Address with Copy Functionality */}
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={1} 
                    sx={{ 
                      cursor: 'pointer',
                      opacity: 0.9,
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 1 }
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText('2 Chome-6-7 Asakusa, Taito Ward, Tokyo, 111-0032, Japan');
                    }}
                  >
                    <LocationOn sx={{ fontSize: { xs: 14, sm: 16 }, flexShrink: 0 }} />
                    <Typography sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      flexWrap: 'wrap',
                      wordBreak: 'break-word'
                    }}>
                      2 Chome-6-7 Asakusa, Taito Ward, Tokyo 111-0032, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                {/* Google Maps Button */}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://maps.app.goo.gl/vzK9BL2GiEqJ1ZzW7', '_blank', 'noopener,noreferrer')}
                  sx={{
                    bgcolor: 'white',
                    color: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    width: { xs: '100%', md: 'auto' },
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Show on Map
                </Button>
              </Stack>
            </Box>
            <CardContent sx={{ p: 4 }}>
              {/* Urgency Alert */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: '#fff3e0',
                border: '1px solid #ffb74d',
                borderRadius: '8px',
                p: 2,
                mb: 3
              }}>
                <Warning sx={{ color: '#f57c00', fontSize: 24 }} />
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#e65100',
                  fontWeight: 500
                }}>
                  Family-friendly rooms book fast - reserve early for best availability
                </Typography>
              </Box>
              
              {/* Hotel Image with Overlays */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Richmond+Hotel+Premier+Asakusa+International.webp"
                  alt="Richmond Hotel Premier Asakusa International"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                
                {/* Star Rating Chip - Top Left */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  left: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="3.5-Star Hotel" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Best For Chip - Top Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="Best for Families & Culture" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Review Rating - Below Best For Chip on Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 36, sm: 52 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="3,200+ reviews" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>
              </Box>

              {/* Second Hotel Image with CTA Button */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Richmond+Hotel+Premier+Asakusa+International+2nd+Image.webp"
                  alt="Richmond Hotel Premier Asakusa International Room"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                {/* CTA Button Overlay */}
                <Box sx={{
                  position: 'absolute',
                  bottom: { xs: 12, sm: 20 },
                  right: { xs: 12, sm: 20 }
                }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => window.open('https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=5024267&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911', '_blank', 'noopener,noreferrer')}
                    sx={{
                      bgcolor: '#2c5aa0',
                      color: 'white',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: '0.65rem', sm: '0.95rem' },
                      px: { xs: 1.5, sm: 3 },
                      py: { xs: 0.8, sm: 1.5 },
                      borderRadius: '10px',
                      textTransform: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: '#1e3f70',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 30px rgba(44,90,160,0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    See real-time room photos & availability
                  </Button>
                </Box>
              </Box>
              
              <Typography variant="body1" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#333',
                mb: 3
              }}>
                Opened in 2020, this relatively new hotel in the historic Asakusa district offers a perfect blend of modern comfort and traditional Japanese culture. Richmond Hotel Premier stands out in the budget category with slightly more spacious rooms (compared to typical Tokyo hotels) and a focus on cleanliness and comfort. It's ideal for families and travellers who want to experience old Tokyo.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Why Stay Here
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                The location is fantastic for cultural sightseeing since you're a short walk from Senso-ji Temple, Tokyo's oldest and most famous Buddhist temple. The hotel offers family rooms that can comfortably accommodate parents and children, which is rare for budget hotels in Tokyo. The breakfast buffet (optional, around SGD $15) offers both Japanese and Western options. Rooms feature modern air purifiers, comfortable mattresses, and well-designed bathrooms. The staff are exceptionally helpful and many speak English.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Food Nearby
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                Nakamise Shopping Street (5-minute walk) is lined with traditional snack stalls selling ningyo-yaki (small cakes), senbei (rice crackers), and matcha ice cream. For proper meals, try Daikokuya for tempura donburi, Sometaro for okonomiyaki, or Asakusa Imahan for sukiyaki. Hoppy Street is perfect for evening drinks and yakitori in a retro atmosphere. Several convenience stores are within 2 minutes for quick snacks.
              </Typography>

              {/* Pros and Cons */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#f0f7ff',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Pros
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Spacious rooms for Tokyo standards
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Family-friendly with connecting rooms
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Walking distance to Senso-ji Temple
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Brand new building (2020)
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Quiet neighbourhood at night
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#fff3f3',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Cancel sx={{ color: '#ff5252', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Cons
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Pricier than other budget options
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Farther from Shibuya/Harajuku
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Limited nightlife in the area
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Can be touristy during the day
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Breakfast not included (costs extra)
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ 
                bgcolor: '#e8f5e9',
                border: '2px solid #4caf50',
                borderRadius: '12px',
                p: 2.5,
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#2e7d32',
                  fontWeight: 600,
                  mb: 1
                }}>
                  👥 Best For:
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Families with children, couples interested in traditional culture, and first-time visitors to Tokyo who want to experience historical Japan. Great choice if you prefer a quieter neighbourhood with easy access to cultural attractions.
                </Typography>
              </Box>

              <Box sx={{ 
                bgcolor: '#f0f7ff',
                p: 2,
                borderRadius: '12px',
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#1976d2',
                  fontWeight: 600
                }}>
                  💰 Approximate Price: SGD $130 - $200 per night
                </Typography>
              </Box>

              {/* Affiliate Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hid=1083303"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/4tBSvRP"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#003580',
                    color: '#003580',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=5024267&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)',
                    borderWidth: 2
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 3: Tokyu Stay Shinjuku */}
          <Card id="tokyu-stay" sx={{ 
            mb: 4,
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(44,90,160,0.12)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(44,90,160,0.18)'
            }
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
              color: 'white',
              p: 3
            }}>
              <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'flex-start' }} justifyContent="space-between" spacing={2}>
                <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
                  <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ mb: 2.5, flexWrap: 'wrap' }}>
                    <Hotel sx={{ fontSize: { xs: 28, sm: 32 } }} />
                    <Typography variant="h3" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                      Tokyu Stay Shinjuku
                    </Typography>
                  </Stack>
                  
                  {/* Address with Copy Functionality */}
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={1} 
                    sx={{ 
                      cursor: 'pointer',
                      opacity: 0.9,
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 1 }
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText('3 Chome-7-1 Shinjuku, Shinjuku Ward, Tokyo, 160-0022, Japan');
                    }}
                  >
                    <LocationOn sx={{ fontSize: { xs: 14, sm: 16 }, flexShrink: 0 }} />
                    <Typography sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      flexWrap: 'wrap',
                      wordBreak: 'break-word'
                    }}>
                      3 Chome-7-1 Shinjuku, Shinjuku Ward, Tokyo, 160-0022, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                {/* Google Maps Button */}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://maps.app.goo.gl/orXFrcV1UjHaTz7g8', '_blank', 'noopener,noreferrer')}
                  sx={{
                    bgcolor: 'white',
                    color: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    width: { xs: '100%', md: 'auto' },
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Show on Map
                </Button>
              </Stack>
            </Box>
            <CardContent sx={{ p: 4 }}>
              {/* Urgency Alert */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: '#fff3e0',
                border: '1px solid #ffb74d',
                borderRadius: '8px',
                p: 2,
                mb: 3
              }}>
                <Warning sx={{ color: '#f57c00', fontSize: 24 }} />
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#e65100',
                  fontWeight: 500
                }}>
                  Highly popular for extended stays - best rates when booking 3+ nights in advance
                </Typography>
              </Box>
              
              {/* Hotel Image with Overlays */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Tokyu+Stay+Shinjuku.webp"
                  alt="Tokyu Stay Shinjuku - Modern hotel room with washer-dryer and kitchenette"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                
                {/* Star Rating Chip - Top Left */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  left: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="3-Star Hotel" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Best For Chip - Top Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="Best for Extended Stays" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Review Rating - Below Best For Chip on Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 36, sm: 52 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="500+ reviews" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>
              </Box>

              {/* Second Hotel Image with CTA Button */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Tokyu+Stay+Shinjuku+2nd+Image.jpg"
                  alt="Tokyu Stay Shinjuku - In-room washing machine and kitchenette facilities"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                {/* CTA Button Overlay */}
                <Box sx={{
                  position: 'absolute',
                  bottom: { xs: 12, sm: 20 },
                  right: { xs: 12, sm: 20 }
                }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => window.open('https://www.trip.com/t/pb8UmfVFcT2', '_blank', 'noopener,noreferrer')}
                    sx={{
                      bgcolor: '#2c5aa0',
                      color: 'white',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: '0.65rem', sm: '0.95rem' },
                      px: { xs: 1.5, sm: 3 },
                      py: { xs: 0.8, sm: 1.5 },
                      borderRadius: '10px',
                      textTransform: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: '#1e3f70',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 30px rgba(44,90,160,0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    See real-time room photos & availability
                  </Button>
                </Box>
              </Box>
              
              <Typography variant="body1" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#333',
                mb: 3
              }}>
                Tokyu Stay is a brilliant concept for travellers planning longer stays in Tokyo. What sets this hotel apart from typical budget options is that every room comes with an in-room washer-dryer combo and a mini kitchenette. Yes, you read that right - your own washing machine and microwave in your room. This makes it incredibly practical for travellers who want to pack light and save money on laundry and eating out.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Why Stay Here
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                The in-room washer-dryer is a game-changer. You can do laundry at night, pack fewer clothes, and save money (coin laundromats cost around SGD $5-8 per load). The kitchenette includes a microwave, electric kettle, and miniature fridge that are perfect for heating up convenience store bentos or making your own breakfast. Located in Shinjuku's Eastside, it's quieter than Kabukicho but still incredibly convenient. Rooms are modern, clean, and functional with good Wi-Fi and comfortable beds.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Food Nearby
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                You're close to Shinjuku Gyoen National Garden (great for picnics if you grab food from convenience stores). Isetan Department Store has an amazing food basement (depachika) with takeaway sushi, bento boxes, and desserts. For sit-down meals, try Nakajima for tonkatsu (breaded pork cutlet), Afuri Ramen for yuzu-flavored ramen, or explore the countless restaurants around Shinjuku-sanchome. Family Mart is literally next door.
              </Typography>

              {/* Pros and Cons */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#f0f7ff',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Pros
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ In-room washer-dryer combo
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Kitchenette with microwave and fridge
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Perfect for extended stays (3+ nights)
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Quieter location than Kabukicho
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Great value for money
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#fff3f3',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Cancel sx={{ color: '#ff5252', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Cons
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ No full kitchen (just microwave)
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Rooms still on the smaller side
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Limited on-site facilities (no gym)
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Takes time to learn washer-dryer
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ 
                bgcolor: '#e8f5e9',
                border: '2px solid #4caf50',
                borderRadius: '12px',
                p: 2.5,
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#2e7d32',
                  fontWeight: 600,
                  mb: 1
                }}>
                  👥 Best For:
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Budget-conscious travellers staying 3+ nights, backpackers who want to pack light, couples who prefer having their own kitchen facilities, and anyone who values the convenience of doing laundry in their room. Also great for digital nomads and business travellers on extended trips.
                </Typography>
              </Box>

              <Box sx={{ 
                bgcolor: '#f0f7ff',
                p: 2,
                borderRadius: '12px',
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#1976d2',
                  fontWeight: 600
                }}>
                  💰 Approximate Price: SGD $110 - $160 per night
                </Typography>
              </Box>

              {/* Affiliate Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hid=788273"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/4aT8piq"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#003580',
                    color: '#003580',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/t/pb8UmfVFcT2"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)',
                    borderWidth: 2
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 4: Super Hotel Asakusa */}
          <Card id="super-hotel" sx={{ 
            mb: 4,
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(44,90,160,0.12)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(44,90,160,0.18)'
            }
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
              color: 'white',
              p: 3
            }}>
              <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'flex-start' }} justifyContent="space-between" spacing={2}>
                <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
                  <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ mb: 2.5, flexWrap: 'wrap' }}>
                    <Hotel sx={{ fontSize: { xs: 28, sm: 32 } }} />
                    <Typography variant="h3" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                      Super Hotel Asakusa
                    </Typography>
                  </Stack>
                  
                  {/* Address with Copy Functionality */}
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={1} 
                    sx={{ 
                      cursor: 'pointer',
                      opacity: 0.9,
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 1 }
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText('2 Chome-33-1 Asakusa, Taito Ward, Tokyo, 111-0032, Japan');
                    }}
                  >
                    <LocationOn sx={{ fontSize: { xs: 14, sm: 16 }, flexShrink: 0 }} />
                    <Typography sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      flexWrap: 'wrap',
                      wordBreak: 'break-word'
                                }}>
                                2 Chome-33-1 Asakusa, Taito Ward, Tokyo 111-0032, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                {/* Google Maps Button */}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://maps.app.goo.gl/5w3UAd6XMmovq5Rb8', '_blank', 'noopener,noreferrer')}
                  sx={{
                    bgcolor: 'white',
                    color: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    width: { xs: '100%', md: 'auto' },
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Show on Map
                </Button>
              </Stack>
            </Box>
            <CardContent sx={{ p: 4 }}>
              {/* Urgency Alert */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: '#fff3e0',
                border: '1px solid #ffb74d',
                borderRadius: '8px',
                p: 2,
                mb: 3
              }}>
                <Warning sx={{ color: '#f57c00', fontSize: 24 }} />
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#e65100',
                  fontWeight: 500
                }}>
                  Free breakfast included - rooms with this perk sell out quickly
                </Typography>
              </Box>
              
              {/* Hotel Image with Overlays */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Super+Hotel+Asakusa.webp"
                  alt="Super Hotel Asakusa"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                
                {/* Star Rating Chip - Top Left */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  left: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="3-Star Hotel" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Best For Chip - Top Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="Best for Solo Travellers" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Review Rating - Below Best For Chip on Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 36, sm: 52 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="2000+ reviews" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>
              </Box>

              {/* Second Hotel Image with CTA Button */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Super+Hotel+Asakusa+2nd+Image.webp"
                  alt="Super Hotel Asakusa Room"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                {/* CTA Button Overlay */}
                <Box sx={{
                  position: 'absolute',
                  bottom: { xs: 12, sm: 20 },
                  right: { xs: 12, sm: 20 }
                }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => window.open('https://www.trip.com/t/5Nykl0MFcT2', '_blank', 'noopener,noreferrer')}
                    sx={{
                      bgcolor: '#2c5aa0',
                      color: 'white',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: '0.65rem', sm: '0.95rem' },
                      px: { xs: 1.5, sm: 3 },
                      py: { xs: 0.8, sm: 1.5 },
                      borderRadius: '10px',
                      textTransform: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: '#1e3f70',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 30px rgba(44,90,160,0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    See real-time room photos & availability
                  </Button>
                </Box>
              </Box>
              
              <Typography variant="body1" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#333',
                mb: 3
              }}>
                Super Hotel is a Japanese budget chain that focuses on delivering exceptional value through smart design and efficient service. The Asakusa branch maintains the brand's high standards with compact but cleverly designed rooms that maximize functionality. What makes Super Hotel unique is their commitment to ensuring guests get a great night's sleep. They offer pillow options at check-in and pride themselves on comfortable beds.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Why Stay Here
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                The standout feature is the complimentary breakfast buffet included in the room rate. Rice balls, miso soup, bread, coffee, and salads are available every morning. The rooms are small but impeccably clean with modern amenities including air purifiers and organic toiletries. Free natural hot spring baths (onsen) are available for guests at certain branches. Check-in is automated via kiosks, which speeds up the process. Perfect for solo travellers and budget-conscious couples.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Food Nearby
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                You're in historic Asakusa, so traditional Japanese food is everywhere. Kappabashi Street (5-minute walk) is famous for kitchen supplies and has several affordable restaurants. Asakusa's Nakamise Street offers street food like melon pan and taiyaki. For budget meals, Sukiya and Yoshinoya (both fast-food chains) are within walking distance. Lawson and FamilyMart convenience stores are 2 minutes away.
              </Typography>

              {/* Pros and Cons */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#f0f7ff',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Pros
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Free breakfast included (big saver!)
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Extremely clean and well-maintained
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Natural hot spring bath available
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Excellent value for money
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Comfortable beds with pillow options
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#fff3f3',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Cancel sx={{ color: '#ff5252', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Cons
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Very small rooms (even for Tokyo)
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Not suitable for large luggage
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Minimal staff interaction (automated)
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Basic amenities only
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ 
                bgcolor: '#e8f5e9',
                border: '2px solid #4caf50',
                borderRadius: '12px',
                p: 2.5,
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#2e7d32',
                  fontWeight: 600,
                  mb: 1
                }}>
                  👥 Best For:
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Solo travellers, backpackers, and couples who prioritize cleanliness and value over space. Perfect if you're rarely in your room and want to save money on accommodation and breakfast. Great choice for those who appreciate Japanese efficiency and minimalist design.
                </Typography>
              </Box>

              <Box sx={{ 
                bgcolor: '#f0f7ff',
                p: 2,
                borderRadius: '12px',
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#1976d2',
                  fontWeight: 600
                }}>
                  💰 Approximate Price: SGD $80 - $130 per night
                </Typography>
              </Box>

              {/* Affiliate Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hid=288711"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/3OWpdNO"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#003580',
                    color: '#003580',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/t/5Nykl0MFcT2"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)',
                    borderWidth: 2
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 5: Hotel Mystays Asakusa */}
          <Card id="mystays" sx={{ 
            mb: 4,
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(44,90,160,0.12)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(44,90,160,0.18)'
            }
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
              color: 'white',
              p: 3
            }}>
              <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'flex-start' }} justifyContent="space-between" spacing={2}>
                <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
                  <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ mb: 2.5, flexWrap: 'wrap' }}>
                    <Hotel sx={{ fontSize: { xs: 28, sm: 32 } }} />
                    <Typography variant="h3" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                      Hotel Mystays Asakusa
                    </Typography>
                  </Stack>
                  
                  {/* Address with Copy Functionality */}
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={1} 
                    sx={{ 
                      cursor: 'pointer',
                      opacity: 0.9,
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 1 }
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText('1-21-11 Honjo, Sumida Ward, Tokyo, 130-0004, Japan');
                    }}
                  >
                    <LocationOn sx={{ fontSize: { xs: 14, sm: 16 }, flexShrink: 0 }} />
                    <Typography sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      flexWrap: 'wrap',
                      wordBreak: 'break-word'
                    }}>
                        1-21-11 Honjo, Sumida Ward, Tokyo 130-0004, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                {/* Google Maps Button */}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://maps.app.goo.gl/TRKbEoWzUE6eAjju6', '_blank', 'noopener,noreferrer')}
                  sx={{
                    bgcolor: 'white',
                    color: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    width: { xs: '100%', md: 'auto' },
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Show on Map
                </Button>
              </Stack>
            </Box>
            <CardContent sx={{ p: 4 }}>
              {/* Urgency Alert */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: '#fff3e0',
                border: '1px solid #ffb74d',
                borderRadius: '8px',
                p: 2,
                mb: 3
              }}>
                <Warning sx={{ color: '#f57c00', fontSize: 24 }} />
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#e65100',
                  fontWeight: 500
                }}>
                  Skytree-view rooms are limited - book ahead for best selection
                </Typography>
              </Box>
              
              {/* Hotel Image with Overlays */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Hotel+Mystays+Asakusa.webp"
                  alt="Hotel Mystays Asakusa"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                
                {/* Star Rating Chip - Top Left */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  left: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="3-Star Hotel" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Best For Chip - Top Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="Best Budget Chain Hotel" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Review Rating - Below Best For Chip on Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 36, sm: 52 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="500+ reviews" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>
              </Box>

              {/* Second Hotel Image with CTA Button */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Hotel+Mystays+Asakusa+2nd+Image.jpg"
                  alt="Hotel Mystays Asakusa Room"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                {/* CTA Button Overlay */}
                <Box sx={{
                  position: 'absolute',
                  bottom: { xs: 12, sm: 20 },
                  right: { xs: 12, sm: 20 }
                }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => window.open('https://www.trip.com/t/IwvSpf3FcT2', '_blank', 'noopener,noreferrer')}
                    sx={{
                      bgcolor: '#2c5aa0',
                      color: 'white',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: '0.65rem', sm: '0.95rem' },
                      px: { xs: 1.5, sm: 3 },
                      py: { xs: 0.8, sm: 1.5 },
                      borderRadius: '10px',
                      textTransform: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: '#1e3f70',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 30px rgba(44,90,160,0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    See real-time room photos & availability
                  </Button>
                </Box>
              </Box>
              
              <Typography variant="body1" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#333',
                mb: 3
              }}>
                Hotel Mystays is one of Japan's largest budget hotel chains, and their Asakusa property offers reliable comfort at affordable prices. The rooms are slightly larger than typical budget hotels, with modern furnishings and thoughtful touches. Located in the heart of Asakusa, you're within walking distance of Tokyo Skytree and major cultural attractions.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Why Stay Here
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                The hotel offers a great balance between price and quality. Rooms have mini-fridges, desk space, and comfortable beds. Some rooms offer city views including Tokyo Skytree. The hotel has coin laundry facilities, vending machines, and a 24-hour front desk. Free Wi-Fi is fast and reliable. The location is excellent for sightseeing since Senso-ji Temple is a 10-minute walk, and Tokyo Skytree is visible from many rooms. Staff are helpful and used to dealing with international guests.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Food Nearby
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                Kuramae is an emerging foodie neighbourhood with trendy cafes and craft beer bars. Dandelion Chocolate serves artisanal hot chocolate. Cibi Café offers excellent coffee and brunch. For traditional Japanese food, walk to Asakusa where you'll find countless options. Multiple convenience stores (7-Eleven, Lawson) are within 3 minutes. Supermarkets nearby for budget meals.
              </Typography>

              {/* Pros and Cons */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#f0f7ff',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Pros
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Larger rooms than most budget hotels
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Tokyo Skytree views from some rooms
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Good walkability to attractions
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Reliable chain hotel quality
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Family rooms available
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#fff3f3',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Cancel sx={{ color: '#ff5252', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Cons
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Not the cheapest budget option
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Can feel a bit corporate/impersonal
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Breakfast costs extra
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Slightly farther from main Asakusa area
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ 
                bgcolor: '#e8f5e9',
                border: '2px solid #4caf50',
                borderRadius: '12px',
                p: 2.5,
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#2e7d32',
                  fontWeight: 600,
                  mb: 1
                }}>
                  👥 Best For:
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Couples and small families who want a reliable, comfortable budget hotel with a bit more space. Great for travellers who appreciate the consistency of chain hotels but don't want to pay premium prices. Ideal if you're visiting Tokyo Skytree and want to be in a less touristy part of Asakusa.
                </Typography>
              </Box>

              <Box sx={{ 
                bgcolor: '#f0f7ff',
                p: 2,
                borderRadius: '12px',
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#1976d2',
                  fontWeight: 600
                }}>
                  💰 Approximate Price: SGD $90 - $160 per night
                </Typography>
              </Box>

              {/* Affiliate Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hl=en-us&hid=165279"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/4kO6oIP"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#003580',
                    color: '#003580',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/t/IwvSpf3FcT2"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)',
                    borderWidth: 2
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 6: The Millennials Shibuya */}
          <Card id="millennials" sx={{ 
            mb: 4,
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(44,90,160,0.12)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(44,90,160,0.18)'
            }
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
              color: 'white',
              p: 3
            }}>
              <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'flex-start' }} justifyContent="space-between" spacing={2}>
                <Box sx={{ flex: 1, width: { xs: '100%', md: 'auto' } }}>
                  <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ mb: 2.5, flexWrap: 'wrap' }}>
                    <Hotel sx={{ fontSize: { xs: 28, sm: 32 } }} />
                    <Typography variant="h3" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                      The Millennials Shibuya
                    </Typography>
                  </Stack>
                  
                  {/* Address with Copy Functionality */}
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={1} 
                    sx={{ 
                      cursor: 'pointer',
                      opacity: 0.9,
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 1 }
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText('1 Chome-20-13 Jinnan, Shibuya Ward, Tokyo, 150-0041, Japan');
                    }}
                  >
                    <LocationOn sx={{ fontSize: { xs: 14, sm: 16 }, flexShrink: 0 }} />
                    <Typography sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      flexWrap: 'wrap',
                      wordBreak: 'break-word'
                    }}>
                      1 Chome-20-13 Jinnan, Shibuya Ward, Tokyo, 150-0041, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                {/* Google Maps Button */}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://maps.app.goo.gl/1tbBgw4YRwommFhe9', '_blank', 'noopener,noreferrer')}
                  sx={{
                    bgcolor: 'white',
                    color: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    width: { xs: '100%', md: 'auto' },
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Show on Map
                </Button>
              </Stack>
            </Box>
            <CardContent sx={{ p: 4 }}>
              {/* Urgency Alert */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: '#fff3e0',
                border: '1px solid #ffb74d',
                borderRadius: '8px',
                p: 2,
                mb: 3
              }}>
                <Warning sx={{ color: '#f57c00', fontSize: 24 }} />
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#e65100',
                  fontWeight: 500
                }}>
                  Capsule hotel with social vibe - perfect for solo travelers, pods fill quickly on weekends
                </Typography>
              </Box>
              
              {/* Hotel Image with Overlays */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/The+Millennials+Shibuya.webp"
                  alt="The Millennials Shibuya"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                
                {/* Star Rating Chip - Top Left */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  left: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="Capsule Hotel" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Best For Chip - Top Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 8, sm: 12 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="Best for Young Travellers" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>

                {/* Review Rating - Below Best For Chip on Right */}
                <Box sx={{
                  position: 'absolute',
                  top: { xs: 36, sm: 52 },
                  right: { xs: 8, sm: 12 }
                }}>
                  <Chip 
                    label="1,500+ reviews" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      height: { xs: '22px', sm: '24px' }
                    }} 
                  />
                </Box>
              </Box>

              {/* Second Hotel Image with CTA Button */}
              <Box sx={{ 
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/The+Millennials+Shibuya+2nd+Image.webp"
                  alt="The Millennials Shibuya Pod"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
                {/* CTA Button Overlay */}
                <Box sx={{
                  position: 'absolute',
                  bottom: { xs: 12, sm: 20 },
                  right: { xs: 12, sm: 20 }
                }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => window.open('https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=15221939&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911', '_blank', 'noopener,noreferrer')}
                    sx={{
                      bgcolor: '#2c5aa0',
                      color: 'white',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: '0.65rem', sm: '0.95rem' },
                      px: { xs: 1.5, sm: 3 },
                      py: { xs: 0.8, sm: 1.5 },
                      borderRadius: '10px',
                      textTransform: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        bgcolor: '#1e3f70',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 30px rgba(44,90,160,0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    See real-time room photos & availability
                  </Button>
                </Box>
              </Box>
              
              <Typography variant="body1" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#333',
                mb: 3
              }}>
                This is not your typical hotel. It's a futuristic capsule hotel with a social twist. The Millennials Shibuya caters to young, tech-savvy travellers who value location and social experiences over traditional hotel amenities. Each "pod" features an innovative smart bed that transforms into a sofa during the day, USB charging ports, personal lighting, and storage space. It's modern, hip, and incredibly affordable for being in the heart of Shibuya.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Why Stay Here
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                The unbeatable location in Shibuya means you're 3 minutes from the famous Shibuya Crossing. The communal lounge/bar area is designed for socializing where you can meet fellow travellers, work on your laptop, or enjoy a drink. Free breakfast is included (toast, coffee, pastries). The smart pods are surprisingly comfortable with adjustable firmness. Modern bathrooms are shared but kept immaculately clean and restocked throughout the day. It's perfect for solo travellers and young couples who don't mind sacrificing privacy for prime location and social atmosphere.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Nearest Station
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                <strong>Shibuya Station</strong> (3-minute walk) – Access to JR Yamanote Line, Ginza Line, Hanzomon Line, and more. One of Tokyo's busiest and most connected stations.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Food Nearby
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                You're in Shibuya, one of Tokyo's biggest dining and nightlife districts. Ichiran Ramen is 5 minutes away for solo ramen dining. Genki Sushi offers affordable conveyor belt sushi. Food Republic in Shibuya has international options. The hotel itself has a café/bar. FamilyMart and 7-Eleven are literally next door. Countless restaurants, cafes, and bars within walking distance.
              </Typography>

              {/* Pros and Cons */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#f0f7ff',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Pros
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Prime Shibuya location (3 min to crossing)
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Modern, tech-forward design
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Free breakfast included
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Great for meeting other travellers
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✓ Super affordable for the location
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    bgcolor: '#fff3f3',
                    p: 2.5,
                    borderRadius: '12px',
                    height: '100%'
                  }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Cancel sx={{ color: '#ff5252', fontSize: 24 }} />
                      <Typography variant="h6" sx={{ 
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#1a1a1a'
                      }}>
                        Cons
                      </Typography>
                    </Stack>
                    <List dense sx={{ pl: 2 }}>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Zero privacy (capsule/pod style)
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Shared bathrooms and showers
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Can be noisy from lounge area
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Not suitable for families with kids
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 0.5, px: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          color: '#555'
                        }}>
                          ✗ Limited privacy (open pod design)
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ 
                bgcolor: '#e8f5e9',
                border: '2px solid #4caf50',
                borderRadius: '12px',
                p: 2.5,
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#2e7d32',
                  fontWeight: 600,
                  mb: 1
                }}>
                  👥 Best For:
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Solo backpackers, digital nomads, and adventurous young travellers (18-35 age range) who prioritize location and social experiences over traditional hotel comforts. Perfect if you want to be in the heart of Shibuya's action and don't mind capsule-style accommodation. Not recommended for light sleepers or those who value privacy.
                </Typography>
              </Box>

              <Box sx={{ 
                bgcolor: '#f0f7ff',
                p: 2,
                borderRadius: '12px',
                mb: 3
              }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#1976d2',
                  fontWeight: 600
                }}>
                  💰 Approximate Price: SGD $70 - $120 per night
                </Typography>
              </Box>

              {/* Affiliate Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hid=4128776"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/4rs22JV"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#003580',
                    color: '#003580',
                    py: { xs: 1.2, sm: 1.5 },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)',
                      borderWidth: 2
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=15221939&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)',
                    borderWidth: 2
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

        </Box>

        {/* Money-Saving Tips Section */}
        <Box id="tips" sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            color: '#1a1a1a',
            mb: 4,
            pb: 2,
            borderBottom: '3px solid #2c5aa0'
          }}>
            Money-Saving Tips for Finding Cheap Hotels in Tokyo
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: '#555',
            mb: 4
          }}>
            Beyond choosing the right hotel, here are proven strategies to save even more money on Tokyo accommodation:
          </Typography>

          <Stack spacing={3}>
            {/* Tip 1 */}
            <Card sx={{ 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e0e7ff'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ 
                    bgcolor: '#2c5aa0',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    1
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.2rem',
                      color: '#1a1a1a',
                      mb: 1.5
                    }}>
                      Book Early (3-4 Months in Advance)
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: '#555'
                    }}>
                      Tokyo hotels, especially budget ones, fill up fast. Booking 3-4 months ahead can save you 20-40% compared to last-minute bookings. During peak seasons (cherry blossoms in late March/early April, autumn in November), book even earlier - 6 months ahead if possible. Early booking also gives you the best room selection and flexibility to cancel if plans change (check cancellation policies).
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Tip 2 */}
            <Card sx={{ 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e0e7ff'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ 
                    bgcolor: '#2c5aa0',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    2
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.2rem',
                      color: '#1a1a1a',
                      mb: 1.5
                    }}>
                      Avoid Peak Seasons When Possible
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: '#555'
                    }}>
                      Tokyo hotel prices skyrocket during cherry blossom season (late March to early April), Golden Week (late April/early May), summer holidays (July-August), and autumn foliage (November). For accurate cherry blossom forecasts and seasonal planning, check <Link href="https://www.japan-guide.com/sakura/" target="_blank" rel="noopener noreferrer" sx={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Japan-Guide's Sakura Forecast</Link>. If your schedule is flexible, visit during shoulder seasons like <strong>May-June or September-October</strong> when weather is excellent, crowds are smaller, and hotel prices drop by 30-50%. January-February is the cheapest time but also coldest.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Tip 3 */}
            <Card sx={{ 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e0e7ff'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ 
                    bgcolor: '#2c5aa0',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    3
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.2rem',
                      color: '#1a1a1a',
                      mb: 1.5
                    }}>
                      Stay Near Train Stations (Not Necessarily Central Areas)
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: '#555'
                    }}>
                      Areas like Shinjuku, Shibuya, and Ginza are expensive. Consider staying in well-connected but less touristy areas like <strong>Asakusa, Ueno, Ikebukuro, or Akihabara</strong>. As long as you're within 5-10 minutes of a major train station, you can reach anywhere in Tokyo quickly. Tokyo's trains are so efficient that staying 2-3 stops away from central areas can save you SGD 30-50 per night while adding only 10-15 minutes to your commute. For detailed train routes and schedules, visit the official <Link href="https://www.tokyometro.jp/en/" target="_blank" rel="noopener noreferrer" sx={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Tokyo Metro website</Link>.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Tip 4 */}
            <Card sx={{ 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e0e7ff'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ 
                    bgcolor: '#2c5aa0',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    4
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.2rem',
                      color: '#1a1a1a',
                      mb: 1.5
                    }}>
                      Compare Prices Across Multiple Booking Sites
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: '#555'
                    }}>
                      Don't book on the first site you check. Compare prices on <strong>Agoda, Booking.com, Trip.com, Hotels.com, and even the hotel's official website</strong>. Sometimes the hotel's own website offers the best deal, especially with direct booking discounts or member perks. Price differences can be SGD 15-30 per night for the exact same room. Set up price alerts on Google Hotels to track fluctuations.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Tip 5 */}
            <Card sx={{ 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e0e7ff'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ 
                    bgcolor: '#2c5aa0',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    5
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.2rem',
                      color: '#1a1a1a',
                      mb: 1.5
                    }}>
                      Look for Hotels with Free Breakfast
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: '#555'
                    }}>
                      Breakfast in Tokyo cafes costs around SGD 10-15 per person. Over a week, that's SGD 70-105! Hotels like <strong>Super Hotel and The Millennials Shibuya</strong> include free breakfast, which saves you money and time. Even a simple Japanese breakfast of rice, miso soup, and tea is worth it. Factor breakfast costs into your total accommodation budget when comparing hotels.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Tip 6 */}
            <Card sx={{ 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e0e7ff'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ 
                    bgcolor: '#2c5aa0',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    6
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1.2rem',
                      color: '#1a1a1a',
                      mb: 1.5
                    }}>
                      Travel Midweek When Possible
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: '#555'
                    }}>
                      Weekend rates (Friday-Saturday) in Tokyo are often 20-30% higher than weekday rates. If you can, arrive on Sunday or Monday and depart on Thursday or Friday. Business hotels especially drop prices on weekends when their main clientele (Japanese businesspeople) aren't travelling. This is opposite to leisure destinations, so use it to your advantage.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        {/* Conclusion */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            color: '#1a1a1a',
            mb: 4,
            pb: 2,
            borderBottom: '3px solid #2c5aa0'
          }}>
            Final Thoughts: Budget Hotels in Tokyo Don't Mean Compromising Quality
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            Tokyo might have a reputation for being expensive, but as this guide proves, finding quality accommodation under SGD 150 is absolutely possible. The six hotels we've covered, from APA Hotel's central convenience to The Millennials' futuristic capsules, show that budget-friendly doesn't mean sacrificing cleanliness, comfort, or location.
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            Remember, Japanese hospitality (omotenashi) extends to budget hotels too. You'll find the same attention to detail, cleanliness, and service quality whether you're paying SGD 80 or SGD 800 per night. The main differences are room size and amenities—not the fundamentals that make for a good stay.
          </Typography>

          <Box sx={{ 
            bgcolor: '#e3f2fd',
            border: '2px solid #2196f3',
            borderRadius: '16px',
            p: 4,
            mb: 4
          }}>
            <Typography variant="h5" sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: '#1565c0',
              mb: 2,
              fontSize: '1.3rem'
            }}>
              💡 Our Top Recommendation
            </Typography>
            <Typography variant="body1" sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#555',
              mb: 2
            }}>
              If we had to pick just one? <strong>Tokyu Stay Shinjuku</strong> offers the best overall value for most travellers. The in-room washer-dryer and kitchenette are game-changers for trips longer than 3 nights, the location is excellent, and prices hover around SGD 100-140. It's practical, comfortable, and lets you save money on laundry and some meals.
            </Typography>
            <Typography variant="body1" sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: '#555'
            }}>
              For absolute budget champions, <strong>The Millennials Shibuya</strong> at SGD 60-95 can't be beat—if you're okay with capsule-style accommodation and shared facilities.
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 4
          }}>
            By following the money-saving tips we've shared and choosing the right hotel for your travel style, you can save hundreds of dollars on accommodation. That's money better spent on incredible sushi, shopping in Harajuku, day trips to Mount Fuji, or extending your trip by a few more days. Tokyo is calling—and now you know you can answer without emptying your wallet on accommodation.
          </Typography>

          <Box sx={{ 
            bgcolor: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
            p: 4,
            borderRadius: '20px',
            textAlign: 'center',
            color: 'white',
            mb: 4
          }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.5rem',
              mb: 3
            }}>
              Ready to Book Your Budget Tokyo Adventure?
            </Typography>
            
            <Typography variant="body1" sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.05rem',
              opacity: 0.95,
              mb: 4,
              maxWidth: '700px',
              mx: 'auto'
            }}>
              Compare hotel prices, book early, and save your money for the experiences that matter—incredible food, amazing attractions, and unforgettable memories in Tokyo!
            </Typography>


            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Button 
                variant="contained"
                size="large"
                startIcon={<Flight />}
                onClick={() => window.open('https://www.trip.com/flights/Singapore-to-Tokyo/tickets-SIN-TYO?flighttype=S&dcity=SIN&acity=TYO&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12501029', '_blank', 'noopener,noreferrer')}
                sx={{ 
                  bgcolor: 'white',
                  color: '#2c5aa0',
                  py: 1.8,
                  px: 4,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                Search Flights Here
              </Button>

              <Button 
                variant="contained"
                size="large"
                startIcon={<Hotel />}
                onClick={() => window.open('https://www.trip.com/hotels/list?city=228&display=Tokyo&optionId=228&optionType=City&optionName=Tokyo&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12501029', '_blank', 'noopener,noreferrer')}
                sx={{ 
                  bgcolor: 'white',
                  color: '#2c5aa0',
                  py: 1.8,
                  px: 4,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                Search Hotels Here
              </Button>
            </Stack>

            <Typography variant="body2" sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.95rem',
              opacity: 0.9,
              mt: 2
            }}>
              Book today and start counting down to your Tokyo adventure!
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="caption" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.9rem',
            color: '#888',
            display: 'block',
            textAlign: 'center'
          }}>
            Last updated: February 2026 | Prices are approximate in SGD and subject to change based on season, availability, and exchange rates. For current SGD to JPY exchange rates, visit <Link href="https://www.xe.com/currencyconverter/convert/?Amount=1&From=SGD&To=JPY" target="_blank" rel="noopener noreferrer" sx={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>XE.com</Link>. Always compare prices before booking.
          </Typography>
        </Box>

      </Container>

      {/* Back to Top Button */}
      <Fade in={showBackToTop}>
        <Fab 
          color="primary"
          size="medium"
          onClick={scrollToTop}
          sx={{ 
            position: 'fixed',
            bottom: { xs: 100, md: 100 },
            right: { xs: 25, md: 30 },
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
            boxShadow: '0 4px 12px rgba(44,90,160,0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1e3d6f 0%, #2c5aa0 100%)',
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 20px rgba(44,90,160,0.5)',
            },
            transition: 'all 0.3s ease',
            zIndex: 1000
          }}
        >
          <KeyboardArrowUp sx={{ fontSize: 28 }} />
        </Fab>
      </Fade>
    </Box>
  );
};

export default BudgetTokyoHotelsBlog;
