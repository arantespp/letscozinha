import * as React from 'react';
import { BASE_URL, WEBSITE_NAME } from 'src/constants';
import { JsonLd } from 'src/components/JsonLd';
import { Loading } from 'src/components/Loading';
import { RecipesList } from 'src/components/RecipesList';
import { getAllRecipes } from 'src/cms/recipes';
import { getLetsCozinha } from 'src/cms/singleTypes';
import { getMostVisitedPages } from 'src/ga4/getMostVisitedPages';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Recipe } from 'src/cms/recipes';
import type { WebSite } from 'schema-dts';

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
};

async function FavoriteRecipes() {
  try {
    const { letsCozinha } = await getLetsCozinha();

    return (
      <section>
        <h2>Receitas Favoritas</h2>
        <p>
          Confira as receitas favoritas da{' '}
          <Link href="/conheca-a-lets">Lets</Link>. Experimente fazer você
          também!
        </p>
        <RecipesList
          addCarouselSchema
          recipes={letsCozinha.receitas_favoritas}
          firstRecipePriority
        />
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
    const { allRecipes } = await getAllRecipes();

    if (!mostVisitedPages || mostVisitedPages.length === 0) {
      return null;
    }

    const mostVisitedRecipes = mostVisitedPages
      .filter((page) => page.path?.startsWith('/receitas/'))
      .sort((a, b) => Number(b.views) - Number(a.views))
      .map((page) => {
        const recipe = allRecipes.find((recipe) =>
          recipe.slug.startsWith(page.path.replace('/receitas/', ''))
        );

        return {
          ...recipe,
          views: page.views,
        };
      })
      .filter(Boolean)
      .slice(0, 6) as Recipe[];

    if (mostVisitedRecipes.length === 0) {
      return null;
    }

    return (
      <section>
        <h2>Receitas mais acessadas</h2>
        <p>
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
        <MostVisitedRecipes />
      </React.Suspense>
    </div>
  );
}
