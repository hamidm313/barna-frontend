import apiClient from './client';
import { mockCommunityApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getCommunityPosts(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockCommunityApi.list(params);
  const res = await apiClient.get('/community', { params });
  return res.data;
}

export async function createCommunityPost(data: Record<string, unknown>) {
  if (USE_MOCK) return mockCommunityApi.create(data);
  const res = await apiClient.post('/community', data);
  return res.data;
}

export async function updateCommunityPostStatus(id: number, status: string) {
  if (USE_MOCK) return mockCommunityApi.updateStatus(id, status);
  const res = await apiClient.patch(`/community/${id}/status`, { status });
  return res.data;
}

export const communityApi = {
  list: async (params: Record<string, unknown> = {}) => {
    const res: any = await getCommunityPosts(params);
    return res.data ?? res;
  },
  create: createCommunityPost,
  updateStatus: updateCommunityPostStatus,
};
