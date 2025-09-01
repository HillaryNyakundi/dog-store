import axios, { AxiosError } from 'axios';
import { SignupResponse, LoginCredentials, SignupCredentials, TokenResponse, User } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const authApi = {
  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      formData.append('grant_type', 'password');

      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // If response is just a string token, wrap it
      if (typeof response.data === 'string') {
        return {
          access_token: response.data,
          token_type: 'bearer',
        };
      }

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.detail || 'Login failed');
      }
      throw error;
    }
  },

  async signup(data: SignupCredentials): Promise<SignupResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const detail = error.response?.data?.detail;
        if (Array.isArray(detail)) {
          throw new Error(detail[0]?.msg || 'Signup failed');
        }
        throw new Error(detail || 'Signup failed');
      }
      throw error;
    }
  },

  async refresh(refreshToken: string): Promise<string> {
    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh`,
        {},
        {
          headers: {
            'refresh-token': refreshToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.detail || 'Token refresh failed');
      }
      throw error;
    }
  },

  // Parse JWT to get user data
  parseJWT(token: string): any {
    try {
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
      return payload;
    } catch (error) {
      console.error('Failed to parse JWT:', error);
      return null;
    }
  },
};