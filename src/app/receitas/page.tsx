import { Search } from 'src/components/Search';
import { RecipesList } from 'src/components/RecipesList';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { getRecipes, searchRecipes } from 'src/cms/recipes';
import type { Metadata } from 'next';
import * as React from 'react';
import { SearchLoading } from './SearchLoading';
import { JsonLd } from 'src/components/JsonLd';
import { getRecipesListSchema } from 'src/methods/getRecipesListSchema';

export const metadata: Metadata = {
  title: 'Todas as Receitas - Lets Cozinha | Busque e Descubra Novos Sabores',
  description:
    'Encontre todas as nossas receitas em um só lugar. Use nossa busca para filtrar por ingredientes, tempo de preparo e preferências dietéticas.',
  keywords:
    'todas as receitas, buscar receitas, receitas por ingredientes, receitas rápidas, receitas detalhadas, receitas favoritas',
};

type Props = {
  searchParams?: {
    search?: string;
    page?: string;
  };
};

async function SearchResults({ searchParams }: Props) {
  const { recipes, meta } = await (async () => {
    if (searchParams?.search) {
      return searchRecipes({ search: searchParams.search });
    }

    return getRecipes({ page: searchParams?.page });
  })();

  /**
   * https://developers.google.com/search/docs/appearance/structured-data/recipe
   */
  const recipesListSchema = getRecipesListSchema(recipes);

  const recipesQuantity = recipes.length;

  const subtitle = searchParams?.search
    ? `Mostrando ${recipesQuantity} receitas da sua busca por "${searchParams.search}":`
    : `Confira as nossas receitas mais recentes:`;

  return (
    <React.Fragment>
      <JsonLd schema={recipesListSchema} />
      <span className="text-text-light">{subtitle}</span>
      <RecipesList
        recipes={recipes}
        pagination={meta?.pagination}
        firstRecipePriority
      />
    </React.Fragment>
  );
}

export default async function Page({ searchParams }: Props) {
  const searchTitle = searchParams?.search ? 'Resultados da busca' : 'Receitas';

  /**
   * https://github.com/vercel/next.js/issues/49297#issuecomment-1568557317
   */
  const suspenseKey = JSON.stringify(searchParams?.search);

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          {
            name: 'Home',
            href: '/',
          },
          {
            name: 'Receitas',
            href: '/receitas',
            current: true,
          },
        ]}
      />
      <h1 className="my-none">Todas as receitas</h1>
      <div>
        <div className="my-lg">
          <Search />
        </div>
        <h2>{searchTitle}</h2>
        <React.Suspense
          key={suspenseKey}
          fallback={<SearchLoading key={suspenseKey} />}
        >
          <SearchResults searchParams={searchParams} />
        </React.Suspense>
      </div>
    </div>
  );
}
