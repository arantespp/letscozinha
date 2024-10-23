import * as React from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { CategoryTag } from 'src/components/CategoryTag';
import { JsonLd } from 'src/components/JsonLd';
import { Markdown } from 'src/components/Markdown';
import {
  Recipe,
  findRecipe,
  getAllRecipes,
  searchSimilarRecipes,
} from 'src/cms/recipes';
import { RecipeImages } from 'src/components/RecipeImages';
import { RecipeInstagramLinks } from 'src/components/RecipeInstagramLinks';
import { RecipeShare } from 'src/components/RecipeShare';
import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinhaLets } from 'src/cms/singleTypes';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getRecipeSchema } from 'src/methods/getRecipeSchema';
import { getUrl } from 'src/methods/getUrl';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { allRecipes } = await getAllRecipes();

  return allRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const recipe = await findRecipe({ slug: params.slug });
  const { letsCozinhaLets } = await getLetsCozinhaLets();

  if (!recipe) {
    return {};
  }

  const url = getUrl(`/receitas/${recipe.slug}`);

  const title = getPageTitle(recipe.nome);

  return {
    title,
    description: recipe.meta_descricao,
    keywords: recipe.keywords,
    openGraph: {
      title,
      description: recipe.meta_descricao,
      url,
      type: 'article',
      publishedTime: recipe.createdAt,
      modifiedTime: recipe.updatedAt,
      authors: letsCozinhaLets.nome,
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

export default async function Page(props: Props) {
  const params = await props.params;
  const recipe = await findRecipe({ slug: params.slug });

  if (!recipe) {
    notFound();
  }

  /**
   * https://developers.google.com/search/docs/appearance/structured-data/recipe
   */
  const recipeSchema = await getRecipeSchema(recipe);

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
