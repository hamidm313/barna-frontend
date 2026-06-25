'use client';

import { useState } from 'react';
import { Box, Typography, Chip, IconButton, Tooltip, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommunityPosts, updateCommunityPostStatus } from '@/lib/api/community';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import { CommunityPost } from '@/types';
import toast from 'react-hot-toast';

export default function CommunityPage() {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('all');
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['community', page, filter],
    queryFn: () => getCommunityPosts({ page: page + 1, limit: 10, status: filter === 'all' ? undefined : filter }),
  });
  const updateMut = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateCommunityPostStatus(id, status),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['community'] }); toast.success('بروز شد'); },
  });

  const statusChip = (status: string) => {
    const map = { pending: { label: 'در انتظار', color: '#f59e0b' }, approved: { label: 'تأیید', color: '#10b981' }, rejected: { label: 'رد', color: '#ef4444' } };
    const s = map[status as keyof typeof map] || { label: status, color: '#6b7280' };
    return <Chip label={s.label} size="small" sx={{ bgcolor: `${s.color}20`, color: s.color, fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.7rem' }} />;
  };

  const columns: Column<CommunityPost>[] = [
    { key: 'id', label: '#', width: 60 },
    { key: 'author_name', label: 'نویسنده' },
    { key: 'content', label: 'محتوا', render: (r) => <Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', maxWidth: 300 }}>{r.content}</Typography> },
    { key: 'status', label: 'وضعیت', render: (r) => statusChip(r.status) },
    { key: 'created_at', label: 'تاریخ', render: (r) => new Date(r.created_at).toLocaleDateString('fa-IR') },
    { key: 'actions', label: 'عملیات', align: 'center', render: (r) => (
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
        {r.status !== 'approved' && <Tooltip title="تأیید"><IconButton size="small" onClick={() => updateMut.mutate({ id: r.id, status: 'approved' })} sx={{ color: '#10b981' }}><CheckIcon fontSize="small" /></IconButton></Tooltip>}
        {r.status !== 'rejected' && <Tooltip title="رد"><IconButton size="small" onClick={() => updateMut.mutate({ id: r.id, status: 'rejected' })} sx={{ color: '#ef4444' }}><CloseIcon fontSize="small" /></IconButton></Tooltip>}
      </Box>
    )},
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>انجمن کاربران</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <Button key={f} size="small" variant={filter === f ? 'contained' : 'outlined'} onClick={() => { setFilter(f); setPage(0); }}
              sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.75rem', ...(filter === f ? { bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' } } : { borderColor: '#C9A84C', color: '#C9A84C' }) }}>
              {{ all: 'همه', pending: 'در انتظار', approved: 'تأیید', rejected: 'رد' }[f]}
            </Button>
          ))}
        </Box>
      </Box>
      <DataTable columns={columns} rows={data?.data ?? []} keyField="id" loading={isLoading} total={data?.pagination?.total} page={page} rowsPerPage={10} onPageChange={setPage} emptyMessage="پستی وجود ندارد" />
    </Box>
  );
}
