import React, { createContext, useState, useContext, useEffect } from 'react';

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
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('🔍 Checking auth status:', { token: !!token, userData: !!userData });
    
    if (token && userData && isTokenValid(token)) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('✅ User authenticated:', parsedUser.email);
        setUser(parsedUser);
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      console.log('❌ No valid authentication found');
      // Clear invalid data
      if (token || userData) {
        localStorage.removeItem('token');
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

  // Set up interval to check token expiration every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token && !isTokenValid(token)) {
        console.log('🔄 Token expired, logging out...');
        logout();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Listen for storage changes (login/logout from other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Only respond to storage changes from other tabs/windows
      // The storage event doesn't fire in the same tab that made the change
      if (e.key === 'token' || e.key === 'user') {
        console.log('🔄 Storage changed from another tab, checking auth status...');
        setTimeout(() => {
          checkAuthStatus();
        }, 100); // Small delay to ensure localStorage is updated
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (token, userData) => {
    console.log('🔐 Login called:', { token: token.substring(0, 20) + '...', user: userData });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData); // This updates the state immediately
    console.log('✅ Login completed - user state updated');
    console.log('📦 LocalStorage after login:', {
      token: localStorage.getItem('token')?.substring(0, 20) + '...',
      user: localStorage.getItem('user')
    });
  };

  const logout = () => {
    console.log('🚪 Logout called');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // This updates the state immediately
    
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

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};