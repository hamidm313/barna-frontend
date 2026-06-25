'use client';

import { Box, Typography } from '@mui/material';
import MediaManager from '@/components/dashboard/MediaManager';

export default function MediaPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>مدیریت رسانه</Typography>
      <MediaManager />
    </Box>
  );
}
