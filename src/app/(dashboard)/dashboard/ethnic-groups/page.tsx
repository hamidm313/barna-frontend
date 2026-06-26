'use client';

import { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Tooltip, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEthnicGroups, createEthnicGroup, updateEthnicGroup, deleteEthnicGroup } from '@/lib/api/ethnicGroups';
import DataTable, { Column } from '@/components/dashboard/DataTable';
import { EthnicGroup } from '@/types';
import toast from 'react-hot-toast';

const emptyForm = { display_name: '', slug: '', description: '', image: '' };

export default function EthnicGroupsPage() {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EthnicGroup | null>(null);
  const [form, setForm] = useState(emptyForm);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['ethnicGroups', page], queryFn: () => getEthnicGroups({ page: page + 1, limit: 10 }) });
  const createMut = useMutation({ mutationFn: createEthnicGroup, onSuccess: () => { qc.invalidateQueries({ queryKey: ['ethnicGroups'] }); setOpen(false); toast.success('اضافه شد'); } });
  const updateMut = useMutation({ mutationFn: ({ id, data }: { id: number; data: typeof emptyForm }) => updateEthnicGroup(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['ethnicGroups'] }); setOpen(false); toast.success('ذخیره شد'); } });
  const deleteMut = useMutation({ mutationFn: (id: number) => deleteEthnicGroup(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['ethnicGroups'] }); toast.success('حذف شد'); } });

  const openEdit = (g: EthnicGroup) => { setEditing(g); setForm({ display_name: g.display_name, slug: g.slug, description: g.description || '', image: g.image || '' }); setOpen(true); };
  const openNew = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const handleSave = () => {
    if (editing) updateMut.mutate({ id: editing.id, data: form });
    else createMut.mutate(form);
  };

  const sx = { '& label, & input, & textarea': { fontFamily: 'Vazirmatn, sans-serif' } };
  const columns: Column<EthnicGroup>[] = [
    { key: 'id', label: '#', width: 60 },
    { key: 'image', label: 'تصویر', width: 60, render: (r) => <Avatar src={r.image} sx={{ width: 36, height: 36 }}>{r.display_name[0]}</Avatar> },
    { key: 'display_name', label: 'نام' },
    { key: 'slug', label: 'اسلاگ' },
    { key: 'actions', label: 'عملیات', align: 'center', render: (r) => (
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
        <Tooltip title="ویرایش"><IconButton size="small" onClick={() => openEdit(r)} sx={{ color: '#1E2A4A' }}><EditIcon fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="حذف"><IconButton size="small" onClick={() => { if (confirm('حذف شود؟')) deleteMut.mutate(r.id); }} sx={{ color: 'error.main' }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
      </Box>
    )},
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>گروه‌های قومی</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openNew} sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif' }}>افزودن</Button>
      </Box>
      <DataTable columns={columns} rows={data?.data ?? []} keyField="id" loading={isLoading} total={data?.pagination?.total} page={page} rowsPerPage={10} onPageChange={setPage} emptyMessage="گروهی وجود ندارد" />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>{editing ? 'ویرایش گروه' : 'گروه جدید'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField required label="نام" value={form.display_name} onChange={e => setForm(p => ({ ...p, display_name: e.target.value }))} sx={sx} />
            <TextField required label="اسلاگ" value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} sx={sx} />
            <TextField label="توضیحات" multiline rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} sx={sx} />
            <TextField label="لینک تصویر" value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} sx={sx} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>لغو</Button>
          <Button variant="contained" onClick={handleSave} disabled={createMut.isPending || updateMut.isPending} sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif' }}>ذخیره</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
