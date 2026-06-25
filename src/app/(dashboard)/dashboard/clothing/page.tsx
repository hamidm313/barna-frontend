'use client';

import { useState } from 'react';
import { Box, Typography, Button, Chip, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClothing, deleteClothing } from '@/lib/api/clothing';
import { useRouter } from 'next/navigation';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import { Clothing } from '@/types';
import toast from 'react-hot-toast';

export default function ClothingListPage() {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['clothing', 'admin', page],
    queryFn: () => getClothing({ page: page + 1, limit: 10 }),
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => deleteClothing(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['clothing'] }); toast.success('حذف شد'); },
    onError: () => toast.error('خطا در حذف'),
  });

  const statusMap: Record<string, { label: string; color: string }> = {
    available: { label: 'موجود', color: '#10b981' },
    rented: { label: 'اجاره', color: '#f59e0b' },
    sold: { label: 'فروخته', color: '#ef4444' },
    reserved: { label: 'رزرو', color: '#3b82f6' },
  };

  const columns: Column<Clothing>[] = [
    { key: 'id', label: '#', width: 60 },
    { key: 'title', label: 'عنوان', render: (r) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {r.is_featured && <StarIcon sx={{ fontSize: 14, color: '#C9A84C' }} />}
        <Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.85rem' }}>{r.title}</Typography>
      </Box>
    )},
    { key: 'ethnic_group_name', label: 'گروه قومی' },
    { key: 'category', label: 'دسته‌بندی' },
    { key: 'status', label: 'وضعیت', render: (r) => {
      const s = statusMap[r.status] || { label: r.status, color: '#6b7280' };
      return <Chip label={s.label} size="small" sx={{ bgcolor: `${s.color}20`, color: s.color, fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.75rem' }} />;
    }},
    { key: 'rental_price_per_day', label: 'اجاره/روز', render: (r) => r.rental_price_per_day ? `${r.rental_price_per_day.toLocaleString('fa-IR')} ت` : '—' },
    { key: 'sale_price', label: 'فروش', render: (r) => r.sale_price ? `${r.sale_price.toLocaleString('fa-IR')} ت` : '—' },
    { key: 'actions', label: 'عملیات', align: 'center', render: (r) => (
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
        <Tooltip title="ویرایش"><IconButton size="small" onClick={() => router.push(`/dashboard/clothing/${r.id}/edit`)} sx={{ color: '#1E2A4A' }}><EditIcon fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="حذف"><IconButton size="small" onClick={() => { if (confirm('حذف شود؟')) deleteMut.mutate(r.id); }} sx={{ color: 'error.main' }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
      </Box>
    )},
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>مدیریت پوشاک</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => router.push('/dashboard/clothing/new')}
          sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif' }}>
          افزودن پوشاک
        </Button>
      </Box>
      <DataTable columns={columns} rows={data?.data ?? []} keyField="id" loading={isLoading}
        total={data?.pagination?.total} page={page} rowsPerPage={10}
        onPageChange={setPage} emptyMessage="پوشاکی وجود ندارد" />
    </Box>
  );
}
