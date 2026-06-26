'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, FormControlLabel, Switch, Button, Typography, CircularProgress } from '@mui/material';
import { Page } from '@/types';

interface PageEditorProps {
  initialData?: Partial<Page>;
  onSubmit: (data: Partial<Page>) => Promise<void>;
  loading?: boolean;
}

export default function PageEditor({ initialData, onSubmit, loading }: PageEditorProps) {
  const [form, setForm] = useState<Partial<Page>>(initialData || { is_published: true });

  useEffect(() => { if (initialData) setForm(initialData); }, [initialData]);

  const sx = { '& label': { fontFamily: 'Vazirmatn, sans-serif' }, '& input, & textarea': { fontFamily: 'Vazirmatn, sans-serif' } };

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField required fullWidth label="عنوان صفحه" value={form.display_name || ''} onChange={e => setForm(p => ({ ...p, display_name: e.target.value }))} sx={sx} />
        <TextField required fullWidth label="اسلاگ (slug)" value={form.slug || ''} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} sx={sx} helperText="مثال: about-us" />
        <TextField fullWidth label="توضیحات متا" value={form.meta_description || ''} onChange={e => setForm(p => ({ ...p, meta_description: e.target.value }))} sx={sx} />
        <TextField fullWidth multiline rows={10} label="محتوا (HTML)" value={form.content || ''} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} sx={sx} />
        <FormControlLabel control={<Switch checked={Boolean(form.is_published)} onChange={e => setForm(p => ({ ...p, is_published: e.target.checked }))} />}
          label={<Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.9rem' }}>منتشر شده</Typography>} />
        <Button type="submit" variant="contained" size="large" disabled={loading} startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif', alignSelf: 'flex-start', px: 4 }}>
          {loading ? 'در حال ذخیره...' : 'ذخیره صفحه'}
        </Button>
      </Box>
    </Box>
  );
}
