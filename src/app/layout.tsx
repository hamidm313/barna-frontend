import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { AppThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  metadataBase: new URL('https://barnamezon.ir'),
  title: { default: 'برنا مزون ایران | فروش، امانت و اجاره لباس محلی اقوام ایران', template: '%s | برنا مزون ایران' },
  description: 'برنا مزون ایران؛ فروش، امانت، اجاره، طراحی، بازطراحی و معرفی لباس محلی اقوام ایران با گزارش تصویری سفرهای برنا و جامعه هنردوستان.',
  keywords: ['لباس محلی', 'لباس اقوام ایران', 'مزون برنا', 'اجاره لباس محلی', 'لباس سنتی ایرانی', 'لباس کردی', 'لباس لری', 'لباس بندری', 'لباس ترکمن'],
  openGraph: { title: 'برنا مزون ایران', description: 'روایت زنده پوشاک اقوام ایران؛ فروش، امانت، اجاره و طراحی.', images: ['/images/logo/barna-logo.jpg'], locale: 'fa_IR', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'برنا مزون ایران', description: 'لباس محلی اقوام ایران برای فروش، امانت، اجاره و طراحی.', images: ['/images/logo/barna-logo.jpg'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ClothingStore', name: 'برنا مزون ایران', image: '/images/logo/barna-logo.jpg', description: 'فروش، امانت، اجاره و طراحی لباس محلی اقوام ایران', areaServed: 'Iran', sameAs: ['https://instagram.com/barna'] }) }} />
      </head>
      <body className="font-fa bg-barna-bg text-barna-dark antialiased">
        <QueryProvider><AuthProvider><AppThemeProvider>{children}<Toaster position="top-center" toastOptions={{ duration: 3000, style: { fontFamily: 'Vazirmatn, sans-serif', direction: 'rtl' } }} /></AppThemeProvider></AuthProvider></QueryProvider>
      </body>
    </html>
  );
}
