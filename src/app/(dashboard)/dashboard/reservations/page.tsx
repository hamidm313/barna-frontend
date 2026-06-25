'use client';

import { useState } from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReservations, updateReservationStatus } from '@/lib/api/reservations';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import { Reservation } from '@/types';
import toast from 'react-hot-toast';

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: 'در انتظار', color: '#f59e0b' },
  approved: { label: 'تأیید شده', color: '#10b981' },
  rejected: { label: 'رد شده', color: '#ef4444' },
  active: { label: 'فعال', color: '#3b82f6' },
  returned: { label: 'بازگشت', color: '#6b7280' },
  cancelled: { label: 'لغو شده', color: '#ef4444' },
};

export default function ReservationsPage() {
  const [page, setPage] = useState(0);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['reservations', page], queryFn: () => getReservations({ page: page + 1, limit: 10 }) });
  const updateMut = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updateReservationStatus(id, status),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['reservations'] }); toast.success('وضعیت بروز شد'); },
  });

  const columns: Column<Reservation>[] = [
    { key: 'id', label: '#', width: 60 },
    { key: 'clothing_title', label: 'پوشاک' },
    { key: 'user_name', label: 'کاربر' },
    { key: 'start_date', label: 'از', render: (r) => new Date(r.start_date).toLocaleDateString('fa-IR') },
    { key: 'end_date', label: 'تا', render: (r) => new Date(r.end_date).toLocaleDateString('fa-IR') },
    { key: 'deposit_amount', label: 'ودیعه', render: (r) => `${r.deposit_amount.toLocaleString('fa-IR')} ت` },
    { key: 'total_amount', label: 'کل', render: (r) => `${r.total_amount.toLocaleString('fa-IR')} ت` },
    { key: 'status', label: 'وضعیت', render: (r) => {
      const s = statusMap[r.status] || { label: r.status, color: '#6b7280' };
      return (
        <Select size="small" value={r.status} onChange={e => updateMut.mutate({ id: r.id, status: e.target.value })}
          sx={{ fontSize: '0.75rem', fontFamily: 'Vazirmatn, sans-serif', '& .MuiSelect-select': { py: 0.5, color: s.color } }}>
          {Object.entries(statusMap).map(([v, { label }]) => <MenuItem key={v} value={v} sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.8rem' }}>{label}</MenuItem>)}
        </Select>
      );
    }},
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>مدیریت رزروها</Typography>
      <DataTable columns={columns} rows={data?.data ?? []} keyField="id" loading={isLoading} total={data?.pagination?.total} page={page} rowsPerPage={10} onPageChange={setPage} emptyMessage="رزروی وجود ندارد" />
    </Box>
  );
}
