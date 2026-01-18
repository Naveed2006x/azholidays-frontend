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
import { Search, AccessTime, Person, ArrowForward, Favorite, BookmarkAdd } from '@mui/icons-material';

// --- Mock Data ---
const blogPosts = [
  {
    id: 1,
    title: "Top 10 Hidden Gems in Southeast Asia",
    excerpt: "Discover the untouched beaches and secret temples that usually stay off the tourist radar.",
    image: "https://images.unsplash.com/photo-1552465011-b4e30bf6e79a?w=800&h=600&fit=crop",
    author: "Sarah Jenkins",
    date: "Nov 20, 2023",
    category: "Destinations",
    readTime: "5 min",
    likes: 42,
    saved: true
  },
  {
    id: 2,
    title: "A Culinary Journey Through Italy",
    excerpt: "From authentic Neapolitan pizza to rich Tuscan wines, explore the flavors of Italy.",
    image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&h=600&fit=crop",
    author: "Mario Rossi",
    date: "Nov 18, 2023",
    category: "Food & Drink",
    readTime: "8 min",
    likes: 28,
    saved: false
  },
  {
    id: 3,
    title: "Essential Packing Tips for Solo Travelers",
    excerpt: "Learn how to pack light and smart for your next solo adventure around the globe.",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop",
    author: "Alex Chen",
    date: "Nov 15, 2023",
    category: "Travel Tips",
    readTime: "4 min",
    likes: 56,
    saved: true
  },
  {
    id: 4,
    title: "The Ultimate Guide to Mountain Trekking",
    excerpt: "Everything you need to know before conquering your first major peak.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
    author: "David Smith",
    date: "Nov 10, 2023",
    category: "Adventure",
    readTime: "10 min",
    likes: 89,
    saved: false
  },
  {
    id: 5,
    title: "Budget Friendly City Breaks in Europe",
    excerpt: "Experience culture, history, and nightlife without breaking the bank.",
    image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&h=600&fit=crop",
    author: "Emma Watson",
    date: "Nov 05, 2023",
    category: "Destinations",
    readTime: "6 min",
    likes: 34,
    saved: true
  },
  {
    id: 6,
    title: "Sustainable Tourism: How to Travel Green",
    excerpt: "Practical steps to reduce your carbon footprint while exploring the world.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    author: "Green Earth",
    date: "Nov 01, 2023",
    category: "Travel Tips",
    readTime: "7 min",
    likes: 71,
    saved: false
  },
  {
    id: 7,
    title: "Night Photography: Capturing Cities After Dark",
    excerpt: "Master the art of night photography in urban environments around the world.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
    author: "James Wilson",
    date: "Oct 28, 2023",
    category: "Photography",
    readTime: "9 min",
    likes: 45,
    saved: true
  },
  {
    id: 8,
    title: "Luxury Resorts with Private Beaches",
    excerpt: "Experience ultimate privacy and luxury at these exclusive beachfront resorts.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    author: "Lisa Brown",
    date: "Oct 25, 2023",
    category: "Luxury",
    readTime: "6 min",
    likes: 23,
    saved: false
  }
];

