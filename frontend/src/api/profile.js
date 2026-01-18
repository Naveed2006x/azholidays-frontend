import axios from 'axios';

const API_URL = "https://api.azholidays.com.sg";

// Create axios instance for profile API
const profileApi = axios.create({
  baseURL: `${API_URL}/api/user`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
profileApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Get user profile
 */
const getProfile = async () => {
  const response = await profileApi.get('/profile');
  return response.data;
};

/**
 * Update user profile
 */
const updateProfile = async (profileData) => {
  const response = await profileApi.put('/profile', profileData);
  return response.data;
};

/**
 * Change password
 */
const changePassword = async (currentPassword, newPassword) => {
  const response = await profileApi.put('/change-password', {
    currentPassword,
    newPassword
  });
  return response.data;
};

/**
 * Upload profile picture
 */
const uploadProfilePicture = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('profilePicture', file);

  const response = await profileApi.put('/profile-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onUploadProgress(percentCompleted);
      }
    }
  });

  return response.data;
};

/**
 * Delete profile picture
 */
const deleteProfilePicture = async () => {
  const response = await profileApi.delete('/profile-picture');
  return response.data;
};

export const profileAPI = {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture,
  deleteProfilePicture
};

export default profileAPI;
