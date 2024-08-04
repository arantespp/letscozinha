import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
    extend: {
      borderRadius: {
        DEFAULT: '8px',
      },
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
      spacing: {
        none: '0',
        xs: '0.25rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '4rem',
        'image-sm': '8rem',
        'image-lg': '42rem',
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
