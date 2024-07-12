import type { Metadata } from 'next';
import { Playfair_Display, Lora } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import logo from '../../public/logo.png';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  title: 'Lets Cozinha | O Seu Site de Culinária',
  description:
    'Descubra receitas fáceis e rápidas de preparar. Encontre pratos deliciosos para todas as ocasiões, desde sobremesas até refeições completas.',
  keywords:
    'receitas fáceis, receitas rápidas, sobremesas, pratos principais, culinária',
  openGraph: {
    title: 'Lets Cozinha | O Seu Site de Culinária',
    description:
      'Descubra receitas fáceis e rápidas de preparar. Encontre pratos deliciosos para todas as ocasiões, desde sobremesas até refeições completas.',
    images: [
      {
        url: 'https://www.letscozinha.com.br/logo-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Lets Cozinha | O Seu Site de Culinária',
      },
    ],
    url: 'https://letscozinha.com.br',
  },
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
      <body className={`${lora.className} bg-neutral`}>
        <header className="flex items-center gap-4 px-6 py-4">
          <Image src={logo} alt="Lets Cozinha" width={100} />
          <p className="text-4xl font-heading text-text-dark">Lets Cozinha</p>
        </header>
        <main className="container mb-10 text-text-dark">{children}</main>
        <footer className="bg-primary text-black p-5 flex justify-center">
          <p>© 2024 Lets Cozinha</p>
        </footer>
      </body>
    </html>
  );
}
