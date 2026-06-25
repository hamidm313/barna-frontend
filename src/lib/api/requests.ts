import apiClient from './client';
import { Request } from '@/types';

export const requestsApi = {
  list: async (params?: { status?: string; type?: string; page?: number }): Promise<Request[]> => {
    const { data } = await apiClient.get('/requests', { params });
    return data;
  },
  create: async (payload: { type: string; subject?: string; message: string; clothing_id?: number; guest_name?: string; guest_email?: string; guest_phone?: string }) => {
    const { data } = await apiClient.post('/requests', payload);
    return data;
  },
  respond: async (id: number, admin_response: string, status?: string) => {
    const { data } = await apiClient.put(`/requests/${id}/respond`, { admin_response, status });
    return data;
  },
};
