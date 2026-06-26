'use client';

import { useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 260;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <Box dir="rtl" sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5', direction: 'rtl' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          right: { md: `${DRAWER_WIDTH}px` },
          left: 0,
          bgcolor: '#1E2A4A',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' }, mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Vazirmatn, sans-serif', fontSize: '1rem' }}>
            پنل مدیریت مزون برنا
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontFamily: 'Vazirmatn, sans-serif', display: { xs: 'none', sm: 'block' } }}>
              {user?.display_name}
            </Typography>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#C9A84C', fontSize: '0.875rem' }}>
                {user?.display_name?.[0] || 'A'}
              </Avatar>
            </IconButton>
          </Box>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => { setAnchorEl(null); router.push('/'); }} sx={{ fontFamily: 'Vazirmatn, sans-serif', gap: 1 }}>
              <AccountCircleIcon fontSize="small" /> مشاهده سایت
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ fontFamily: 'Vazirmatn, sans-serif', gap: 1, color: 'error.main' }}>
              <LogoutIcon fontSize="small" /> خروج
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Sidebar drawerWidth={DRAWER_WIDTH} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }, mt: '64px', direction: 'rtl', textAlign: 'right' }}>
        {children}
      </Box>
    </Box>
  );
}
