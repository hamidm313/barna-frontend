import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
  subtitle?: string;
}

export default function StatsCard({ title, value, icon, color = '#C9A84C', subtitle }: StatsCardProps) {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>{title}</Typography>
          <Box sx={{ bgcolor: `${color}20`, p: 1, borderRadius: 1.5, color }}>{icon}</Box>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E2A4A', fontFamily: 'Vazirmatn, sans-serif' }}>{value}</Typography>
        {subtitle && <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>{subtitle}</Typography>}
      </CardContent>
    </Card>
  );
}
