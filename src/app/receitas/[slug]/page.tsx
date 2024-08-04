import { getAllRecipes, findRecipe } from 'src/cms/recipes';
import { remark } from 'remark';
import html from 'remark-html';
import type { Metadata, ResolvingMetadata } from 'next';
import { BASE_URL } from 'src/constants';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { notFound } from 'next/navigation';
import { RecipeImages } from 'src/components/RecipeImages';
import { CategoryTag } from 'src/components/CategoryTag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { RecipeShare } from 'src/components/RecipeShare';

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

export default async function Page({ params }: Props) {
  const recipe = await findRecipe({ slug: params.slug });

  if (!recipe) {
    notFound();
  }

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(recipe.receita);

  const contentHtml = processedContent.toString();

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
        <div className="flex flex-col gap-sm mt-sm">
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
          <SeeRecipeOnInstagram instagram_posts={recipe.instagram_posts} />
          <div className="mt-sm mb-xl">
            <RecipeImages images={images} />
          </div>
        </div>
        <div
          className="max-w-[800px] text-justify"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
      <hr className="my-md md:my-lg" />
      <RecipeShare recipe={recipe} />
    </div>
  );
}
