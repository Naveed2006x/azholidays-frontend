import React, { useState, useEffect } from 'react';
import banner from '../Images/banner.jpg';
import cablecar from '../Images/cablecar.jpg';
import universal from '../Images/universal.jpg';
import safari from '../Images/nightsafari.jpg';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--'
  });

  const singaporeAttractions = [
    {
      name: 'Cable Car',
      image: cablecar,
      description: 'Enjoy panoramic views of Singapore\'s skyline and harbor as you glide between Mount Faber and Sentosa Island in our cable cars.',
      price: 'From $21'
    },
    {
      name: 'Universal Studios',
      image: universal,
      description: 'Experience thrilling rides and entertainment at Southeast Asia\'s only Universal Studios theme park.',
      price: 'From $78'
    },
    {
      name: 'Night Safari',
      image: safari,
      description: 'Embark on an unforgettable nocturnal adventure through diverse geographical zones and observe over 2,500 animals.',
      price: 'From $49'
    }
  ];

  // Font style for Poppins
  const fontStyle = {
    fontFamily: "'Poppins', sans-serif",
  };

  // Inline styles
  const styles = {
    home: {
      overflowX: 'hidden',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      ...fontStyle
    },
    heroBanner: {
      width: '100%',
      position: 'relative',
      overflow: 'visible',
      marginBottom: '100px',
      '@media (max-width: 768px)': {
        marginBottom: '50px'
      }
    },
    bannerContainer: {
      position: 'relative',
      width: '100%',
      height: '50vh',
      minHeight: '400px'
    },
    bannerImage: {
      width: '100%',
      height: '50vh',
      objectFit: 'cover',
      display: 'block'
    },
    bannerContent: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'white',
      width: '100%',
      padding: '0 20px'
    },
    bannerTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
      lineHeight: 1.2,
      ...fontStyle,
      '@media (max-width: 768px)': {
        fontSize: '2.5rem'
      },
      '@media (max-width: 480px)': {
        fontSize: '2rem',
        marginBottom: '1.5rem'
      }
    },
    searchSectionOverlay: {
      position: 'absolute',
      bottom: '-80px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
      padding: '30px',
      zIndex: 10,
      display: 'block',
      '@media (max-width: 768px)': {
        display: 'none'
      },
      '@media (max-width: 768px)': {
        bottom: '-100px',
        width: '95%',
        padding: '25px 20px'
      }
    },
    searchContainer: {
      textAlign: 'center'
    },
    searchTitle: {
      marginBottom: '25px',
      color: '#333',
      fontSize: '1.8rem',
      fontWeight: 700,
      ...fontStyle
    },
    searchForm: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      alignItems: 'end',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '15px'
      }
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    formLabel: {
      marginBottom: '8px',
      fontWeight: 600,
      color: '#555',
      fontSize: '0.9rem',
      ...fontStyle
    },
    formInput: {
      padding: '12px 15px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      ...fontStyle,
      '&:focus': {
        outline: 'none',
        borderColor: '#2c5aa0',
        boxShadow: '0 0 0 3px rgba(44, 90, 160, 0.1)'
      }
    },
    searchButton: {
      backgroundColor: '#2c5aa0',
      color: 'white',
      border: 'none',
      padding: '14px 25px',
      fontSize: '1.1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      height: 'fit-content',
      fontWeight: 600,
      ...fontStyle,
      '&:hover': {
        backgroundColor: '#2c5aa0',
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(44, 90, 160, 0.3)'
      }
    },
    attractionsSection: {
      padding: '80px 0 80px',
      '@media (max-width: 768px)': {
        padding: '100px 0 60px'
      },
      '@media (max-width: 480px)': {
        padding: '80px 0 50px'
      }
    },
    sectionTitle: {
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#333',
      marginBottom: '1rem',
      ...fontStyle,
      '@media (max-width: 768px)': {
        fontSize: '2rem'
      },
      '@media (max-width: 480px)': {
        fontSize: '1.8rem'
      }
    },
    sectionSubtitle: {
      textAlign: 'center',
      fontSize: '1.1rem',
      color: '#666',
      marginBottom: '3rem',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      ...fontStyle,
      '@media (max-width: 480px)': {
        fontSize: '1rem',
        marginBottom: '2rem'
      }
    },
    attractionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto 50px',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '25px',
        padding: '0 20px'
      },
      '@media (max-width: 480px)': {
        padding: '0 15px'
      }
    },
    attractionCard: {
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex', // Added flex to make card a flex container
      flexDirection: 'column', // Stack children vertically
      height: '100%', // Ensure card takes full height
      '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
      }
    },
    attractionImage: {
      position: 'relative',
      height: '250px',
      overflow: 'hidden',
      '@media (max-width: 768px)': {
        height: '200px'
      }
    },
    attractionImageImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    attractionPrice: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: '#2c5aa0',
      color: 'white',
      padding: '8px 15px',
      borderRadius: '20px',
      fontWeight: 600,
      fontSize: '0.9rem',
      ...fontStyle
    },
    attractionContent: {
      padding: '20px', // Reduced padding
      display: 'flex', // Added flex
      flexDirection: 'column', // Stack content vertically
      flexGrow: 1, // Allow content to grow and fill space
      '@media (max-width: 480px)': {
        padding: '15px' // Reduced padding for mobile
      }
    },
    attractionName: {
      fontSize: '1.4rem',
      fontWeight: 700,
      color: '#333',
      marginTop: '2px',
      marginBottom: '2px', // Reduced from 10px to 8px
      ...fontStyle,
      '@media (max-width: 480px)': {
        fontSize: '1.2rem',
        marginBottom: '6px' // Further reduced for mobile
      }
    },
    attractionDescription: {
      color: '#666',
      lineHeight: 1.6,
      marginBottom: '15px', // Reduced from 20px to 15px
      fontSize: '0.95rem',
      flexGrow: 1, // Allow description to grow and push button to bottom
      ...fontStyle
    },
    attractionButton: {
      backgroundColor: '#2c5aa0',
      color: 'white',
      border: 'none',
      padding: '12px 25px',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      marginTop: 'auto', // Push button to bottom
      ...fontStyle,
      '&:hover': {
        backgroundColor: '#2c5aa0',
        transform: 'translateY(-2px)',
        boxShadow: '0 5px 15px rgba(44, 90, 160, 0.3)'
      }
    },
    viewAllContainer: {
      textAlign: 'center'
    },
    viewAllButton: {
      background: 'transparent',
      color: '#2c5aa0',
      border: '2px solid #2c5aa0',
      padding: '15px 40px',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ...fontStyle,
      '&:hover': {
        backgroundColor: '#2c5aa0',
        color: 'white',
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 25px rgba(44, 90, 160, 0.3)'
      },
      '@media (max-width: 480px)': {
        padding: '12px 30px',
        fontSize: '1rem'
      }
    },
    countdownCard: {
      position: 'fixed',
      right: '20px',
      background: 'linear-gradient(135deg, #2c5aa0, #1e3d6f)',
      color: 'white',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      zIndex: 10000,
      minWidth: '280px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      animation: 'slideInRight 0.5s ease-out',
      '@media (max-width: 768px)': {
        right: '10px',
        minWidth: 'auto',
        maxWidth: '300px'
      },
      '@media (max-width: 480px)': {
        right: '10px',
        padding: '15px',
        maxWidth: '280px'
      }
    },
    countdownHeader: {
      textAlign: 'center',
      marginBottom: '15px'
    },
    countdownHeaderTitle: {
      fontSize: '1.2rem',
      fontWeight: 700,
      marginBottom: '5px',
      ...fontStyle,
      '@media (max-width: 480px)': {
        fontSize: '1.1rem'
      }
    },
    countdownHeaderText: {
      fontSize: '0.9rem',
      opacity: 0.9,
      ...fontStyle,
      '@media (max-width: 480px)': {
        fontSize: '0.8rem'
      }
    },
    countdownTimer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '10px',
      textAlign: 'center',
      '@media (max-width: 768px)': {
        gap: '8px'
      }
    },
    countdownItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    countdownValue: {
      fontSize: '1.4rem',
      fontWeight: 700,
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '8px',
      borderRadius: '8px',
      minWidth: '45px',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      ...fontStyle,
      '@media (max-width: 768px)': {
        fontSize: '1.2rem',
        minWidth: '40px',
        padding: '6px'
      },
      '@media (max-width: 480px)': {
        fontSize: '1.1rem',
        minWidth: '35px'
      }
    },
    countdownLabel: {
      fontSize: '0.7rem',
      marginTop: '5px',
      opacity: 0.8,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      ...fontStyle,
      '@media (max-width: 768px)': {
        fontSize: '0.65rem'
      },
      '@media (max-width: 480px)': {
        fontSize: '0.6rem'
      }
    }
  };

