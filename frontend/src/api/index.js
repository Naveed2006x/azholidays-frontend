// Base API configuration - MUST COME FIRST
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
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

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses with automatic token refresh
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint (cookie sent automatically)
        const { data } = await axios.post('https://api.azholidays.com.sg/api/auth/refresh', {}, {
          withCredentials: true
        });
        
        // Update stored token
        localStorage.setItem('accessToken', data.accessToken);
        
        // Update axios header
        api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        
        // Notify all queued requests
        onRefreshed(data.accessToken);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        
        isRefreshing = false;
        return api(originalRequest);
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

    return Promise.reject(error.response?.data || error);
  }
);

// Export all API modules - MUST COME AFTER api initialization
export * from './auth';
export * from './profile';
export * from './attractions';
export * from './bookings';