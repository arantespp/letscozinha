import * as React from 'react';
import { BASE_URL, FB_APP_ID } from 'src/constants';
import { Footer } from 'src/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Header } from 'src/components/Header';
import { LayoutAside } from 'src/components/LayoutAside';
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
      className={`${playfairDisplay.variable} ${lora.variable}`}
    >
      <body>
        <Header />
        <main className="pb-xl md:pb-2xl">
          <React.Suspense fallback={<div className="h-[200px]"></div>}>
            {hero}
          </React.Suspense>
          <div className="container my-lg md:my-xl flex flex-col md:flex-row gap-sm md:gap-xl">
            <div className="flex-1">
              <React.Suspense fallback={null}>{children}</React.Suspense>
            </div>
            <LayoutAside />
          </div>
        </main>
        <Footer />
        {isProduction && <SpeedInsights />}
      </body>
      {isProduction && <GoogleAnalytics gaId="G-KBBBK8ZDJG" />}
    </html>
  );
}
