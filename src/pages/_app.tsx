import * as React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Playfair_Display, Lora } from 'next/font/google';
import { Header } from 'src/components/Header';
import { Footer } from 'src/components/Footer';
import { Container } from 'src/components/Container';
import { LayoutAside } from 'src/components/LayoutAside';
import { JsonLd } from 'src/components/JsonLd';
import type { Organization } from 'schema-dts';
import {
  BASE_URL,
  FACEBOOK_USERNAME,
  FB_APP_ID,
  INSTAGRAM_USERNAME,
  PINTEREST_USERNAME,
  TIKTOK_USERNAME,
  WEBSITE_NAME,
} from 'src/constants';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import type { AsideData } from 'src/methods/getAsideData';
import '../styles/fa.css';
import '../styles/globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

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

export type CommonPageProps = {
  asideData?: AsideData;
};

export default function App({ Component, pageProps }: AppProps) {
  const { asideData, ...componentProps } = pageProps as CommonPageProps &
    Record<string, unknown>;

  const fontClasses = `${playfairDisplay.variable} ${lora.variable}`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content={getWebsiteName()} />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="fb:app_id" content={FB_APP_ID} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <JsonLd schema={organizationSchema} />
      <Header />

      <main className={`pb-xl md:pb-2xl ${fontClasses}`}>
        <Container>
          <div className="mx-auto my-lg md:my-xl flex flex-col md:flex-row gap-sm md:gap-xl min-h-screen">
            <div className={asideData ? 'w-full md:w-[70%]' : 'w-full'}>
              <Component {...componentProps} />
            </div>
            {asideData && (
              <div className="w-full md:w-[30%]">
                <LayoutAside data={asideData} />
              </div>
            )}
          </div>
        </Container>
      </main>

      <Footer descricao={asideData?.siteDescricao ?? undefined} />
    </>
  );
}
