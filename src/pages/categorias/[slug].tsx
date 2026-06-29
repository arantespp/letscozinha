import Head from 'next/head';
import Image from 'next/image';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { RecipesList } from 'src/components/RecipesList';
import { getCategory, getAllCategories, type Category } from 'src/cms/categories';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getRecipes } from 'src/cms/recipes';
import type { Recipe } from 'src/cms/recipes';
import type { CMSMeta } from 'src/cms/types';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { getAsideData, type AsideData } from 'src/methods/getAsideData';

type Props = {
  category: Category;
  recipes: Recipe[];
  pagination?: CMSMeta['pagination'] | null;
  asideData: AsideData;
};

export default function CategoryPage({ category, recipes, pagination }: Props) {
  const title = getPageTitle(category.nome);
  const description = `${category.nome} para todas as ocasiões. Receitas saborosas que você pode preparar em casa.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={getUrl(`/categorias/${category.slug}`)} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={getUrl(`/categorias/${category.slug}`)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={getWebsiteName()} />
      </Head>

      <div className="flex flex-col">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Categorias', href: '/categorias' },
            {
              name: category.nome,
              href: `/categorias/${category.slug}`,
              current: true,
            },
          ]}
        />

        <div className="mt-md mb-xl">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 p-lg">
            <div className="flex flex-col md:flex-row gap-lg items-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-heading shrink-0">
                {category.imagens?.[0] ? (
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={category.imagens[0].url}
                      alt={category.nome}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span>{category.nome.charAt(0)}</span>
                )}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-heading mb-sm">
                  {category.nome}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl md:text-3xl font-heading mb-md">
            Receitas de {category.nome}
          </h2>
          <RecipesList
            addCarouselSchema
            recipes={recipes}
            pagination={pagination ?? undefined}
            variant="compact"
            firstRecipePriority
          />
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { allCategories } = await getAllCategories();
    return {
      paths: allCategories.map((cat) => ({ params: { slug: cat.slug } })),
      fallback: 'blocking',
    };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;

  const [categoryResult, asideDataResult] = await Promise.allSettled([
    getCategory({ slug }),
    getAsideData(),
  ]);

  const category =
    categoryResult.status === 'fulfilled' ? categoryResult.value : null;

  if (!category) {
    return { notFound: true };
  }

  const { data, meta } = await getRecipes({
    categoryDocumentId: category.documentId,
    pagination: { page: 1 },
  }).catch(() => ({ data: [], meta: undefined }));

  const asideData =
    asideDataResult.status === 'fulfilled'
      ? asideDataResult.value
      : { featuredEbook: null, letsProfile: null, categoriesWithCounts: [], siteDescricao: null };

  return {
    props: {
      category,
      recipes: data,
      pagination: meta?.pagination ?? null,
      asideData,
    },
    revalidate: 3600,
  };
};
