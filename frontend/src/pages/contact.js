import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    Snackbar
} from '@mui/material';
import {
    Phone,
    Email,
    LocationOn,
    Schedule
} from '@mui/icons-material';
import MapWrapper from '../components/MapWrapper'; // Adjust path as needed
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setOpenSnackbar(true);
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
        <Box sx={{ pt: 4, mt: 4 }}>
            <Container maxWidth="lg">
                {/* Header Section */}
                <Box textAlign="center" mb={6}>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: '#2c5aa0',
                            fontFamily: "'Poppins', sans-serif",
                            marginTop: '50px'
                        }}
                    >
                        Contact Us
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            fontFamily: "'Poppins', sans-serif",
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}
                    >
                        Get in touch with us for any inquiries about our travel packages,
                        destinations, or custom vacation plans.
                    </Typography>
                </Box>

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
                                mb: 4
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
                                borderRadius: 2
                            }}
                        >
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#333',
                                    fontFamily: "'Poppins', sans-serif",
                                    mb: 3
                                }}
                            >
                                Send us a Message
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
                            mb: 4
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

                {/* Success Message */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Thank you for your message! We'll get back to you soon.
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default Contact;