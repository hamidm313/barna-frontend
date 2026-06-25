'use client';

import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getClothingById, updateClothing } from '@/lib/api/clothing';
import { useRouter, useParams } from 'next/navigation';
import ClothingForm from '@/components/dashboard/ClothingForm';
import { Clothing } from '@/types';
import toast from 'react-hot-toast';

export default function EditClothingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['clothing', id], queryFn: () => getClothingById(Number(id)) });
  const mut = useMutation({
    mutationFn: (d: Partial<Clothing>) => updateClothing(Number(id), d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['clothing'] }); toast.success('ذخیره شد'); router.push('/dashboard/clothing'); },
    onError: () => toast.error('خطا'),
  });

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress sx={{ color: '#C9A84C' }} /></Box>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>ویرایش پوشاک</Typography>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <ClothingForm initialData={data?.data} onSubmit={mut.mutateAsync} loading={mut.isPending} />
      </Paper>
    </Box>
  );
}
