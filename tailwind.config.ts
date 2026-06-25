import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#FBF7EC',
          100: '#F5ECCE',
          200: '#EDD79D',
          300: '#E3C16C',
          400: '#D9AB45',
          500: '#C9A84C',
          600: '#B8960C',
          700: '#9A7D0A',
          800: '#7D6408',
          900: '#614E06',
          DEFAULT: '#C9A84C',
        },
        accent: {
          50:  '#FDF2F4',
          100: '#FCE4E9',
          200: '#F8C9D3',
          300: '#F49EAE',
          400: '#E96B83',
          500: '#8B1A2F',
          600: '#7A1729',
          700: '#6B1224',
          800: '#5C1020',
          900: '#4D0D1B',
          DEFAULT: '#8B1A2F',
        },
        barna: {
          gold:    '#C9A84C',
          wine:    '#8B1A2F',
          gray:    '#6B7280',
          dark:    '#1E2A4A',
          bg:      '#FAF7F2',
          cream:   '#F5EFE0',
        },
      },
      fontFamily: {
        fa: ['Vazirmatn', 'sans-serif'],
        en: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        'barna': '0.75rem',
      },
    },
  },
  plugins: [],
};
export default config;
