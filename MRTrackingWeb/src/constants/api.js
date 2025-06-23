export const API_BASE_URL = 'http://localhost:8082/api';

export const ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  // Admin Profile Endpoints
  VIEW_PROFILE: 'http://localhost:8082/api/admin/profile',
  UPDATE_PROFILE: 'http://localhost:8082/api/admin/profile',
  CHANGE_PASSWORD: 'http://localhost:8082/api/admin/change-password',
  // Add more endpoints here as needed
};
