import * as React from 'react';
import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Content } from 'src/components/Content';
import { CategoryTag } from 'src/components/CategoryTag';
import { JsonLd } from 'src/components/JsonLd';
import { Markdown } from 'src/components/Markdown';
import {
  type Recipe,
  getRecommendedEbook,
  getRecipe,
  getAllRecipes,
  searchSimilarRecipes,
} from 'src/cms/recipes';
import type { Ebook } from 'src/cms/ebooks';
import { RecipeImages } from 'src/components/RecipeImages';
import { RecipeInstagramLinks } from 'src/components/RecipeInstagramLinks';
import { RecipeShare } from 'src/components/RecipeShare';
import { RecipesList } from 'src/components/RecipesList';
import { EmailSubscription } from 'src/components/EmailSubscription';
import { getLetsCozinhaLets } from 'src/cms/singleTypes';
import { getRecipeSchema } from 'src/methods/getRecipeSchema';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { FB_APP_ID, WEBSITE_NAME } from 'src/constants';
import { EbookCard } from 'src/components/EbookCard';
import { ExclusiveRecipePreview } from 'src/components/ExclusiveRecipePreview';
import { getAsideData, type AsideData } from 'src/methods/getAsideData';

type Props = {
  recipe: Recipe;
  recipeSchema: ReturnType<typeof getRecipeSchema> extends Promise<infer T>
    ? T
    : never;
  letsNome: string;
  similarRecipes: Recipe[];
  recommendedEbook: Ebook | null;
  exclusiveInstructions: string[];
  asideData: AsideData;
};

export default function RecipePage({
  recipe,
  recipeSchema,
  similarRecipes,
  recommendedEbook,
  exclusiveInstructions,
}: Props) {
  const isExclusiveRecipe = !!recipe.mostrar_ebook;

  const images =
    recipe.imagens?.map((img) => ({
      ...img,
      alt: img.alt || `Imagem de ${recipe.nome}`,
    })) || [];

  const breadcrumb = [
    { name: 'Home', href: '/' },
    { name: 'Receitas', href: '/receitas' },
    { name: recipe.nome },
  ];

  const url = getUrl(`/receitas/${recipe.slug}`);
  const pageTitle = `Receita de ${recipe.nome} | ${WEBSITE_NAME}`;
  const rawDesc = recipe.meta_descricao ?? '';
  const description =
    rawDesc.length > 125 ? rawDesc.slice(0, 122) + '...' : rawDesc;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        {recipe.keywords && (
          <meta name="keywords" content={recipe.keywords} />
        )}
        <link rel="canonical" href={url} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={getWebsiteName()} />
        {recipe.imagens?.[0]?.url && (
          <meta property="og:image" content={recipe.imagens[0].url} />
        )}
        <meta property="fb:app_id" content={FB_APP_ID} />
      </Head>

      <JsonLd schema={recipeSchema} />

      <Content
        title={recipe.nome}
        description={recipe.descricao}
        breadcrumb={breadcrumb}
      >
        <Content.Section variant="meta">
          <div className="space-y-sm">
            {recipe.categorias && recipe.categorias.length > 0 && (
              <div className="flex flex-wrap gap-xs">
                {recipe.categorias.map((categoria) => (
                  <CategoryTag
                    key={categoria.slug}
                    nome={categoria.nome}
                    slug={categoria.slug}
                  />
                ))}
              </div>
            )}
            <RecipeInstagramLinks instagram_posts={recipe.instagram_posts} />
            {!isExclusiveRecipe && images.length > 0 && (
              <a
                href="#receita"
                className="inline-flex items-center min-h-[44px] text-secondary font-medium"
              >
                Ir para a receita
              </a>
            )}
          </div>
        </Content.Section>

        {images.length > 0 && (
          <Content.Section variant="tight">
            <RecipeImages images={images} />
          </Content.Section>
        )}

        <Content.Section variant="content">
          <span id="receita" className="block scroll-mt-[80px]" />
          {isExclusiveRecipe && recipe.mostrar_ebook ? (
            <ExclusiveRecipePreview
              instructions={exclusiveInstructions}
              ebook={recipe.mostrar_ebook}
              recipeName={recipe.nome}
            />
          ) : (
            <Markdown source={recipe.receita} />
          )}
        </Content.Section>

        {!isExclusiveRecipe && (
          <Content.Section variant="tight">
            <RecipeShare recipe={recipe} />
          </Content.Section>
        )}

        {!isExclusiveRecipe && (
          <Content.Section variant="loose">
            <EmailSubscription />
          </Content.Section>
        )}

        {!isExclusiveRecipe && recommendedEbook && (
          <Content.Section variant="loose">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair text-text-strong mb-sm">
                Para você que ama cozinhar
              </h2>
              <p className="text-text-light mb-md leading-relaxed">
                Um e-book especialmente selecionado para complementar sua
                experiência com{' '}
                <strong className="text-text-dark">{recipe.nome}</strong>!
              </p>
              <EbookCard ebook={recommendedEbook} variant="featured" priority />
            </div>
          </Content.Section>
        )}

        {!isExclusiveRecipe && similarRecipes.length > 0 && (
          <Content.Section variant="loose">
            <div>
              <h2 className="text-2xl md:text-3xl font-playfair text-text-strong mb-sm">
                Confira também
              </h2>
              <RecipesList recipes={similarRecipes} />
            </div>
          </Content.Section>
        )}
      </Content>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { allRecipes } = await getAllRecipes();
    return {
      paths: allRecipes.map((recipe) => ({ params: { slug: recipe.slug } })),
      fallback: 'blocking',
    };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;

  const recipe = await getRecipe({ slug }).catch(() => null);

  if (!recipe) {
    return { notFound: true };
  }

  const [
    letsResult,
    recipeSchemaResult,
    similarRecipesResult,
    recommendedEbookResult,
    asideDataResult,
  ] = await Promise.allSettled([
    getLetsCozinhaLets(),
    getRecipeSchema(recipe),
    searchSimilarRecipes({ recipe }),
    getRecommendedEbook(recipe),
    getAsideData(),
  ]);

  // O schema é construído em código e pode conter campos `undefined`
  // (description, keywords, recipeCategory...). No App Router ele só era
  // serializado via JSON.stringify no <script>; aqui ele vira prop e o
  // Next.js rejeita `undefined`. O round-trip por JSON remove esses campos.
  const recipeSchema =
    recipeSchemaResult.status === 'fulfilled' && recipeSchemaResult.value
      ? JSON.parse(JSON.stringify(recipeSchemaResult.value))
      : null;

  let exclusiveInstructions: string[] = [];
  if (recipe.mostrar_ebook && Array.isArray(recipeSchema?.recipeInstructions)) {
    exclusiveInstructions = recipeSchema.recipeInstructions
      .map((i: { text: string }) => i.text)
      .slice(0, 2);
  }

  const asideData =
    asideDataResult.status === 'fulfilled'
      ? asideDataResult.value
      : { featuredEbook: null, letsProfile: null, categoriesWithCounts: [], siteDescricao: null };

  return {
    props: {
      recipe,
      recipeSchema,
      letsNome:
        letsResult.status === 'fulfilled'
          ? letsResult.value.letsCozinhaLets.nome
          : '',
      similarRecipes:
        similarRecipesResult.status === 'fulfilled'
          ? similarRecipesResult.value
          : [],
      recommendedEbook:
        recommendedEbookResult.status === 'fulfilled'
          ? recommendedEbookResult.value
          : null,
      exclusiveInstructions,
      asideData,
    },
    revalidate: 3600,
  };
};
