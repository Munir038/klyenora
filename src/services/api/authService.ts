/**
 * Auth service — login, signup, OTP, token refresh.
 */

import { ApiResponse, User } from '../../types/models';
import apiClient from './client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface OtpPayload {
  phone: string;
  otp: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', payload),

  signup: (payload: SignupPayload) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', payload),

  verifyOtp: (payload: OtpPayload) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/verify-otp', payload),

  sendOtp: (phone: string) =>
    apiClient.post<ApiResponse<{ message: string }>>('/auth/send-otp', { phone }),

  googleLogin: (idToken: string) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/google', { idToken }),

  refreshToken: (refreshToken: string) =>
    apiClient.post<ApiResponse<{ token: string }>>('/auth/refresh', { refreshToken }),

  logout: () => apiClient.post<ApiResponse<null>>('/auth/logout'),

  getProfile: () => apiClient.get<ApiResponse<User>>('/auth/me'),
};
