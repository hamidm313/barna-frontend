import apiClient from './client';
import { Order } from '@/types';

export const ordersApi = {
  list: async (params?: { status?: string; page?: number }): Promise<Order[]> => {
    const { data } = await apiClient.get('/orders', { params });
    return data;
  },
  create: async (payload: { clothing_id: number; guest_name?: string; guest_email?: string; guest_phone?: string; shipping_address?: string; notes?: string }) => {
    const { data } = await apiClient.post('/orders', payload);
    return data;
  },
  updateStatus: async (id: number, status: string, tracking_number?: string) => {
    const { data } = await apiClient.put(`/orders/${id}/status`, { status, tracking_number });
    return data;
  },
};
