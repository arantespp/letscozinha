import * as React from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { CategoryTag } from 'src/components/CategoryTag';
import { JsonLd } from 'src/components/JsonLd';
import { Markdown } from 'src/components/Markdown';
import {
  Recipe,
  getRecipe,
  getAllSimplifiedRecipes,
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
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { FB_APP_ID } from 'src/constants';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { allSimplifiedRecipes } = await getAllSimplifiedRecipes();

  return allSimplifiedRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const recipe = await getRecipe({ slug: params.slug });
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
      siteName: getWebsiteName(),
    },
    facebook: {
      appId: FB_APP_ID,
    },
  };
}

async function SimilarRecipes({ recipe }: { recipe: Recipe }) {
  const similarRecipes = await searchSimilarRecipes({ recipe });

  if (similarRecipes.length === 0) {
    return null;
  }

  return (
    <div className="md:mt-lg">
      <h2>Confira também</h2>
      <RecipesList recipes={similarRecipes} />
    </div>
  );
}

export default async function Page(props: Props) {
  const params = await props.params;
  const recipe = await getRecipe({ slug: params.slug });

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
    <div className="pb-xl">
      <JsonLd schema={recipeSchema} />

      <div className="bg-gradient-to-b from-muted/50 to-neutral pt-md pb-lg">
        <div className="container">
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

          <div className="mt-md max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-sm">
              {recipe.nome}
            </h1>
            <p className="text-text-light text-lg mb-md">{recipe.descricao}</p>

            <div className="flex flex-wrap gap-xs mb-lg">
              {recipe.categorias?.map((categoria) => (
                <CategoryTag
                  key={categoria.slug}
                  nome={categoria.nome}
                  slug={categoria.slug}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <article className="">
        <div className="grid md:grid-cols-[2fr_1fr] gap-xl">
          <div className="flex flex-col gap-lg order-2 md:order-1">
            {/* Recipe content */}
            <div className="bg-white rounded-lg shadow-sm p-lg">
              <Markdown source={recipe.receita} />
            </div>

            {/* Recipe sharing */}
            <div className="bg-muted p-md rounded-lg">
              <RecipeShare recipe={recipe} />
            </div>
          </div>

          <div className="order-1 md:order-2">
            {/* Recipe images */}
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-sm p-md mb-lg overflow-hidden">
                <RecipeImages images={images} />
              </div>

              <RecipeInstagramLinks
                instagram_posts={recipe.instagram_posts}
                slug={recipe.slug}
              />
            </div>
          </div>
        </div>

        <hr className="my-xl" />
      </article>

      <div className="">
        <React.Suspense fallback={null}>
          <SimilarRecipes recipe={recipe} />
        </React.Suspense>
      </div>
    </div>
  );
}
