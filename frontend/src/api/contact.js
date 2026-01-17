import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance for contact API
const contactApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitContactForm = async (formData) => {
  try {
    const response = await contactApi.post('/api/contact', formData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    console.error('Error response:', error.response?.data); // Add this line for debugging
    return {
      success: false,
      error: error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to send message. Please try again.',
    };
  }
};

export default {
  submitContactForm,
};
