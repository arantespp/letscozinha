import { getRecipes } from 'src/cms/getRecipes';
import { getRecipe } from 'src/cms/getRecipe';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';
import { BASE_URL } from 'src/constants';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const { recipes } = await getRecipes();

  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const recipe = await getRecipe({ slug: params.slug });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const imagesUrls =
    recipe.attributes.imagens?.data?.map(
      (image) => image.attributes.formats.large.url
    ) || [];

  return {
    metadataBase: new URL(BASE_URL),
    title: recipe.attributes.nome,
    description: recipe.attributes.metaDescricao,
    keywords: recipe.attributes.keywords,
    openGraph: {
      title: recipe.attributes.nome,
      description: recipe.attributes.metaDescricao,
      siteName: "Let's Cozinha",
      url: `/receitas/${recipe.attributes.slug}`,
      images: [...imagesUrls, ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  const recipe = await getRecipe({ slug: params.slug });

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(recipe.attributes.receita);

  const contentHtml = processedContent.toString();

  const image = recipe.attributes.imagens?.data?.[0]?.attributes.formats?.small;

  return (
    <article className="flex flex-col">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Receitas', href: '/receitas' },
          {
            name: recipe.attributes.nome,
            href: `/receitas/${recipe.attributes.slug}`,
            current: true,
          },
        ]}
      />
      <h1>{recipe.attributes.nome}</h1>
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
