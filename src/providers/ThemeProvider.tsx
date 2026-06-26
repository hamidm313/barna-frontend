'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeSettings } from '@/types';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import stylisRTLPlugin from 'stylis-plugin-rtl';

const defaultTheme: ThemeSettings = {
  color_primary: '#C9A84C',
  color_primary_dark: '#A8872A',
  color_primary_light: '#E8C97A',
  color_accent: '#8B1A2F',
  color_accent_dark: '#6B1224',
  color_gray: '#6B7280',
  color_dark: '#1E2A4A',
  color_background: '#FAF7F2',
  font_fa: 'Vazirmatn',
  font_en: 'Playfair Display',
};

const ThemeContext = createContext<{
  theme: ThemeSettings;
  dir: 'rtl' | 'ltr';
  locale: 'fa' | 'en' | 'fr';
  setLocale: (l: 'fa' | 'en' | 'fr') => void;
}>({ theme: defaultTheme, dir: 'rtl', locale: 'fa', setLocale: () => {} });

function makeEmotionCache(dir: 'rtl' | 'ltr') {
  return createCache({
    key: dir === 'rtl' ? 'muirtl' : 'muiltr',
    ...(dir === 'rtl' ? { stylisPlugins: [stylisRTLPlugin] } : {}),
  });
}

export function AppThemeProvider({ children, themeData }: { children: React.ReactNode; themeData?: Partial<ThemeSettings> }) {
  const [locale, setLocale] = useState<'fa' | 'en' | 'fr'>('fa');

  useEffect(() => {
    const saved = localStorage.getItem('barna_locale') as 'fa' | 'en' | 'fr' | null;
    if (saved === 'fa' || saved === 'en' || saved === 'fr') setLocale(saved);
  }, []);

  const theme = { ...defaultTheme, ...themeData } as ThemeSettings;
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  const muiTheme = createTheme({
    direction: dir,
    palette: {
      primary: { main: theme.color_primary, dark: theme.color_primary_dark, light: theme.color_primary_light },
      secondary: { main: theme.color_accent },
    },
    typography: {
      fontFamily: locale === 'fa' ? theme.font_fa : theme.font_en,
    },
  });

  const cache = makeEmotionCache(dir);

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', locale);
    localStorage.setItem('barna_locale', locale);
    document.documentElement.style.setProperty('--color-primary', theme.color_primary);
    document.documentElement.style.setProperty('--color-accent', theme.color_accent);
    document.documentElement.style.setProperty('--color-background', theme.color_background);
    document.documentElement.style.setProperty('--color-dark', theme.color_dark);
  }, [locale, theme]);

  return (
    <ThemeContext.Provider value={{ theme, dir, locale, setLocale }}>
      <CacheProvider value={cache}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}

export const useSiteTheme = () => useContext(ThemeContext);
