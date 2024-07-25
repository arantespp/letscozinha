import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      DEFAULT: '8px',
    },
    container: {
      center: true,
      padding: '1rem',
    },
    fontFamily: {
      heading: [
        'var(--font-playfair-display)',
        ...defaultTheme.fontFamily.serif,
      ],
      body: ['var(--font-lora)', ...defaultTheme.fontFamily.serif],
    },
    spacing: {
      none: '0',
      xs: '0.25rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '4rem',
    },
    extend: {
      colors: {
        primary: '#FAB200',
        secondary: '#D8110D',
        accent: '#4CAF50',
        neutral: '#FFFFFF',
        text: {
          light: '#737373',
          dark: '#333333',
        },
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }: any) {
      addComponents({
        '.container': {
          maxWidth: '80rem',
        },
      });
    },
  ],
};

export default config;
