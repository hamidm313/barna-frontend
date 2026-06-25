import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { AppThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'مزون برنا ایران | لباس محلی اقوام ایران',
  description: 'فروش، اجاره و طراحی لباس سنتی اقوام ایران',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-fa bg-barna-bg text-barna-dark antialiased">
        <QueryProvider>
          <AuthProvider>
            <AppThemeProvider>
              {children}
              <Toaster position="top-center" toastOptions={{ duration: 3000, style: { fontFamily: 'Vazirmatn, sans-serif', direction: 'rtl' } }} />
            </AppThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
