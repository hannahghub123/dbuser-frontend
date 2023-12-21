import axiosInstance from '../services/AxiosInstance';
import { jwtDecode as jwt_decode } from 'jwt-decode';

// const API_BASE_URL = 'http://localhost:8000/api/';

export const isTokenExpired = (accessToken) => {
    if (!accessToken) {
      // If no access token is present, consider it expired
      return true;
    }
  
    try {
      // Decode the token to get its expiration date
      const decodedToken = jwt_decode(accessToken);
      const currentTime = Date.now() / 1000; // Convert to seconds
  
      // Check if the token is expired
      return decodedToken.exp < currentTime;
    } catch (error) {
      // If there's an error decoding the token, consider it expired
      console.error('Error decoding access token:', error);
      return true;
    }
  };
  

// Assuming you have a function to refresh the access token in your AuthService


export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post('/token/refresh/', {
      refresh: refreshToken,
    });

    // Assuming the new access token is returned in the response
    const newAccessToken = response.data.access;
    return newAccessToken;
  } catch (error) {
    // Handle error (e.g., log, show an error message)
    console.error('Failed to refresh access token:', error);
    throw error;
  }
};
