import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Font style for Poppins
    const fontStyle = {
        fontFamily: "'Poppins', sans-serif",
    };

    // Inline styles
    const styles = {
        footer: {
            backgroundColor: '#0D4DA1',
            color: 'white',
            padding: '40px 0 20px',
            ...fontStyle
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
        },
        footerContent: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '30px',
            '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
                gap: '20px'
            }
        },
        footerSection: {
            // Default section styles
        },
        footerSectionTitle: {
            color: '#ffffff',
            marginBottom: '15px',
            fontSize: '1.25rem',
            fontWeight: 600,
            ...fontStyle
        },
        footerSectionText: {
            lineHeight: 1.6,
            color: '#ffffff',
            ...fontStyle
        },
        socialLinks: {
            display: 'flex',
            gap: '15px',
            marginTop: '15px'
        },
        socialButton: {
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
                color: '#3498db',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateY(-2px)'
            }
        },
        footerLinkButton: {
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'block',
            marginBottom: '8px',
            textAlign: 'left',
            padding: '4px 0',
            transition: 'color 0.3s ease',
            textDecoration: 'none',
            fontSize: 'inherit',
            fontFamily: "'Poppins', sans-serif",
            '&:hover': {
                color: '#3498db'
            }
        },
        contactItem: {
            display: 'flex',
            alignItems: 'flex-start', // Changed to flex-start for better alignment
            marginBottom: '12px',
            gap: '10px' // Added gap for consistent spacing
        },
        contactIcon: {
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center', // Center the icon vertically
            justifyContent: 'center',
            marginTop: '2px', // Small adjustment to align with text baseline
            color: '#ffffff',
            fontSize: '1.2rem',
            minWidth: '24px' // Ensure consistent width for all icons
        },
        contactText: {
            color: '#ffffff',
            margin: 0, // Remove default margins
            lineHeight: 1.4,
            ...fontStyle
        },
        contactSmall: {
            color: '#ffffff',
            fontSize: '0.8rem',
            margin: 0, // Remove default margins
            lineHeight: 1.2,
            ...fontStyle
        },
        contactTextContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Center the text vertically
            minHeight: '24px' // Match icon height
        },
        footerBottom: {
            borderTop: '1px solid #d4d4d4',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px',
            '@media (max-width: 768px)': {
                flexDirection: 'column',
                textAlign: 'center'
            }
        },
        footerLinks: {
            display: 'flex',
            gap: '20px',
            '@media (max-width: 768px)': {
                justifyContent: 'center'
            }
        },
        copyrightText: {
            ...fontStyle
        }
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSocialClick = (platform) => {
        let url = '';

        if (platform === 'facebook') {
            url = 'https://facebook.com/AzHdolidaysPteLtd/';
        } else if (platform === 'instagram') {
            url = 'https://instagram.com/azholidays_sg/';
        } else if (platform === 'twitter') {
            url = 'https://twitter.com/AzHolidaysPteLtd/';
        }

        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const handleServiceClick = (service) => {
        console.log(`Navigate to ${service} page`);
    };

    const handlePolicyClick = (policy) => {
        console.log(`Navigate to ${policy} page`);
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.footerContent}>
                    <div style={styles.footerSection}>
                        <h3 style={styles.footerSectionTitle}>Az Holidays</h3>
                        <p style={styles.footerSectionText}>
                            Making your travel dreams come true since 2009. Experience the world with us and create unforgettable memories.
                        </p>
                        <div style={styles.socialLinks}>
                            <button
                                onClick={() => handleSocialClick('facebook')}
                                aria-label="Facebook"
                                style={styles.socialButton}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#3498db';
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#ffffff';
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                <FacebookIcon />
                            </button>
                            <button
                                onClick={() => handleSocialClick('instagram')}
                                aria-label="Instagram"
                                style={styles.socialButton}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#3498db';
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#ffffff';
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                <InstagramIcon />
                            </button>
                            <button
                                onClick={() => handleSocialClick('twitter')}
                                aria-label="Twitter"
                                style={styles.socialButton}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#3498db';
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#ffffff';
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                <TwitterIcon />
                            </button>
                        </div>
                    </div>

                    <div style={styles.footerSection}>
                        <h4 style={styles.footerSectionTitle}>Quick Links</h4>
                        <button
                            onClick={() => scrollToSection('home')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('destinations')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Destinations
                        </button>
                        <button
                            onClick={() => handleServiceClick('Packages')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Packages
                        </button>
                        <button
                            onClick={() => handleServiceClick('About Us')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            About Us
                        </button>
                    </div>

                    <div style={styles.footerSection}>
                        <h4 style={styles.footerSectionTitle}>Services</h4>
                        <button
                            onClick={() => handleServiceClick('Flight Booking')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Flight Booking
                        </button>
                        <button
                            onClick={() => handleServiceClick('Hotel Reservations')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Hotel Reservations
                        </button>
                        <button
                            onClick={() => handleServiceClick('Tour Packages')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Tour Packages
                        </button>
                        <button
                            onClick={() => handleServiceClick('Travel Insurance')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Travel Insurance
                        </button>
                        <button
                            onClick={() => handleServiceClick('Visa Assistance')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Visa Assistance
                        </button>
                    </div>

                    <div style={styles.footerSection}>
                        <h4 style={styles.footerSectionTitle}>Contact Info</h4>
                        <div style={styles.contactItem}>
                            <span style={styles.contactIcon}><PhoneIcon /></span>
                            <div style={styles.contactTextContainer}>
                                <p style={styles.contactText}>+65 6297 0786</p>
                                <small style={styles.contactSmall}>Office Line</small>
                            </div>
                        </div>
                        <div style={styles.contactItem}>
                            <span style={styles.contactIcon}><WhatsAppIcon /></span>
                            <div style={styles.contactTextContainer}>
                                <p style={styles.contactText}>+65 9126 3786</p>
                                <small style={styles.contactSmall}>WhatsApp</small>
                            </div>
                        </div>
                        <div style={styles.contactItem}>
                            <span style={styles.contactIcon}><EmailIcon /></span>
                            <div style={styles.contactTextContainer}>
                                <p style={styles.contactText}>info@azholidays.com</p>
                            </div>
                        </div>
                        <div style={styles.contactItem}>
                            <span style={styles.contactIcon}><LocationOnIcon /></span>
                            <div style={styles.contactTextContainer}>
                                <p style={styles.contactText}>113 Dunlop Street, Singapore 209432</p>
                            </div>
                        </div>
                        <div style={styles.contactItem}>
                            <span style={styles.contactIcon}><AccessTimeIcon /></span>
                            <div style={styles.contactTextContainer}>
                                <p style={styles.contactText}>Mon - Sun: 10.30AM - 9.30PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.footerBottom}>
                    <p style={styles.copyrightText}>&copy; {currentYear} Az Holidays. All rights reserved.</p>
                    <div style={styles.footerLinks}>
                        <button
                            onClick={() => handlePolicyClick('Privacy Policy')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Privacy Policy
                        </button>
                        <button
                            onClick={() => handlePolicyClick('Terms of Service')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Terms of Service
                        </button>
                        <button
                            onClick={() => handlePolicyClick('Cookie Policy')}
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Cookie Policy
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;