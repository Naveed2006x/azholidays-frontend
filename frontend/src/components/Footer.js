import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Custom TikTok Icon Component
const TikTokIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        width="24" 
        height="24"
        fill="currentColor"
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
);

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
            url = 'https://www.facebook.com/AzHolidaysPteLtd/';
        } else if (platform === 'instagram') {
            url = 'https://instagram.com/azholidays_sg/';
        } else if (platform === 'tiktok') {
            url = 'https://www.tiktok.com/@azholidays';
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
                                onClick={() => handleSocialClick('tiktok')}
                                aria-label="TikTok"
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
                                <TikTokIcon />
                            </button>
                        </div>
                    </div>

                    <div style={styles.footerSection}>
                        <h4 style={styles.footerSectionTitle}>Quick Links</h4>
                        <Link
                            to="/"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Home
                        </Link>
                        <Link
                            to="/destinations"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Destinations
                        </Link>
                        <Link
                            to="/blogs"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Blogs
                        </Link>
                        <Link
                            to="/about"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Contact
                        </Link>
                    </div>

                    <div style={styles.footerSection}>
                        <h4 style={styles.footerSectionTitle}>Services</h4>
                        <Link
                            to="/attractions"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Attractions
                        </Link>
                        <Link
                            to="/flights"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Flights
                        </Link>
                        <Link
                            to="/hotels"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Hotels
                        </Link>
                        <Link
                            to="/insurance"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Travel Insurance
                        </Link>
                        <Link
                            to="/transport"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Airport & Coach Transport
                        </Link>
                        <Link
                            to="/cruises"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Cruise Packages
                        </Link>
                        <Link
                            to="/packages"
                            style={styles.footerLinkButton}
                            onMouseEnter={(e) => e.target.style.color = '#3498db'}
                            onMouseLeave={(e) => e.target.style.color = '#ffffff'}
                        >
                            Travel Packages
                        </Link>
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
                                <p style={styles.contactText}>enquiry@azholidays.com.sg</p>
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