/**
 * Bookings service
 */

import { ApiResponse, Booking, EventPackage } from '../../types/models';
import apiClient from './client';

export const bookingsService = {
  getAll: (params?: Record<string, string | number | boolean>) =>
    apiClient.get<ApiResponse<Booking[]>>('/bookings', params),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Booking>>(`/bookings/${id}`),

  create: (data: Partial<Booking>) =>
    apiClient.post<ApiResponse<Booking>>('/bookings', data),

  update: (id: string, data: Partial<Booking>) =>
    apiClient.put<ApiResponse<Booking>>(`/bookings/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/bookings/${id}`),

  // Packages
  getPackages: () =>
    apiClient.get<ApiResponse<EventPackage[]>>('/packages'),

  getPackageById: (id: string) =>
    apiClient.get<ApiResponse<EventPackage>>(`/packages/${id}`),
};
