'use client';

import { useState, useCallback } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMedia, uploadMedia, updateMedia, deleteMedia } from '@/lib/api/media';
import { MediaItem } from '@/types';
import toast from 'react-hot-toast';

export default function MediaManager() {
  const qc = useQueryClient();
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [tagsInput, setTagsInput] = useState('');
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = useQuery({ queryKey: ['media'], queryFn: () => getMedia({}) });
  const updateMut = useMutation({
    mutationFn: ({ id, tags }: { id: number; tags: string[] }) => updateMedia(id, { tags }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['media'] }); setEditItem(null); toast.success('آپدیت شد'); },
  });
  const deleteMut = useMutation({
    mutationFn: (id: number) => deleteMedia(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['media'] }); toast.success('حذف شد'); },
  });

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        await uploadMedia(fd);
      }
      qc.invalidateQueries({ queryKey: ['media'] });
      toast.success('آپلود شد');
    } catch { toast.error('خطا در آپلود'); }
    finally { setUploading(false); e.target.value = ''; }
  }, [qc]);

  const formatSize = (bytes: number) => bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="contained" component="label" startIcon={uploading ? <CircularProgress size={16} color="inherit" /> : <CloudUploadIcon />}
          disabled={uploading} sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif' }}>
          {uploading ? 'در حال آپلود...' : 'آپلود فایل'}
          <input type="file" hidden multiple accept="image/*" onChange={handleUpload} />
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>
          {data?.data?.length ?? 0} فایل
        </Typography>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress sx={{ color: '#C9A84C' }} /></Box>
      ) : (
        <Grid container spacing={2}>
          {(data?.data ?? []).map((item: MediaItem) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <CardMedia component="img" height="160" image={item.url} alt={item.original_name} sx={{ objectFit: 'cover' }} />
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Typography variant="caption" sx={{ fontFamily: 'Vazirmatn, sans-serif', display: 'block', mb: 0.5, wordBreak: 'break-all', color: 'text.secondary' }}>{item.original_name}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>{formatSize(item.size)}</Typography>
                  <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {item.tags?.map((tag) => <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />)}
                  </Box>
                </CardContent>
                <CardActions sx={{ pt: 0, justifyContent: 'flex-end', gap: 0.5 }}>
                  <Tooltip title="کپی لینک"><IconButton size="small" onClick={() => { navigator.clipboard.writeText(item.url); toast.success('کپی شد'); }}><ContentCopyIcon fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="ویرایش"><IconButton size="small" onClick={() => { setEditItem(item); setTagsInput(item.tags?.join(', ') ?? ''); }} sx={{ color: '#1E2A4A' }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="حذف"><IconButton size="small" onClick={() => deleteMut.mutate(item.id)} sx={{ color: 'error.main' }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={Boolean(editItem)} onClose={() => setEditItem(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>ویرایش برچسب‌ها</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="برچسب‌ها (با کاما جدا کنید)" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
            sx={{ mt: 1, '& label': { fontFamily: 'Vazirmatn, sans-serif' }, '& input': { fontFamily: 'Vazirmatn, sans-serif' } }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditItem(null)} sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>لغو</Button>
          <Button variant="contained" onClick={() => editItem && updateMut.mutate({ id: editItem.id, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) })}
            sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif' }}>ذخیره</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
