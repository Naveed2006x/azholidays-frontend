import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';
import banner from '../Images/banner.jpg';
import cablecar from '../Images/cablecar.jpg';
import universal from '../Images/universal.jpg';
import safari from '../Images/nightsafari.jpg';
import indiGo from '../Images/indigo.png';
import scoot from '../Images/Scoot_logo.svg';
import qatar from '../Images/Qatar_Airways.png';
import malaysiaAirlines from '../Images/malaysia-airlines.png';
import airIndiaExpress from '../Images/Air_India_Express_logo.png';
import airIndia from '../Images/AirIndia.png';


const Home = () => {
  const navigate = useNavigate();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Core Services Data
  const services = [
    {
      id: 1,
      icon: '🛂',
      image: 'https://img.icons8.com/fluency/96/passport.png',
      title: 'Visa Services',
      description: 'Fast visa processing for India and worldwide destinations',
      link: '/e-visa-services',
      color: '#2c5aa0'
    },
    {
      id: 2,
      icon: '✈️',
      image: 'https://img.icons8.com/fluency/96/airplane-take-off.png',
      title: 'Flight Bookings',
      description: 'Best deals on international and domestic flights',
      link: '/flights',
      color: '#e74c3c'
    },
    {
      id: 3,
      icon: '🏨',
      image: 'https://img.icons8.com/fluency/96/hotel.png',
      title: 'Hotels',
      description: 'Handpicked accommodations for every budget',
      link: '/hotels',
      color: '#27ae60'
    },
    {
      id: 4,
      icon: '🚗',
      image: 'https://img.icons8.com/fluency/96/car.png',
      title: 'Transport',
      description: 'Reliable airport transfers and car rentals',
      link: '/transport',
      color: '#f39c12'
    },
    {
      id: 5,
      icon: '🎡',
      image: 'https://img.icons8.com/fluency/96/ferris-wheel.png',
      title: 'Tours & Attractions',
      description: 'Curated experiences and exclusive attraction tickets',
      link: '/attractions',
      color: '#9b59b6'
    }
  ];

  // Trust Statistics
  const stats = [
    { label: 'Visas Processed', value: 5000, suffix: '+' },
    { label: 'Years of Excellence', value: 17, suffix: '+' },
    { label: 'Countries Served', value: 25, suffix: '+' },
    { label: 'Happy Customers', value: 12000, suffix: '+' }
  ];

  // How It Works Steps
  const steps = [
    {
      number: '01',
      title: 'Choose Your Service',
      description: 'Select from Visas, Flights, Hotels, Transport, or Tours'
    },
    {
      number: '02',
      title: 'Submit Your Details',
      description: 'Fill in the simple form or speak to our experts'
    },
    {
      number: '03',
      title: 'We Handle Everything',
      description: 'Sit back while we process your booking or application'
    },
    {
      number: '04',
      title: 'Travel with Confidence',
      description: 'Get confirmation and 24/7 support throughout your journey'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Siva Waran',
      location: 'Singapore',
      rating: 5,
      text: 'Great Service from Mr.Ameen.Prompt response and assistance. Will definitely recommend to others!',
      avatar: 'https://img.icons8.com/color/96/user-male-circle--v1.png'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Singapore',
      rating: 5,
      text: 'Excellent service for flight bookings. Saved me time and money on my family trip to Bali.',
      avatar: 'https://img.icons8.com/color/96/user-male-circle--v2.png'
    },
    {
      id: 3,
      name: 'Shahul Hameed',
      location: 'Singapore',
      rating: 5,
      text: 'The Universal Studios package was perfect! Everything was well organized from start to finish.',
      avatar: 'https://img.icons8.com/color/96/user-male-circle--v2.png'
    }
  ];

  // Airline Partners
  const airlinePartners = [
    { name: 'IndiGo', logo: indiGo, scale: 1 },
    { name: 'Scoot', logo: scoot, scale: 1 },
    { name: 'AirAsia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/200px-AirAsia_New_Logo.svg.png', scale: 1 },
    { name: 'Singapore Airlines', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/200px-Singapore_Airlines_Logo_2.svg.png', scale: 1 },
    { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png', scale: 1 },
    { name: 'Qatar Airways', logo: qatar, scale: 0.85 },
    { name: 'Malaysia Airlines', logo: malaysiaAirlines, scale: 0.86 },
    { name: 'Air India Express', logo: airIndiaExpress, scale: 0.86 },
    { name: 'Air India', logo: airIndia, scale: 1 }
  ];

  // Font style for Poppins
  const fontStyle = {
    fontFamily: "'Poppins', sans-serif",
  };

  // Inline styles
  const styles = {
    // Global
    home: {
      overflowX: 'hidden',
      background: '#ffffff',
      ...fontStyle
    },

    // Hero Section
    heroSection: {
      position: 'relative',
      width: '100%',
      height: '70vh',
      minHeight: '500px',
      maxHeight: '700px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0
    },
    heroBackgroundImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center'
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(44,90,160,0.3) 100%)',
      zIndex: 1
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      color: 'white',
      padding: '0 20px',
      maxWidth: '900px',
      marginInline: 'auto'
    },
    heroTitle: {
      fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
      fontWeight: 800,
      marginBottom: '1.2rem',
      lineHeight: 1.2,
      textShadow: '2px 4px 12px rgba(0, 0, 0, 0.3)',
      ...fontStyle
    },
    heroSubtitle: {
      fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
      fontWeight: 400,
      marginBottom: '2.5rem',
      lineHeight: 1.6,
      opacity: 0.95,
      textShadow: '1px 2px 8px rgba(0, 0, 0, 0.2)',
      ...fontStyle
    },
    heroCTAContainer: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '2rem'
    },
    ctaPrimary: {
      backgroundColor: '#2c5aa0',
      color: 'white',
      border: 'none',
      padding: '16px 36px',
      fontSize: '1.05rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(44, 90, 160, 0.4)',
      ...fontStyle
    },
    ctaSecondary: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '16px 36px',
      fontSize: '1.05rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(5px)',
      ...fontStyle
    },

    // Section Styles
    section: {
      padding: 'clamp(60px, 10vw, 100px) 20px',
      maxWidth: '1240px',
      marginInline: 'auto'
    },
    sectionTitle: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: 700,
      color: '#1a1a1a',
      textAlign: 'center',
      marginBottom: '1rem',
      ...fontStyle
    },
    sectionSubtitle: {
      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
      color: '#666',
      textAlign: 'center',
      marginBottom: '3.5rem',
      maxWidth: '700px',
      marginInline: 'auto',
      lineHeight: 1.6,
      ...fontStyle
    },

    // Services Section
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      marginTop: '3rem'
    },
    serviceCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid #f0f0f0'
    },
    serviceIcon: {
      fontSize: '3.5rem',
      marginBottom: '1.2rem',
      display: 'block'
    },
    serviceImage: {
      width: '80px',
      height: '80px',
      objectFit: 'contain',
      marginBottom: '1.2rem',
      marginInline: 'auto',
      display: 'block'
    },
    serviceTitle: {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: '#1a1a1a',
      marginBottom: '0.8rem',
      ...fontStyle
    },
    serviceDescription: {
      fontSize: '0.95rem',
      color: '#666',
      lineHeight: 1.6,
      ...fontStyle
    },

    // Stats Section
    statsSection: {
      background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
      padding: 'clamp(60px, 10vw, 80px) 20px',
      color: 'white'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px',
      maxWidth: '1100px',
      marginInline: 'auto',
      marginTop: '3rem'
    },
    statCard: {
      textAlign: 'center'
    },
    statValue: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: 800,
      marginBottom: '0.5rem',
      ...fontStyle
    },
    statLabel: {
      fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
      opacity: 0.9,
      fontWeight: 500,
      ...fontStyle
    },

    // How It Works Section
    stepsContainer: {
      maxWidth: '1000px',
      marginInline: 'auto',
      marginTop: '3rem'
    },
    stepCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      marginBottom: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      gap: '24px',
      alignItems: 'start',
      border: '1px solid #f0f0f0',
      transition: 'all 0.4s ease',
      cursor: 'pointer'
    },
    stepNumber: {
      fontSize: '2.5rem',
      fontWeight: 800,
      color: '#2c5aa0',
      opacity: 0.3,
      minWidth: '60px',
      ...fontStyle
    },
    stepContent: {
      flex: 1
    },
    stepTitle: {
      fontSize: '1.4rem',
      fontWeight: 700,
      color: '#1a1a1a',
      marginBottom: '0.6rem',
      ...fontStyle
    },
    stepDescription: {
      fontSize: '1rem',
      color: '#666',
      lineHeight: 1.6,
      ...fontStyle
    },

    // Testimonials Section
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '3rem'
    },
    testimonialCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #f0f0f0',
      transition: 'all 0.4s ease',
      cursor: 'default'
    },
    testimonialText: {
      fontSize: '1rem',
      color: '#333',
      lineHeight: 1.7,
      marginBottom: '1.5rem',
      fontStyle: 'italic',
      ...fontStyle
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    testimonialAvatar: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    testimonialInfo: {
      flex: 1
    },
    testimonialName: {
      fontSize: '1rem',
      fontWeight: 700,
      color: '#1a1a1a',
      marginBottom: '0.2rem',
      ...fontStyle
    },
    testimonialLocation: {
      fontSize: '0.85rem',
      color: '#666',
      ...fontStyle
    },
    testimonialRating: {
      color: '#f39c12',
      fontSize: '0.9rem'
    },

    // Partners Section
    partnersSection: {
      background: '#f8f9fa',
      padding: 'clamp(40px, 8vw, 60px) 20px',
      overflow: 'hidden'
    },
    partnersTitle: {
      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
      fontWeight: 600,
      color: '#666',
      textAlign: 'center',
      marginBottom: '2.5rem',
      ...fontStyle
    },
    partnersScroller: {
      display: 'flex',
      alignItems: 'center',
      gap: '60px',
      animation: 'scroll-left 30s linear infinite',
      width: 'max-content'
    },
    partnerLogo: {
      height: '40px',
      width: 'auto',
      maxWidth: '150px',
      objectFit: 'contain',
      opacity: 0.7,
      transition: 'all 0.3s ease',
      filter: 'grayscale(20%)'
    },

    // Final CTA Section
    finalCTASection: {
      background: 'linear-gradient(135deg, rgba(44,90,160,0.95) 0%, rgba(30,61,111,0.95) 100%)',
      backgroundImage: `linear-gradient(135deg, rgba(44,90,160,0.95) 0%, rgba(30,61,111,0.95) 100%), url(${banner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: 'clamp(80px, 12vw, 120px) 20px',
      textAlign: 'center',
      color: 'white'
    },
    finalCTATitle: {
      fontSize: 'clamp(2rem, 4.5vw, 3rem)',
      fontWeight: 800,
      marginBottom: '1.2rem',
      ...fontStyle
    },
    finalCTAText: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      marginBottom: '2.5rem',
      opacity: 0.95,
      maxWidth: '600px',
      marginInline: 'auto',
      ...fontStyle
    },
    finalCTAButton: {
      backgroundColor: 'white',
      color: '#2c5aa0',
      border: 'none',
      padding: '18px 48px',
      fontSize: '1.1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 700,
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      ...fontStyle
    }
  };

  return (
    <div style={styles.home}>
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-35%); }
          }
          
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
      
      {/* 1. Hero Section */}
      <section style={styles.heroSection}>
        <motion.div 
          style={styles.heroBackground}
          initial={{ scale: prefersReducedMotion ? 1 : 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img src={banner} alt="AZ Holidays - Your Travel Partner" style={styles.heroBackgroundImage} />
          <div style={styles.heroOverlay} />
        </motion.div>

        <div style={styles.heroContent}>
          <motion.h1 
            style={styles.heroTitle}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your Trusted Travel Partner in Singapore
          </motion.h1>
          
          <motion.p 
            style={styles.heroSubtitle}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From Visa Processing to Dream Vacations — We Make Travel Simple, Safe, and Affordable
          </motion.p>

          <motion.div 
            style={styles.heroCTAContainer}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* <button 
              style={styles.ctaPrimary}
              onClick={() => navigate('/check-eligibility')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(44, 90, 160, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(44, 90, 160, 0.4)';
              }}
            >
              Check Visa Eligibility
            </button> */}
            <button 
              style={styles.ctaPrimary}
              onClick={() => navigate('/e-visa-services')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(44, 90, 160, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(44, 90, 160, 0.4)';
              }}
            >
              Apply for Visa
            </button>
            <button 
              style={styles.ctaSecondary}
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Explore Services
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Services / Core Pillars Section */}
      <section style={styles.section} id="services">
        <AnimatedSection direction="fade" duration={0.6}>
          <h2 style={styles.sectionTitle}>Our Travel Services</h2>
          <p style={styles.sectionSubtitle}>
            Comprehensive travel solutions tailored for Singapore travelers
          </p>
        </AnimatedSection>

        <div style={styles.servicesGrid}>
          {services.map((service, index) => (
            <AnimatedSection 
              key={service.id}
              delay={index * 0.12}
              duration={0.6}
              direction="up"
              distance={40}
            >
              <div 
                style={styles.serviceCard}
                onClick={() => navigate(service.link)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.borderColor = service.color;
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.1) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = '#f0f0f0';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  style={{
                    ...styles.serviceImage,
                    transition: 'all 0.4s ease'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextElementSibling;
                    if (fallback && fallback.classList.contains('icon-fallback')) {
                      fallback.style.display = 'block';
                    }
                  }}
                />
                <span 
                  className="icon-fallback"
                  style={{ 
                    ...styles.serviceIcon, 
                    display: 'none',
                    transition: 'all 0.4s ease'
                  }}
                >
                  {service.icon}
                </span>
                <h3 style={styles.serviceTitle}>{service.title}</h3>
                <p style={styles.serviceDescription}>{service.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 3. Why AZ Holidays - Trust Section with Stats */}
      <section style={styles.statsSection}>
        <div style={{ maxWidth: '1240px', marginInline: 'auto', padding: '0 20px' }}>
          <AnimatedSection direction="fade">
            <h2 style={{ ...styles.sectionTitle, color: 'white' }}>Why Choose AZ Holidays?</h2>
            <p style={{ ...styles.sectionSubtitle, color: 'rgba(255,255,255,0.9)' }}>
              Trusted by thousands of Singapore travelers for reliable, hassle-free travel services
            </p>
          </AnimatedSection>

          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 0.15}
                duration={0.5}
                direction="up"
                distance={40}
              >
                <div style={styles.statCard}>
                  <div style={styles.statValue}>
                    <AnimatedCounter 
                      target={stat.value} 
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section style={{ background: '#f8f9fa', padding: 'clamp(60px, 10vw, 100px) 0' }}>
        <div style={{ maxWidth: '1240px', marginInline: 'auto', padding: '0 20px' }}>
          <AnimatedSection direction="fade" duration={0.6}>
            <h2 style={styles.sectionTitle}>How It Works</h2>
            <p style={styles.sectionSubtitle}>
              Your journey to hassle-free travel starts here — in just 4 simple steps
            </p>
          </AnimatedSection>

          <div style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 0.15}
                duration={0.6}
                direction="right"
                distance={60}
              >
                <div 
                  style={styles.stepCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(10px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                    const number = e.currentTarget.querySelector('[data-step-number]');
                    if (number) {
                      number.style.opacity = '0.5';
                      number.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                    const number = e.currentTarget.querySelector('[data-step-number]');
                    if (number) {
                      number.style.opacity = '0.3';
                      number.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <div 
                    data-step-number 
                    style={{
                      ...styles.stepNumber,
                      transition: 'all 0.4s ease'
                    }}
                  >
                    {step.number}
                  </div>
                  <div style={styles.stepContent}>
                    <h3 style={styles.stepTitle}>{step.title}</h3>
                    <p style={styles.stepDescription}>{step.description}</p>
                  </div>
                </div>
              </AnimatedSection>
          ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section style={styles.section}>
        <AnimatedSection direction="fade" duration={0.6}>
          <h2 style={styles.sectionTitle}>What Our Customers Say</h2>
          <p style={styles.sectionSubtitle}>
            Real experiences from real travelers who trusted us with their journeys
          </p>
        </AnimatedSection>

        <div style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={testimonial.id}
              delay={index * 0.15}
              duration={0.6}
              direction="up"
              distance={40}
            >
              <div 
                style={styles.testimonialCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = '#2c5aa0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = '#f0f0f0';
                }}
              >
                <div style={styles.testimonialRating}>
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p style={styles.testimonialText}>"{testimonial.text}"</p>
                <div style={styles.testimonialAuthor}>
                  <img src={testimonial.avatar} alt={testimonial.name} style={styles.testimonialAvatar} />
                  <div style={styles.testimonialInfo}>
                    <div style={styles.testimonialName}>{testimonial.name}</div>
                    <div style={styles.testimonialLocation}>📍 {testimonial.location}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 6. Airline Partners Section */}
      <section style={styles.partnersSection}>
        <AnimatedSection direction="fade" duration={0.6}>
          <h2 style={styles.partnersTitle}>Our Trusted Airline Partners</h2>
        </AnimatedSection>

        <AnimatedSection delay={0.3} direction="fade" duration={0.8}>
          <div style={{ maxWidth: '100%', overflow: 'hidden', position: 'relative' }}>
            <div style={styles.partnersScroller}>
              {[...airlinePartners, ...airlinePartners, ...airlinePartners, ...airlinePartners].map((airline, index) => (
                <div 
                  key={`${airline.name}-${index}`}
                  style={{ padding: '0 20px' }}
                >
                  <img 
                    src={airline.logo} 
                    alt={airline.name}
                    style={{
                      ...styles.partnerLogo,
                      transform: `scale(${airline.scale || 1})`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = '1';
                      e.target.style.filter = 'grayscale(0%)';
                      e.target.style.transform = `scale(${(airline.scale || 1) * 1.15})`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = '0.7';
                      e.target.style.filter = 'grayscale(20%)';
                      e.target.style.transform = `scale(${airline.scale || 1})`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 7. Final CTA Section */}
      <AnimatedSection direction="fade">
        <section style={styles.finalCTASection}>
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={styles.finalCTATitle}>Start Your Journey with AZ Holidays</h2>
            <p style={styles.finalCTAText}>
              Let us handle the details while you focus on making memories. Book now and experience travel made simple.
            </p>
            <button 
              style={styles.finalCTAButton}
              onClick={() => window.open('https://api.whatsapp.com/send/?phone=6591263786', '_blank')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
                e.target.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                e.target.style.backgroundColor = 'white';
              }}
            >
              Get Started Today
            </button>
          </motion.div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Home;