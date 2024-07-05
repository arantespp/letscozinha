import { getCategories } from 'src/cms/getCategories';
import { getCategory } from 'src/cms/getCategory';
import Link from 'next/link';
import { RecipesList } from 'src/components/RecipesList';
import qs from 'qs';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = { params: { slug: string } };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = await getCategory({ slug: params.slug });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const imagesUrls =
    category.attributes.imagens?.data?.map(
      (image) => image.attributes.formats.large.url
    ) || [];

  return {
    title: category.attributes.nome,
    openGraph: {
      images: [...imagesUrls, ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const { data } = await getCategories();

  return data.map((category) => ({
    slug: category.attributes.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const category = await getCategory({ slug: params.slug });

  const recipesQuery = qs.stringify(
    {
      filters: {
        categorias: {
          id: {
            $eq: category.id,
          },
        },
      },
      populate: ['categorias'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  return (
    <div className="flex flex-col gap-3">
      <Link href="/" className="underline">
        Home
      </Link>
      <h1>Categoria - {category.attributes.nome}</h1>
      <RecipesList query={recipesQuery} />
    </div>
  );
}
