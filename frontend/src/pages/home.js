import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 500]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Featured Destinations with stunning visuals
  const featuredDestinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      tagline: 'Island Paradise Awaits',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=1000&fit=crop',
      price: 'From $899',
      days: '5D/4N'
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      tagline: 'Where Tradition Meets Future',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=1000&fit=crop',
      price: 'From $1,299',
      days: '6D/5N'
    },
    {
      id: 3,
      name: 'Dubai, UAE',
      tagline: 'Luxury Without Limits',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=1000&fit=crop',
      price: 'From $1,099',
      days: '4D/3N'
    },
    {
      id: 4,
      name: 'Paris, France',
      tagline: 'City of Lights & Love',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=1000&fit=crop',
      price: 'From $1,599',
      days: '7D/6N'
    },
    {
      id: 5,
      name: 'Maldives',
      tagline: 'Tropical Heaven on Earth',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=1000&fit=crop',
      price: 'From $1,799',
      days: '5D/4N'
    },
    {
      id: 6,
      name: 'Switzerland',
      tagline: 'Alpine Beauty & Serenity',
      image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=1000&fit=crop',
      price: 'From $2,299',
      days: '8D/7N'
    }
  ];

  // Google Reviews Data
  const googleReviews = [
    {
      id: 1,
      name: 'Bernard Rayen',
      rating: 5,
      date: 'December 2025',
      text: 'AZ Holidays Travel Service offers a seamless ticket-booking experience and provides excellent advice on the most affordable travel routes. Their team compares various options to ensure you get the best price. Mr. Ameen delivers outstanding service — he is patient, polite, and exceptionally helpful throughout the booking process.',
      avatar: 'https://img.icons8.com/color/96/user-male-circle.png'
    },
    {
      id: 2,
      name: 'Naga Mouttou',
      rating: 5,
      date: 'December 2025',
      text: 'AZ holidays pte ltd, I am having very good relation with this company since covid release period 😅, they gave good service at the time of covid. I was impressed n travelling with this company almost more than 5 years. Especially, Mr. Ameen service, way of approch, way of speaking, its too good. Their service and cost of ticket is very very good. I wish him & support this travels with my whole heart. Best wishes from G. Nagamouttou',
      avatar: 'https://img.icons8.com/color/96/user-male-circle.png'
    },
    {
      id: 3,
      name: 'Shahul Hameed',
      rating: 5,
      date: 'November 2025',
      text: 'AZ holidays made our vacation completely stress-free. They helped us choose the perfect destination and handled every detail, including our visas, accommodations, and excursions. Communication was excellent throughout, and they even checked in to make sure we were enjoying our trip. Highly recommend their services for anyone who wants a hassle-free travel experience!',
      avatar: 'https://img.icons8.com/color/96/user-male-circle--v1.png'
    },
    {
      id: 4,
      name: 'Mehar Nisha',
      rating: 5,
      date: 'December 2025',
      text: 'I have always approached them to book flights or for any Indian events going on in sg and I am very satisfied with their ticketing services as they are fast, efficient and also very easy to communicate with. Highly recommend them!!',
      avatar: 'https://img.icons8.com/color/96/user-female-circle--v1.png'
    },
    {
      id: 5,
      name: 'Siva Waran',
      rating: 5,
      date: 'December 2025',
      text: 'Great Service from Mr.Ameen. Well explained and Helpful. Prompt response and assistance. Will definitely recommend to others!',
      avatar: 'https://img.icons8.com/color/96/user-male-circle--v1.png'
    }
  ];

  // Why Choose Us - Detailed Benefits
  const benefits = [
    {
      title: 'Lightning Fast Processing',
      description: 'Visa approvals in 48-72 hours. Flight bookings confirmed instantly.',
      stat: '3-5 days',
      color: '#f39c12',
      image: 'https://img.icons8.com/fluency/96/speed.png'
    },
    {
      title: '100% Secure & Licensed',
      description: 'Singapore Tourism Board registered. Your money is protected.',
      stat: '17 Years',
      color: '#2c5aa0',
      image: 'https://img.icons8.com/fluency/96/security-checked.png'
    },
    {
      title: '24/7 VIP Support',
      description: 'Real humans, not bots. WhatsApp, call, or email - we\'re always here.',
      stat: '< 5 min',
      color: '#e74c3c',
      image: 'https://img.icons8.com/fluency/96/phone-support.png'
    }
  ];

  // Travel Process Timeline
  const travelProcess = [
    {
      step: 1,
      title: 'Tell Us Your Dream',
      description: 'Share your destination, dates, and budget'
    },
    {
      step: 2,
      title: 'We Craft Your Journey',
      description: 'Personalized itinerary with best deals'
    },
    {
      step: 3,
      title: 'Approve & Relax',
      description: 'Review, approve, done. We handle the rest'
    },
    {
      step: 4,
      title: 'Travel in Style',
      description: '24/7 support throughout your trip'
    }
  ];

  // Popular Packages
  const popularPackages = [
    {
      id: 1,
      destination: 'Universal Studios Singapore',
      image: universal,
      duration: '1 Day',
      price: '$69',
      includes: ['Entry Ticket', 'Express Pass Option', 'Lunch Voucher'],
      badge: 'Best Seller',
      rating: 4.9
    },
    {
      id: 2,
      destination: 'Singapore Cable Car',
      image: cablecar,
      duration: 'Half Day',
      price: '$22',
      includes: ['Round Trip', 'Sky Dining Option', 'Photo Package'],
      badge: 'Family Favorite',
      rating: 4.8
    },
    {
      id: 3,
      destination: 'Night Safari Singapore',
      image: safari,
      duration: 'Evening',
      price: '$41',
      includes: ['Entry + Tram Ride', 'Animal Show', 'Dinner Buffet'],
      badge: 'Top Rated',
      rating: 4.9
    }
  ];

  // Trust Badges
  const trustBadges = [
    { text: 'SSL Secured Payments' },
    { text: 'Singapore Tourism Board Licensed' },
    { text: '4.8/5 Google Rating (100+ Reviews)' }
  ];

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
      fontSize: '0.9rem',
      marginBottom: '12px',
      display: 'flex',
      gap: '4px'
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
    },

    // Google Reviews Section
    googleSection: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      padding: 'clamp(80px, 12vw, 120px) 20px',
      position: 'relative',
      overflow: 'visible'
    },
    googleHeader: {
      textAlign: 'center',
      marginBottom: '60px'
    },
    googleBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      background: 'white',
      padding: '16px 32px',
      borderRadius: '50px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
      marginBottom: '24px'
    },
    googleLogo: {
      fontSize: '2rem'
    },
    googleRating: {
      fontSize: '2.5rem',
      fontWeight: 800,
      color: '#1a1a1a',
      ...fontStyle
    },
    googleStars: {
      color: '#fbbc04',
      fontSize: '1.5rem',
      letterSpacing: '2px'
    },
    googleCount: {
      fontSize: '1rem',
      color: '#666',
      marginTop: '8px',
      ...fontStyle
    },
    reviewsScroller: {
      display: 'flex',
      gap: '30px',
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      scrollBehavior: 'smooth',
      paddingBottom: '20px',
      paddingTop: '20px',
      marginTop: '40px',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    },
    reviewCard: {
      minWidth: '380px',
      maxWidth: '380px',
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
      scrollSnapAlign: 'start',
      border: '2px solid #f0f0f0',
      transition: 'all 0.4s ease'
    },
    reviewHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '20px'
    },
    reviewAvatar: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    reviewAuthor: {
      flex: 1
    },
    reviewName: {
      fontSize: '1.1rem',
      fontWeight: 700,
      color: '#1a1a1a',
      marginBottom: '4px',
      ...fontStyle
    },
    reviewDate: {
      fontSize: '0.85rem',
      color: '#999',
      ...fontStyle
    },
    reviewStars: {
      color: '#fbbc04',
      fontSize: '1rem',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    reviewText: {
      fontSize: '0.95rem',
      lineHeight: 1.7,
      color: '#333',
      ...fontStyle
    },
    googleCTA: {
      textAlign: 'center',
      marginTop: '50px'
    },
    googleButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      background: 'white',
      color: '#2c5aa0',
      border: '2px solid #2c5aa0',
      padding: '16px 36px',
      borderRadius: '50px',
      fontSize: '1.05rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ...fontStyle
    },

    // Featured Destinations Section
    destinationsSection: {
      padding: 'clamp(80px, 12vw, 120px) 0',
      background: '#000',
      color: 'white',
      position: 'relative'
    },
    destinationsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      maxWidth: '1240px',
      marginInline: 'auto',
      padding: '0 20px',
      marginTop: '60px'
    },
    destinationCard: {
      position: 'relative',
      height: '500px',
      borderRadius: '24px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.5s ease'
    },
    destinationImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.7s ease'
    },
    destinationOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '32px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)'
    },
    destinationName: {
      fontSize: '1.8rem',
      fontWeight: 700,
      marginBottom: '8px',
      ...fontStyle
    },
    destinationTagline: {
      fontSize: '1rem',
      opacity: 0.9,
      marginBottom: '16px',
      ...fontStyle
    },
    destinationDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px'
    },
    destinationPrice: {
      fontSize: '1.4rem',
      fontWeight: 700,
      color: '#f39c12',
      ...fontStyle
    },
    destinationDays: {
      fontSize: '0.9rem',
      opacity: 0.8,
      ...fontStyle
    },

    // Benefits Section (Why Choose Us)
    benefitsSection: {
      padding: 'clamp(80px, 12vw, 120px) 20px',
      background: '#ffffff'
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '40px',
      maxWidth: '1240px',
      marginInline: 'auto',
      marginTop: '60px'
    },
    benefitCard: {
      textAlign: 'center',
      padding: '40px 24px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      borderRadius: '24px',
      border: '2px solid #f0f0f0',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    benefitImage: {
      width: '80px',
      height: '80px',
      objectFit: 'contain',
      marginBottom: '24px',
      marginInline: 'auto',
      display: 'block'
    },
    benefitStat: {
      fontSize: '2.5rem',
      fontWeight: 800,
      marginBottom: '12px',
      ...fontStyle
    },
    benefitTitle: {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: '#1a1a1a',
      marginBottom: '12px',
      ...fontStyle
    },
    benefitDescription: {
      fontSize: '0.95rem',
      color: '#666',
      lineHeight: 1.6,
      ...fontStyle
    },

    // Packages Section
    packagesSection: {
      padding: 'clamp(80px, 12vw, 120px) 20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    },
    packagesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px',
      maxWidth: '1240px',
      marginInline: 'auto',
      marginTop: '60px'
    },
    packageCard: {
      background: 'white',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
      transition: 'all 0.4s ease',
      cursor: 'pointer'
    },
    packageImageWrapper: {
      position: 'relative',
      height: '280px',
      overflow: 'hidden'
    },
    packageImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.6s ease'
    },
    packageBadge: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: '#f39c12',
      color: 'white',
      padding: '8px 20px',
      borderRadius: '50px',
      fontSize: '0.85rem',
      fontWeight: 700,
      ...fontStyle
    },
    packageContent: {
      padding: '28px'
    },
    packageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '16px'
    },
    packageDestination: {
      fontSize: '1.4rem',
      fontWeight: 700,
      color: '#1a1a1a',
      ...fontStyle
    },
    packageRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.95rem',
      fontWeight: 700,
      color: '#1a1a1a',
      background: '#f39c12',
      padding: '6px 12px',
      borderRadius: '20px',
      color: 'white'
    },
    packageIncludes: {
      listStyle: 'none',
      padding: 0,
      margin: '20px 0'
    },
    packageIncludeItem: {
      fontSize: '0.9rem',
      color: '#666',
      marginBottom: '10px',
      paddingLeft: '24px',
      position: 'relative',
      ...fontStyle
    },
    packageFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '20px',
      borderTop: '1px solid #f0f0f0'
    },
    packagePrice: {
      fontSize: '1.8rem',
      fontWeight: 800,
      color: '#2c5aa0',
      ...fontStyle
    },
    packageDuration: {
      fontSize: '0.9rem',
      color: '#999',
      ...fontStyle
    },

    // Timeline Section
    timelineSection: {
      padding: 'clamp(80px, 12vw, 120px) 20px',
      background: '#ffffff'
    },
    timelineContainer: {
      maxWidth: '900px',
      marginInline: 'auto',
      marginTop: '60px',
      position: 'relative'
    },
    timelineItem: {
      display: 'flex',
      gap: '32px',
      marginBottom: '60px',
      position: 'relative'
    },
    timelineIconWrapper: {
      minWidth: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: 800,
      color: 'white',
      boxShadow: '0 8px 24px rgba(44,90,160,0.3)',
      position: 'relative',
      zIndex: 2,
      fontFamily: "'Poppins', sans-serif"
    },
    timelineContent: {
      flex: 1,
      paddingTop: '8px'
    },
    timelineStep: {
      fontSize: '0.9rem',
      color: '#2c5aa0',
      fontWeight: 700,
      marginBottom: '8px',
      ...fontStyle
    },
    timelineTitle: {
      fontSize: '1.6rem',
      fontWeight: 700,
      color: '#1a1a1a',
      marginBottom: '12px',
      ...fontStyle
    },
    timelineDescription: {
      fontSize: '1.05rem',
      color: '#666',
      lineHeight: 1.6,
      ...fontStyle
    },

    // Trust Badges Section
    trustSection: {
      background: 'linear-gradient(135deg, #2c5aa0 0%, #1e3d6f 100%)',
      padding: '40px 20px',
      color: 'white'
    },
    trustGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      maxWidth: '1240px',
      marginInline: 'auto'
    },
    trustBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '20px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      transition: 'all 0.3s ease',
      position: 'relative',
      paddingLeft: '50px'
    },
    trustIcon: {
      position: 'absolute',
      left: '16px',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.9rem',
      fontWeight: 700
    },
    trustText: {
      fontSize: '0.95rem',
      fontWeight: 600,
      ...fontStyle
    },

    // Newsletter Section
    newsletterSection: {
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      padding: 'clamp(60px, 10vw, 80px) 20px',
      textAlign: 'center'
    },
    newsletterContent: {
      maxWidth: '600px',
      marginInline: 'auto',
      padding: '0 20px'
    },
    newsletterTitle: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: 700,
      color: '#1a1a1a',
      marginBottom: '16px',
      ...fontStyle
    },
    newsletterText: {
      fontSize: '1.1rem',
      color: '#666',
      marginBottom: '32px',
      ...fontStyle
    },
    newsletterForm: {
      display: 'flex',
      gap: '12px',
      maxWidth: '500px',
      marginInline: 'auto',
      padding: '0 10px'
    },
    newsletterInput: {
      flex: 1,
      padding: '16px 24px',
      fontSize: '1rem',
      borderRadius: '50px',
      border: '2px solid #e0e0e0',
      outline: 'none',
      transition: 'all 0.3s ease',
      ...fontStyle
    },
    newsletterButton: {
      background: '#2c5aa0',
      color: 'white',
      border: 'none',
      padding: '16px 36px',
      fontSize: '1rem',
      fontWeight: 700,
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
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
          
          .reviews-scroller::-webkit-scrollbar {
            display: none;
          }
          
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
      
      {/* 1. Hero Section with Parallax */}
      <section style={styles.heroSection} ref={heroRef}>
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
            <button 
              style={styles.ctaPrimary}
              onClick={() => navigate('/e-visa-services')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 25px rgba(44, 90, 160, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
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
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0) scale(1)';
              }}
            >
              Explore Services
            </button>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <motion.section 
        style={styles.trustSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.trustGrid}>
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              style={styles.trustBadge}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,0.15)'
              }}
            >
              <span style={styles.trustIcon}>✓</span>
              <span style={styles.trustText}>{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

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
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.borderColor = service.color;
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.15) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
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
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
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
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
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

      {/* 3. Google Reviews Section - Premium Showcase */}
      <section style={styles.googleSection}>
        <motion.div
          style={styles.googleHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={styles.sectionTitle}>What Singapore Travelers Say About Us</h2>
          <p style={styles.googleCount}>Based on 100+ verified Google reviews</p>
        </motion.div>

        <motion.div 
          style={styles.reviewsScroller}
          className="reviews-scroller"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {googleReviews.map((review, index) => (
            <motion.div
              key={review.id}
              style={styles.reviewCard}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                borderColor: '#2c5aa0'
              }}
            >
              <div style={styles.reviewHeader}>
                <img src={review.avatar} alt={review.name} style={styles.reviewAvatar} />
                <div style={styles.reviewAuthor}>
                  <div style={styles.reviewName}>{review.name}</div>
                  <div style={styles.reviewDate}>{review.date}</div>
                </div>
              </div>
              <div style={styles.reviewStars}>
                {Array(review.rating).fill('★').map((star, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p style={styles.reviewText}>{review.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          style={styles.googleCTA}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button 
            style={styles.googleButton}
            onClick={() => window.open('https://www.google.com/search?rlz=1C1VDKB_enSG1161SG1161&sca_esv=45a1a07102033a0f&sxsrf=ANbL-n5eFErgl5svw7nFv4QX-VI8_wX6Dg:1771036185216&si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_xy30KuPcM_yafUJdlENitP1VxfpTIJEhdeyKA3qhlpEiQCUQkJCViev26CYMmoeAi1yoP1Cky-OgUMQC7u3kn5MmKCkYv4CVBuRCmdymZa_wCReIrQ%3D%3D&q=AZ+Holidays+Pte+Ltd+Reviews&sa=X&ved=2ahUKEwjv5dD199eSAxU42DgGHUCxE98Q0bkNegQIRRAH&biw=1920&bih=991&dpr=1', '_blank')}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#2c5aa0',
              color: 'white',
              boxShadow: '0 8px 24px rgba(44, 90, 160, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Read All 100+ Reviews on Google</span>
          </motion.button>
        </motion.div>
      </section>

      {/* 4. Why Choose Us - Benefits with Stats */}
      <section style={styles.benefitsSection}>
        <AnimatedSection direction="fade" duration={0.6}>
          <h2 style={styles.sectionTitle}>Why 12,000+ Travelers Choose AZ Holidays</h2>
          <p style={styles.sectionSubtitle}>
            Not just promises — real benefits that make your travel dreams come true
          </p>
        </AnimatedSection>

        <div style={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              style={styles.benefitCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                borderColor: benefit.color,
                boxShadow: `0 16px 48px rgba(0,0,0,0.12)`
              }}
            >
              <motion.span 
                style={styles.benefitIcon}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {benefit.icon}
              </motion.span>
              <div style={{ ...styles.benefitStat, color: benefit.color }}>
                {benefit.stat}
              </div>
              <h3 style={styles.benefitTitle}>{benefit.title}</h3>
              <p style={styles.benefitDescription}>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Stats Section with Animated Counters */}
      <section style={styles.statsSection}>
        <div style={{ maxWidth: '1240px', marginInline: 'auto', padding: '0 20px' }}>
          <AnimatedSection direction="fade">
            <h2 style={{ ...styles.sectionTitle, color: 'white' }}>Trusted by Thousands</h2>
            <p style={{ ...styles.sectionSubtitle, color: 'rgba(255,255,255,0.9)' }}>
              Our numbers speak louder than words
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
                <motion.div 
                  style={styles.statCard}
                  whileHover={{ 
                    scale: 1.08,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  <div style={styles.statValue}>
                    <AnimatedCounter 
                      target={stat.value} 
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Destinations - Dark Theme with Parallax */}
      <section style={styles.destinationsSection}>
        <div style={{ maxWidth: '1240px', marginInline: 'auto', padding: '0 20px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{ ...styles.sectionTitle, color: 'white' }}>
              Explore Dream Destinations
            </h2>
            <p style={{ ...styles.sectionSubtitle, color: 'rgba(255,255,255,0.7)' }}>
              Handpicked packages that create unforgettable memories
            </p>
          </motion.div>

          <div style={styles.destinationsGrid}>
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                style={styles.destinationCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring"
                }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/packages')}
              >
                <motion.img 
                  src={destination.image} 
                  alt={destination.name}
                  style={styles.destinationImage}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div style={styles.destinationOverlay}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <h3 style={styles.destinationName}>{destination.name}</h3>
                    <p style={styles.destinationTagline}>{destination.tagline}</p>
                    <div style={styles.destinationDetails}>
                      <span style={styles.destinationPrice}>{destination.price}</span>
                      <span style={styles.destinationDays}>{destination.days}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. How It Works - Visual Timeline */}
      <section style={styles.timelineSection}>
        <AnimatedSection direction="fade" duration={0.6}>
          <h2 style={styles.sectionTitle}>Your Journey in 4 Simple Steps</h2>
          <p style={styles.sectionSubtitle}>
            From planning to paradise — we make it effortless
          </p>
        </AnimatedSection>

        <div style={styles.timelineContainer}>
          {travelProcess.map((item, index) => (
            <motion.div
              key={item.step}
              style={styles.timelineItem}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.div 
                style={styles.timelineIconWrapper}
                whileHover={{ 
                  scale: 1.15,
                  rotate: 10,
                  boxShadow: '0 12px 32px rgba(44,90,160,0.4)'
                }}
              >
                {item.step}
              </motion.div>
              <div style={styles.timelineContent}>
                <div style={styles.timelineStep}>STEP {item.step}</div>
                <h3 style={styles.timelineTitle}>{item.title}</h3>
                <p style={styles.timelineDescription}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. Popular Packages - Interactive Cards */}
      <section style={styles.packagesSection}>
        <AnimatedSection direction="fade" duration={0.6}>
          <h2 style={styles.sectionTitle}>Singapore's Favorite Experiences</h2>
          <p style={styles.sectionSubtitle}>
            Best-selling packages loved by locals and travelers alike
          </p>
        </AnimatedSection>

        <div style={styles.packagesGrid}>
          {popularPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              style={styles.packageCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                y: -12,
                boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                transition: { type: "spring", stiffness: 300 }
              }}
              onClick={() => navigate('/attractions')}
            >
              <div style={styles.packageImageWrapper}>
                <motion.img 
                  src={pkg.image} 
                  alt={pkg.destination}
                  style={styles.packageImage}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div style={styles.packageBadge}>{pkg.badge}</div>
              </div>
              <div style={styles.packageContent}>
                <div style={styles.packageHeader}>
                  <h3 style={styles.packageDestination}>{pkg.destination}</h3>
                  <div style={styles.packageRating}>
                    {pkg.rating}
                  </div>
                </div>
                <ul style={styles.packageIncludes}>
                  {pkg.includes.map((item, idx) => (
                    <li 
                      key={idx} 
                      style={styles.packageIncludeItem}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#2c5aa0'
                      }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={styles.packageFooter}>
                  <div>
                    <div style={styles.packagePrice}>{pkg.price}</div>
                    <div style={styles.packageDuration}>per person</div>
                  </div>
                  <motion.button
                    style={{
                      background: '#2c5aa0',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif"
                    }}
                    whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(44,90,160,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. Testimonials Section */}
      <section style={styles.section}>
        <AnimatedSection direction="fade" duration={0.6}>
          <h2 style={styles.sectionTitle}>Real Stories, Real Travelers</h2>
          <p style={styles.sectionSubtitle}>
            Hear from those who trusted us with their dream vacations
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
              <motion.div 
                style={styles.testimonialCard}
                whileHover={{ 
                  y: -12,
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)',
                  borderColor: '#2c5aa0',
                  transition: { type: "spring", stiffness: 300 }
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
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 10. Airline Partners Section */}
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

      {/* 11. Newsletter Section */}
      {/* <section style={styles.newsletterSection}>
        <motion.div
          style={styles.newsletterContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={styles.newsletterTitle}>Get Exclusive Travel Deals</h2>
          <p style={styles.newsletterText}>
            Join 5,000+ smart travelers getting weekly deals & travel tips 💌
          </p>
          <form style={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address"
              style={styles.newsletterInput}
              onFocus={(e) => e.target.style.borderColor = '#2c5aa0'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
            <motion.button 
              type="submit"
              style={styles.newsletterButton}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 20px rgba(44, 90, 160, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </section> */}

      {/* 12. Final CTA Section */}
      <AnimatedSection direction="fade">
        <section style={styles.finalCTASection}>
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={styles.finalCTATitle}>Ready to Start Your Journey?</h2>
            <p style={styles.finalCTAText}>
              Let us handle the details while you focus on making memories. Over 12,000 happy travelers trust us — you should too.
            </p>
            <motion.button 
              style={styles.finalCTAButton}
              onClick={() => window.open('https://api.whatsapp.com/send/?phone=6591263786', '_blank')}
              whileHover={{ 
                y: -6,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                backgroundColor: '#f8f9fa',
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Chat with Us on WhatsApp 💬
            </motion.button>
          </motion.div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Home;