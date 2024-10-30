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
  },
};

export default async function CategoriesPage() {
  return (
    <>
      <h1>Categorias</h1>
      <p>Confira as nossas categorias:</p>
      <CategoriesList direction="row" />
    </>
  );
}
