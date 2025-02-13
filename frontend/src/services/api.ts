import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api',
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {
    'Content-Type': 'application/json',
    'access-control-allow-origin' :'*'
  },
  // withCredentials: true,
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const vehicleService = {
  getVehicles: () => api.get('/vehicles/'),
  createVehicle: (data) => api.post('/vehicles/', data),
  updateVehicle: (id, data) => api.put(`/vehicles/${id}/`, data),
  deleteVehicle: (id) => api.delete(`/vehicles/${id}/`),
};

export const discountService = {
  getDiscounts: () => api.get('/discounts/'),
  createDiscount: (data) => api.post('/discounts/', data),
  updateDiscount: (id, data) => api.put(`/discounts/${id}/`, data),
  deleteDiscount: (id) => api.delete(`/discounts/${id}/`),
};

export const bookingService = {
  getBookings: () => api.get('/bookings/'),
  createBooking: (data) => api.post('/bookings/', data),
  updateBooking: (id, data) => api.put(`/bookings/${id}/`, data),
  deleteBooking: (id) => api.delete(`/bookings/${id}/`),
};

export const customerService = {
  getCustomers: () => api.get('/customers/'),
  createCustomer: (data) => api.post('/customers/', data),
  updateCustomer: (id, data) => api.put(`/customers/${id}/`, data),
  deleteCustomer: (id) => api.delete(`/customers/${id}/`),
};

export const staffService = {
  getStaff: () => api.get('/staff/'),
  createStaff: (data) => api.post('/staff/', data),
  updateStaff: (id, data) => api.put(`/staff/${id}/`, data),
  deleteStaff: (id) => api.delete(`/staff/${id}/`),
};

export const maintenanceService = {
  getMaintenanceRecords: () => api.get('/maintenance/'),
  createMaintenanceRecord: (data) => api.post('/maintenance/', data),
  updateMaintenanceRecord: (id, data) => api.put(`/maintenance/${id}/`, data),
  deleteMaintenanceRecord: (id) => api.delete(`/maintenance/${id}/`),
};

export const billingService = {
  getBills: () => api.get('/billing/'),
  createBill: (data) => api.post('/billing/', data),
  updateBill: (id, data) => api.put(`/billing/${id}/`, data),
  deleteBill: (id) => api.delete(`/billing/${id}/`),
};

export default api; 