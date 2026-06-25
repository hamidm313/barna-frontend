'use client';

import { useState, useEffect } from 'react';
import { Box, Grid, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTheme, updateTheme } from '@/lib/api/theme';
import { ThemeSettings } from '@/types';
import toast from 'react-hot-toast';

export default function ThemeEditor() {
  const qc = useQueryClient();
  const [settings, setSettings] = useState<ThemeSettings[]>([]);
  const { data, isLoading } = useQuery({ queryKey: ['theme'], queryFn: getTheme });
  const saveMut = useMutation({
    mutationFn: (s: ThemeSettings[]) => updateTheme(s),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['theme'] }); toast.success('قالب ذخیره شد'); },
    onError: () => toast.error('خطا در ذخیره'),
  });

  useEffect(() => { if (data?.data) setSettings(data.data); }, [data]);

  const setValue = (key: string, value: string) =>
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress sx={{ color: '#C9A84C' }} /></Box>;

  const colorSettings = settings.filter(s => s.type === 'color');
  const fontSettings = settings.filter(s => s.type === 'font');
  const otherSettings = settings.filter(s => s.type !== 'color' && s.type !== 'font');

  const renderSetting = (s: ThemeSettings) => (
    <Grid item xs={12} sm={6} md={4} key={s.key}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {s.type === 'color' && (
          <Box sx={{ position: 'relative', width: 40, height: 40, borderRadius: 1, overflow: 'hidden', border: '1px solid #e0e0e0', flexShrink: 0 }}>
            <input type="color" value={s.value} onChange={e => setValue(s.key, e.target.value)}
              style={{ position: 'absolute', top: -4, left: -4, width: 48, height: 48, cursor: 'pointer', border: 'none', padding: 0 }} />
          </Box>
        )}
        <TextField size="small" fullWidth label={s.label || s.key} value={s.value} onChange={e => setValue(s.key, e.target.value)}
          sx={{ '& label, & input': { fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.85rem' } }} />
      </Box>
    </Grid>
  );

  return (
    <Box>
      {colorSettings.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Vazirmatn, sans-serif', color: '#1E2A4A' }}>رنگ‌ها</Typography>
          <Grid container spacing={2}>{colorSettings.map(renderSetting)}</Grid>
        </Paper>
      )}
      {fontSettings.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Vazirmatn, sans-serif', color: '#1E2A4A' }}>فونت‌ها</Typography>
          <Grid container spacing={2}>{fontSettings.map(renderSetting)}</Grid>
        </Paper>
      )}
      {otherSettings.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Vazirmatn, sans-serif', color: '#1E2A4A' }}>سایر تنظیمات</Typography>
          <Grid container spacing={2}>{otherSettings.map(renderSetting)}</Grid>
        </Paper>
      )}
      <Button variant="contained" onClick={() => saveMut.mutate(settings)} disabled={saveMut.isPending}
        startIcon={saveMut.isPending ? <CircularProgress size={16} color="inherit" /> : null}
        sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif', px: 4 }}>
        {saveMut.isPending ? 'در حال ذخیره...' : 'ذخیره قالب'}
      </Button>
    </Box>
  );
}
