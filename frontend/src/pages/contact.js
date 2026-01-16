import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Chip,
    Fade
} from '@mui/material';
import {
    Phone,
    Email,
    LocationOn,
    Schedule
} from '@mui/icons-material';
import MapWrapper from '../components/MapWrapper'; // Adjust path as needed
import Footer from '../components/Footer';
import { submitContactForm } from '../api/contact';
import { useToast } from '../contexts/ToastContext';

const Contact = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const officeLocation = {
        lat: 1.305561670313934,
        lng: 103.85288109551813
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await submitContactForm(formData);

        if (result.success) {
            showToast(result.data?.message || 'Thank you for your message! We\'ll get back to you soon.', 'success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } else {
            showToast(result.error || 'Something went wrong!', 'error');
        }
    };

    const contactInfo = [
        {
            icon: <Phone sx={{ fontSize: 40, color: '#2c5aa0' }} />,
            title: 'Phone',
            details: '+65 6297 0786',
            description: 'Whatsapp | +65 9126 3786'
        },
        {
            icon: <Email sx={{ fontSize: 40, color: '#2c5aa0' }} />,
            title: 'Email',
            details: 'enquiry@azholidays.com.sg',
            description: 'Send us your query anytime!'
        },
        {
            icon: <LocationOn sx={{ fontSize: 40, color: '#2c5aa0' }} />,
            title: 'Office',
            details: '113 Dunlop Street',
            description: 'Singapore 209432'
        },
        {
            icon: <Schedule sx={{ fontSize: 40, color: '#2c5aa0' }} />,
            title: 'Business Hours',
            details: 'Monday - Sunday',
            description: '10:30 AM - 9:30 PM'
        }
    ];

    return (
        <Box sx={{ bgcolor: '#fafcff', minHeight: '90vh', background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%)' }}>
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
                                label="Get In Touch" 
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
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 800,
                                mb: 3,
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                                lineHeight: 1.1,
                                textShadow: '0 2px 20px rgba(0,0,0,0.3)'
                            }}>
                                Contact Us
                            </Typography>
                            <Typography variant="h5" sx={{
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 300,
                                maxWidth: '700px',
                                margin: '0 auto',
                                opacity: 0.95,
                                fontSize: { xs: '1.1rem', md: '1.4rem' },
                                px: 2
                            }}>
                                We're here to help plan your perfect journey
                            </Typography>
                        </Box>
                    </Fade>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <div className="contact-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
                    {/* Contact Information */}
                    <div className="contact-info" style={{ flex: '1', minWidth: '300px' }}>
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                color: '#333',
                                fontFamily: "'Poppins', sans-serif",
                                mb: 4,
                                fontSize: { xs: '1.5rem', md: '1.75rem' }
                            }}
                        >
                            Get in Touch
                        </Typography>

                        {contactInfo.map((item, index) => (
                            <div
                                key={index}
                                className="contact-item"
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    marginBottom: '32px'
                                }}
                            >
                                <div style={{ marginRight: '24px' }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#333',
                                            fontFamily: "'Poppins', sans-serif"
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#2c5aa0',
                                            fontWeight: 'medium',
                                            fontFamily: "'Poppins', sans-serif",
                                            mb: 0.5
                                        }}
                                    >
                                        {item.details}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontFamily: "'Poppins', sans-serif"
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form" style={{ flex: '1', minWidth: '300px' }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                position: 'relative',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#333',
                                    fontFamily: "'Poppins', sans-serif",
                                    mb: 1,
                                    fontSize: { xs: '1.5rem', md: '1.75rem' }
                                }}
                            >
                                Send us a Message
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontFamily: "'Poppins', sans-serif",
                                    mb: 3
                                }}
                            >
                                Fill out the form below and we'll get back to you as soon as possible.
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <div className="form-fields" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div className="form-row" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                                        <div className="form-field" style={{ flex: '1', minWidth: '200px' }}>
                                            <TextField
                                                fullWidth
                                                label="Full Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                variant="outlined"
                                        
                                            />
                                        </div>
                                        <div className="form-field" style={{ flex: '1', minWidth: '200px' }}>
                                            <TextField
                                                fullWidth
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                variant="outlined"
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                                        <div className="form-field" style={{ flex: '1', minWidth: '200px' }}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                variant="outlined"
                                                
                                            />
                                        </div>
                                        <div className="form-field" style={{ flex: '1', minWidth: '200px' }}>
                                            <TextField
                                                fullWidth
                                                label="Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                variant="outlined"
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            
                                        />
                                    </div>
                                    <div className="form-submit">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                backgroundColor: '#2c5aa0',
                                                color: 'white',
                                                padding: '12px 40px',
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold',
                                                fontFamily: "'Poppins', sans-serif",
                                                '&:hover': {
                                                    backgroundColor: '#1e3d6f'
                                                }
                                            }}
                                        >
                                            Send Message
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Paper>
                    </div>
                </div>

                {/* Map Section */}
                <Box sx={{ mt: 8, mb: 4 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        textAlign="center"
                        sx={{
                            fontWeight: 'bold',
                            color: '#333',
                            fontFamily: "'Poppins', sans-serif",
                            mb: 4,
                            fontSize: { xs: '1.5rem', md: '1.75rem' }
                        }}
                    >
                        Visit Our Office
                    </Typography>

                    {GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'YOUR_GOOGLE_MAPS_API_KEY' ? (
                        <MapWrapper
                            apiKey={GOOGLE_MAPS_API_KEY}
                            center={officeLocation}
                            zoom={15}
                            style={{
                                height: '400px',
                                width: '100%',
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0'
                            }}
                        />
                    ) : (
                        <Paper
                            elevation={0}
                            sx={{
                                height: '400px',
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f5f5f5'
                            }}
                        >
                            <Box textAlign="center">
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        fontFamily: "'Poppins', sans-serif",
                                        mb: 2
                                    }}
                                >
                                    Google Maps integration
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                >
                                    Add your Google Maps API key to display the map
                                </Typography>
                            </Box>
                        </Paper>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Contact;