useEffect(() => {
  // Set launch date to March 1, 2026
  const launchDate = new Date(2026, 2, 1, 0, 0, 0).getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const timeLeft = launchDate - now;

    if (timeLeft < 0) {
      setTimeLeft({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      });
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    setTimeLeft({
      days: days < 10 ? '0' + days : days.toString(),
      hours: hours < 10 ? '0' + hours : hours.toString(),
      minutes: minutes < 10 ? '0' + minutes : minutes.toString(),
      seconds: seconds < 10 ? '0' + seconds : seconds.toString()
    });
  };

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();

  return () => clearInterval(interval);
}, []);

  return (
    <div style={styles.home}>
      
      {/* Countdown Card - Top Right */}
      <div style={styles.countdownCard}>
        <div style={styles.countdownHeader}>
          <h3 style={styles.countdownHeaderTitle}>Launching Soon!</h3>
          <p style={styles.countdownHeaderText}>Get ready for an amazing experience</p>
        </div>
        <div style={styles.countdownTimer}>
          <div style={styles.countdownItem}>
            <span style={styles.countdownValue}>{timeLeft.days}</span>
            <span style={styles.countdownLabel}>Days</span>
          </div>
          <div style={styles.countdownItem}>
            <span style={styles.countdownValue}>{timeLeft.hours}</span>
            <span style={styles.countdownLabel}>Hours</span>
          </div>
          <div style={styles.countdownItem}>
            <span style={styles.countdownValue}>{timeLeft.minutes}</span>
            <span style={styles.countdownLabel}>Minutes</span>
          </div>
          <div style={styles.countdownItem}>
            <span style={styles.countdownValue}>{timeLeft.seconds}</span>
            <span style={styles.countdownLabel}>Seconds</span>
          </div>
        </div>
      </div> 
      
      {/* Hero Banner with Search Overlay */}
      <section style={styles.heroBanner} id="home">
        <div style={styles.bannerContainer}>
          <img src={banner} alt="Discover Paradise" style={styles.bannerImage} />
          <div style={styles.bannerContent}>
            <h1 style={styles.bannerTitle}>Your Dream Vacation Awaits Right Here</h1>
          </div>
        </div>
        
        {/* Search Section - Half in banner, half below */}
        <div style={styles.searchSectionOverlay}>
          <div style={styles.searchContainer}>
            <h2 style={styles.searchTitle}>Find Your Perfect Trip</h2>
            <div style={styles.searchForm}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Destination</label>
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Check-in</label>
                <input type="date" style={styles.formInput} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Check-out</label>
                <input type="date" style={styles.formInput} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Travelers</label>
                <select style={styles.formInput}>
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>Family (2+2)</option>
                  <option>Group (5+)</option>
                </select>
              </div>
              <button style={styles.searchButton}>Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Singapore Attractions Section */}
      <section style={styles.attractionsSection}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={styles.sectionTitle}>Singapore Attractions</h2>
          <p style={styles.sectionSubtitle}>Discover the best experiences in the Lion City</p>
          
          <div style={styles.attractionsGrid}>
            {singaporeAttractions.map((attraction, index) => (
              <div 
                key={index} 
                style={styles.attractionCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div style={styles.attractionImage}>
                  <img 
                    src={attraction.image} 
                    alt={attraction.name} 
                    style={styles.attractionImageImg}
                  />
                  <div style={styles.attractionPrice}>{attraction.price}</div>
                </div>
                <div style={styles.attractionContent}>
                  <h3 style={styles.attractionName}>{attraction.name}</h3>
                  <p style={styles.attractionDescription}>{attraction.description}</p>
                  <button 
                    style={styles.attractionButton}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#2c5aa0';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 5px 15px rgba(44, 90, 160, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#2c5aa0';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Explore Attraction
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.viewAllContainer}>
            <button 
              style={styles.viewAllButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2c5aa0';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(44, 90, 160, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#2c5aa0';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              View All Attractions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;