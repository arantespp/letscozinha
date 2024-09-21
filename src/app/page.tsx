import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha } from 'src/cms/singleTypes';
import type { WebSite } from 'schema-dts';
import { BASE_URL, WEBSITE_NAME } from 'src/constants';
import { JsonLd } from 'src/components/JsonLd';
import type { Metadata } from 'next';
import { Loading } from 'src/components/Loading';
import * as React from 'react';
import { getMostVisitedPages } from 'src/ga4/getMostVisitedPages';
import { getAllRecipes } from 'src/cms/recipes';
import type { Recipe } from 'src/cms/recipes';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
};

async function FavoriteRecipes() {
  const { letsCozinha } = await getLetsCozinha();

  return (
    <section>
      <h2>Receitas Favoritas</h2>
      <p>
        Confira as receitas favoritas da{' '}
        <Link href="/conheca-a-lets">Lets</Link>. Experimente fazer você também!
      </p>
      <RecipesList
        recipes={letsCozinha.receitas_favoritas}
        firstRecipePriority
      />
    </section>
  );
}

async function MostVisitedRecipes() {
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
}

export default async function Home() {
  /**
   * https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
   */
  const websiteSchema: WebSite = {
    '@type': 'WebSite',
    url: BASE_URL,
    name: WEBSITE_NAME,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: new URL('/receitas?search={search_term_string}', BASE_URL)
          .href,
      },
      'query-input': 'required name=search_term_string',
    } as any,
  };

  return (
    <div className="flex flex-col gap-md md:gap-xl flex-1">
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
