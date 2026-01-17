import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Chip,
    CircularProgress,
    Alert,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
    CardActions,
    Rating
} from '@mui/material';
import {
    Search,
    LocationOn
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SingaporeAttractions = () => {
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('popular');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('SG');

    const navigate = useNavigate();
    const itemsPerPage = 12;

    const fontStyle = {
        fontFamily: "'Poppins', sans-serif",
    };

    // CSS Grid styles
    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '24px',
        width: '100%',
        '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '16px'
        },
        '@media (max-width: 480px)': {
            gridTemplateColumns: '1fr',
            gap: '16px'
        }
    };

    const API_BASE_URL = 'http://localhost:3000/api/attractions';

    const fetchAttractions = async (page = 1) => {
        try {
            setLoading(true);
            setError('');

            const response = await axios.get(`${API_BASE_URL}/products`, {
                params: {
                    search: searchTerm || undefined,
                    countryCode: selectedCountry,
                    page: page,
                    limit: itemsPerPage
                },
                timeout: 15000
            });

            if (response.data.success) {
                const attractionsData = response.data.data || [];
                const filteredAttractions = attractionsData.filter(attraction =>
                    attraction.category === 'Attractions' ||
                    !attraction.category ||
                    attraction.category?.toLowerCase().includes('attraction') ||
                    attraction.category?.toLowerCase().includes('activity') ||
                    attraction.category?.toLowerCase().includes('tour')
                );

                setAttractions(filteredAttractions);
                const totalItems = response.data.pagination?.total || filteredAttractions.length;
                setTotalPages(Math.ceil(totalItems / itemsPerPage));
                sortAttractions(filteredAttractions, sortBy);
            } else {
                throw new Error(response.data.error || 'Failed to load attractions');
            }
        } catch (error) {
            console.error('❌ Error fetching attractions:', error);
            setError('Failed to load attractions. Please try again later.');
            setSnackbarOpen(true);
            setAttractions([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/countries`);
            if (response.data.success) {
                setCountries(response.data.data || []);
            } else {
                setCountries([
                    { code: 'SG', name: 'Singapore' },
                    { code: 'MY', name: 'Malaysia' },
                    { code: 'TH', name: 'Thailand' },
                    { code: 'ID', name: 'Indonesia' },
                    { code: 'VN', name: 'Vietnam' }
                ]);
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
            setCountries([
                { code: 'SG', name: 'Singapore' },
                { code: 'MY', name: 'Malaysia' },
                { code: 'TH', name: 'Thailand' }
            ]);
        }
    };

    const sortAttractions = (data, sortType) => {
        const sortedData = [...data];
        switch (sortType) {
            case 'price-low':
                sortedData.sort((a, b) => {
                    const priceA = a.fromPrice || a.originalPrice || 0;
                    const priceB = b.fromPrice || b.originalPrice || 0;
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                sortedData.sort((a, b) => {
                    const priceA = a.fromPrice || a.originalPrice || 0;
                    const priceB = b.fromPrice || b.originalPrice || 0;
                    return priceB - priceA;
                });
                break;
            case 'name':
                sortedData.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                break;
            case 'popular':
                sortedData.sort((a, b) => {
                    const scoreA = (a.isBestSeller ? 3 : 0) + (a.isRecommended ? 2 : 0) + (a.rating || 0);
                    const scoreB = (b.isBestSeller ? 3 : 0) + (b.isRecommended ? 2 : 0) + (b.rating || 0);
                    return scoreB - scoreA;
                });
                break;
            default:
                break;
        }
        setAttractions(sortedData);
    };

    const handleSearch = useCallback(() => {
        setCurrentPage(1);
        fetchAttractions(1);
    }, [searchTerm, selectedCountry]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (event) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        sortAttractions(attractions, newSortBy);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        fetchAttractions(value);
    };

    const viewAttractionDetails = (attractionId) => {
        navigate(`/attraction/${attractionId}`);
    };

    const formatPrice = (price) => {
        if (price === null || price === undefined || price === 0) return 'Price on request';
        return `S$ ${parseFloat(price).toFixed(2)}`;
    };

    const getImageUrl = useCallback((attraction) => {
        // Priority 1: Use the GlobalTix image URL directly if available
        if (attraction.imageUrl && attraction.imageUrl.includes('globaltix.com')) {
            return attraction.imageUrl;
        }
        
        // Priority 2: Use image UUID to construct GlobalTix URL
        if (attraction.image && typeof attraction.image === 'string') {
            // Check if it's a UUID format
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (uuidRegex.test(attraction.image)) {
                return `https://product-image.globaltix.com/stg-gtImage/${attraction.image}`;
            }
            // If it's already a full URL, use it
            if (attraction.image.startsWith('http')) {
                return attraction.image;
            }
        }
        
        // Priority 3: Use images array if available
        if (attraction.images && attraction.images.length > 0) {
            const firstImage = attraction.images[0];
            if (typeof firstImage === 'string') {
                if (firstImage.includes('globaltix.com')) {
                    return firstImage;
                }
                // Check if it's a UUID
                const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                if (uuidRegex.test(firstImage)) {
                    return `https://product-image.globaltix.com/stg-gtImage/${firstImage}`;
                }
                if (firstImage.startsWith('http')) {
                    return firstImage;
                }
            }
        }
        
        // Fallback: Use placeholder image
        return 'https://picsum.photos/200/300/?blur';
    }, []);

    const getLowestPrice = useCallback((attraction) => {
        if (attraction.fromPrice) return attraction.fromPrice;
        if (attraction.originalPrice) return attraction.originalPrice;
        return 0;
    }, []);

    const getLocation = useCallback((attraction) => {
        if (attraction.city && attraction.city !== 'Singapore') return `${attraction.city}, ${attraction.country}`;
        if (attraction.city) return attraction.city;
        if (attraction.location) return attraction.location;
        return attraction.country || 'Singapore';
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAttractions(currentPage);
        }, 300);
        return () => clearTimeout(timer);
    }, [selectedCountry, currentPage]);

    useEffect(() => {
        fetchAttractions(1);
        fetchCountries();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Updated styles with Poppins font and new color scheme
    const textFieldStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            ...fontStyle,
            backgroundColor: 'white',
            '&:hover fieldset': {
                borderColor: '#2c5aa0',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#2c5aa0',
                borderWidth: '2px',
            },
        },
        '& .MuiInputLabel-root': {
            ...fontStyle,
            color: '#64748b',
        },
        '& .MuiInputBase-input': {
            ...fontStyle,
        }
    };

    const selectStyle = {
        borderRadius: '10px',
        ...fontStyle,
        backgroundColor: 'white',
        '&:hover fieldset': {
            borderColor: '#2c5aa0',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#2c5aa0',
            borderWidth: '2px',
        },
        '& .MuiInputLabel-root': {
            ...fontStyle,
            color: '#64748b',
        },
        '& .MuiSelect-select': {
            ...fontStyle,
        }
    };

    const buttonStyle = {
        ...fontStyle,
        borderRadius: '10px',
        textTransform: 'none',
        fontWeight: 600,
        boxShadow: '0 4px 10px rgba(44, 90, 160, 0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 15px rgba(44, 90, 160, 0.3)',
        }
    };

    const chipStyle = {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
    };

    // Loading State UI
    if (loading && attractions.length === 0) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f8fafc',
                width: '100vw', // Ensure full viewport width
                margin: 0,
                padding: 0
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress
                        size={60}
                        sx={{
                            color: '#2c5aa0',
                            mb: 3
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            ...fontStyle,
                            color: '#333',
                            fontWeight: 600,
                        }}
                    >
                        Loading Amazing Attractions...
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            background: '#f8fafc',
            margin: 0,
            padding: 0,
            width: '100vw', // Ensure full viewport width
            overflowX: 'hidden', // Prevent horizontal scroll
            ...fontStyle
        }}>

            {/* Main content container with full width background */}
            <Box sx={{ 
                width: '100%',
                minHeight: '100vh',
                background: '#f8fafc',
                margin: 0,
                padding: 0
            }}>
                
                {/* Content wrapper with max width */}
                <Box sx={{ 
                    maxWidth: '1200px', 
                    margin: '0 auto', 
                    mb: 6,
                    px: { xs: 2, sm: 3, md: 4 } // Adjusted padding
                }}>

                    <Box sx={{ mb: 3, mt: 6 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                ...fontStyle,
                                fontWeight: 700,
                                mb: 1,
                                color: '#1e293b'
                            }}
                        >
                            Travelers' favorite choices
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                ...fontStyle,
                                color: '#64748b',
                                fontSize: '1rem',
                                fontWeight: 400
                            }}
                        >
                            Discover incredible experiences and create unforgettable memories
                        </Typography>
                    </Box>

                    {/* Search and Filter Bar */}
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        mt: 3,
                        mb: 5
                    }}>
                        <TextField
                            placeholder="Search attractions, activities..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                            sx={{
                                ...textFieldStyle,
                                flexGrow: 1,
                                minWidth: { xs: '100%', sm: 'auto' },
                                maxWidth: 400
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: '#64748b' }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    fontSize: '0.95rem',
                                    ...fontStyle
                                }
                            }}
                        />

                        <FormControl sx={{ minWidth: 150 }} size="small">
                            <InputLabel sx={{ ...fontStyle }}>Country</InputLabel>
                            <Select
                                value={selectedCountry}
                                label="Country"
                                onChange={handleCountryChange}
                                sx={selectStyle}
                            >
                                {countries.map((country) => (
                                    <MenuItem
                                        key={country.code}
                                        value={country.code}
                                        sx={fontStyle}
                                    >
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            onClick={handleSearch}
                            sx={{
                                ...buttonStyle,
                                backgroundColor: '#2c5aa0',
                                color: 'white',
                                px: 4,
                                py: 1.2,
                                '&:hover': {
                                    backgroundColor: '#314f7cff'
                                }
                            }}
                        >
                            Search
                        </Button>
                    </Box>

                    {/* All Attractions Grid */}
                    <Box sx={{ mb: 3 }}>
                        <Box sx={gridStyles}>
                            {attractions.map((attraction) => {
                                const lowestPrice = getLowestPrice(attraction);
                                const location = getLocation(attraction);
                                const imageUrl = getImageUrl(attraction);

                                return (
                                    <Card
                                        key={attraction.id}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-6px)',
                                                boxShadow: '0 12px 30px rgba(44, 90, 160, 0.25)'
                                            }
                                        }}
                                    >
                                        {/* Image Section */}
                                        <Box sx={{ position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    width: '100%',
                                                    height: 180,
                                                    objectFit: 'cover',
                                                    borderTopLeftRadius: '12px',
                                                    borderTopRightRadius: '12px'
                                                }}
                                                image={imageUrl}
                                                alt={attraction.name}
                                            />
                                            {/* Overlay Badges */}
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 10,
                                                left: 10,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 0.8
                                            }}>
                                                {attraction.isBestSeller && (
                                                    <Chip
                                                        label="Best Seller"
                                                        size="small"
                                                        sx={{
                                                            ...chipStyle,
                                                            backgroundColor: '#2c5aa0',
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem',
                                                            height: 26,
                                                            px: 1.2,
                                                            borderRadius: '6px'
                                                        }}
                                                    />
                                                )}
                                                {attraction.isRecommended && (
                                                    <Chip
                                                        label="Recommended"
                                                        size="small"
                                                        sx={{
                                                            ...chipStyle,
                                                            backgroundColor: '#2c5aa0',
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem',
                                                            height: 26,
                                                            px: 1.2,
                                                            borderRadius: '6px'
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Box>

                                        {/* Content Area */}
                                        <CardContent sx={{ flexGrow: 1, p: 2.5, pb: 1 }}>
                                            {/* Location */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                                <LocationOn sx={{ fontSize: 16, color: '#64748b', mr: 0.5 }} />
                                                <Typography variant="caption" sx={{ ...fontStyle, color: '#64748b', fontSize: '0.8rem', fontWeight: 400 }}>
                                                    {location}
                                                </Typography>
                                            </Box>

                                            {/* Title */}
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    ...fontStyle,
                                                    fontWeight: 600,
                                                    color: '#1e293b',
                                                    mb: 1,
                                                    fontSize: '1rem',
                                                    lineHeight: 1.4,
                                                    height: 40,
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}
                                            >
                                                {attraction.name}
                                            </Typography>

                                            {/* Rating */}
                                            {attraction.rating && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                                                    <Rating
                                                        value={attraction.rating}
                                                        readOnly
                                                        precision={0.5}
                                                        size="small"
                                                        sx={{ fontSize: '1.1rem', color: '#f59e0b' }}
                                                    />
                                                    <Typography variant="body2" sx={{ ...fontStyle, color: '#64748b', fontSize: '0.85rem', fontWeight: 400 }}>
                                                        {attraction.rating} ({attraction.reviewCount || 0} reviews)
                                                    </Typography>
                                                </Box>
                                            )}

                                            {/* Features */}
                                            <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mb: 1 }}>
                                                {attraction.isInstantConfirmation && (
                                                    <Chip
                                                        label="Instant Confirmation"
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            ...chipStyle,
                                                            fontSize: '0.65rem',
                                                            height: 22,
                                                            borderColor: '#2c5aa0',
                                                            color: '#2c5aa0',
                                                            borderRadius: '6px'
                                                        }}
                                                    />
                                                )}
                                                {attraction.isOpenDated && (
                                                    <Chip
                                                        label="Flexible Date"
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            ...chipStyle,
                                                            fontSize: '0.65rem',
                                                            height: 22,
                                                            borderColor: '#2c5aa0',
                                                            color: '#2c5aa0',
                                                            borderRadius: '6px'
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </CardContent>

                                        {/* Price and Action */}
                                        <CardActions sx={{ p: 2.5, pt: 0 }}>
                                            <Box sx={{ width: '100%' }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        ...fontStyle,
                                                        fontWeight: 700,
                                                        color: '#2c5aa0',
                                                        fontSize: '1.25rem',
                                                        mb: 0.5
                                                    }}
                                                >
                                                    {formatPrice(lowestPrice)}
                                                </Typography>
                                                {attraction.originalPrice && lowestPrice && attraction.originalPrice > lowestPrice && (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            ...fontStyle,
                                                            color: '#94a3b8',
                                                            textDecoration: 'line-through',
                                                            mb: 1,
                                                            fontWeight: 400
                                                        }}
                                                    >
                                                        S$ {parseFloat(attraction.originalPrice).toFixed(2)}
                                                    </Typography>
                                                )}
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() => viewAttractionDetails(attraction.id)}
                                                    sx={{
                                                        ...buttonStyle,
                                                        backgroundColor: '#2c5aa0',
                                                        color: 'white',
                                                        py: 1,
                                                        fontSize: '0.9rem',
                                                        '&:hover': {
                                                            backgroundColor: '#314f7cff'
                                                        }
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </Box>
                                        </CardActions>
                                    </Card>
                                );
                            })}
                        </Box>
                    </Box>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        ...fontStyle,
                                        borderRadius: '8px',
                                        '&.Mui-selected': {
                                            backgroundColor: '#2c5aa0',
                                            color: 'white',
                                            fontWeight: 600,
                                            '&:hover': {
                                                backgroundColor: '#314f7cff'
                                            }
                                        },
                                        '&:hover': {
                                            backgroundColor: '#e0e7ff'
                                        }
                                    }
                                }}
                            />
                        </Box>
                    )}

                    {/* No Results */}
                    {attractions.length === 0 && !loading && (
                        <Box sx={{
                            textAlign: 'center',
                            py: 10,
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                        }}>
                            <Typography variant="h5" sx={{ ...fontStyle, color: '#64748b', mb: 2, fontWeight: 600 }}>
                                No attractions found
                            </Typography>
                            <Typography variant="body1" sx={{ ...fontStyle, color: '#94a3b8', fontWeight: 400 }}>
                                Try adjusting your search terms or filters to find amazing experiences.
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCountry('SG');
                                    setCurrentPage(1);
                                    setSortBy('popular');
                                    handleSearch();
                                }}
                                sx={{
                                    ...buttonStyle,
                                    mt: 4,
                                    borderColor: '#2c5aa0',
                                    color: '#2c5aa0',
                                    '&:hover': {
                                        borderColor: '#314f7cff',
                                        color: '#314f7cff',
                                        backgroundColor: '#e0e7ff'
                                    },
                                    boxShadow: 'none'
                                }}
                            >
                                Reset Filters
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Error Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"
                    sx={fontStyle}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SingaporeAttractions;