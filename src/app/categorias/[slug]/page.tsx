import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { Markdown } from 'src/components/Markdown';
import { RecipesList } from 'src/components/RecipesList';
import { getCategory, getAllCategories } from 'src/cms/categories';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getRecipes } from 'src/cms/recipes';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { notFound } from 'next/navigation';
import Image from 'next/image';
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
      <div className="">
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

        {/* Category header with visual styling */}
        <div className="mt-md mb-xl">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 p-lg">
            <div className="flex flex-col md:flex-row gap-lg items-center">
              {/* Category icon or image */}
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-heading shrink-0">
                {category.imagens?.[0] ? (
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={category.imagens[0].url}
                      alt={category.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span>{category.nome.charAt(0)}</span>
                )}
              </div>

              {/* Category content */}
              <div>
                <h1 className="text-3xl md:text-4xl font-heading mb-sm">
                  {category.nome}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Recipes section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-heading mb-md">
            Receitas de {category.nome}
          </h2>
          <RecipesList
            addCarouselSchema
            recipes={data}
            pagination={meta?.pagination}
          />
        </section>
      </div>
    </div>
  );
}
