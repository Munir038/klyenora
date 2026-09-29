/**
 * Leads service
 */

import { ApiResponse, Lead } from '../../types/models';
import apiClient from './client';

export const leadsService = {
  getAll: (params?: Record<string, string | number | boolean>) =>
    apiClient.get<ApiResponse<Lead[]>>('/leads', params),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Lead>>(`/leads/${id}`),

  create: (data: Partial<Lead>) =>
    apiClient.post<ApiResponse<Lead>>('/leads', data),

  update: (id: string, data: Partial<Lead>) =>
    apiClient.put<ApiResponse<Lead>>(`/leads/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/leads/${id}`),

  updateStatus: (id: string, status: Lead['status']) =>
    apiClient.patch<ApiResponse<Lead>>(`/leads/${id}/status`, { status }),
};
