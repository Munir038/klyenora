/**
 * Payments service
 */

import { ApiResponse, Payment } from '../../types/models';
import apiClient from './client';

export const paymentsService = {
  getAll: (params?: Record<string, string | number | boolean>) =>
    apiClient.get<ApiResponse<Payment[]>>('/payments', params),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Payment>>(`/payments/${id}`),

  create: (data: Partial<Payment>) =>
    apiClient.post<ApiResponse<Payment>>('/payments', data),

  update: (id: string, data: Partial<Payment>) =>
    apiClient.put<ApiResponse<Payment>>(`/payments/${id}`, data),

  getPending: () =>
    apiClient.get<ApiResponse<Payment[]>>('/payments/pending'),

  getHistory: (params?: Record<string, string | number | boolean>) =>
    apiClient.get<ApiResponse<Payment[]>>('/payments/history', params),
};
