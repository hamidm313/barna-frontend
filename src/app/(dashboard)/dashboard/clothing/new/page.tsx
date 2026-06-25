'use client';

import { Box, Typography, Paper } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClothing } from '@/lib/api/clothing';
import { useRouter } from 'next/navigation';
import ClothingForm from '@/components/dashboard/ClothingForm';
import { Clothing } from '@/types';
import toast from 'react-hot-toast';

export default function NewClothingPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const mut = useMutation({
    mutationFn: (data: Partial<Clothing>) => createClothing(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['clothing'] }); toast.success('پوشاک اضافه شد'); router.push('/dashboard/clothing'); },
    onError: () => toast.error('خطا'),
  });

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>افزودن پوشاک جدید</Typography>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <ClothingForm onSubmit={mut.mutateAsync} loading={mut.isPending} />
      </Paper>
    </Box>
  );
}
