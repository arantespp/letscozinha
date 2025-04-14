import * as React from 'react';
import { CategoriesList } from 'src/components/CategoriesList';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: getPageTitle('Categorias'),
  description: 'Veja todas as categorias disponíveis no Lets Cozinha.',
  keywords: 'categorias, tipos de receitas, categorias de receitas',
  openGraph: {
    url: getUrl('/categorias'),
    type: 'website',
    siteName: getWebsiteName(),
    images: ['https://www.letscozinha.com.br/opengraph-image.jpg'],
  },
};

export default async function CategoriesPage() {
  return (
    <div className="py-lg">
      <header className="mb-lg text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-heading mb-sm">
          Categorias de Receitas
        </h1>
        <p className="text-text-light text-base md:text-lg leading-relaxed md:max-w-3xl">
          Explore nossa coleção de receitas organizadas por categorias e
          encontre a inspiração perfeita para sua próxima refeição.
        </p>
      </header>

      <div className="mb-2xl">
        <CategoriesList displayStyle="featured" />
      </div>
    </div>
  );
}
