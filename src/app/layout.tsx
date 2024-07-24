import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Lora } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import logo from '../../public/logo.png';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config as fortawesomeConfig } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

fortawesomeConfig.autoAddCss = false;

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
  title: 'Bem-vindo ao Lets Cozinha',
  description:
    'Descubra todos os tipos de receitas. Encontre pratos deliciosos para todas as ocasiões, desde sobremesas até refeições completas.',
  keywords:
    'receitas deliciosas, pratos gourmet, dicas de culinária, tutoriais de cozinha',
  openGraph: {
    images: [
      {
        url: 'https://www.letscozinha.com.br/logo-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bem-vindo ao Lets Cozinha',
      },
    ],
    url: 'https://www.letscozinha.com.br',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${playfairDisplay.variable} ${lora.variable}`}
    >
      <body>
        <header className="container py-md flex items-center justify-between">
          <Link href="/">
            <Image src={logo} alt="Lets Cozinha" height={60} />
          </Link>
          <nav className="flex gap-sm text-xl [&>a]:no-underline">
            <Link href="/">Home</Link>
            <Link href="/receitas">Receitas</Link>
            <Link href="/categorias">Categorias</Link>
          </nav>
          <nav className="flex text-3xl md:text-3xl gap-sm">
            <Link
              href="https://www.instagram.com/lets_cozinha/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </nav>
        </header>
        <main className="container py-md md:pb-xl">{children}</main>
        <footer className="bg-primary py-lg">
          <div className="container flex justify-center">
            <p>© 2024 Lets Cozinha</p>
          </div>
        </footer>
        <Analytics mode="production" />
        <SpeedInsights />
      </body>
    </html>
  );
}
