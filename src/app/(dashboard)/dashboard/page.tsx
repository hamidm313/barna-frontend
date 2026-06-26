'use client';

import { Grid, Typography, Box, Paper, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import CommentIcon from '@mui/icons-material/Comment';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { useQuery } from '@tanstack/react-query';
import { getClothing } from '@/lib/api/clothing';
import { getOrders } from '@/lib/api/orders';
import { getReservations } from '@/lib/api/reservations';
import { getUsers } from '@/lib/api/users';
import { getComments } from '@/lib/api/comments';
import { getMedia } from '@/lib/api/media';
import StatsCard from '@/components/dashboard/StatsCard';
import { Order, Reservation, Comment } from '@/types';

export default function DashboardPage() {
  const { data: clothing } = useQuery({ queryKey: ['clothing', 'all'], queryFn: () => getClothing({ limit: 1 }) });
  const { data: orders } = useQuery({ queryKey: ['orders', 'all'], queryFn: () => getOrders({ limit: 5 }) });
  const { data: reservations } = useQuery({ queryKey: ['reservations', 'all'], queryFn: () => getReservations({ limit: 5 }) });
  const { data: users } = useQuery({ queryKey: ['users', 'all'], queryFn: () => getUsers({ limit: 1 }) });
  const { data: comments } = useQuery({ queryKey: ['comments', 'pending'], queryFn: () => getComments({ status: 'pending', limit: 5 }) });
  const { data: media } = useQuery({ queryKey: ['media', 'count'], queryFn: () => getMedia({ limit: 1 }) });

  const statusColor = (s: string) => ({ pending: '#f59e0b', approved: '#10b981', rejected: '#ef4444', active: '#3b82f6', returned: '#6b7280', cancelled: '#ef4444', paid: '#10b981', shipped: '#3b82f6', delivered: '#10b981' }[s] || '#6b7280');
  const statusLabel = (s: string) => ({ pending: 'در انتظار', approved: 'تأیید', rejected: 'رد', active: 'فعال', returned: 'بازگشت', cancelled: 'لغو', paid: 'پرداخت', shipped: 'ارسال', delivered: 'تحویل' }[s] || s);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Vazirmatn, sans-serif', fontWeight: 700, color: '#1E2A4A' }}>داشبورد</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={2}><StatsCard title="پوشاک" value={clothing?.pagination?.total ?? '...'} icon={<CheckroomIcon />} /></Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}><StatsCard title="سفارشات" value={orders?.pagination?.total ?? '...'} icon={<ShoppingCartIcon />} color="#8B1A2F" /></Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}><StatsCard title="رزروها" value={reservations?.pagination?.total ?? '...'} icon={<CalendarTodayIcon />} color="#1E2A4A" /></Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}><StatsCard title="کاربران" value={users?.pagination?.total ?? '...'} icon={<PeopleIcon />} color="#059669" /></Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}><StatsCard title="نظرات" value={comments?.pagination?.total ?? '...'} icon={<CommentIcon />} color="#7c3aed" /></Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}><StatsCard title="رسانه" value={media?.pagination?.total ?? '...'} icon={<PhotoLibraryIcon />} color="#0891b2" /></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Vazirmatn, sans-serif', color: '#1E2A4A', fontSize: '1rem' }}>آخرین سفارشات</Typography>
            <List dense disablePadding>
              {(orders?.data ?? []).map((order: Order, i: number) => (
                <Box key={order.id}>
                  {i > 0 && <Divider />}
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemText
                      primary={<Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.875rem' }}>{order.clothing_display_name || `سفارش #${order.id}`}</Typography>}
                      secondary={<Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.75rem', color: 'text.secondary' }}>{order.guest_name}</Typography>}
                    />
                    <Chip label={statusLabel(order.status)} size="small" sx={{ bgcolor: `${statusColor(order.status)}20`, color: statusColor(order.status), fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.7rem' }} />
                  </ListItem>
                </Box>
              ))}
              {!orders?.data?.length && <Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', color: 'text.secondary', fontSize: '0.875rem' }}>سفارشی وجود ندارد</Typography>}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Vazirmatn, sans-serif', color: '#1E2A4A', fontSize: '1rem' }}>نظرات در انتظار تأیید</Typography>
            <List dense disablePadding>
              {(comments?.data ?? []).map((comment: Comment, i: number) => (
                <Box key={comment.id}>
                  {i > 0 && <Divider />}
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemText
                      primary={<Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.875rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{comment.content}</Typography>}
                      secondary={<Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.75rem', color: 'text.secondary' }}>{comment.user_display_name || comment.guest_name}</Typography>}
                    />
                  </ListItem>
                </Box>
              ))}
              {!comments?.data?.length && <Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', color: 'text.secondary', fontSize: '0.875rem' }}>نظر در انتظار وجود ندارد</Typography>}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Vazirmatn, sans-serif', color: '#1E2A4A', fontSize: '1rem' }}>آخرین رزروها</Typography>
            <List dense disablePadding>
              {(reservations?.data ?? []).map((res: Reservation, i: number) => (
                <Box key={res.id}>
                  {i > 0 && <Divider />}
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemText
                      primary={<Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.875rem' }}>{res.clothing_display_name || `رزرو #${res.id}`}</Typography>}
                      secondary={<Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.75rem', color: 'text.secondary' }}>{res.user_display_name || res.guest_name}</Typography>}
                    />
                    <Chip label={statusLabel(res.status)} size="small" sx={{ bgcolor: `${statusColor(res.status)}20`, color: statusColor(res.status), fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.7rem' }} />
                  </ListItem>
                </Box>
              ))}
              {!reservations?.data?.length && <Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', color: 'text.secondary', fontSize: '0.875rem' }}>رزروی وجود ندارد</Typography>}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
