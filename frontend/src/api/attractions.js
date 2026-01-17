import { api } from './index';

export const attractionsAPI = {
  getSingaporeAttractions: (params) => api.get('/attractions/singapore', { params }),
  getProductDetails: (id) => api.get(`/attractions/product/${id}/details`),
  getProductOptions: (id) => api.get(`/attractions/product/${id}/options`),
  checkAvailability: (ticketTypeId, params) => 
    api.get(`/attractions/ticket-type/${ticketTypeId}/availability`, { params })
};