import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import { Content } from 'src/components/Content';
import { RecipesList } from 'src/components/RecipesList';
import { Search } from 'src/components/Search';
import { getPageTitle } from 'src/methods/getPageTitle';
import { searchRecipes, getRecipesWithPagination } from 'src/cms/recipes';
import type { Recipe } from 'src/cms/recipes';
import type { CMSMeta } from 'src/cms/types';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { getAsideData, type AsideData } from 'src/methods/getAsideData';

const title = getPageTitle('Busque e Descubra Novos Sabores');
const description =
  'Encontre todas as nossas receitas em um só lugar. Use nossa busca para filtrar por ingredientes, tempo de preparo e preferências dietéticas.';

type Props = {
  recipes: Recipe[];
  pagination?: CMSMeta['pagination'] | null;
  searchQuery: string;
  asideData: AsideData;
  error: boolean;
};

export default function ReceitasPage({
  recipes,
  pagination,
  searchQuery,
  error,
}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="todas as receitas, buscar receitas, receitas por ingredientes, receitas rápidas"
        />
        <link rel="canonical" href={getUrl('/receitas')} />
        <meta property="og:url" content={getUrl('/receitas')} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={getWebsiteName()} />
        <meta
          property="og:image"
          content="https://www.letscozinha.com.br/opengraph-image.jpg"
        />
      </Head>

      <Content
        title="Encontre Receitas Deliciosas"
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'Receitas', href: '/receitas', current: true },
        ]}
      >
        <Content.Section variant="tight">
          <div className="mb-lg md:mb-xl md:mt-sm">
            <Search />
          </div>

          {error ? (
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
          ) : recipes.length === 0 && searchQuery ? (
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-heading mb-md">
                Resultados da busca
              </h2>
              <div className="bg-muted p-lg rounded-lg shadow-sm mx-auto">
                <p className="text-lg mb-md">
                  Não encontramos receitas para "{searchQuery}"
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
          ) : (
            <RecipesList
              recipes={recipes}
              pagination={pagination ?? undefined}
              firstRecipePriority
              addCarouselSchema
              variant="compact"
            />
          )}
        </Content.Section>
      </Content>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const search =
    typeof context.query.search === 'string' ? context.query.search : '';
  const page =
    typeof context.query.page === 'string' ? context.query.page : '1';

  const [dataResult, asideDataResult] = await Promise.allSettled([
    search
      ? searchRecipes({ search })
      : getRecipesWithPagination({ page }),
    getAsideData(),
  ]);

  const asideData =
    asideDataResult.status === 'fulfilled'
      ? asideDataResult.value
      : { featuredEbook: null, letsProfile: null, categoriesWithCounts: [], siteDescricao: null };

  if (dataResult.status === 'rejected') {
    return {
      props: {
        recipes: [],
        searchQuery: search,
        error: true,
        asideData,
      },
    };
  }

  return {
    props: {
      recipes: dataResult.value.data,
      pagination: dataResult.value.meta?.pagination ?? null,
      searchQuery: search,
      error: false,
      asideData,
    },
  };
};
