/**
 * Clients service
 */

import { ApiResponse, Client } from '../../types/models';
import apiClient from './client';

export const clientsService = {
  getAll: (params?: Record<string, string | number | boolean>) =>
    apiClient.get<ApiResponse<Client[]>>('/clients', params),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Client>>(`/clients/${id}`),

  create: (data: Partial<Client>) =>
    apiClient.post<ApiResponse<Client>>('/clients', data),

  update: (id: string, data: Partial<Client>) =>
    apiClient.put<ApiResponse<Client>>(`/clients/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/clients/${id}`),
};
