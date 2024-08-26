import {
  getAllRecipes,
  findRecipe,
  searchSimilarRecipes,
  Recipe,
} from 'src/cms/recipes';
import type { Metadata, ResolvingMetadata } from 'next';
import { BASE_URL, WEBSITE_NAME } from 'src/constants';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { notFound } from 'next/navigation';
import { RecipeImages } from 'src/components/RecipeImages';
import { CategoryTag } from 'src/components/CategoryTag';
import { RecipeShare } from 'src/components/RecipeShare';
import { RecipesList } from 'src/components/RecipesList';
import * as React from 'react';
import { Markdown } from 'src/components/Markdown';
import { RecipeInstagramLinks } from 'src/components/RecipeInstagramLinks';
import { getRecipeSchema } from 'src/methods/getRecipeSchema';
import { JsonLd } from 'src/components/JsonLd';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const { allRecipes } = await getAllRecipes();

  return allRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const recipe = await findRecipe({ slug: params.slug });

  if (!recipe) {
    return {};
  }

  const ogUrl = new URL(`/receitas/${recipe.slug}/og`, BASE_URL);

  const url = new URL(`/receitas/${recipe.slug}`, BASE_URL);

  const parentMetadata = await parent;

  const title = `${recipe.nome} - ${WEBSITE_NAME}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description: recipe.meta_descricao,
    keywords: recipe.keywords,
    openGraph: {
      ...parentMetadata.openGraph,
      title,
      description: recipe.meta_descricao,
      images: ogUrl,
      url,
    },
  };
}

async function SimilarRecipes({ recipe }: { recipe: Recipe }) {
  const similarRecipes = await searchSimilarRecipes({ recipeId: recipe.id });

  return (
    <div className="md:mt-lg">
      <h2>Confira também</h2>
      <RecipesList recipes={similarRecipes} />
    </div>
  );
}

export default async function Page({ params }: Props) {
  const recipe = await findRecipe({ slug: params.slug });

  if (!recipe) {
    notFound();
  }

  /**
   * https://developers.google.com/search/docs/appearance/structured-data/recipe
   */
  const recipeSchema = getRecipeSchema(recipe);

  const images =
    recipe.imagens?.map((cmsImage) => {
      const image = cmsImage.formats.medium || cmsImage;

      return {
        ...image,
        alt: image.alt || `Imagem de ${recipe.nome}`,
      };
    }) || [];

  return (
    <div>
      <JsonLd schema={recipeSchema} />
      <article className="flex flex-col">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Receitas', href: '/receitas' },
            {
              name: recipe.nome,
              href: `/receitas/${recipe.slug}`,
              current: true,
            },
          ]}
        />
        <section className="flex flex-col gap-sm mt-sm">
          <h1>{recipe.nome}</h1>
          <span className="text-text-light">{recipe.descricao}</span>
          <div className="flex gap-xs">
            {recipe.categorias?.map((categoria) => (
              <CategoryTag
                key={categoria.slug}
                nome={categoria.nome}
                slug={categoria.slug}
              />
            ))}
          </div>
          <RecipeInstagramLinks
            instagram_posts={recipe.instagram_posts}
            slug={recipe.slug}
          />
          <div className="mt-sm mb-xl">
            <RecipeImages images={images} />
          </div>
        </section>
        <Markdown source={recipe.receita} />
        <hr className="my-lg md:my-xl" />
      </article>
      <div className="flex flex-col gap-xl">
        <RecipeShare recipe={recipe} />
        <React.Suspense fallback={null}>
          <SimilarRecipes recipe={recipe} />
        </React.Suspense>
      </div>
    </div>
  );
}
