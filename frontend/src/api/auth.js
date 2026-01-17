import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance for auth API
const authApi = axios.create({
  baseURL: `${API_URL}/api/auth`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export const authAPI = {
  signup,
  verifyOTP,
  login,
  verifyLoginOTP,
  resendOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  getMe
};

export default authAPI;
