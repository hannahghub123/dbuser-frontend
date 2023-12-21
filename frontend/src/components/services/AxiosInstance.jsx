import axios from 'axios';
import { isTokenExpired, refreshAccessToken } from '../services/AuthService';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Include this line if CORS and credentials are required
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken && isTokenExpired(accessToken)) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        localStorage.setItem('access_token', newAccessToken);
      } else {
        console.error('No refresh token available');
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
