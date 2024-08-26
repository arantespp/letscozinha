import { findCategory, getAllCategories } from 'src/cms/categories';
import { RecipesList } from 'src/components/RecipesList';
import type { Metadata, ResolvingMetadata } from 'next';
import { getRecipes } from 'src/cms/recipes';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { notFound } from 'next/navigation';
import { getRecipesListSchema } from 'src/methods/getRecipesListSchema';
import { JsonLd } from 'src/components/JsonLd';
import { WEBSITE_NAME } from 'src/constants';

type Props = { params: { slug: string } };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = await findCategory({ slug: params.slug });

  if (!category) {
    return {};
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const imagesUrls = category.imagens?.map((image) => image.url) || [];

  const title = `${category.nome} - ${WEBSITE_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [...imagesUrls, ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const { allCategories } = await getAllCategories();

  return allCategories.map((category) => ({
    slug: category.slug,
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
  const category = await findCategory({ slug: params.slug });

  if (!category) {
    notFound();
  }

  const { recipes, meta } = await getRecipes({
    filter: { categoryId: category.id },
    page: searchParams.page,
  });

  const recipesListSchema = getRecipesListSchema(recipes);

  return (
    <div className="flex flex-col">
      <JsonLd schema={recipesListSchema} />
      <Breadcrumbs
        items={[
          {
            name: 'Home',
            href: '/',
          },
          {
            name: 'Receitas',
            href: '/receitas',
          },
          {
            name: category.nome,
            href: `/categorias/${category.slug}`,
            current: true,
          },
        ]}
      />
      <h1>Receitas - {category.nome}</h1>
      <RecipesList recipes={recipes} pagination={meta?.pagination} />
    </div>
  );
}
