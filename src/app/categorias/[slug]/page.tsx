import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { RecipesList } from 'src/components/RecipesList';
import { findCategory, getAllCategories } from 'src/cms/categories';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getRecipes } from 'src/cms/recipes';
import { getUrl } from 'src/methods/getUrl';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = { params: { slug: string } };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = await findCategory({ slug: params.slug });

  if (!category) {
    return {};
  }

  const { recipes } = await getRecipes({
    filter: { categoryId: category.id },
  });

  const categoryImagesUrls = category.imagens?.map((image) => image.url) || [];

  const recipeImagesUrls =
    recipes.flatMap((recipe) => recipe.imagens?.map((image) => image.url)) ||
    [];

  const ogImages = [...categoryImagesUrls, ...recipeImagesUrls].filter(
    (url): url is string => !!url
  );

  const firstImageUrl = ogImages[0];

  const title = getPageTitle(`${category.nome}`);

  const description = `Encontre as melhores receitas de ${category.nome} para todas as ocasiões. Receitas saborosas que você pode preparar em casa. Explore opções tradicionais, saudáveis e irresistíveis no Lets Cozinha.`;

  return {
    title,
    description,
    openGraph: {
      title,
      url: getUrl(`/categorias/${category.slug}`),
      images: firstImageUrl,
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

  return (
    <div className="flex flex-col">
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
            name: category.nome,
            href: `/categorias/${category.slug}`,
            current: true,
          },
        ]}
      />
      <h1>Receitas de {category.nome} Deliciosas</h1>
      <RecipesList
        addCarouselSchema
        recipes={recipes}
        pagination={meta?.pagination}
      />
    </div>
  );
}
