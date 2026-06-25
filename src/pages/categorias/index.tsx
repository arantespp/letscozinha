import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { CategoriesList, type CategoryWithCount } from 'src/components/CategoriesList';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { getAsideData, type AsideData } from 'src/methods/getAsideData';

type Props = {
  categoriesWithCounts: CategoryWithCount[];
  asideData: AsideData;
};

export default function CategoriesPage({ categoriesWithCounts }: Props) {
  return (
    <>
      <Head>
        <title>{getPageTitle('Categorias')}</title>
        <meta
          name="description"
          content="Veja todas as categorias disponíveis no Lets Cozinha."
        />
        <meta
          name="keywords"
          content="categorias, tipos de receitas, categorias de receitas"
        />
        <link rel="canonical" href={getUrl('/categorias')} />
        <meta property="og:url" content={getUrl('/categorias')} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={getWebsiteName()} />
        <meta
          property="og:image"
          content="https://www.letscozinha.com.br/opengraph-image.jpg"
        />
      </Head>

      <div className="py-lg">
        <header className="mb-lg text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-heading mb-sm">
            Categorias de Receitas
          </h1>
          <p className="text-text-light text-base md:text-lg leading-relaxed md:max-w-3xl">
            Explore nossa coleção de receitas organizadas por categorias e
            encontre a inspiração perfeita para sua próxima refeição.
          </p>
        </header>

        <div className="mb-2xl">
          <CategoriesList
            displayStyle="featured"
            categories={categoriesWithCounts}
          />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const asideData = await getAsideData().catch(() => ({
    featuredEbook: null,
    letsProfile: null,
    categoriesWithCounts: [],
    siteDescricao: null,
  }));

  return {
    props: {
      categoriesWithCounts: asideData.categoriesWithCounts,
      asideData,
    },
    revalidate: 3600,
  };
};
