import { getAllRecipes, findRecipe } from 'src/cms/recipes';
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';
import { BASE_URL } from 'src/constants';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { notFound } from 'next/navigation';

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

export default async function Page({ params }: Props) {
  const recipe = await findRecipe({ slug: params.slug });

  if (!recipe) {
    notFound();
  }

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(recipe.receita);

  const contentHtml = processedContent.toString();

  const image = recipe.imagens?.[0];

  return (
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
      <h1>{recipe.nome}</h1>
      {image && (
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          alt=""
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
