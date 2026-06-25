'use client';

import { Box, Typography, Button, Chip, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useQuery } from '@tanstack/react-query';
import { getPages } from '@/lib/api/pages';
import { useRouter } from 'next/navigation';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import { Page } from '@/types';

export default function PagesPage() {
  const router = useRouter();
  const { data, isLoading } = useQuery({ queryKey: ['pages'], queryFn: () => getPages({}) });

  const columns: Column<Page>[] = [
    { key: 'id', label: '#', width: 60 },
    { key: 'title', label: 'عنوان' },
    { key: 'slug', label: 'اسلاگ' },
    { key: 'is_published', label: 'وضعیت', render: (r) => (
      <Chip label={r.is_published ? 'منتشر' : 'پیش‌نویس'} size="small"
        sx={{ bgcolor: r.is_published ? '#10b98120' : '#f59e0b20', color: r.is_published ? '#10b981' : '#f59e0b', fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.75rem' }} />
    )},
    { key: 'actions', label: 'عملیات', align: 'center', render: (r) => (
      <Tooltip title="ویرایش"><IconButton size="small" onClick={() => router.push(`/dashboard/pages/${r.slug}/edit`)} sx={{ color: '#1E2A4A' }}><EditIcon fontSize="small" /></IconButton></Tooltip>
    )},
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>مدیریت صفحات</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => router.push('/dashboard/pages/new')}
          sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif' }}>
          صفحه جدید
        </Button>
      </Box>
      <DataTable columns={columns} rows={data?.data ?? []} keyField="id" loading={isLoading} emptyMessage="صفحه‌ای وجود ندارد" />
    </Box>
  );
}
