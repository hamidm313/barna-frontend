'use client';

import { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, updateOrderStatus } from '@/lib/api/orders';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import { Order } from '@/types';
import toast from 'react-hot-toast';

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: 'در انتظار', color: '#f59e0b' },
  processing: { label: 'در حال پردازش', color: '#10b981' },
  shipped: { label: 'ارسال شده', color: '#3b82f6' },
  delivered: { label: 'تحویل داده شده', color: '#059669' },
  cancelled: { label: 'لغو شده', color: '#ef4444' },
  returned: { label: 'بازگشت داده شده', color: '#6b7280' },
};

export default function OrdersPage() {
  const [page, setPage] = useState(0);
  const [viewing, setViewing] = useState<Order | null>(null);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['orders', page], queryFn: () => getOrders({ page: page + 1, limit: 10 }) });
  const updateMut = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateOrderStatus(id, status),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['orders'] }); toast.success('وضعیت بروز شد'); },
  });

  const columns: Column<Order>[] = [
    { key: 'id', label: '#', width: 60 },
    { key: 'order_number', label: 'شماره سفارش' },
    { key: 'clothing_display_name', label: 'پوشاک' },
    { key: 'guest_name', label: 'مشتری' },
    { key: 'amount', label: 'مبلغ', render: (r) => `${r.amount.toLocaleString('fa-IR')} ت` },
    { key: 'status', label: 'وضعیت', render: (r) => {
      const s = statusMap[r.status] || { label: r.status, color: '#6b7280' };
      return (
        <Select size="small" value={r.status} onChange={e => updateMut.mutate({ id: r.id, status: e.target.value })}
          sx={{ fontSize: '0.75rem', fontFamily: 'Vazirmatn, sans-serif', '& .MuiSelect-select': { py: 0.5, color: s.color } }}>
          {Object.entries(statusMap).map(([v, { label }]) => <MenuItem key={v} value={v} sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.8rem' }}>{label}</MenuItem>)}
        </Select>
      );
    }},
    { key: 'created_at', label: 'تاریخ', render: (r) => new Date(r.created_at).toLocaleDateString('fa-IR') },
    { key: 'actions', label: '', width: 60, render: (r) => (
      <Tooltip title="جزئیات"><IconButton size="small" onClick={() => setViewing(r)}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
    )},
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>مدیریت سفارشات</Typography>
      <DataTable columns={columns} rows={data?.data ?? []} keyField="id" loading={isLoading} total={data?.pagination?.total} page={page} rowsPerPage={10} onPageChange={setPage} emptyMessage="سفارشی وجود ندارد" />
      <Dialog open={Boolean(viewing)} onClose={() => setViewing(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>جزئیات سفارش #{viewing?.id}</DialogTitle>
        <DialogContent>
          {viewing && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              {[['پوشاک', viewing.clothing_display_name || '-'], ['مشتری', viewing.guest_name || '-'], ['مبلغ', `${viewing.amount.toLocaleString('fa-IR')} تومان`], ['تاریخ', new Date(viewing.created_at).toLocaleDateString('fa-IR')]].map(([k, v]) => (
                <Box key={k} sx={{ display: 'flex', gap: 1 }}>
                  <Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', color: 'text.secondary', fontSize: '0.875rem', width: 80, flexShrink: 0 }}>{k}:</Typography>
                  <Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.875rem' }}>{v}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions><Button onClick={() => setViewing(null)} sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>بستن</Button></DialogActions>
      </Dialog>
    </Box>
  );
}
