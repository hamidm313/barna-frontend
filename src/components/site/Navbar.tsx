'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useSiteTheme } from '@/providers/ThemeProvider';
import { useTranslation } from '@/lib/i18n';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { locale, setLocale } = useSiteTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/ethnic', label: t('nav.ethnic') },
    { href: '/clothing', label: t('nav.clothing') },
    { href: '/community', label: t('nav.community') },
    { href: '/about', label: t('nav.story') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo/barna-logo.jpg" alt="Barna Mezon logo" className="h-11 w-11 rounded-full object-cover border border-primary-200" />
            <div className="leading-tight">
              <div className="text-sm font-bold text-barna-dark">مزون برنا</div>
              <div className="text-xs text-barna-gray">لباس اقوام ایران</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-barna-dark hover:text-primary-600 transition-colors">{l.label}</Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button onClick={() => setLocale(locale === 'fa' ? 'en' : 'fa')} className="text-xs border border-gray-200 rounded-full px-3 py-1 text-barna-gray hover:border-primary-300 transition-colors">
              {locale === 'fa' ? 'EN' : 'FA'}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && <Link href="/dashboard" className="btn-primary text-sm py-1.5 px-4">{t('nav.dashboard')}</Link>}
                <button onClick={() => { logout(); router.push('/'); }} className="text-sm text-barna-gray hover:text-accent-500 transition-colors">{t('nav.logout')}</button>
              </div>
            ) : (
              <Link href="/login" className="btn-primary text-sm py-1.5 px-4">{t('nav.login')}</Link>
            )}
            {/* Hamburger */}
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <div className={`w-5 h-0.5 bg-barna-dark transition-all mb-1 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-5 h-0.5 bg-barna-dark transition-all mb-1 ${menuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-barna-dark transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-barna-dark hover:text-primary-600 py-1">{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}