import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const axiosAuth = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add auth token
axiosAuth.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const session = await getSession();
      if (session?.refreshToken) {
        try {
          // Trigger session update with new tokens
          await fetch('/api/auth/session?update', {
            method: 'GET',
          });
          
          // Retry original request
          return axiosAuth(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          window.location.href = '/auth/signin';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosAuth;