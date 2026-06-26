'use client';

import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPageBySlug, upsertPage } from '@/lib/api/pages';
import { useParams, useRouter } from 'next/navigation';
import PageEditor from '@/components/dashboard/PageEditor';
import { Page } from '@/types';
import toast from 'react-hot-toast';

export default function EditPagePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['pages', slug], queryFn: () => getPageBySlug(slug) });
  const mut = useMutation({
    mutationFn: (d: Partial<Page>) => upsertPage(slug, d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['pages'] }); toast.success('ذخیره شد'); router.push('/dashboard/pages'); },
    onError: () => toast.error('خطا'),
  });

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress sx={{ color: '#C9A84C' }} /></Box>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>ویرایش صفحه</Typography>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <PageEditor initialData={data?.data} onSubmit={mut.mutateAsync} loading={mut.isPending} />
      </Paper>
    </Box>
  );
}