const categories = ["All", "Destinations", "Food & Drink", "Travel Tips", "Adventure", "Photography", "Luxury"];

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({
    1: true, 3: true, 5: true, 7: true
  });

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleSave = (postId) => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
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
                label="Travel Blog" 
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
                Travel Stories & Tips
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
                Discover inspiring stories, expert tips, and breathtaking destinations from around the globe
              </Typography>
            </Box>
          </Fade>

          {/* Enhanced Search Bar */}
          <Fade in timeout={1000}>
            <Box sx={{ maxWidth: { xs: '100%', sm: '600px' }, mx: 'auto', px: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search destinations, tips, stories..."
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

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 },py: { xs: 2, sm: 3, md: 4 } }}>
        
        {/* Category Filter */}
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
            {categories.map((cat, index) => (
              <Grow in timeout={500 + index * 100} key={cat}>
                <Chip
                  label={cat}
                  onClick={() => setSelectedCategory(cat)}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    py: { xs: 2.5, md: 3 },
                    px: { xs: 2, md: 3 },
                    bgcolor: selectedCategory === cat ? '#2c5aa0' : 'white',
                    color: selectedCategory === cat ? 'white' : '#555',
                    border: '2px solid',
                    borderColor: selectedCategory === cat ? '#2c5aa0' : '#e0e7ff',
                    fontWeight: selectedCategory === cat ? 700 : 600,
                    boxShadow: selectedCategory === cat ? 
                      '0 10px 30px rgba(44, 90, 160, 0.2)' : 
                      '0 4px 15px rgba(44, 90, 160, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: selectedCategory === cat ? '#1e3d6f' : 'white',
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

        {/* Blog Grid using CSS Grid */}
        {filteredPosts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
            marginBottom: '60px'
          }}
          className="blog-grid"
          >
            <style>{`
              @media (max-width: 1200px) {
                .blog-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
              @media (max-width: 768px) {
                .blog-grid {
                  grid-template-columns: 1fr !important;
                  gap: 24px !important;
                  padding: 0 16px;
                }
              }
            `}</style>
            {filteredPosts.map((post, index) => (
              <Grow in timeout={800 + index * 100} key={post.id}>
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
                      '& .blog-card-image': {
                        transform: 'scale(1.08)'
                      },
                      '& .read-more-button': {
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
                        className="blog-card-image"
                        image={post.image}
                        alt={post.title}
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
                      
                      {/* Category Badge */}
                      <Chip 
                        label={post.category} 
                        size="small"
                        sx={{ 
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: 'rgba(255,255,255,0.95)',
                          color: '#2c5aa0',
                          fontWeight: 700,
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.75rem',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          backdropFilter: 'blur(10px)',
                          zIndex: 2
                        }} 
                      />
                      
                      {/* Action Buttons */}
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 16, 
                        left: 16,
                        display: 'flex',
                        gap: 1,
                        zIndex: 2
                      }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleLike(post.id)}
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.95)',
                            '&:hover': { bgcolor: 'white' }
                          }}
                        >
                          <Favorite sx={{ 
                            fontSize: 18, 
                            color: likedPosts[post.id] ? '#ff4757' : '#888'
                          }} />
                        </IconButton>
                        <IconButton 
                          size="small"
                          onClick={() => handleSave(post.id)}
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.95)',
                            '&:hover': { bgcolor: 'white' }
                          }}
                        >
                          <BookmarkAdd sx={{ 
                            fontSize: 18, 
                            color: savedPosts[post.id] ? '#2c5aa0' : '#888'
                          }} />
                        </IconButton>
                      </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      {/* Meta Info */}
                      <Stack 
                        direction="row" 
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ 
                          mb: 2, 
                          color: '#666',
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.85rem'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTime sx={{ fontSize: 16, color: '#2c5aa0' }} /> 
                            <Typography variant="caption" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                              {post.readTime}
                            </Typography>
                          </Box>
                          <Box sx={{ width: '4px', height: '4px', borderRadius: '50%', bgcolor: '#d0d7ff' }} />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Person sx={{ fontSize: 16, color: '#2c5aa0' }} /> 
                            <Typography variant="caption" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                              {post.author}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#888', fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>
                          {post.date}
                        </Typography>
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
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {post.title}
                      </Typography>
                      
                      {/* Excerpt */}
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
                        {post.excerpt}
                      </Typography>
                    </CardContent>

                    {/* Footer */}
                    <Box sx={{ 
                      p: 3, 
                      pt: 2,
                      borderTop: '1px solid #f0f0f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Button 
                        className="read-more-button"
                        size="medium"
                        endIcon={<ArrowForward />}
                        sx={{ 
                          color: '#666',
                          textTransform: 'none',
                          fontWeight: 600,
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          p: 0,
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
                        Read More
                      </Button>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Favorite sx={{ fontSize: 16, color: '#ff4757' }} />
                          <Typography variant="caption" sx={{ fontWeight: 600, color: '#666', fontFamily: "'Poppins', sans-serif" }}>
                            {post.likes + (likedPosts[post.id] ? 1 : 0)}
                          </Typography>
                        </Box>
                      </Stack>
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
                No articles found
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
                We couldn't find any articles matching your search. Try different keywords or browse all categories.
              </Typography>
              <Button 
                variant="contained"
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
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
                Browse All Articles
              </Button>
            </Box>
          </Fade>
        )}
        
        {/* Results Count */}
        {filteredPosts.length > 0 && (
          <Fade in timeout={500}>
            <Box sx={{ 
              textAlign: 'center',
              color: '#666',
              fontFamily: "'Poppins', sans-serif"
            }}>
              <Typography variant="body1" sx={{ fontFamily: "'Poppins', sans-serif" }}>
                Showing <strong>{filteredPosts.length}</strong> of <strong>{blogPosts.length}</strong> articles
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Blogs;