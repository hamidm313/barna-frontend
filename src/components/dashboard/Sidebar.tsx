'use client';

import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import GroupsIcon from '@mui/icons-material/Groups';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CommentIcon from '@mui/icons-material/Comment';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import LabelIcon from '@mui/icons-material/Label';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import PaletteIcon from '@mui/icons-material/Palette';
import MailIcon from '@mui/icons-material/Mail';
import ForumIcon from '@mui/icons-material/Forum';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems = [
  { label: 'داشبورد', href: '/dashboard', icon: <DashboardIcon /> },
  { label: 'پوشاک', href: '/dashboard/clothing', icon: <CheckroomIcon /> },
  { label: 'گروه‌های قومی', href: '/dashboard/ethnic-groups', icon: <GroupsIcon /> },
  { label: 'سفارشات', href: '/dashboard/orders', icon: <ShoppingCartIcon /> },
  { label: 'رزروها', href: '/dashboard/reservations', icon: <CalendarTodayIcon /> },
  { label: 'نظرات', href: '/dashboard/comments', icon: <CommentIcon /> },
  { label: 'رسانه', href: '/dashboard/media', icon: <PhotoLibraryIcon /> },
  { label: 'صفحات', href: '/dashboard/pages', icon: <ArticleIcon /> },
  { label: 'برچسب‌ها', href: '/dashboard/tags', icon: <LabelIcon /> },
  { label: 'کاربران', href: '/dashboard/users', icon: <PeopleIcon /> },
  { label: 'درخواست‌ها', href: '/dashboard/requests', icon: <MailIcon /> },
  { label: 'انجمن', href: '/dashboard/community', icon: <ForumIcon /> },
  { label: 'تنظیمات', href: '/dashboard/settings', icon: <SettingsIcon /> },
  { label: 'قالب', href: '/dashboard/theme', icon: <PaletteIcon /> },
];

function SidebarContent({ drawerWidth }: { drawerWidth: number }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box sx={{ width: drawerWidth, height: '100%', bgcolor: '#1E2A4A', color: 'white', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h6" sx={{ fontFamily: 'Vazirmatn, sans-serif', color: '#C9A84C', fontWeight: 700, fontSize: '1.1rem' }}>
          مزون برنا ایران
        </Typography>
        <Typography variant="caption" sx={{ fontFamily: 'Vazirmatn, sans-serif', color: 'rgba(255,255,255,0.6)' }}>
          پنل مدیریت
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, py: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                onClick={() => router.push(item.href)}
                sx={{
                  mx: 1, borderRadius: 1, mb: 0.25,
                  bgcolor: isActive ? 'rgba(201,168,76,0.2)' : 'transparent',
                  borderRight: isActive ? '3px solid #C9A84C' : '3px solid transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                  color: isActive ? '#C9A84C' : 'rgba(255,255,255,0.8)',
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.875rem' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default function Sidebar({ drawerWidth, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer variant="temporary" anchor="right" open={mobileOpen} onClose={onMobileClose} ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
        <SidebarContent drawerWidth={drawerWidth} />
      </Drawer>
      <Drawer variant="permanent" anchor="right"
        sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', border: 'none' } }}
        open>
        <SidebarContent drawerWidth={drawerWidth} />
      </Drawer>
    </Box>
  );
}
