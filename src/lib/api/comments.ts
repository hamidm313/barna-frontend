import apiClient from './client';
import { mockCommentsApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getComments(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockCommentsApi.list(params);
  const res = await apiClient.get('/comments', { params });
  return res.data;
}

export async function createComment(data: Record<string, unknown>) {
  if (USE_MOCK) return mockCommentsApi.create(data);
  const res = await apiClient.post('/comments', data);
  return res.data;
}

export async function updateCommentStatus(id: number, status: string) {
  if (USE_MOCK) return mockCommentsApi.updateStatus(id, status);
  const res = await apiClient.patch(`/comments/${id}/status`, { status });
  return res.data;
}

export async function deleteComment(id: number) {
  if (USE_MOCK) return mockCommentsApi.remove();
  const res = await apiClient.delete(`/comments/${id}`);
  return res.data;
}

export const commentsApi = {
  list: async (params: Record<string, unknown> = {}) => {
    const res: any = await getComments(params);
    return res.data ?? res;
  },
  create: createComment,
  updateStatus: updateCommentStatus,
  remove: deleteComment,
};
