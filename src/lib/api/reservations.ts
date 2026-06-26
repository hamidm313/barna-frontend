import apiClient from './client';
import { mockReservationsApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getReservations(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockReservationsApi.list(params);
  const res = await apiClient.get('/reservations', { params });
  return res.data;
}

export async function getReservationById(id: number) {
  if (USE_MOCK) return mockReservationsApi.getOne(id);
  const res = await apiClient.get(`/reservations/${id}`);
  return res.data;
}

export async function createReservation(data: Record<string, unknown>) {
  if (USE_MOCK) return mockReservationsApi.create(data);
  const res = await apiClient.post('/reservations', data);
  return res.data;
}

export async function updateReservationStatus(id: number, status: string) {
  if (USE_MOCK) return mockReservationsApi.updateStatus(id, status);
  const res = await apiClient.patch(`/reservations/${id}/status`, { status });
  return res.data;
}

export const reservationsApi = {
  list: getReservations,
  getOne: async (id: number) => {
    const res: any = await getReservationById(id);
    return res.data ?? res;
  },
  create: createReservation,
  updateStatus: updateReservationStatus,
};
