import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SessionExpiredModal from './components/SessionExpiredModal';
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
import NotFound from './pages/notFound.js';
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import VerifyOTP from './pages/verifyOTP.js';
import VerifyLoginOTP from './pages/verifyLoginOTP.js';
import ForgotPassword from './pages/forgotPassword.js';
import VerifyResetOTP from './pages/verifyResetOTP.js';
import ResetPassword from './pages/resetPassword.js';
import Profile from './pages/profile.js';
import IndiaVisa from './pages/indiaVisa';
import CheckEligibility from './pages/checkEligibility';
import ApplyVisa from './pages/applyVisa';
import TrackApplication from './pages/trackApplication';
import PricingRefund from './pages/pricingRefund';
import PrivacyPolicy from './pages/privacyPolicy';
import TermsConditions from './pages/termsConditions';
import AgentDashboard from './pages/agent/Dashboard';
import ApplicationDetail from './pages/agent/ApplicationDetail';
import EVisaServices from './pages/eVisaServices';
// WhatsApp Chatbox Component
const WhatsAppChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const whatsappNumber = '6591263786';

  const quickReplies = [
    'I want to book a holiday package',
    'Tell me about your destinations',
    'I need help with flight bookings',
    'What hotel packages do you offer?',
  ];

  const sendMessage = (message) => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendCustomMessage = (e) => {
    e.preventDefault();
    if (customMessage.trim()) {
      sendMessage(customMessage);
      setCustomMessage('');
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .chat-button {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 30px;
            right: 30px;
            background-color: #25D366;
            color: #FFF;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: none;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
          }

          .chat-button:hover {
            background-color: #128C7E;
            transform: scale(1.1);
            animation: none;
          }

          .chat-button.open {
            animation: none;
          }

          .chat-window {
            position: fixed;
            width: 350px;
            height: 500px;
            bottom: 100px;
            right: 30px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 999;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            animation: slideUp 0.3s ease;
            font-family: 'Poppins', sans-serif;
          }

          .chat-header {
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            color: white;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .chat-header-avatar {
            width: 45px;
            height: 45px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .chat-header-info h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
          }

          .chat-header-info p {
            margin: 2px 0 0 0;
            font-size: 12px;
            opacity: 0.9;
          }

          .chat-body {
            flex: 1;
            padding: 20px;
            background: #f0f2f5;
            overflow-y: auto;
          }

          .chat-message {
            background: white;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 12px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          .chat-message p {
            margin: 0 0 8px 0;
            font-size: 14px;
            line-height: 1.5;
            color: #333;
          }

          .quick-replies {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 12px;
          }

          .quick-reply-btn {
            background: #25D366;
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 13px;
            font-family: 'Poppins', sans-serif;
            transition: all 0.2s;
            text-align: left;
          }

          .quick-reply-btn:hover {
            background: #128C7E;
            transform: translateX(4px);
          }

          .chat-footer {
            padding: 15px;
            background: white;
            border-top: 1px solid #e0e0e0;
          }

          .chat-input-form {
            display: flex;
            gap: 8px;
          }

          .chat-input {
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 24px;
            font-size: 14px;
            font-family: 'Poppins', sans-serif;
            outline: none;
          }

          .chat-input:focus {
            border-color: #25D366;
          }

          .chat-send-btn {
            width: 40px;
            height: 40px;
            background: #25D366;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          }

          .chat-send-btn:hover {
            background: #128C7E;
          }

          .close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: all 0.2s;
          }

          .close-btn:hover {
            background: rgba(255, 255, 255, 0.3);
          }

          @media screen and (max-width: 1024px) {
            .chat-button {
              right: 25px;
            }
            .chat-window {
              bottom: 150px;
              right: 25px;
            }
          }

          @media screen and (max-width: 768px) {
            .chat-button {
              width: 55px;
              height: 55px;
              right: 20px;
            }
            .chat-window {
              width: calc(100vw - 40px);
              height: 450px;
              bottom: 160px;
              right: 20px;
              left: 20px;
            }
          }
        `}
      </style>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-avatar">
              <img 
                src="/logo.png" 
                alt="Az Holidays" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%'
                }}
              />
            </div>
            <div className="chat-header-info">
              <h3>Az Holidays</h3>
              <p>Typically replies instantly</p>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-body">
            <div className="chat-message">
              <p>👋 Hi there! Welcome to Az Holidays!</p>
              <p>How can we help you plan your perfect trip today?</p>
              <div className="quick-replies">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-btn"
                    onClick={() => sendMessage(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="chat-footer">
            <form className="chat-input-form" onSubmit={handleSendCustomMessage}>
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
              <button type="submit" className="chat-send-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        className={`chat-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Chat"
      >
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="32"
            height="32"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        )}
      </button>
    </>
  );
};

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
  const { showToast } = useToast();

  // Check if current route should show footer
  const shouldShowFooter = () => {
    const footerRoutes = ['/', '/contact', '/destinations', '/attractions', '/blogs', '/about', '/flights', '/hotels', '/insurance', '/transport', '/cruises', '/packages', '/e-visa-services'];
    return footerRoutes.includes(location.pathname);
  };

  useEffect(() => {
    // Check for URL parameters
    const urlParams = new URLSearchParams(location.search);
    const message = urlParams.get('message');

    if (message) {
      showToast(message, 'info');

      // Clean URL
      const cleanUrl = location.pathname;
      window.history.replaceState({}, '', cleanUrl);
    }

    // Check for state messages
    if (location.state?.message) {
      const severity = location.state.verified ? 'success' : (location.state.severity || 'info');
      showToast(location.state.message, severity);

      // Clear the state to prevent showing the message again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location, showToast]);

  return (
    <>
      <Navbar />
      {children}
      {shouldShowFooter() && <Footer />}
      <WhatsAppChatbox />
      <SessionExpiredModal />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <RouteHandler>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/e-visa-services" element={<EVisaServices />} />
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
              <Route path="/india-visa" element={<IndiaVisa />} />
              <Route path="/check-eligibility" element={<CheckEligibility />} />
              <Route path="/apply-visa" element={<ApplyVisa />} />
              <Route path="/track-application" element={<TrackApplication />} />
              <Route path="/pricing-refund" element={<PricingRefund />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />  
              
              {/* Agent Routes */}
              <Route path="/agent/dashboard" element={<AgentDashboard />} />
              <Route path="/agent/application/:id" element={<ApplicationDetail />} />
              
              {/* Auth Routes */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/verify-login-otp" element={<VerifyLoginOTP />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteHandler>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;