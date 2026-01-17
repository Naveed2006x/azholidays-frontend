import { api } from './index';

export const bookingsAPI = {
  // Booking flow - 3 steps
  reserveBooking: (bookingData) => api.post('/attractions/booking/reserve', bookingData),
  confirmBooking: (bookingId) => api.post('/attractions/booking/confirm', { bookingId }),
  getBookingDetails: (bookingId) => api.get(`/attractions/booking/${bookingId}/details`),
  
  // Release/cancel booking
  releaseBooking: (bookingId) => api.post('/attractions/booking/release', { bookingId }),
  
  // Poll for ticket readiness
  pollTickets: (bookingId, maxAttempts = 10, interval = 3000) =>
    api.get(`/attractions/booking/${bookingId}/poll-tickets`, {
      params: { maxAttempts, interval }
    })
};