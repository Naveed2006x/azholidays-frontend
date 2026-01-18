import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Function to check if token is valid
  const isTokenValid = (token) => {
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  };

  // Function to check auth status
  const checkAuthStatus = () => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    console.log('🔍 Checking auth status:', { token: !!token, userData: !!userData });
    
    if (token && userData && isTokenValid(token)) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('✅ User authenticated:', parsedUser.email);
        setUser(parsedUser);
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      console.log('❌ No valid authentication found');
      // Clear invalid data
      if (token || userData) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
      setUser(null);
    }
    setLoading(false);
  };

  // Check auth status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Listen for session expiry events from axios interceptor
  useEffect(() => {
    const handleSessionExpired = () => {
      console.log('🔔 Session expired event received');
      setSessionExpired(true);
      setUser(null);
      
      // Auto-hide modal after 5 seconds
      setTimeout(() => {
        setSessionExpired(false);
      }, 5000);
    };

    window.addEventListener('sessionExpired', handleSessionExpired);
    return () => {
      window.removeEventListener('sessionExpired', handleSessionExpired);
    };
  }, []);

  // TEST ONLY: Keyboard shortcut to trigger session expired modal (Ctrl+Shift+E)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        console.log('🧪 TEST: Triggering session expired modal');
        setSessionExpired(true);
        setTimeout(() => {
          setSessionExpired(false);
        }, 5000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Listen for storage changes (login/logout from other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Only respond to storage changes from other tabs/windows
      if (e.key === 'accessToken' || e.key === 'user') {
        console.log('🔄 Storage changed from another tab, checking auth status...');
        setTimeout(() => {
          checkAuthStatus();
        }, 100);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (accessToken, userData) => {
    console.log('🔐 Login called:', { token: accessToken.substring(0, 20) + '...', user: userData });
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    console.log('✅ Login completed - user state updated');
  };

  const logout = async () => {
    console.log('🚪 Logout called');
    
    try {
      // Call backend logout endpoint to clear refresh token
      await authAPI.logout();
      console.log('✅ Server logout successful');
    } catch (error) {
      console.error('⚠️ Server logout failed, clearing local data anyway:', error);
    }
    
    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    
    // Redirect to login page if not already there
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const dismissSessionExpired = () => {
    setSessionExpired(false);
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    loading,
    sessionExpired,
    dismissSessionExpired
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};