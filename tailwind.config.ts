import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
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
      fontFamily: {
        heading: ['var(--font-playfair-display)'],
        body: ['var(--font-lora)'],
      },
    },
  },
  plugins: [
    function ({ addComponents }: any) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '60rem',
          },
        },
      });
    },
  ],
};

export default config;
