import * as React from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { RecipesList } from 'src/components/RecipesList';
import { Search } from 'src/components/Search';
import { Loading } from 'src/components/Loading';
import { getPageTitle } from 'src/methods/getPageTitle';
import { searchRecipes, getRecipesWithPagination } from 'src/cms/recipes';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { getAllCategories } from 'src/cms/categories';
import { CategoryTag } from 'src/components/CategoryTag';
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

async function PopularCategories() {
  const { allCategories } = await getAllCategories();
  // Get top 8 categories with recipes
  const popularCategories = allCategories.slice(0, 8);

  return (
    <div className="my-lg">
      <h2 className="text-xl md:text-2xl font-heading mb-md">
        Categorias Populares
      </h2>
      <div className="flex flex-wrap gap-sm">
        {popularCategories.map((category) => (
          <CategoryTag key={category.documentId} {...category} />
        ))}
        <Link
          href="/categorias"
          className="inline-flex items-center justify-center rounded-full px-md py-xs bg-primary/10 hover:bg-primary/20 text-text-dark transition-colors"
        >
          Ver todas →
        </Link>
      </div>
    </div>
  );
}

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

    const recipesQuantity = recipes.length;

    const subtitle = searchParams?.search
      ? `Mostrando ${recipesQuantity} receitas da sua busca por "${searchParams.search}"`
      : `Confira as nossas receitas mais recentes`;

    if (recipes.length === 0 && searchParams?.search) {
      return (
        <div className="my-xl text-center">
          <h2 className="text-2xl md:text-3xl font-heading mb-md">
            {searchTitle}
          </h2>
          <div className="bg-muted p-lg rounded-lg shadow-sm max-w-xl mx-auto">
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
      <div className="my-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-sm mb-lg">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading mb-xs">
              {searchTitle}
            </h2>
            <p className="text-text-light">{subtitle}</p>
          </div>
          {!searchParams?.search && (
            <Link
              href="/receitas/todas-as-receitas"
              className="text-primary font-medium hover:underline flex items-center gap-xs"
            >
              Ver todas as receitas <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        <RecipesList
          recipes={recipes}
          pagination={meta?.pagination}
          firstRecipePriority
          addCarouselSchema
        />
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="my-xl text-center">
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
    <div className="px-xs md:px-0 py-lg">
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

      <header className="my-lg text-center md:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-sm">
          Encontre Receitas Deliciosas
        </h1>
        <p className="text-text-light text-base md:text-lg max-w-3xl">
          Busque pelo nome da receita, ingredientes ou técnicas de preparo.
        </p>
      </header>

      <div className="bg-muted p-md md:p-lg rounded-lg shadow-sm mb-xl">
        <div className="w-full max-w-5xl mx-auto">
          <Search />
        </div>
      </div>

      {!searchParams?.search && <PopularCategories />}

      <React.Suspense key={suspenseKey} fallback={<Loading />}>
        <SearchResults searchParams={searchParams} />
      </React.Suspense>
    </div>
  );
}
