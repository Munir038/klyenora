/**
 * Tasks service
 */

import { ApiResponse, Task } from '../../types/models';
import apiClient from './client';

export const tasksService = {
  getAll: (params?: Record<string, string | number | boolean>) =>
    apiClient.get<ApiResponse<Task[]>>('/tasks', params),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Task>>(`/tasks/${id}`),

  create: (data: Partial<Task>) =>
    apiClient.post<ApiResponse<Task>>('/tasks', data),

  update: (id: string, data: Partial<Task>) =>
    apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/tasks/${id}`),

  toggleComplete: (id: string) =>
    apiClient.patch<ApiResponse<Task>>(`/tasks/${id}/toggle`),
};
