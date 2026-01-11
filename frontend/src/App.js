import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/contact.js';
import About from './pages/about.js'
import Home from './pages/home.js'

// Temporary placeholder components for other pages
const Destinations = () => <div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Destinations Page - Coming Soon</h1></div>;
const Attractions = () => <div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Attractions Page - Coming Soon</h1></div>;
const Blogs = () => <div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Blogs Page - Coming Soon</h1></div>;


// Component to handle route-based messages and conditional footer
const RouteHandler = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Check if current route should show footer
  const shouldShowFooter = () => {
    const footerRoutes = ['/', '/contact'];
    return footerRoutes.includes(location.pathname);
  };

  useEffect(() => {
    // Check for message in location state
    if (location.state?.message) {
      setAlert({
        open: true,
        message: location.state.message,
        severity: location.state.verified ? 'success' : 'info'
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
      {shouldShowFooter() && <Footer />} {/* Conditionally render Footer */}
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
            fontFamily: "'Satoshi', sans-serif",
            '& .MuiAlert-message': {
              fontSize: '1rem'
            }
          }}
        >
          <AlertTitle sx={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600 }}>
            {alert.severity === 'success' ? 'Success!' : 'Information'}
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
      <RouteHandler>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </RouteHandler>
    </Router>
  );
}

export default App;