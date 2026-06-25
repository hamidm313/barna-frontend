import apiClient from './client';
import { mockOrdersApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getOrders(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockOrdersApi.list(params);
  const res = await apiClient.get('/orders', { params });
  return res.data;
}

export async function createOrder(data: Record<string, unknown>) {
  if (USE_MOCK) return mockOrdersApi.create(data);
  const res = await apiClient.post('/orders', data);
  return res.data;
}

export async function updateOrderStatus(id: number, status: string) {
  if (USE_MOCK) return mockOrdersApi.updateStatus(id, status);
  const res = await apiClient.patch(`/orders/${id}/status`, { status });
  return res.data;
}
