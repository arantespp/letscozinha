import * as React from 'react';
import { Content } from 'src/components/Content';
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
import { EmailSubscription } from 'src/components/EmailSubscription';
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
    <div>
      <h2 className="text-2xl md:text-3xl font-playfair text-text-strong mb-sm">
        Confira também
      </h2>
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

  // Breadcrumb para a receita
  const breadcrumb = [
    { name: 'Home', href: '/' },
    { name: 'Receitas', href: '/receitas' },
    { name: recipe.nome },
  ];

  return (
    <>
      <JsonLd schema={recipeSchema} />

      <Content
        title={recipe.nome}
        description={recipe.descricao}
        breadcrumb={breadcrumb}
      >
        {/* Categorias e Instagram - elementos meta próximos ao header */}
        <Content.Section variant="meta">
          <div className="space-y-sm">
            {/* Categorias */}
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

            {/* Link para Instagram */}
            <RecipeInstagramLinks
              instagram_posts={recipe.instagram_posts}
              slug={recipe.slug}
            />
          </div>
        </Content.Section>

        {/* Imagens da Receita - sem visual, apenas espaçamento */}
        {images.length > 0 && (
          <Content.Section variant="tight">
            <RecipeImages images={images} />
          </Content.Section>
        )}

        {/* Receita (Texto Principal) - Conteúdo limpo sem distrações */}
        <Content.Section variant="content">
          <Markdown source={recipe.receita} />
        </Content.Section>

        {/* Compartilhamento - Background sutil encapsulado no componente */}
        <Content.Section variant="tight">
          <RecipeShare recipe={recipe} />
        </Content.Section>

        {/* Newsletter - Separação maior pois é conversão */}
        <Content.Section variant="loose">
          <EmailSubscription />
        </Content.Section>

        {/* Receitas Similares - Separação maior pois é seção nova */}
        <Content.Section variant="loose">
          <React.Suspense fallback={null}>
            <SimilarRecipes recipe={recipe} />
          </React.Suspense>
        </Content.Section>
      </Content>
    </>
  );
}
