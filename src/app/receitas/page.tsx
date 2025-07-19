import * as React from 'react';
import { Content } from 'src/components/Content';
import { RecipesList } from 'src/components/RecipesList';
import { Search } from 'src/components/Search';
import { getPageTitle } from 'src/methods/getPageTitle';
import { searchRecipes, getRecipesWithPagination } from 'src/cms/recipes';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import Link from 'next/link';
import type { Metadata } from 'next';

const title = getPageTitle('Busque e Descubra Novos Sabores');

const description =
  'Encontre todas as nossas receitas em um só lugar. Use nossa busca para filtrar por ingredientes, tempo de preparo e preferências dietéticas.';

export const metadata: Metadata = {
  title,
  description,
  keywords:
    'todas as receitas, buscar receitas, receitas por ingredientes, receitas rápidas, receitas detalhadas, receitas favoritas',
  openGraph: {
    url: getUrl('/receitas'),
    type: 'website',
    siteName: getWebsiteName(),
    images: ['https://www.letscozinha.com.br/opengraph-image.jpg'],
  },
};

type SearchParams = {
  search?: string;
  page?: string;
};

type Props = {
  searchParams?: Promise<SearchParams>;
};

async function SearchResults({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const searchTitle = searchParams?.search
    ? 'Resultados da busca'
    : 'Receitas Recentes';

  try {
    const { data: recipes, meta } = await (async () => {
      if (searchParams?.search) {
        return searchRecipes({ search: searchParams.search });
      }

      return getRecipesWithPagination({ page: searchParams?.page });
    })();

    if (recipes.length === 0 && searchParams?.search) {
      return (
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-heading mb-md">
            {searchTitle}
          </h2>
          <div className="bg-muted p-lg rounded-lg shadow-sm mx-auto">
            <p className="text-lg mb-md">
              Não encontramos receitas para "{searchParams.search}"
            </p>
            <p className="text-text-light mb-lg">
              Tente outra busca ou explore nossas categorias
            </p>
            <Link
              href="/receitas"
              className="inline-flex items-center px-lg py-sm bg-primary text-text-dark rounded-full hover:bg-primary/80 transition-colors font-medium"
            >
              Ver todas as receitas
            </Link>
          </div>
        </div>
      );
    }

    return (
      <RecipesList
        recipes={recipes}
        pagination={meta?.pagination}
        firstRecipePriority
        addCarouselSchema
        variant="compact"
      />
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-heading mb-md">Ops!</h2>
        <div className="bg-muted p-lg rounded-lg shadow-sm max-w-xl mx-auto">
          <p className="text-lg mb-sm">
            Não conseguimos processar sua busca no momento.
          </p>
          <p className="text-text-light mb-lg">
            Por favor, tente novamente mais tarde.
          </p>
          <Link
            href="/receitas"
            className="inline-flex items-center px-lg py-sm bg-primary text-text-dark rounded-full hover:bg-primary/80 transition-colors font-medium"
          >
            Ver receitas recentes
          </Link>
        </div>
      </div>
    );
  }
}

export default async function Page(props: Props) {
  const searchParams = (await props.searchParams) || {
    page: '1',
  };

  /**
   * https://github.com/vercel/next.js/issues/49297#issuecomment-1568557317
   */
  const suspenseKey = JSON.stringify(searchParams?.search);

  return (
    <Content
      title="Encontre Receitas Deliciosas"
      breadcrumb={[
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
    >
      <Content.Section variant="tight">
        <div className="mb-lg md:mb-xl md:mt-sm">
          <Search />
        </div>
        <React.Suspense key={suspenseKey} fallback={null}>
          <SearchResults searchParams={searchParams} />
        </React.Suspense>
      </Content.Section>
    </Content>
  );
}
