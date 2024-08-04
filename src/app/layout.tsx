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
import { getAllCategories } from 'src/cms/categories';
import { getLetsCozinhaLets } from 'src/cms/singleTypes';
import { CategoryTag } from 'src/components/CategoryTag';

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

const Header = () => {
  return (
    <header className="container py-md flex items-center justify-between">
      <Link href="/">
        <Image src={logo} alt="Lets Cozinha" height={60} />
      </Link>
      <nav className="flex gap-sm text-md md:text-2xl [&>a]:no-underline">
        <Link href="/">Home</Link>
        <Link href="/receitas">Receitas</Link>
      </nav>
      <nav className="flex text-3xl md:text-3xl gap-sm">
        <Link href="https://www.instagram.com/lets_cozinha/" target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
      </nav>
    </header>
  );
};

const Aside = async () => {
  const [{ allCategories }, { letsCozinhaLets }] = await Promise.all([
    getAllCategories(),
    getLetsCozinhaLets(),
  ]);

  const summary = `"${letsCozinhaLets.resumo}"`;

  return (
    <aside className="w-full md:w-64 flex flex-col rounded p-md md:mt-md bg-[#F5F5F5]">
      <div className="flex flex-col gap-sm items-center">
        <div className="size-image-sm relative">
          <Image
            className="size-image-sm rounded-full"
            src={letsCozinhaLets.imagem.url}
            alt="Foto da Lets"
            fill
          />
        </div>
        <span className="font-heading text-xl">Conheça a Lets</span>
        <span className="italic text-center leading-normal">{summary}</span>
      </div>
      <hr className="my-md"></hr>
      <h2 className="text-2xl">Receitas</h2>
      <div className="flex flex-col gap-[14px]">
        {allCategories.map((category) => (
          <div key={category.id} className="">
            <CategoryTag {...category} />
          </div>
        ))}
      </div>
    </aside>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary py-lg">
      <div className="container flex justify-center">
        <p>© 2024 Lets Cozinha</p>
      </div>
    </footer>
  );
};

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
        <main className="md:pb-xl">
          {hero}
          <div className="container my-lg md:my-xl flex flex-col md:flex-row gap-sm md:gap-xl">
            <div className="flex-1">{children}</div>
            <Aside />
          </div>
        </main>
        <Footer />
        <Analytics mode="production" />
        <SpeedInsights />
      </body>
    </html>
  );
}
