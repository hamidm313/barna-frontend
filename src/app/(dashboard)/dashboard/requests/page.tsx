'use client';

import { useState } from 'react';
import { Box, Typography, Chip, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRequests, respondToRequest } from '@/lib/api/requests';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import { Request } from '@/types';
import toast from 'react-hot-toast';

const statusMap = { new: { label: 'جدید', color: '#3b82f6' }, read: { label: 'خوانده شده', color: '#6b7280' }, responded: { label: 'پاسخ داده شده', color: '#10b981' } };

export default function RequestsPage() {
  const [page, setPage] = useState(0);
  const [replying, setReplying] = useState<Request | null>(null);
  const [response, setResponse] = useState('');
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['requests', page], queryFn: () => getRequests({ page: page + 1, limit: 10 }) });
  const respondMut = useMutation({
    mutationFn: ({ id, response }: { id: number; response: string }) => respondToRequest(id, response),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['requests'] }); setReplying(null); setResponse(''); toast.success('پاسخ ارسال شد'); },
  });

  const columns: Column<Request>[] = [
    { key: 'id', label: '#', width: 60 },
    { key: 'name', label: 'نام' },
    { key: 'email', label: 'ایمیل' },
    { key: 'ethnic_group', label: 'گروه قومی' },
    { key: 'message', label: 'پیام', render: (r) => <Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', maxWidth: 200 }}>{r.message}</Typography> },
    { key: 'status', label: 'وضعیت', render: (r) => {
      const s = statusMap[r.status as keyof typeof statusMap] || { label: r.status, color: '#6b7280' };
      return <Chip label={s.label} size="small" sx={{ bgcolor: `${s.color}20`, color: s.color, fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.7rem' }} />;
    }},
    { key: 'created_at', label: 'تاریخ', render: (r) => new Date(r.created_at).toLocaleDateString('fa-IR') },
    { key: 'actions', label: '', width: 60, render: (r) => (
      <Tooltip title="پاسخ"><IconButton size="small" onClick={() => { setReplying(r); setResponse(r.admin_response || ''); }} sx={{ color: '#1E2A4A' }}><ReplyIcon fontSize="small" /></IconButton></Tooltip>
    )},
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>درخواست‌های کاربران</Typography>
      <DataTable columns={columns} rows={data?.data ?? []} keyField="id" loading={isLoading} total={data?.pagination?.total} page={page} rowsPerPage={10} onPageChange={setPage} emptyMessage="درخواستی وجود ندارد" />
      <Dialog open={Boolean(replying)} onClose={() => setReplying(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>پاسخ به {replying?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1, mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.875rem' }}>{replying?.message}</Typography>
          </Box>
          <TextField fullWidth multiline rows={4} label="پاسخ شما" value={response} onChange={e => setResponse(e.target.value)}
            sx={{ '& label, & textarea': { fontFamily: 'Vazirmatn, sans-serif' } }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplying(null)} sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>لغو</Button>
          <Button variant="contained" onClick={() => replying && respondMut.mutate({ id: replying.id, response })} disabled={respondMut.isPending}
            sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif' }}>
            ارسال پاسخ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
