import apiClient from './client';
import { mockPagesApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getPages(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockPagesApi.list(params);
  const res = await apiClient.get('/pages', { params });
  return res.data;
}

export async function getPageBySlug(slug: string) {
  if (USE_MOCK) return mockPagesApi.getOne(slug);
  const res = await apiClient.get(`/pages/${slug}`);
  return res.data;
}

export async function upsertPage(slug: string, data: Record<string, unknown>) {
  if (USE_MOCK) return mockPagesApi.upsert(slug, data);
  const res = await apiClient.put(`/pages/${slug}`, data);
  return res.data;
}
