'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, CircularProgress, Grid } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSetting } from '@/lib/api/settings';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const qc = useQueryClient();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const { data, isLoading } = useQuery({ queryKey: ['settings'], queryFn: () => getSettings() });

  useEffect(() => {
    if (data?.data) {
      const map: Record<string, string> = {};
      data.data.forEach((s: { key: string; value: string }) => { map[s.key] = s.value; });
      setSettings(map);
    }
  }, [data]);

  const saveMut = useMutation({
    mutationFn: async (s: Record<string, string>) => {
      for (const [key, value] of Object.entries(s)) await updateSetting(key, value);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['settings'] }); toast.success('تنظیمات ذخیره شد'); },
    onError: () => toast.error('خطا'),
  });

  const sx = { '& label, & input, & textarea': { fontFamily: 'Vazirmatn, sans-serif' } };

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress sx={{ color: '#C9A84C' }} /></Box>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>تنظیمات سایت</Typography>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Grid container spacing={2.5}>
          {Object.entries(settings).map(([key, value]) => (
            <Grid item xs={12} md={6} key={key}>
              <TextField fullWidth label={key} value={value} onChange={e => setSettings(p => ({ ...p, [key]: e.target.value }))} sx={sx} size="small" />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" onClick={() => saveMut.mutate(settings)} disabled={saveMut.isPending}
            startIcon={saveMut.isPending ? <CircularProgress size={16} color="inherit" /> : null}
            sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif' }}>
            {saveMut.isPending ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
