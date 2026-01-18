import axios from 'axios';

const API_URL = "https://api.azholidays.com.sg";

// Create axios instance for auth API
const authApi = axios.create({
  baseURL: `${API_URL}/api/auth`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies for refresh token
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers = [];

// Subscribe to token refresh
const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

// Notify all subscribers when token is refreshed
const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// Add token to requests if available
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for automatic token refresh
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(authApi(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint (cookie sent automatically)
        const { data } = await authApi.post('/refresh');
        
        // Update stored token
        localStorage.setItem('accessToken', data.accessToken);
        
        // Update axios header
        authApi.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        
        // Notify all queued requests
        onRefreshed(data.accessToken);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        
        isRefreshing = false;
        return authApi(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear auth and redirect to login
        isRefreshing = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        
        // Dispatch custom event for session expiry
        window.dispatchEvent(new CustomEvent('sessionExpired'));
        
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Signup - Create new user account
 */
const signup = async (firstName, lastName, email, password, phone, newsletter) => {
  const response = await authApi.post('/signup', {
    firstName,
    lastName,
    email,
    password,
    phone,
    newsletter
  });
  return response;
};

/**
 * Verify OTP after signup
 */
const verifyOTP = async (email, otp, userData = {}) => {
  const response = await authApi.post('/verify-otp', {
    email,
    otp,
    ...userData
  });
  return response;
};

/**
 * Login - Authenticate user
 */
const login = async (email, password) => {
  const response = await authApi.post('/login', {
    email,
    password
  });
  return response;
};

/**
 * Verify OTP for login
 */
const verifyLoginOTP = async (email, otp) => {
  const response = await authApi.post('/verify-login-otp', {
    email,
    otp
  });
  return response;
};

/**
 * Resend OTP
 */
const resendOTP = async (email, type = 'signup') => {
  const response = await authApi.post('/resend-otp', {
    email,
    type
  });
  return response;
};

/**
 * Forgot Password - Request password reset
 */
const forgotPassword = async (email) => {
  const response = await authApi.post('/forgot-password', {
    email
  });
  return response;
};

/**
 * Verify Reset OTP
 */
const verifyResetOTP = async (email, otp) => {
  const response = await authApi.post('/verify-reset-otp', {
    email,
    otp
  });
  return response;
};

/**
 * Reset Password
 */
const resetPassword = async (resetToken, newPassword, email) => {
  const response = await authApi.post('/reset-password', {
    resetToken,
    newPassword,
    email
  });
  return response;
};

/**
 * Get current user
 */
const getMe = async () => {
  const response = await authApi.get('/me');
  return response;
};

/**
 * Refresh access token
 */
const refreshToken = async () => {
  const response = await authApi.post('/refresh');
  return response;
};

/**
 * Logout - Clear tokens from server and client
 */
const logout = async () => {
  try {
    const response = await authApi.post('/logout');
    return response;
  } catch (error) {
    // Even if logout fails on server, clear local data
    console.error('Logout error:', error);
    throw error;
  }
};

export const authAPI = {
  signup,
  verifyOTP,
  login,
  verifyLoginOTP,
  resendOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  getMe,
  refreshToken,
  logout
};

export default authAPI;
