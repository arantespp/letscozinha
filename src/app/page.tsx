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
import { CategoryTag } from 'src/components/CategoryTag';
import { getAllCategories } from 'src/cms/categories';
import { getCategories } from 'src/cms/categories';
import { CookingCTA } from 'src/components/CookingCTA';

export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
  },
};

async function HeroSection() {
  try {
    const { letsCozinha } = await getLetsCozinha();
    const featuredRecipe = letsCozinha.receitas_favoritas[0];

    if (!featuredRecipe) {
      return null;
    }

    const image = featuredRecipe.imagens?.[0];

    return (
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mb-xl">
        <div className="container py-xl md:py-2xl grid md:grid-cols-2 gap-lg items-center">
          <div className="flex flex-col gap-md">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-sm">
                Lets Cozinha
              </h1>
              <p className="text-xl text-text-dark/80 mb-md">
                Explore receitas deliciosas e fáceis de preparar para todos os
                momentos.
              </p>
            </div>
            <div className="flex flex-col gap-sm">
              <h2 className="text-xl mb-0">Receita em Destaque</h2>
              <Link
                href={`/receitas/${featuredRecipe.slug}`}
                className="font-heading text-2xl no-underline hover:text-primary transition-colors"
              >
                {featuredRecipe.nome}
              </Link>
              <p className="line-clamp-3">{featuredRecipe.meta_descricao}</p>
              <div className="flex gap-xs mt-sm">
                <LinkButton
                  href={`/receitas/${featuredRecipe.slug}`}
                  className="bg-primary hover:bg-primary/80 text-text-dark font-medium transition-colors"
                >
                  Ver Receita
                </LinkButton>
                <LinkButton
                  href="/receitas"
                  className="bg-transparent border border-primary text-text-dark hover:bg-primary/10 transition-colors"
                >
                  Ver Todas
                </LinkButton>
              </div>
            </div>
          </div>
          <div className="relative aspect-square max-w-[400px] mx-auto w-full">
            {image && (
              <Link
                href={`/receitas/${featuredRecipe.slug}`}
                className="block w-full h-full overflow-hidden rounded-lg shadow-lg transform md:rotate-2 transition-transform hover:rotate-0"
              >
                <img
                  src={image.url}
                  alt={featuredRecipe.nome}
                  className="w-full h-full object-cover object-center"
                />
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function FavoriteRecipes() {
  try {
    const { letsCozinha } = await getLetsCozinha();

    // Skip the first recipe if it's used in the hero
    const recipes = letsCozinha.receitas_favoritas.slice(1);

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
    const topCategories = categoriesResponse.data.slice(0, 6);

    if (!topCategories.length) {
      return null;
    }

    return (
      <section className="mb-xl py-lg bg-muted rounded-lg">
        <div className="container">
          <h2 className="text-2xl md:text-3xl mb-md">Categorias Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-sm">
            {topCategories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/categorias/${category.slug}`}
                className="flex flex-col items-center justify-center p-md bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center no-underline"
              >
                <span className="text-text-dark font-medium">{category.nome}</span>
              </Link>
            ))}
          </div>
        </div>
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
        <HeroSection />
      </React.Suspense>

      <React.Suspense fallback={<Loading />}>
        <FavoriteRecipes />
      </React.Suspense>
      
      <CookingCTA />

      <React.Suspense fallback={<Loading />}>
        <PopularCategories />
      </React.Suspense>

      <React.Suspense fallback={<Loading />}>
        <MostVisitedRecipes />
      </React.Suspense>
    </div>
  );
}
