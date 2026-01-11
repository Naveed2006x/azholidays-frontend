import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/contact.js';
import Home from './pages/home.js'
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import VerifyOTP from './pages/verifyOTP.js';
import VerifyLoginOTP from './pages/verifyLoginOTP.js';
import Profile from './pages/profile.js'
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/forgotPassword';
import VerifyResetOTP from './pages/verifyResetOTP';
import ResetPassword from './pages/resetPassword';
import Attractions from './pages/attractions.js';
import AttractionDetail from './pages/attractionDetail.js'
import Blogs from './pages/blogs.js';
import About from './pages/about.js';
// Temporary placeholder components for other pages
const Destinations = () => <div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Destinations Page - Coming Soon</h1></div>;

// Component to handle route-based messages and conditional footer
const RouteHandler = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const { logout, isAuthenticated } = useAuth();

  // Add a key to force re-render when auth state changes
  const [authKey, setAuthKey] = useState(0);

  // Listen for auth state changes
  useEffect(() => {
    const handleAuthStateChange = () => {
      setAuthKey(prev => prev + 1);
    };

    window.addEventListener('authStateChanged', handleAuthStateChange);
    return () => {
      window.removeEventListener('authStateChanged', handleAuthStateChange);
    };
  }, []);

  // Check if current route should show footer
  const shouldShowFooter = () => {
    const footerRoutes = ['/', '/contact', '/destinations', '/attractions', '/blogs', '/about'];
    return footerRoutes.includes(location.pathname);
  };

  useEffect(() => {
    // Check for URL parameters (for logout messages)
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
      <Navbar key={authKey} />
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

// Updated Login component with message handling
const LoginWithMessage = () => {
  const location = useLocation();
  return (
    <Login
      initialMessage={location.state?.message}
      isVerified={location.state?.verified}
      returnUrl={location.state?.from?.pathname || '/'}
    />
  );
};

// Protected Profile component
const ProtectedProfile = () => (
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteHandler>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginWithMessage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/verify-login-otp" element={<VerifyLoginOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<ProtectedProfile />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/attraction/:id" element={<AttractionDetail />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </RouteHandler>
      </Router>
    </AuthProvider>
  );
}

export default App;