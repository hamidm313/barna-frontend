'use client';

import { useState } from 'react';
import { Box, TextField, Button, Chip, CircularProgress, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTags, createTag, deleteTag } from '@/lib/api/tags';
import { Tag } from '@/types';
import toast from 'react-hot-toast';

export default function TagManager() {
  const qc = useQueryClient();
  const [newTag, setNewTag] = useState('');

  const { data, isLoading } = useQuery({ queryKey: ['tags'], queryFn: () => getTags({}) });
  const createMut = useMutation({
    mutationFn: (name: string) => createTag({ name }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tags'] }); setNewTag(''); toast.success('برچسب اضافه شد'); },
    onError: () => toast.error('خطا'),
  });
  const deleteMut = useMutation({
    mutationFn: (id: number) => deleteTag(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tags'] }); toast.success('حذف شد'); },
  });

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Vazirmatn, sans-serif', color: '#1E2A4A' }}>مدیریت برچسب‌ها</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField size="small" label="برچسب جدید" value={newTag} onChange={e => setNewTag(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (newTag.trim()) createMut.mutate(newTag.trim()); } }}
          sx={{ '& label, & input': { fontFamily: 'Vazirmatn, sans-serif' } }} />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => { if (newTag.trim()) createMut.mutate(newTag.trim()); }}
          disabled={createMut.isPending} sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif' }}>
          افزودن
        </Button>
      </Box>
      {isLoading ? <CircularProgress size={24} sx={{ color: '#C9A84C' }} /> : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {(data?.data || []).map((tag: Tag) => (
            <Chip key={tag.id} label={`${tag.name} (${tag.usage_count || 0})`} onDelete={() => deleteMut.mutate(tag.id)}
              sx={{ fontFamily: 'Vazirmatn, sans-serif', bgcolor: '#f5f0e8', '& .MuiChip-deleteIcon': { color: '#8B1A2F' } }} />
          ))}
        </Box>
      )}
    </Paper>
  );
}
