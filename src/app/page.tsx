import * as React from 'react';
import { BASE_URL, WEBSITE_NAME } from 'src/constants';
import { JsonLd } from 'src/components/JsonLd';
import { Loading } from 'src/components/Loading';
import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha } from 'src/cms/singleTypes';
import { getMostVisitedPages } from 'src/ga4/getMostVisitedPages';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getRecipes } from 'src/cms/recipes';
import type { WebSite } from 'schema-dts';
import { LinkButton } from 'src/components/LinkButton';
import { getCategories } from 'src/cms/categories';
import { CookingCTA } from 'src/components/CookingCTA';
import { CategoriesList } from 'src/components/CategoriesList';

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
};

async function FavoriteRecipes() {
  try {
    const { letsCozinha } = await getLetsCozinha();

    const recipes = letsCozinha.receitas_favoritas;

    return (
      <section className="mb-xl">
        <div className="flex justify-between items-center mb-md">
          <h2 className="text-2xl md:text-3xl mb-0">Receitas Favoritas</h2>
          <Link
            href="/receitas"
            className="text-primary font-medium hover:underline"
          >
            Ver mais
          </Link>
        </div>
        <p className="mb-lg">
          Confira as receitas favoritas da{' '}
          <Link href="/conheca-a-lets">Lets</Link>. Experimente fazer você
          também!
        </p>
        <RecipesList addCarouselSchema recipes={recipes} firstRecipePriority />
      </section>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function PopularCategories() {
  try {
    const categoriesResponse = await getCategories({ page: 1 });
    const topCategories = categoriesResponse.data.slice(0, 3);

    if (!topCategories.length) {
      return null;
    }

    return (
      <section className="mb-xl">
        <div className="flex justify-between items-center mb-md">
          <h2 className="text-2xl md:text-3xl mb-0">Categorias Populares</h2>
          <Link
            href="/categorias"
            className="text-primary font-medium hover:underline"
          >
            Ver todas
          </Link>
        </div>

        <CategoriesList displayStyle="featured" limit={6} />
      </section>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function MostVisitedRecipes() {
  try {
    const mostVisitedPages = await getMostVisitedPages();

    if (!mostVisitedPages || mostVisitedPages.length === 0) {
      return null;
    }

    const mostVisitedRecipesSlugs = mostVisitedPages
      .filter((page) => page.path?.startsWith('/receitas/'))
      .sort((a, b) => Number(b.views) - Number(a.views))
      .filter(Boolean)
      .map((page) => page.path?.replace('/receitas/', ''))
      .slice(0, 6);

    if (mostVisitedRecipesSlugs.length === 0) {
      return null;
    }

    const mostVisitedRecipes = (
      await getRecipes({
        slugs: mostVisitedRecipesSlugs,
      })
    ).data.sort((a, b) =>
      mostVisitedRecipesSlugs.indexOf(a.slug) >
      mostVisitedRecipesSlugs.indexOf(b.slug)
        ? 1
        : -1
    );

    if (mostVisitedRecipes.length === 0) {
      return null;
    }

    return (
      <section className="mb-xl">
        <div className="flex justify-between items-center mb-md">
          <h2 className="text-2xl md:text-3xl mb-0">Receitas Populares</h2>
          <Link
            href="/receitas"
            className="text-primary font-medium hover:underline"
          >
            Ver mais
          </Link>
        </div>
        <p className="mb-lg">
          Confira as receitas mais acessadas nos últimos dias. Experimente fazer
          você também!
        </p>
        <RecipesList recipes={mostVisitedRecipes} />
      </section>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home() {
  /**
   * https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
   */
  const websiteSchema: WebSite = {
    '@type': 'WebSite',
    url: BASE_URL,
    name: WEBSITE_NAME,
  };

  return (
    <div className="flex flex-col gap-xl flex-1">
      <JsonLd schema={websiteSchema} />

      <React.Suspense fallback={<Loading />}>
        <FavoriteRecipes />
      </React.Suspense>

      <React.Suspense fallback={<Loading />}>
        <CookingCTA />
      </React.Suspense>

      <React.Suspense fallback={<Loading />}>
        <PopularCategories />
      </React.Suspense>

      <React.Suspense fallback={<Loading />}>
        <MostVisitedRecipes />
      </React.Suspense>
    </div>
  );
}
