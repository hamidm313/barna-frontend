import apiClient from './client';
import { mockTagsApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getTags(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockTagsApi.list(params);
  const res = await apiClient.get('/tags', { params });
  return res.data;
}

export async function createTag(data: { name: string }) {
  if (USE_MOCK) return mockTagsApi.create(data);
  const res = await apiClient.post('/tags', data);
  return res.data;
}

export async function deleteTag(id: number) {
  if (USE_MOCK) return mockTagsApi.remove();
  const res = await apiClient.delete(`/tags/${id}`);
  return res.data;
}
