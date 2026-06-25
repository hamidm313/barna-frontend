import apiClient from './client';
import { mockUsersApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getUsers(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockUsersApi.list(params);
  const res = await apiClient.get('/users', { params });
  return res.data;
}

export async function updateUserRole(id: number, role: string) {
  if (USE_MOCK) return mockUsersApi.updateRole(id, role);
  const res = await apiClient.patch(`/users/${id}/role`, { role });
  return res.data;
}

export async function toggleUserActive(id: number) {
  if (USE_MOCK) return mockUsersApi.toggleActive(id);
  const res = await apiClient.patch(`/users/${id}/toggle-active`);
  return res.data;
}
