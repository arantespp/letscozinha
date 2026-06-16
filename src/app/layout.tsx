import * as React from 'react';
import {
  BASE_URL,
  FACEBOOK_USERNAME,
  FB_APP_ID,
  INSTAGRAM_USERNAME,
  PINTEREST_USERNAME,
  TIKTOK_USERNAME,
  WEBSITE_NAME,
} from 'src/constants';
import { Footer } from 'src/components/Footer';
import { JsonLd } from 'src/components/JsonLd';
import type { Organization } from 'schema-dts';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Header } from 'src/components/Header';
import { Lora, Playfair_Display } from 'next/font/google';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import './fa.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Container } from 'src/components/Container';

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
  metadataBase: new URL(BASE_URL),
  title: getPageTitle('Receitas deliciosas para todas as ocasiões'),
  description:
    'Descubra todos os tipos de receitas. Encontre pratos deliciosos para todas as ocasiões, desde sobremesas até refeições completas.',
  keywords:
    'receitas deliciosas, pratos gourmet, dicas de culinária, tutoriais de cozinha',
  openGraph: {
    url: BASE_URL,
    siteName: getWebsiteName(),
    type: 'website',
    locale: 'pt_BR',
    images: ['https://www.letscozinha.com.br/opengraph-image.jpg'],
  },
  // Herdado por todas as páginas; imagens caem nas do openGraph
  twitter: {
    card: 'summary_large_image',
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

/**
 * https://developers.google.com/search/docs/appearance/structured-data/organization
 */
const organizationSchema: Organization = {
  '@type': 'Organization',
  name: WEBSITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: [
    `https://www.facebook.com/${FACEBOOK_USERNAME}`,
    `https://www.instagram.com/${INSTAGRAM_USERNAME}`,
    `https://www.tiktok.com/${TIKTOK_USERNAME}`,
    `https://br.pinterest.com/${PINTEREST_USERNAME}`,
  ],
};

export default function RootLayout({
  children,
  hero,
  aside,
}: Readonly<{
  children: React.ReactNode;
  hero: React.ReactNode;
  aside: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${playfairDisplay.variable} ${lora.variable}`}
    >
      <body>
        <JsonLd schema={organizationSchema} />
        <Header />
        <main className="pb-xl md:pb-2xl">
          <React.Suspense fallback={null}>{hero}</React.Suspense>
          <Container>
            {/*
              `min-h-screen` reserva a altura do conteúdo principal enquanto ele
              faz streaming. Sem essa reserva, o fallback de altura zero faz o
              Footer renderizar dentro do viewport e depois ser empurrado para
              baixo quando o conteúdo chega — gerando um CLS catastrófico
              (~0.69). Reservando uma tela inteira, o Footer permanece abaixo da
              dobra durante o carregamento e o deslocamento ocorre fora da tela,
              sem contar para o CLS.
            */}
            <div className="mx-auto my-lg md:my-xl flex flex-col md:flex-row gap-sm md:gap-xl min-h-screen">
              <div className="w-full md:w-[70%]">
                <React.Suspense fallback={null}>{children}</React.Suspense>
              </div>
              <div className="w-full md:w-[30%]">
                <React.Suspense fallback={null}>{aside}</React.Suspense>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </body>
      {isProduction && <GoogleAnalytics gaId="G-KBBBK8ZDJG" />}
    </html>
  );
}
