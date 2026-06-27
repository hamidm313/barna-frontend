'use client';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

export default function Footer() {
  const { t } = useTranslation();
  const navLinks: [string, string][] = [
    ['/', t('footer.linkHome')],
    ['/ethnic', t('footer.linkEthnic')],
    ['/clothing', t('footer.linkClothing')],
    ['/configurator', t('footer.linkTryOn')],
    ['/about', t('footer.linkAbout')],
    ['/community', t('footer.linkCommunity')],
    ['/contact', t('footer.linkContact')],
  ];

  return (
    <footer className="bg-barna-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-primary-400 font-bold text-lg mb-4">{t('footer.brand')}</h3>
            <p className="text-gray-400 text-sm leading-7">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {navLinks.map(([href, label]) => (
                <li key={href}><Link href={href} className="hover:text-primary-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📱 09100000000</li>
              <li>📧 info@barna.ir</li>
              <li>📸 <a href="#" className="hover:text-primary-400">@barna_mezon</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
