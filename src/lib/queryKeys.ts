export const queryKeys = {
  clothing: {
    all: ['clothing'] as const,
    list: (filters?: object) => ['clothing', 'list', filters] as const,
    detail: (id: number | string) => ['clothing', 'detail', id] as const,
  },
  ethnicGroups: {
    all: ['ethnic-groups'] as const,
    list: () => ['ethnic-groups', 'list'] as const,
    detail: (slug: string) => ['ethnic-groups', slug] as const,
  },
  tags: { list: () => ['tags'] as const },
  reservations: {
    list: (params?: object) => ['reservations', params] as const,
    detail: (id: number) => ['reservations', id] as const,
  },
  orders: { list: (params?: object) => ['orders', params] as const },
  comments: { list: (params?: object) => ['comments', params] as const },
  media: { list: (params?: object) => ['media', params] as const },
  pages: {
    list: () => ['pages'] as const,
    detail: (slug: string) => ['pages', slug] as const,
  },
  settings: { all: () => ['settings'] as const },
  theme: { all: () => ['theme'] as const },
  community: { list: (params?: object) => ['community', params] as const },
  requests: { list: (params?: object) => ['requests', params] as const },
  users: { list: (params?: object) => ['users', params] as const },
};
