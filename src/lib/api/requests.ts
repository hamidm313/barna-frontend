import apiClient from './client';
import { mockRequestsApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getRequests(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockRequestsApi.list(params);
  const res = await apiClient.get('/requests', { params });
  return res.data;
}

export async function createRequest(data: Record<string, unknown>) {
  if (USE_MOCK) return mockRequestsApi.create(data);
  const res = await apiClient.post('/requests', data);
  return res.data;
}

export async function respondToRequest(id: number, response: string) {
  if (USE_MOCK) return mockRequestsApi.respond(id, response);
  const res = await apiClient.post(`/requests/${id}/respond`, { response });
  return res.data;
}

export const requestsApi = {
  list: getRequests,
  create: createRequest,
  respond: respondToRequest,
};
