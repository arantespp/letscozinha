import * as React from 'react';
import { Content } from 'src/components/Content';
import { CategoryTag } from 'src/components/CategoryTag';
import { JsonLd } from 'src/components/JsonLd';
import { Markdown } from 'src/components/Markdown';
import {
  type Recipe,
  getRecommendedEbook,
  getRecipeBySlug,
  getAllRecipes,
  searchSimilarRecipes,
} from 'src/cms/recipes';
import { RecipeImages } from 'src/components/RecipeImages';
import { RecipeInstagramLinks } from 'src/components/RecipeInstagramLinks';
import { RecipeShare } from 'src/components/RecipeShare';
import { RecipesList } from 'src/components/RecipesList';
import { EmailSubscription } from 'src/components/EmailSubscription';
import { getLetsCozinhaLets } from 'src/cms/singleTypes';
import { getRecipeSchema } from 'src/methods/getRecipeSchema';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { FB_APP_ID, WEBSITE_NAME } from 'src/constants';
import { EbookCard } from 'src/components/EbookCard';
import { ExclusiveRecipePreview } from 'src/components/ExclusiveRecipePreview';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Orçamento da função serverless. O default da Vercel (15s) era estourado
 * quando uma receita renderiza on-demand com o cache frio (receita nova fora
 * do generateStaticParams, ou logo após o webhook do CMS purgar o cache via
 * revalidateTag), pois o warm-up recarrega todas as receitas. 60s dá margem
 * para o primeiro render concluir e popular o cache; os próximos são rápidos.
 */
export const maxDuration = 60;

export async function generateStaticParams() {
  // getAllRecipes (em vez de getAllSimplifiedRecipes) aquece o cache de
  // receitas completas antes dos workers renderizarem as páginas, evitando
  // que as primeiras páginas paguem o warm-up e estourem o timeout
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
  const [recipe, letsResult] = await Promise.all([
    getRecipeBySlug(params.slug).catch(() => null),
    getLetsCozinhaLets().catch(() => null),
  ]);

  if (!recipe) {
    return {};
  }

  const { letsCozinhaLets } = letsResult ?? { letsCozinhaLets: { nome: '' } };

  const url = getUrl(`/receitas/${recipe.slug}`);

  const title = `Receita de ${recipe.nome} | ${WEBSITE_NAME}`;

  const rawDesc = recipe.meta_descricao ?? '';
  const description =
    rawDesc.length > 125 ? rawDesc.slice(0, 122) + '...' : rawDesc;

  return {
    title,
    description,
    keywords: recipe.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
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
  // Degrada graciosamente: se a busca por similaridade (embedder OpenAI)
  // expirar/falhar, a seção é omitida em vez de derrubar a página inteira
  const similarRecipes = await searchSimilarRecipes({ recipe }).catch(() => []);

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

async function RecommendedEbook({ recipe }: { recipe: Recipe }) {
  // Degrada graciosamente: se a recomendação (embedder OpenAI) expirar/falhar,
  // a seção é omitida em vez de derrubar a página inteira
  const ebook = await getRecommendedEbook(recipe).catch(() => null);

  if (!ebook) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-playfair text-text-strong mb-sm">
        Para você que ama cozinhar
      </h2>
      <p className="text-text-light mb-md leading-relaxed">
        Um e-book especialmente selecionado para complementar sua experiência
        com
        <strong className="text-text-dark"> {recipe.nome}</strong>!
      </p>
      <EbookCard ebook={ebook} variant="featured" priority />
    </div>
  );
}

export default async function Page(props: Props) {
  const params = await props.params;
  const recipe = await getRecipeBySlug(params.slug).catch(() => null);

  if (!recipe) {
    notFound();
  }

  // Verificar se é uma receita exclusiva de e-book
  const isExclusiveRecipe = !!recipe.mostrar_ebook;

  /**
   * https://developers.google.com/search/docs/appearance/structured-data/recipe
   */
  const recipeSchema = await getRecipeSchema(recipe).catch(() => null);

  const images =
    recipe.imagens?.map((cmsImage) => {
      const image = cmsImage;

      return {
        ...image,
        alt: image.alt || `Imagem de ${recipe.nome}`,
      };
    }) || [];

  // Para receitas exclusivas, extrair as instruções
  let exclusiveInstructions: string[] = [];

  if (isExclusiveRecipe && Array.isArray(recipeSchema?.recipeInstructions)) {
    exclusiveInstructions = recipeSchema.recipeInstructions
      .map((instruction) => instruction.text)
      .slice(0, 2);
  }

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
            <RecipeInstagramLinks instagram_posts={recipe.instagram_posts} />

            {/* Jump to recipe - padrão conhecido de sites de receitas (Jakob's Law) */}
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

        {/* Imagens da Receita - sem visual, apenas espaçamento */}
        {images.length > 0 && (
          <Content.Section variant="tight">
            <RecipeImages images={images} />
          </Content.Section>
        )}

        {/* Receita (Ingredientes + Modo de Preparo) - Conteúdo principal sem distrações */}
        <Content.Section variant="content">
          {/* Âncora do link "Ir para a receita"; scroll-mt compensa headers fixos */}
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

        {/* Compartilhamento - Após o usuário ler toda a receita (timing ideal) */}
        {!isExclusiveRecipe && (
          <Content.Section variant="tight">
            <RecipeShare recipe={recipe} />
          </Content.Section>
        )}

        {/* Newsletter - Após entregar valor completo (Peak-End Rule) */}
        {!isExclusiveRecipe && (
          <Content.Section variant="loose">
            <EmailSubscription />
          </Content.Section>
        )}

        {/* E-book Recomendado - Conversão principal no momento ideal */}
        {!isExclusiveRecipe && (
          <Content.Section variant="loose">
            <React.Suspense fallback={null}>
              <RecommendedEbook recipe={recipe} />
            </React.Suspense>
          </Content.Section>
        )}

        {/* Receitas Similares - Manter engajamento após conversão */}
        {!isExclusiveRecipe && (
          <Content.Section variant="loose">
            <React.Suspense fallback={null}>
              <SimilarRecipes recipe={recipe} />
            </React.Suspense>
          </Content.Section>
        )}
      </Content>
    </>
  );
}
