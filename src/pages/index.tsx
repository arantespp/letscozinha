import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import type { GetStaticProps } from 'next';
import { BASE_URL, WEBSITE_NAME } from 'src/constants';
import { JsonLd } from 'src/components/JsonLd';
import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha } from 'src/cms/singleTypes';
import { getMostVisitedPages } from 'src/ga4/getMostVisitedPages';
import { getRecipes } from 'src/cms/recipes';
import type { Recipe } from 'src/cms/recipes';
import { CategoriesList, type CategoryWithCount } from 'src/components/CategoriesList';
import { EbookCard } from 'src/components/EbookCard';
import { getAllEbooks, pickEbookForCard, type EbookForCard } from 'src/cms/ebooks';
import { CookingCTA } from 'src/components/CookingCTA';
import { LinkButton } from 'src/components/LinkButton';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getAsideData, type AsideData } from 'src/methods/getAsideData';
import type { WebSite } from 'schema-dts';

type Props = {
  favoriteRecipes: Recipe[];
  mostVisitedRecipes: Recipe[];
  featuredEbooks: EbookForCard[];
  categoriesWithCounts: CategoryWithCount[];
  letsProfileImageUrl: string | null;
  asideData: AsideData;
};

export default function Home({
  favoriteRecipes,
  mostVisitedRecipes,
  featuredEbooks,
  categoriesWithCounts,
  letsProfileImageUrl,
}: Props) {
  const heroEbook = featuredEbooks[0] ?? null;
  const websiteSchema: WebSite = {
    '@type': 'WebSite',
    url: BASE_URL,
    name: WEBSITE_NAME,
  };

  const formattedPrice =
    heroEbook?.preco
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(heroEbook.preco)
      : null;

  return (
    <>
      <Head>
        <title>{getPageTitle('Receitas deliciosas para todas as ocasiões')}</title>
        <meta
          name="description"
          content="Descubra todos os tipos de receitas. Encontre pratos deliciosos para todas as ocasiões, desde sobremesas até refeições completas."
        />
        <meta
          name="keywords"
          content="receitas deliciosas, pratos gourmet, dicas de culinária, tutoriais de cozinha"
        />
        <link rel="canonical" href={BASE_URL} />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.letscozinha.com.br/opengraph-image.jpg"
        />
      </Head>

      <JsonLd schema={websiteSchema} />

      {/* Hero - apenas na home */}
      {heroEbook && (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 -mx-4 md:-mx-8 mb-xl px-4 md:px-8">
          <div className="container mx-auto py-lg md:py-xl">
            <div className="grid md:grid-cols-2 gap-lg md:gap-xl items-center">
              <div className="flex flex-col gap-lg">
                <div className="space-y-md">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-text-dark leading-tight">
                    Transforme sua
                    <span className="text-primary block">Cozinha em Arte</span>
                  </h1>
                  <p className="text-lg md:text-xl text-text-dark/80 leading-relaxed">
                    Descubra receitas exclusivas que vão revolucionar sua forma de
                    cozinhar.
                  </p>
                </div>
                <div className="space-y-sm">
                  <h2 className="text-2xl md:text-3xl font-heading text-text-dark leading-tight mb-0">
                    {heroEbook.titulo}
                  </h2>
                  {heroEbook.subtitulo && (
                    <p className="text-base md:text-lg text-text-light">
                      {heroEbook.subtitulo}
                    </p>
                  )}
                  {formattedPrice && (
                    <p className="text-text-dark mb-0">
                      <span className="text-2xl font-bold">{formattedPrice}</span>
                      <span className="text-sm text-text-light ml-2">
                        PDF Digital
                      </span>
                    </p>
                  )}
                </div>
                <LinkButton
                  href={`/ebooks/${heroEbook.slug}`}
                  className="font-semibold text-lg px-xl py-md min-h-[44px] w-full sm:w-auto sm:self-start shadow-lg"
                >
                  Conhecer o E-book
                </LinkButton>
              </div>
              <div className="relative flex justify-center md:justify-end">
                <div className="relative w-full max-w-[260px] md:max-w-[400px]">
                  {heroEbook.imagem?.url ? (
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={heroEbook.imagem.url}
                        alt={heroEbook.titulo}
                        fill
                        sizes="(max-width: 768px) 260px, 400px"
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl shadow-2xl" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-col gap-lg md:gap-xl flex-1">
        {favoriteRecipes.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-md">
              <h2 className="text-2xl md:text-3xl mb-0">Receitas Favoritas</h2>
              <Link
                href="/receitas"
                className="text-secondary font-medium hover:underline"
              >
                Ver mais
              </Link>
            </div>
            <p className="mb-lg">
              Confira as receitas favoritas da{' '}
              <Link href="/conheca-a-lets">Lets</Link>. Experimente fazer você
              também!
            </p>
            <RecipesList
              addCarouselSchema
              recipes={favoriteRecipes}
              firstRecipePriority
              variant="compact"
            />
          </section>
        )}

        <CookingCTA imageUrl={letsProfileImageUrl ?? undefined} />

        {categoriesWithCounts.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-md">
              <h2 className="text-2xl md:text-3xl mb-0">Categorias Populares</h2>
              <Link
                href="/categorias"
                className="text-secondary font-medium hover:underline"
              >
                Ver todas
              </Link>
            </div>
            <CategoriesList
              displayStyle="featured"
              limit={6}
              categories={categoriesWithCounts}
            />
          </section>
        )}

        {featuredEbooks.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-md">
              <h2 className="text-2xl md:text-3xl mb-0">E-books da Lets</h2>
              <Link
                href="/ebooks"
                className="text-secondary font-medium hover:underline"
              >
                Ver todos
              </Link>
            </div>
            <p className="mb-lg">
              Coleções exclusivas de receitas para você dominar a cozinha.
            </p>
            <div className="flex gap-md overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-sm lg:mx-0 lg:px-0 lg:pb-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
              {featuredEbooks.map((ebook) => (
                <div
                  key={ebook.documentId}
                  className="w-[75%] sm:w-[45%] shrink-0 snap-start lg:w-auto lg:shrink"
                >
                  <EbookCard ebook={ebook} />
                </div>
              ))}
            </div>
          </section>
        )}

        {mostVisitedRecipes.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-md">
              <h2 className="text-2xl md:text-3xl mb-0">Receitas Populares</h2>
              <Link
                href="/receitas"
                className="text-secondary font-medium hover:underline"
              >
                Ver mais
              </Link>
            </div>
            <p className="mb-lg">
              Confira as receitas mais acessadas nos últimos dias.
            </p>
            <RecipesList recipes={mostVisitedRecipes} variant="compact" />
          </section>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [
    letsCozinhaResult,
    mostVisitedPagesResult,
    allEbooksResult,
    asideDataResult,
  ] = await Promise.allSettled([
    getLetsCozinha(),
    getMostVisitedPages(),
    getAllEbooks(),
    getAsideData(),
  ]);

  const favoriteRecipes =
    letsCozinhaResult.status === 'fulfilled'
      ? letsCozinhaResult.value.letsCozinha.receitas_favoritas || []
      : [];

  const allEbooks =
    allEbooksResult.status === 'fulfilled'
      ? allEbooksResult.value.allEbooks
      : [];

  const featuredEbooks = allEbooks.slice(0, 3).map(pickEbookForCard);

  const mostVisitedPages =
    mostVisitedPagesResult.status === 'fulfilled'
      ? mostVisitedPagesResult.value || []
      : [];

  const mostVisitedSlug = mostVisitedPages
    .filter((p) => p.path?.startsWith('/receitas/'))
    .sort((a, b) => Number(b.views) - Number(a.views))
    .map((p) => p.path?.replace('/receitas/', ''))
    .filter(Boolean)
    .slice(0, 6) as string[];

  let mostVisitedRecipes: Recipe[] = [];
  if (mostVisitedSlug.length > 0) {
    const result = await getRecipes({ slugs: mostVisitedSlug }).catch(() => ({
      data: [],
    }));
    mostVisitedRecipes = result.data.sort((a, b) =>
      mostVisitedSlug.indexOf(a.slug) > mostVisitedSlug.indexOf(b.slug) ? 1 : -1
    );
  }

  const asideData =
    asideDataResult.status === 'fulfilled'
      ? asideDataResult.value
      : { featuredEbook: null, letsProfile: null, categoriesWithCounts: [], siteDescricao: null };

  return {
    props: {
      favoriteRecipes,
      mostVisitedRecipes,
      featuredEbooks,
      categoriesWithCounts: asideData.categoriesWithCounts,
      letsProfileImageUrl: asideData.letsProfile?.imagem?.url ?? null,
      asideData,
    },
    revalidate: 3600,
  };
};
