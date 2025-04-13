import * as React from 'react';
import { BASE_URL, FB_APP_ID } from 'src/constants';
import { Footer } from 'src/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Header } from 'src/components/Header';
import { LayoutWrapper } from 'src/components/LayoutWrapper';
import { Lora, Playfair_Display } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import './fa.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';

/**
 * Headers
 */
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

/**
 * Body
 */
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  /**
   * https://developers.google.com/search/docs/appearance/title-link
   */
  title: getPageTitle('Receitas deliciosas para todas as ocasiões'),
  description:
    'Descubra todos os tipos de receitas. Encontre pratos deliciosos para todas as ocasiões, desde sobremesas até refeições completas.',
  keywords:
    'receitas deliciosas, pratos gourmet, dicas de culinária, tutoriais de cozinha',
  openGraph: {
    url: BASE_URL,
    siteName: getWebsiteName(),
    type: 'website',
    images: ['https://www.letscozinha.com.br/opengraph-image.jpg'],
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://www.letscozinha.com.br/feed.xml',
    },
  },
  facebook: {
    appId: FB_APP_ID,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

const isProduction = process.env.NODE_ENV === 'production';

export default function RootLayout({
  children,
  hero,
}: Readonly<{
  children: React.ReactNode;
  hero: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${playfairDisplay.variable} ${lora.variable} scroll-smooth`}
    >
      <body className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pb-xl md:pb-2xl">
          <React.Suspense fallback={<div className="min-h-[250px]"></div>}>
            {hero}
          </React.Suspense>

          <LayoutWrapper>
            <React.Suspense fallback={null}>{children}</React.Suspense>
          </LayoutWrapper>
        </main>

        <Footer />
        {isProduction && <SpeedInsights />}
        {isProduction && <GoogleAnalytics gaId="G-KBBBK8ZDJG" />}
      </body>
    </html>
  );
}
