'use client';

import { Box, Typography } from '@mui/material';
import TagManager from '@/components/dashboard/TagManager';

export default function TagsPage() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>مدیریت برچسب‌ها</Typography>
      <TagManager />
    </Box>
  );
}
