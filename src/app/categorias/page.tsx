import * as React from 'react';
import { CategoriesList } from 'src/components/CategoriesList';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: getPageTitle('Categorias'),
  description: 'Veja todas as categorias disponíveis no Lets Cozinha.',
  keywords: 'categorias, tipos de receitas, categorias de receitas',
  openGraph: {
    url: getUrl('/categorias'),
    type: 'website',
  },
};

export default async function CategoriesPage() {
  return (
    <>
      <h1>Categorias</h1>
      <p>Veja as nossas categorias disponíveis:</p>
      <CategoriesList direction="row" />
    </>
  );
}
