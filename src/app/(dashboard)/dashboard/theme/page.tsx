'use client';

import { Box, Typography } from '@mui/material';
import ThemeEditor from '@/components/dashboard/ThemeEditor';

export default function ThemePage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>ویرایش قالب</Typography>
      <ThemeEditor />
    </Box>
  );
}
