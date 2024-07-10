import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E53935',
        secondary: '#FFEB3B',
        accent: '#689F38',
        neutral: '#FFFFFF',
        link: '#1976D2',
      },
      fontFamily: {
        heading: ['var(--font-playfair-display)'],
        body: ['var(--font-lora)'],
      },
    },
  },
  plugins: [],
};

export default config;
