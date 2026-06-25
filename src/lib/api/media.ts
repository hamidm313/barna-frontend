import apiClient from './client';
import { mockMediaApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getMedia(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockMediaApi.list(params);
  const res = await apiClient.get('/media', { params });
  return res.data;
}

export async function uploadMedia(formData: FormData) {
  if (USE_MOCK) return mockMediaApi.upload();
  const res = await apiClient.post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return res.data;
}

export async function updateMedia(id: number, data: { tags?: string[] }) {
  if (USE_MOCK) return mockMediaApi.update(id, data);
  const res = await apiClient.put(`/media/${id}`, data);
  return res.data;
}

export async function deleteMedia(id: number) {
  if (USE_MOCK) return mockMediaApi.remove();
  const res = await apiClient.delete(`/media/${id}`);
  return res.data;
}
