import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { Markdown } from 'src/components/Markdown';
import { RecipesList } from 'src/components/RecipesList';
import { getCategory, getAllCategories } from 'src/cms/categories';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getRecipes } from 'src/cms/recipes';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const category = await getCategory({ slug: params.slug });

  if (!category) {
    return {};
  }

  const title = getPageTitle(`${category.nome}`);

  const description = `${category.nome} para todas as ocasiões. Receitas saborosas que você pode preparar em casa. Explore opções tradicionais, saudáveis e irresistíveis no Lets Cozinha.`;

  return {
    title,
    description,
    openGraph: {
      title,
      url: getUrl(`/categorias/${category.slug}`),
      type: 'website',
      siteName: getWebsiteName(),
    },
  };
}

export async function generateStaticParams() {
  const { allCategories } = await getAllCategories();

  return allCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const category = await getCategory({ slug: params.slug });

  if (!category) {
    notFound();
  }

  const { data, meta } = await getRecipes({
    categoryDocumentId: category.documentId,
    pagination: {
      page: searchParams.page,
    },
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
      <h1>{category.nome}</h1>
      <Markdown source={category.descricao} />
      <h2>Receitas</h2>
      <RecipesList
        addCarouselSchema
        recipes={data}
        pagination={meta?.pagination}
      />
    </div>
  );
}
