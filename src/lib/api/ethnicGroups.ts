import apiClient from './client';
import { mockEthnicGroupsApi } from '@/lib/mock';
import type { EthnicGroup } from '@/types';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getEthnicGroups(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockEthnicGroupsApi.list(params);
  const res = await apiClient.get('/ethnic-groups', { params });
  return res.data;
}

export async function getEthnicGroupBySlug(slug: string) {
  if (USE_MOCK) return mockEthnicGroupsApi.getOne(slug);
  const res = await apiClient.get(`/ethnic-groups/${slug}`);
  return res.data;
}

export async function createEthnicGroup(data: Partial<EthnicGroup>) {
  if (USE_MOCK) return mockEthnicGroupsApi.create(data);
  const res = await apiClient.post('/ethnic-groups', data);
  return res.data;
}

export async function updateEthnicGroup(id: number, data: Partial<EthnicGroup>) {
  if (USE_MOCK) return mockEthnicGroupsApi.update(id, data);
  const res = await apiClient.put(`/ethnic-groups/${id}`, data);
  return res.data;
}

export async function deleteEthnicGroup(id: number) {
  if (USE_MOCK) return mockEthnicGroupsApi.remove();
  const res = await apiClient.delete(`/ethnic-groups/${id}`);
  return res.data;
}
