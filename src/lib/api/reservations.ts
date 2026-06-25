import apiClient from './client';
import { Reservation } from '@/types';

export interface CreateReservationPayload {
  clothing_id: number;
  start_date: string;
  end_date: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  shipping_address?: string;
  notes?: string;
  rules_accepted: boolean;
}

export const reservationsApi = {
  list: async (params?: { status?: string; page?: number; limit?: number }): Promise<Reservation[]> => {
    const { data } = await apiClient.get('/reservations', { params });
    return data;
  },
  getOne: async (id: number): Promise<Reservation> => {
    const { data } = await apiClient.get(`/reservations/${id}`);
    return data;
  },
  create: async (payload: CreateReservationPayload) => {
    const { data } = await apiClient.post('/reservations', payload);
    return data;
  },
  updateStatus: async (id: number, status: string, extra?: { tracking_number?: string; cleaning_fee?: number; shipping_fee?: number }) => {
    const { data } = await apiClient.put(`/reservations/${id}/status`, { status, ...extra });
    return data;
  },
};
