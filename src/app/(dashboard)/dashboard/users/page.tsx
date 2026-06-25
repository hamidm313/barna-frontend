'use client';

import { useState } from 'react';
import { Box, Typography, Switch, Select, MenuItem } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, updateUserRole, toggleUserActive } from '@/lib/api/users';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import { User } from '@/types';
import toast from 'react-hot-toast';

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['users', page], queryFn: () => getUsers({ page: page + 1, limit: 10 }) });
  const roleMut = useMutation({ mutationFn: ({ id, role }: { id: number; role: string }) => updateUserRole(id, role), onSuccess: () => { qc.invalidateQueries({ queryKey: ['users'] }); toast.success('نقش تغییر کرد'); } });
  const activeMut = useMutation({ mutationFn: (id: number) => toggleUserActive(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['users'] }); toast.success('وضعیت تغییر کرد'); } });

  const columns: Column<User>[] = [
    { key: 'id', label: '#', width: 60 },
    { key: 'name', label: 'نام' },
    { key: 'email', label: 'ایمیل' },
    { key: 'phone', label: 'تلفن' },
    { key: 'role', label: 'نقش', render: (r) => (
      <Select size="small" value={r.role} onChange={e => roleMut.mutate({ id: r.id, role: e.target.value })}
        sx={{ fontSize: '0.75rem', fontFamily: 'Vazirmatn, sans-serif', '& .MuiSelect-select': { py: 0.5 } }}>
        <MenuItem value="user" sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.8rem' }}>کاربر</MenuItem>
        <MenuItem value="admin" sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.8rem' }}>مدیر</MenuItem>
      </Select>
    )},
    { key: 'is_active', label: 'فعال', render: (r) => <Switch checked={Boolean(r.is_active)} onChange={() => activeMut.mutate(r.id)} size="small" /> },
    { key: 'created_at', label: 'تاریخ ثبت', render: (r) => new Date(r.created_at).toLocaleDateString('fa-IR') },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>مدیریت کاربران</Typography>
      <DataTable columns={columns} rows={data?.data ?? []} keyField="id" loading={isLoading} total={data?.pagination?.total} page={page} rowsPerPage={10} onPageChange={setPage} emptyMessage="کاربری وجود ندارد" />
    </Box>
  );
}
