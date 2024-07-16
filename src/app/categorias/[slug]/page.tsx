import { getCategories } from 'src/cms/getCategories';
import { getCategory } from 'src/cms/getCategory';
import Link from 'next/link';
import { RecipesList } from 'src/components/RecipesList';
import qs from 'qs';
import type { Metadata, ResolvingMetadata } from 'next';
import { getRecipes } from 'src/cms/getRecipes';
import { RECIPES_PAGE_SIZE } from 'src/cms/config';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

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

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    page?: string;
  };
}) {
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
      pagination: {
        page: searchParams.page || '1',
        pageSize: RECIPES_PAGE_SIZE,
      },
      populate: ['categorias'],
      sort: ['nome:asc'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { recipes, meta } = await getRecipes({ query: recipesQuery });

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            name: 'Home',
            href: '/',
          },
          {
            name: 'Categorias',
            href: '/categorias',
          },
          {
            name: category.attributes.nome,
            href: `/categorias/${category.attributes.slug}`,
            current: true,
          },
        ]}
      />
      <h1>Categoria - {category.attributes.nome}</h1>
      <RecipesList recipes={recipes} pagination={meta?.pagination} />
    </div>
  );
}
