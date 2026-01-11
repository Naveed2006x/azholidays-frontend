import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/contact.js';
import Home from './pages/home.js';
import Blogs from './pages/blogs.js';
import About from './pages/about.js';
import Destinations from './pages/destinations.js';
import Attractions from './pages/attractions.js';
import Flights from './pages/flights.js';
import Hotels from './pages/hotels.js';
import Insurance from './pages/insurance.js';
import Transport from './pages/transport.js';
import Cruises from './pages/cruises.js';
import Packages from './pages/packages.js';

// Add ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Component to handle route-based messages and conditional footer
const RouteHandler = ({ children }) => {
  const location = useLocation();
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Check if current route should show footer
  const shouldShowFooter = () => {
    const footerRoutes = ['/', '/contact', '/destinations', '/attractions', '/blogs', '/about', '/flights', '/hotels', '/insurance', '/transport', '/cruises', '/packages'];
    return footerRoutes.includes(location.pathname);
  };

  useEffect(() => {
    // Check for URL parameters
    const urlParams = new URLSearchParams(location.search);
    const message = urlParams.get('message');

    if (message) {
      setAlert({
        open: true,
        message: message,
        severity: 'info'
      });

      // Clean URL
      const cleanUrl = location.pathname;
      window.history.replaceState({}, '', cleanUrl);
    }

    // Check for state messages
    if (location.state?.message) {
      setAlert({
        open: true,
        message: location.state.message,
        severity: location.state.severity || 'info'
      });

      // Clear the state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Navbar />
      {children}
      {shouldShowFooter() && <Footer />}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{
            width: '100%',
            fontFamily: "'Poppins', sans-serif",
            '& .MuiAlert-message': {
              fontSize: '1rem'
            }
          }}
        >
          <AlertTitle sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
            {alert.severity === 'success' ? 'Success!' :
              alert.severity === 'error' ? 'Error!' : 'Information'}
          </AlertTitle>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <RouteHandler>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/cruises" element={<Cruises />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </RouteHandler>
    </Router>
  );
}

export default App;