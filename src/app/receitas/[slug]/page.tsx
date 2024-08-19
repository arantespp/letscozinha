import {
  getAllRecipes,
  findRecipe,
  searchSimilarRecipes,
  Recipe,
} from 'src/cms/recipes';
import type { Metadata, ResolvingMetadata } from 'next';
import { BASE_URL } from 'src/constants';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { notFound } from 'next/navigation';
import { RecipeImages } from 'src/components/RecipeImages';
import { CategoryTag } from 'src/components/CategoryTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { RecipeShare } from 'src/components/RecipeShare';
import { RecipesList } from 'src/components/RecipesList';
import * as React from 'react';
import { Recipe as RecipeSchema, WithContext } from 'schema-dts';
import { Markdown } from 'src/components/Markdown';
import { RecipeInstagramLinks } from 'src/components/RecipeInstagramLinks';

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
    notFound();
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const imagesUrls = recipe.imagens?.map((image) => image.url) || [];

  return {
    metadataBase: new URL(BASE_URL),
    title: recipe.nome,
    description: recipe.meta_descricao,
    keywords: recipe.keywords,
    openGraph: {
      title: recipe.nome,
      description: recipe.meta_descricao,
      siteName: "Let's Cozinha",
      url: `/receitas/${recipe.slug}`,
      images: [...imagesUrls, ...previousImages],
    },
  };
}

const SeeRecipeOnInstagram = ({
  instagram_posts = [],
}: {
  instagram_posts?: { url: string }[];
}) => {
  if (!instagram_posts.length) {
    return null;
  }

  const nodes = instagram_posts.map((post, index) => {
    const hasComma =
      instagram_posts.length > 1 && index < instagram_posts.length - 1;

    if (index === 0) {
      return (
        <span key={post.url}>
          <span className="text-[1.5em] mr-xs align-middle">
            <FontAwesomeIcon icon={faInstagram} />
          </span>{' '}
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            Confira a receita no Instagram
            {hasComma ? ',' : ''}
          </a>
        </span>
      );
    }

    return (
      <a
        key={post.url}
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        post {index + 1}
        {hasComma ? ',' : ''}
      </a>
    );
  });

  // add space between nodes
  for (let i = 1; i < nodes.length; i += 2) {
    nodes.splice(i, 0, <span> </span>);
  }

  return <span>{nodes}</span>;
};

async function SimilarRecipes({ recipe }: { recipe: Recipe }) {
  const similarRecipes = await searchSimilarRecipes({ recipeId: recipe.id });

  return (
    <div>
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
  const jsonLd: WithContext<RecipeSchema> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.nome,
    image: recipe.imagens?.map((image) => image.url),
    author: {
      '@type': 'Person',
      name: 'Leticia Ferreira',
    },
    datePublished: recipe.updatedAt,
    description: recipe.descricao,
    keywords: recipe.keywords,
  };

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
      <article className="flex flex-col">
        {jsonLd.image && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
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
        <hr className="my-lg" />
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
