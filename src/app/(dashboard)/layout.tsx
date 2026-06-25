import { Metadata } from 'next';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export const metadata: Metadata = {
  title: 'پنل مدیریت - مزون برنا ایران',
  description: 'پنل مدیریت مزون برنا ایران',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
