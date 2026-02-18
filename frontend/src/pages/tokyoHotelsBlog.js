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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Fab,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { 
  Hotel, 
  Flight, 
  LocalDining, 
  Train,
  ExpandMore,
  ArrowForward,
  KeyboardArrowUp,
  MenuBook,
  Star,
  Warning,
  LocationOn,
  ContentCopy,
  Map
} from '@mui/icons-material';

const TokyoHotelsBlog = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [tocSticky, setTocSticky] = useState(false);
  const [showToc, setShowToc] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Set SEO title
  useEffect(() => {
    document.title = 'Best Tokyo Hotels 2026 - Complete Guide with Reviews & Prices | AZ Holidays';
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
      const navbarHeight = 70; // navbar height
      const offset = 20; // additional padding
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
          content="Best Hotels in Tokyo for Singapore Travellers 2026 | Az Holidays" 
        />
        <meta 
          name="description" 
          content="Discover the top Tokyo hotels perfect for Singaporeans in 2026. Complete guide with SGD prices, transport tips, visa-free entry info, and JR Pass advice. Book your dream Tokyo stay today!" 
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
                label="Travel Guide 2026" 
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
                fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
                lineHeight: 1.2,
                textShadow: '0 2px 20px rgba(0,0,0,0.3)'
              }}>
                Best Hotels in Tokyo for Singapore Travellers
              </Typography>
              <Typography variant="h6" sx={{ 
                opacity: 0.95, 
                fontWeight: 300,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: '1rem', md: '1.2rem' },
              }}>
                Your Complete 2026 Guide to Tokyo Accommodation
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
                  onClick={() => scrollToSection('neighbourhoods')}
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
                    primary="Tokyo's Neighbourhoods"
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
                  onClick={() => scrollToSection('hotels')}
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
                    primary="Top 7 Hotels"
                    primaryTypographyProps={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.85rem',
                      color: '#2c5aa0'
                    }}
                  />
                </ListItem>
                
                <List component="div" disablePadding sx={{ pl: 2 }}>
                  <ListItem button onClick={() => scrollToSection('park-hyatt')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="Park Hyatt" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('shibuya-excel')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="Shibuya Excel" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('richmond-asakusa')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="Richmond Asakusa" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('hotel-gracery')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="Hotel Gracery" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('millennials')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="The Millennials" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('peninsula')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="The Peninsula" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                  <ListItem button onClick={() => scrollToSection('mitsui-garden')} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.3, py: 0.5, px: 1, '&:hover': { bgcolor: '#f0f7ff' } }}>
                    <ListItemText primary="Mitsui Garden" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: '#666' }} />
                  </ListItem>
                </List>
                
                <ListItem 
                  button 
                  onClick={() => scrollToSection('travel-tips')}
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
                    primary="Travel Tips"
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
                  onClick={() => scrollToSection('faq')}
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
                    primary="FAQ"
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
          display: { xs: 'block', lg: 'none' },
          position: 'sticky',
          top: 85,
          zIndex: 10,
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
                    onClick={(e) => { e.stopPropagation(); scrollToSection('neighbourhoods'); }}
                    sx={{ 
                      cursor: 'pointer',
                      borderRadius: '8px',
                      mb: 0.5,
                      py: 0.5,
                      '&:hover': { bgcolor: '#f0f7ff' }
                    }}
                  >
                    <ListItemText 
                      primary="Understanding Tokyo's Best Neighbourhoods"
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
                    onClick={(e) => { e.stopPropagation(); scrollToSection('hotels'); }}
                    sx={{ 
                      cursor: 'pointer',
                      borderRadius: '8px',
                      mb: 0.5,
                      py: 0.5,
                      '&:hover': { bgcolor: '#f0f7ff' }
                    }}
                  >
                    <ListItemText 
                      primary="Top 7 Hotels in Tokyo"
                      primaryTypographyProps={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        color: '#2c5aa0'
                      }}
                    />
                  </ListItem>
                  
                  <List component="div" disablePadding sx={{ pl: 3 }}>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('park-hyatt'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="1. Park Hyatt Tokyo" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('shibuya-excel'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="2. Shibuya Excel Hotel" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('richmond-asakusa'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="3. Richmond Hotel Asakusa" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('hotel-gracery'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="4. Hotel Gracery Shinjuku" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('millennials'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="5. The Millennials Shibuya" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('peninsula'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="6. The Peninsula Tokyo" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                    <ListItem button onClick={(e) => { e.stopPropagation(); scrollToSection('mitsui-garden'); }} sx={{ cursor: 'pointer', borderRadius: '8px', mb: 0.5, py: 0.3, '&:hover': { bgcolor: '#f0f7ff' } }}>
                      <ListItemText primary="7. Mitsui Garden Hotel" primaryTypographyProps={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#555' }} />
                    </ListItem>
                  </List>
                  
                  <ListItem 
                    button 
                    onClick={(e) => { e.stopPropagation(); scrollToSection('travel-tips'); }}
                    sx={{ 
                      cursor: 'pointer',
                      borderRadius: '8px',
                      mb: 0.5,
                      py: 0.5,
                      '&:hover': { bgcolor: '#f0f7ff' }
                    }}
                  >
                    <ListItemText 
                      primary="Essential Travel Tips"
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
                    onClick={(e) => { e.stopPropagation(); scrollToSection('faq'); }}
                    sx={{ 
                      cursor: 'pointer',
                      borderRadius: '8px',
                      mb: 0.5,
                      py: 0.5,
                      '&:hover': { bgcolor: '#f0f7ff' }
                    }}
                  >
                    <ListItemText 
                      primary="FAQ"
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
        <Box sx={{ mb: 6 }}>
          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            Tokyo is calling, and if you're a Singaporean looking to experience Japan's vibrant capital in 2026, you've come to the right place. With direct flights from Singapore taking just 6.5 to 7 hours, Tokyo is one of the most accessible yet infinitely fascinating destinations for us.
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            Best of all? Singapore passport holders enjoy visa-free entry to Japan for stays up to 90 days, making trip planning incredibly straightforward. No visa applications, no stress—just book your flight and hotel, and you're good to go.
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            In this comprehensive guide, I'll walk you through the best hotels in Tokyo tailored specifically for Singaporean travellers. Whether you're a family looking for spacious rooms, a couple seeking a romantic getaway, or a budget traveller hunting for the best deals, I've got you covered with practical tips, SGD pricing, and insider recommendations.
          </Typography>

          <Box sx={{ 
            bgcolor: '#e3f2fd', 
            p: 3, 
            borderRadius: '16px',
            borderLeft: '4px solid #2c5aa0',
            mb: 4
          }}>
            <Typography variant="body1" sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              lineHeight: 1.8,
              color: '#1565c0',
              fontWeight: 500
            }}>
              <strong>Quick Tip:</strong> Book your Tokyo accommodation at least 3-4 months in advance, especially if you're travelling during cherry blossom season (late March to early April) or autumn foliage (November). Prices can surge by 30-50% during peak seasons.
            </Typography>
          </Box>
        </Box>


        {/* Area Guide Section */}
        <Box id="neighbourhoods" sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            color: '#1a1a1a',
            mb: 4,
            pb: 2,
            borderBottom: '3px solid #2c5aa0'
          }}>
            Understanding Tokyo's Best Neighbourhoods
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            Tokyo is massive—one of the world's largest cities. Choosing the right neighbourhood is crucial for maximising your time and experience. For comprehensive guides on Tokyo's districts and attractions, visit the official <Link href="https://www.gotokyo.org/en/" target="_blank" rel="noopener noreferrer" sx={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Tokyo Convention & Visitors Bureau</Link>. Here's a quick breakdown of the best areas:
          </Typography>

          <Stack spacing={3} sx={{ mb: 4 }}>
            <Card sx={{ 
              borderRadius: '16px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e0e7ff'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.3rem',
                  color: '#2c5aa0',
                  mb: 2
                }}>
                  Shinjuku
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  The beating heart of Tokyo. Perfect for first-timers who want to be in the thick of the action. Home to Tokyo's busiest station with access to virtually everywhere. Neon lights, incredible nightlife, department stores, and restaurants galore. Can be overwhelming but incredibly convenient.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ 
              borderRadius: '16px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e0e7ff'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.3rem',
                  color: '#2c5aa0',
                  mb: 2
                }}>
                  Shibuya
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Youthful, trendy, and electric. Famous for the Shibuya Crossing (the world's busiest pedestrian crossing). Great shopping, fashion, and dining. Easy access to Harajuku and Omotesando. Ideal for couples and younger travellers who love urban energy.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ 
              borderRadius: '16px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e0e7ff'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.3rem',
                  color: '#2c5aa0',
                  mb: 2
                }}>
                  Asakusa
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Traditional Tokyo with old-world charm. Home to the famous Senso-ji Temple. More relaxed and atmospheric than central Tokyo. Excellent for families and those who prefer a calmer base with easy access to major attractions via the Ginza Line.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ 
              borderRadius: '16px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e0e7ff'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.3rem',
                  color: '#2c5aa0',
                  mb: 2
                }}>
                  Ginza
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Tokyo's upscale shopping district. Luxury boutiques, fine dining, and sophisticated atmosphere. More expensive but refined. Perfect for couples seeking a premium experience or business travellers. Excellent transport links and proximity to Tokyo Station.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>

        {/* Hotel Recommendations */}
        <Box id="hotels" sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            color: '#1a1a1a',
            mb: 4,
            pb: 2,
            borderBottom: '3px solid #2c5aa0'
          }}>
            Top 7 Hotels in Tokyo for Singaporeans
          </Typography>

          {/* How to Choose Section */}
          <Box sx={{ 
            bgcolor: '#f8faff',
            borderRadius: '16px',
            p: 4,
            mb: 5,
            border: '1px solid #e0e7ff'
          }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.4rem',
              color: '#2c5aa0',
              mb: 3
            }}>
              How to Choose the Right Hotel
            </Typography>
            
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.1rem',
                  color: '#1a1a1a',
                  mb: 1
                }}>
                  First-Time Visitors
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Stay in <strong>Shinjuku</strong> (Hotel Gracery, Park Hyatt). Central location with easy train access to all major attractions. Vibrant nightlife and excellent dining options within walking distance.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.1rem',
                  color: '#1a1a1a',
                  mb: 1
                }}>
                  Shopping & Nightlife
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Pick <strong>Shibuya</strong> (Shibuya Excel Hotel, Millennials). Direct access to shopping malls, trendy cafes, and the famous Shibuya Crossing. Perfect for couples and younger travelers.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.1rem',
                  color: '#1a1a1a',
                  mb: 1
                }}>
                  Families & Culture Seekers
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Choose <strong>Asakusa</strong> (Richmond Hotel). Traditional atmosphere with Senso-ji Temple nearby. Quieter than Shibuya/Shinjuku, with authentic local restaurants and lower prices.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h4" sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.1rem',
                  color: '#1a1a1a',
                  mb: 1
                }}>
                  Luxury & Business
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Go for <strong>Marunouchi/Gaien</strong> (Peninsula Tokyo, Mitsui Garden). Close to business districts, Imperial Palace, and upscale shopping. Quieter environment with premium amenities.
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Quick Comparison Table */}
          <Card sx={{ 
            mb: 5,
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e0e7ff',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
              color: 'white',
              p: 2.5
            }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.3rem'
              }}>
                Quick Comparison Guide
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.95rem',
                opacity: 0.9,
                mt: 0.5
              }}>
                Find the perfect hotel at a glance
              </Typography>
            </Box>
            <TableContainer>
              <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8faff' }}>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#2c5aa0' }}>Hotel</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#2c5aa0' }}>Best For</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#2c5aa0' }}>Price Range</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#2c5aa0' }}>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:hover': { bgcolor: '#f8faff' } }}>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Park Hyatt Tokyo</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Luxury Couples</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", color: '#d32f2f', fontWeight: 600 }}>$1,090-1,400</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Shinjuku</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:hover': { bgcolor: '#f8faff' } }}>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Shibuya Excel Hotel</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Shopping Enthusiasts</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", color: '#2e7d32', fontWeight: 600 }}>$280-450</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Shibuya</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:hover': { bgcolor: '#f8faff' } }}>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Richmond Asakusa</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Families</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", color: '#2e7d32', fontWeight: 600 }}>$240-350</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Asakusa</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:hover': { bgcolor: '#f8faff' } }}>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Hotel Gracery Shinjuku</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>First-Time Visitors</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", color: '#2e7d32', fontWeight: 600 }}>$260-380</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Shinjuku</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:hover': { bgcolor: '#f8faff' } }}>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Millennials Shibuya</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Budget Travellers</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", color: '#1976d2', fontWeight: 600 }}>$80-90</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Shibuya</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:hover': { bgcolor: '#f8faff' } }}>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>The Peninsula Tokyo</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Luxury & Business</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", color: '#d32f2f', fontWeight: 600 }}>$900-1,500</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Marunouchi</TableCell>
                  </TableRow>
                  <TableRow sx={{ '&:hover': { bgcolor: '#f8faff' } }}>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>Mitsui Garden Hotel</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Mid-Range Comfort</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif", color: '#2e7d32', fontWeight: 600 }}>$230-285</TableCell>
                    <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>Gaien</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Hotel 1 */}
          <Card id="park-hyatt" sx={{ 
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
                      Park Hyatt Tokyo
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
                      navigator.clipboard.writeText('2, 3 Chome-7-1 Nishishinjuku, Shinjuku Ward, Tokyo, 163-1055, Japan');
                      // Optional: You can add a toast notification here
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
                      2, 3 Chome-7-1 Nishishinjuku, Shinjuku Ward, Tokyo, 163-1055, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                {/* Google Maps Button */}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Park+Hyatt+Tokyo,2+3+Chome-7-1+Nishishinjuku+Shinjuku+Ward+Tokyo+163-1055+Japan', '_blank', 'noopener,noreferrer')}
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
                  Often sells out 2-3 months in advance during peak seasons
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
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Park+Hyatt+Tokyo.jpg"
                  alt="Park Hyatt Tokyo"
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
                    label="5-Star Hotel" 
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
                    label="Best for Luxury Couples" 
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
                    label="77 reviews" 
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
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Park+Hyatt+Tokyo+2nd+Image.jpg"
                  alt="Park Hyatt Tokyo Room"
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
                    onClick={() => window.open('https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=993514&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911', '_blank', 'noopener,noreferrer')}
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
                Remember the movie "Lost in Translation"? This is <em>that</em> hotel. Perched on the top floors of the Shinjuku Park Tower, Park Hyatt Tokyo offers breathtaking views, exceptional service, and one of the best hotel breakfasts in the city.
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
                Rooms start at 45 sqm — nearly double the average Tokyo hotel size. The New York Grill on the 52nd floor serves phenomenal steaks and has live jazz every evening. The pool and spa facilities are world-class. It's romantic, sophisticated, and perfect for a special occasion or honeymoon.
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
                Shinjuku is a food paradise. Don't miss Omoide Yokocho (Memory Lane) for yakitori and izakaya vibes. For ramen lovers, Fuunji serves an incredible tsukemen (dipping ramen). Tsunahachi is your go-to for tempura. All within 10-15 minutes walk.
              </Typography>

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
                  Approximate Price: SGD $1,090 - $1,400 per night
                </Typography>
              </Box>

                           {/* <Button 
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Check Availability Here
              </Button>
              {/* Affiliate Link */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hid=910"
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
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)'
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/3ME1mlj"
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
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)'
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=993514&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  mt: 2,
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)'
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 2 */}
          <Card id="shibuya-excel" sx={{ 
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
                      Shibuya Excel Hotel Tokyu
                    </Typography>
                  </Stack>
                  
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
                      navigator.clipboard.writeText('1 Chome-12-2 Dogenzaka, Shibuya Ward, Tokyo, 150-0043, Japan');
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
                      1 Chome-12-2 Dogenzaka, Shibuya Ward, Tokyo, 150-0043, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Shibuya+Excel+Hotel+Tokyu,1+Chome-12-2+Dogenzaka+Shibuya+Ward+Tokyo+150-0043+Japan', '_blank', 'noopener,noreferrer')}
                  sx={{
                    bgcolor: 'white',
                    color: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    width: { xs: '100%', md: 'auto' },
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
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
                  Prime location — rooms with Shibuya Crossing views fill up fast
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
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Shibuya+Excel+Hotel+Tokyu.jpg"
                  alt="Shibuya Excel Hotel Tokyu"
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
                    label="4-Star Hotel" 
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
                    label="Best for Couples & Shopping Enthusiasts" 
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
                    label="562 reviews" 
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
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Shibuya+Excel+Hotel+Tokyu+2nd+Image.jpg"
                  alt="Park Hyatt Tokyo Room"
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
                    onClick={() => window.open('https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=994472&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911', '_blank', 'noopener,noreferrer')}
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
                Location, location, location! This hotel sits directly above Shibuya Station and Mark City shopping mall. You literally step out of your room into the action. Upper-floor rooms offer stunning views of the famous Shibuya Crossing.
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
                The convenience is unbeatable. No need to brave the rain or cold—you're connected to the station and shopping. Rooms are modern and comfortable, though on the smaller side (typical for Tokyo). The breakfast buffet offers both Western and Japanese options. Perfect for couples who want to shop till they drop and experience Shibuya's nightlife.
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
                You're spoiled for choice. Ichiran Ramen is just 5 minutes away for tonkotsu ramen in their famous solo booths. Genki Sushi offers affordable conveyor belt sushi. For something special, try Udon Shin for handmade udon. Shibuya Yokocho food alley has 19 different eateries under one roof.
              </Typography>

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
                  Approximate Price: SGD $280 - $450 per night
                </Typography>
              </Box>

              {/* <Button 
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Check Availability Here
              </Button> */}

              {/* Affiliate Link */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hid=7005"
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
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)'
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/3ZFhuWT"
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
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)'
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=994472&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  mt: 2,
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)'
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 3 */}
          <Card id="richmond-asakusa" sx={{ 
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
                      2 Chome-6-7 Asakusa, Taito Ward, Tokyo, 111-0032, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Richmond+Hotel+Premier+Asakusa+International,2+Chome-6-7+Asakusa+Taito+Ward+Tokyo+111-0032+Japan', '_blank', 'noopener,noreferrer')}
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
                    label="4-Star Hotel" 
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
                    label="Best for Families" 
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
                    label="1320 reviews" 
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
                  alt="Park Hyatt Tokyo Room"
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
                Opened in 2020, this modern hotel in historic Asakusa offers the best of both worlds—contemporary comfort in a traditional neighbourhood. The spacious rooms and family-friendly facilities make it ideal for families with children.
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
                Family rooms can accommodate 4 people comfortably—a rarity in Tokyo. It's a 3-minute walk to Senso-ji Temple, perfect for morning strolls before the crowds arrive. The rooftop lounge offers stunning views of the Tokyo Skytree. The neighbourhood is calmer than central Tokyo, making it easier to navigate with kids. Many rooms have small kitchenettes, handy for preparing simple meals.
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
                Nakamise Shopping Street (leading to Senso-ji) is packed with street food—think melon pan, ningyo-yaki, and age-manju. Asakusa Imahan serves sukiyaki and shabu-shabu in a traditional setting. Sometaro is famous for okonomiyaki (Japanese savoury pancake) where you cook it yourself—kids love this!
              </Typography>

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
                  Approximate Price: SGD $260 - $380 per night
                </Typography>
              </Box>

                           {/* <Button 
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Check Availability Here
              </Button>
              {/* Affiliate Link */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
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
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)'
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
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)'
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
                  mt: 2,
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)'
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 4 */}
          <Card id="hotel-gracery" sx={{ 
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
                      Hotel Gracery Shinjuku
                    </Typography>
                  </Stack>
                  
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
                      navigator.clipboard.writeText('1 Chome-19-1 Kabukicho, Shinjuku Ward, Tokyo, 160-0021, Japan');
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
                      1 Chome-19-1 Kabukicho, Shinjuku Ward, Tokyo, 160-0021, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Hotel+Gracery+Shinjuku,1+Chome-19-1+Kabukicho+Shinjuku+Ward+Tokyo+160-0021+Japan', '_blank', 'noopener,noreferrer')}
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
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Hotel+Gracery+Shinjuku.webp"
                  alt="Hotel Gracery Shinjuku"
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
                    label="4-Star Hotel" 
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
                    label="Best for First-Time Visitors" 
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
                    label="3235 reviews" 
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
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Hotel+Gracery+Shinjuku+2nd+Image.webp"
                  alt="Park Hyatt Tokyo Room"
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
                    onClick={() => window.open('https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=1841600&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911', '_blank', 'noopener,noreferrer')}
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
                You can't miss this hotel—there's a giant Godzilla head on the rooftop! Located in the heart of Shinjuku, right in Kabukicho (Tokyo's entertainment district), it's perfectly positioned for exploring.
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
                The location is phenomenal—5 minutes from Shinjuku Station, with access to JR lines, metro lines, and the airport express. Rooms are clean, modern, and equipped with everything you need. The Godzilla terrace on the 8th floor is a fun photo spot. Staff are helpful with tourist information. Great value for money considering the central location.
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
                Literally everywhere. Ichiran and Ippudo for ramen. Katsu Midori for revolving sushi. Nagi for niboshi (anchovy-based) ramen. The Robot Restaurant is nearby (it's wild!). Golden Gai's tiny bars are a 10-minute walk for a unique drinking experience.
              </Typography>

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
                  Approximate Price: SGD $240 - $350 per night
                </Typography>
              </Box>

                           {/* <Button 
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Check Availability Here
              </Button>
              {/* Affiliate Link */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hid=706347"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)'
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/3ONo0bz"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#003580',
                    color: '#003580',
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)'
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=1841600&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  mt: 2,
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)'
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 5 */}
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
                
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=The+Millennials+Shibuya,1+Chome-20-13+Jinnan+Shibuya+Ward+Tokyo+150-0041+Japan', '_blank', 'noopener,noreferrer')}
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
                  top: 12,
                  left: 12
                }}>
                  <Chip 
                    label="2-Star Hotel" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }} 
                  />
                </Box>

                {/* Best For Chip - Top Right */}
                <Box sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12
                }}>
                  <Chip 
                    label="Best for Budget Travellers & Solo Adventurers" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }} 
                  />
                </Box>

                {/* Review Rating - Below Best For Chip on Right */}
                <Box sx={{
                  position: 'absolute',
                  top: 52,
                  right: 12
                }}>
                  <Chip 
                    label="86 reviews" 
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#2c5aa0',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
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
                  alt="Park Hyatt Tokyo Room"
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
                A capsule hotel reimagined for the modern traveller. This isn't your typical cramped capsule—think of it as a stylish pod hotel with a vibrant social atmosphere and smart technology.
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
                The price point is unbeatable for Shibuya. Each pod comes with a tablet to control lighting, alarms, and even move the bed position. The common lounge is great for meeting other travellers. Free breakfast included. Showers and facilities are clean and modern. Perfect if you're spending most of your time exploring and just need a safe, comfortable place to sleep.
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
                You're in Shibuya, so endless options. For budget eats, try Yoshinoya or Matsuya for gyudon (beef bowl) under SGD $7. Conveyor belt sushi chains like Kura Sushi offer plates from SGD $1.50. Family Mart and 7-Eleven nearby for quick onigiri and bento boxes.
              </Typography>

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
                  Approximate Price: SGD $80 - $90 per night
                </Typography>
              </Box>

                           {/* <Button 
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Check Availability Here
              </Button>
              {/* Affiliate Link */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
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
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)'
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
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)'
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
                  mt: 2,
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)'
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 6 */}
          <Card id="peninsula" sx={{ 
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
                      The Peninsula Tokyo
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
                      navigator.clipboard.writeText('1 Chome-8-1, Yurakucho, Chiyoda Ward, Tokyo, 100-0006, Japan');
                      // Optional: You can add a toast notification here
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
                      1 Chome-8-1, Yurakucho, Chiyoda Ward, Tokyo, 100-0006, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                {/* Google Maps Button */}
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=The+Peninsula+Tokyo,1+Chome-8-1+Yurakucho+Chiyoda+Ward+Tokyo+100-0006+Japan', '_blank', 'noopener,noreferrer')}
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
                  High demand — book well in advance for Imperial Palace views
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
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/The+Peninsula+Tokyo+2nd+Image.webp"
                  alt="The Peninsula Tokyo"
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
                    label="5-Star Hotel" 
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
                    label="Best for Luxury Travellers & Business" 
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
                    label="397 reviews" 
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
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/The+Peninsula+Tokyo.webp"
                  alt="Park Hyatt Tokyo Room"
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
                    onClick={() => window.open('https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=987089&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911', '_blank', 'noopener,noreferrer')}
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
                Facing the Imperial Palace gardens in the prestigious Marunouchi district, The Peninsula Tokyo represents the pinnacle of luxury hospitality. This is where elegance meets Japanese precision.
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
                Everything here screams luxury—from the spacious marble bathrooms to the personalised service. Rooms overlook either the Imperial Palace or Hibiya Park. The spa is exceptional, featuring traditional Japanese treatments. Peter restaurant offers contemporary French cuisine. Perfect for special occasions, honeymoons, or business stays. The location near Tokyo Station also means easy access to the Shinkansen for day trips.
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
                Ginza, Tokyo's premier dining district, is 15 minutes away on foot. Kyubey for high-end sushi. Ginza Kojyu for kaiseki (traditional multi-course meal). For something more casual, Tonkatsu Maisen serves excellent tonkatsu. The hotel's own restaurants are also outstanding.
              </Typography>

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
                  Approximate Price: SGD $900 - $1,500 per night
                </Typography>
              </Box>

                           {/* <Button 
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Check Availability Here
              </Button>
              {/* Affiliate Link */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hid=497719"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)'
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/4rrGEo6"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#003580',
                    color: '#003580',
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)'
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=987089&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  mt: 2,
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)'
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>

          {/* Hotel 7 */}
          <Card id="mitsui-garden" sx={{ 
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
                      Mitsui Garden Hotel Jingugaien Tokyo Premier
                    </Typography>
                  </Stack>
                  
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
                      navigator.clipboard.writeText('11-3 Kasumigaokamachi, Shinjuku City, Shinjuku Ward, Tokyo, 160-0013, Japan');
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
                      11-3 Kasumigaokamachi, Shinjuku City, Shinjuku Ward, Tokyo, 160-0013, Japan
                      <ContentCopy sx={{ fontSize: { xs: 12, sm: 14 }, ml: 0.5 }} />
                    </Typography>
                  </Stack>
                </Box>
                
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Map />}
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Mitsui+Garden+Hotel+Jingugaien+Tokyo+Premier,11-3+Kasumigaokamachi+Shinjuku+City+Shinjuku+Ward+Tokyo+160-0013+Japan', '_blank', 'noopener,noreferrer')}
                  sx={{
                    bgcolor: 'white',
                    color: '#2c5aa0',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                    width: { xs: '100%', md: 'auto' },
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
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
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Mitsui+Garden+Hotel.webp"
                  alt="Mitsui Garden Hotel Jingugaien Tokyo Premier"
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
                    label="5-Star Hotel" 
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
                    label="Best for Mid-Range Comfort" 
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
                    label="1032 reviews" 
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
                  image="https://azholidays.s3.ap-southeast-1.amazonaws.com/blogs/Mitsui+Garden+Hotel+2nd+Image.webp"
                  alt="Park Hyatt Tokyo Room"
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
                    onClick={() => window.open('https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=35541585&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911', '_blank', 'noopener,noreferrer')}
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
                Opened in 2019, this hotel strikes the perfect balance between quality and affordability. Located near Meiji Jingu Gaien (the outer gardens of Meiji Shrine), it offers a green escape in central Tokyo.
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
                The rooms are larger than typical Tokyo hotels, with contemporary design and comfortable beds. The public bath on the top floor is a lovely touch—relax Japanese-style after a long day of exploring. Close to Aoyama and Omotesando for upscale shopping, yet near Shinjuku Gyoen National Garden for peaceful morning walks. Great value for money with reliable quality.
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
                Gaien area has hidden gems. Torigin for yakitori sets. Aoyama Kawakami-an for handmade soba noodles. Bills Omotesando for famous ricotta pancakes (breakfast spot!). Walk to Harajuku for trendy cafes and Takeshita Street's crepe stands.
              </Typography>

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
                  Approximate Price: SGD $230 - $285 per night
                </Typography>
              </Box>

                           {/* <Button 
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dff 100%)',
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Check Availability Here
              </Button>
              {/* Affiliate Link */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                <Button 
                  component="a"
                  href="https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=1751161&hid=7028111"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#b71c1c',
                      background: 'rgba(211,47,47,0.05)'
                    }
                  }}
                >
                  Check Availability on Agoda
                </Button>

                <Button 
                  component="a"
                  href="https://tidd.ly/46LL14V"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderColor: '#003580',
                    color: '#003580',
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#00224f',
                      background: 'rgba(0,53,128,0.05)'
                    }
                  }}
                >
                  Check Availability on Booking.com
                </Button>
              </Stack>

              <Button 
                component="a"
                href="https://www.trip.com/hotels/detail/?cityEnName=Tokyo&cityId=228&hotelId=35541585&Allianceid=7838195&SID=295303450&trip_sub1=&trip_sub3=D12522911"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{ 
                  mt: 2,
                  borderColor: '#2c5aa0',
                  color: '#2c5aa0',
                  py: { xs: 1.2, sm: 1.5 },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    borderColor: '#1e3d6f',
                    background: 'rgba(44,90,160,0.05)'
                  }
                }}
              >
                Check Availability on Trip.com
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Travel Tips Section */}
        <Box id="travel-tips" sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            color: '#1a1a1a',
            mb: 4,
            pb: 2,
            borderBottom: '3px solid #2c5aa0'
          }}>
            Essential Travel Tips for Singaporeans
          </Typography>

          <Card sx={{ 
            mb: 4,
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e0e7ff',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Train sx={{ fontSize: 36, color: '#2c5aa0' }} />
                <Typography variant="h3" sx={{ 
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.4rem',
                  color: '#1a1a1a'
                }}>
                  Getting Around Tokyo
                </Typography>
              </Stack>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                JR Pass – Is It Worth It?
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                For a Tokyo-only trip, the JR Pass is usually <strong>not worth it</strong>. However, if you're planning day trips to places like Nikko, Hakone, or even Kyoto, then the 7-day JR Pass (around SGD $450) makes sense. Within Tokyo itself, get a <strong>Pasmo or Suica card</strong>—rechargeable IC cards that work on all trains, buses, and even for vending machines and convenience store purchases. For detailed train routes and schedules, check the official <Link href="https://www.tokyometro.jp/en/" target="_blank" rel="noopener noreferrer" sx={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Tokyo Metro website</Link>.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                From Narita/Haneda Airport to Your Hotel
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                <strong>From Narita Airport:</strong> Take the Narita Express (N'EX) to Tokyo, Shinjuku, or Shibuya (60-90 minutes, around SGD $45). The Keisei Skyliner is slightly cheaper and faster to Ueno.
                <br /><br />
                <strong>From Haneda Airport:</strong> Much closer to central Tokyo. The Tokyo Monorail or Keikyu Line gets you to Shinagawa or Hamamatsucho in 15-30 minutes (SGD $7-12). Haneda is more convenient if you have a choice. For official transportation guides and travel tips, visit the <Link href="https://www.japan.travel/en/" target="_blank" rel="noopener noreferrer" sx={{ color: '#2c5aa0', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Japan National Tourism Organization</Link>.
              </Typography>

              <Typography variant="h4" sx={{ 
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.1rem',
                color: '#2c5aa0',
                mb: 2
              }}>
                Google Maps Is Your Best Friend
              </Typography>
              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555'
              }}>
                Tokyo's train system looks complicated but Google Maps makes it dead simple. Just enter your destination and it'll tell you exactly which line to take, which platform, and what time. Follow it religiously and you won't get lost.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ 
            mb: 4,
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e0e7ff',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <LocalDining sx={{ fontSize: 36, color: '#2c5aa0' }} />
                <Typography variant="h3" sx={{ 
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.4rem',
                  color: '#1a1a1a'
                }}>
                  Money Matters
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3
              }}>
                Japan is still surprisingly cash-based. While major hotels and department stores accept cards, many small restaurants, shops, and attractions are cash-only. Withdraw yen from 7-Eleven ATMs (they're everywhere and accept foreign cards with minimal fees). Budget around <strong>SGD $80-150 per day per person</strong> for meals, transport, and attractions.
              </Typography>

              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555'
              }}>
                <strong>Exchange Rate:</strong> As of 2026, 1 SGD ≈ 110 JPY (this fluctuates, so check current rates before your trip).
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ 
            mb: 4,
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e0e7ff',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Flight sx={{ fontSize: 36, color: '#2c5aa0' }} />
                <Typography variant="h3" sx={{ 
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.4rem',
                  color: '#1a1a1a'
                }}>
                  Best Time to Visit
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 2
              }}>
                <strong>Spring (March-May):</strong> Cherry blossom season is magical but extremely crowded and expensive. Book 6+ months ahead.
              </Typography>

              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 2
              }}>
                <strong>Summer (June-August):</strong> Hot and humid (think Singapore weather). Rainy season in June. Good for festivals.
              </Typography>

              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 2
              }}>
                <strong>Autumn (September-November):</strong> Perfect weather, autumn foliage is stunning. November is ideal.
              </Typography>

              <Typography variant="body2" sx={{ 
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#555'
              }}>
                <strong>Winter (December-February):</strong> Cold but clear skies. Great for skiing day trips. Cheapest season for hotels.
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ 
            bgcolor: '#fff4e5',
            p: 3,
            borderRadius: '16px',
            borderLeft: '4px solid #ff9800',
            mb: 4
          }}>
            <Typography variant="body1" sx={{ 
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              lineHeight: 1.8,
              color: '#e65100',
              fontWeight: 500
            }}>
              <strong>WiFi Tip:</strong> Rent a pocket WiFi device at the airport (around SGD $10/day) or get a Japan eSIM before your trip. Hotel WiFi can be unreliable, and you'll need internet for navigation.
            </Typography>
          </Box>
        </Box>

        {/* FAQ Section */}
        <Box id="faq" sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            color: '#1a1a1a',
            mb: 4,
            pb: 2,
            borderBottom: '3px solid #2c5aa0'
          }}>
            Frequently Asked Questions
          </Typography>

          <Stack spacing={2}>
            <Accordion sx={{ 
              borderRadius: '12px !important',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              '&:before': { display: 'none' },
              mb: 1
            }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.05rem'
                }}>
                  Do I need a visa to visit Japan from Singapore?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  No! Singapore passport holders enjoy visa-free entry to Japan for tourism stays up to 90 days. Just ensure your passport is valid for at least 6 months from your date of entry.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ 
              borderRadius: '12px !important',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              '&:before': { display: 'none' },
              mb: 1
            }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.05rem'
                }}>
                  How long is the flight from Singapore to Tokyo?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Direct flights from Singapore to Tokyo take approximately 6.5 to 7 hours. Airlines like Singapore Airlines, ANA, and JAL operate daily direct flights to both Narita and Haneda airports.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ 
              borderRadius: '12px !important',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              '&:before': { display: 'none' },
              mb: 1
            }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.05rem'
                }}>
                  What's the best area to stay in Tokyo for first-time visitors?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Shinjuku is ideal for first-timers due to its central location and excellent transport connections. Shibuya is great if you want a more youthful, energetic vibe. Both areas have plenty of hotels, restaurants, and are well-connected to major attractions.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ 
              borderRadius: '12px !important',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              '&:before': { display: 'none' },
              mb: 1
            }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.05rem'
                }}>
                  Are Tokyo hotels expensive?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Tokyo has options for every budget. Budget capsule hotels start from SGD $45/night, mid-range hotels average SGD $200-400/night, and luxury hotels range from SGD $600-1,500+/night. Book early for better rates, especially during cherry blossom and autumn seasons.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ 
              borderRadius: '12px !important',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              '&:before': { display: 'none' },
              mb: 1
            }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.05rem'
                }}>
                  Should I book hotels in advance or upon arrival?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Definitely book in advance! Tokyo is a popular destination year-round. Booking 3-4 months ahead gives you better rates and availability. During peak seasons (cherry blossoms, Golden Week in late April/early May, autumn), book 6+ months ahead or expect to pay premium prices.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ 
              borderRadius: '12px !important',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              '&:before': { display: 'none' },
              mb: 1
            }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ 
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.05rem'
                }}>
                  Do hotels in Tokyo have family rooms?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ 
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  Hotel rooms in Tokyo are generally smaller than what Singaporeans are used to. However, many modern hotels offer family rooms that can accommodate 3-4 people. Look for hotels in Asakusa or newer properties like Richmond Hotel Premier Asakusa International which specifically cater to families.
                </Typography>
              </AccordionDetails>
            </Accordion>
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
            Ready to Book Your Tokyo Adventure?
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 3
          }}>
            Tokyo is an incredible city that offers something for every type of traveller. Whether you're seeking luxury, cultural immersion, family fun, or budget-friendly adventures, there's a perfect hotel waiting for you.
          </Typography>

          <Typography variant="body1" sx={{ 
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#333',
            mb: 4
          }}>
            Remember: the key to a great Tokyo trip is location. Choose a hotel near a major station in an area that matches your travel style, and you'll save time and energy for what really matters—experiencing everything this amazing city has to offer.
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
              Start Planning Your Tokyo Trip Today
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
            Last updated: February 2026 | Prices are approximate and subject to change based on season and availability.
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

export default TokyoHotelsBlog;
