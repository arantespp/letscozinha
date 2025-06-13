import * as React from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { EbooksList } from 'src/components/EbooksList';
import { getAllEbooks } from 'src/cms/ebooks';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import type { Metadata } from 'next';

const title = getPageTitle('E-books');
const description =
  'Explore nossa coleção de e-books de culinária com receitas especiais, dicas e técnicas culinárias para aprimorar suas habilidades na cozinha.';

export const metadata: Metadata = {
  title,
  description,
  keywords:
    'ebooks, livros de receitas, culinária digital, receitas especiais, técnicas culinárias, livros digitais',
  openGraph: {
    title,
    description,
    url: getUrl('/ebooks'),
    type: 'website',
    siteName: getWebsiteName(),
    images: ['https://www.letscozinha.com.br/opengraph-image.jpg'],
  },
};

export default async function EbooksPage() {
  const { allEbooks } = await getAllEbooks();

  return (
    <div className="py-lg">
      <div className="mb-lg">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'E-books', href: '/ebooks', current: true },
          ]}
        />
      </div>

      <header className="mb-xl text-center">
        <h1 className="text-3xl md:text-4xl font-heading mb-md">
          E-books Lets Cozinha
        </h1>
        <p className="text-text-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          Descubra nossa coleção de e-books exclusivos com receitas especiais,
          dicas e técnicas culinárias para transformar sua experiência na
          cozinha.
        </p>
      </header>

      <EbooksList ebooks={allEbooks} />
    </div>
  );
}
