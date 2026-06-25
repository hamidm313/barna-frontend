'use client';

import { Box, Typography, Paper } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertPage } from '@/lib/api/pages';
import { useRouter } from 'next/navigation';
import PageEditor from '@/components/dashboard/PageEditor';
import { Page } from '@/types';
import toast from 'react-hot-toast';

export default function NewPagePage() {
  const router = useRouter();
  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: (d: Partial<Page>) => upsertPage(d.slug!, d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['pages'] }); toast.success('صفحه ایجاد شد'); router.push('/dashboard/pages'); },
    onError: () => toast.error('خطا'),
  });

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>صفحه جدید</Typography>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <PageEditor onSubmit={mut.mutateAsync} loading={mut.isPending} />
      </Paper>
    </Box>
  );
}
