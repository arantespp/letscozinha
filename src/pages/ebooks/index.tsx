import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { Content } from 'src/components/Content';
import { EbookCard } from 'src/components/EbookCard';
import { getAllEbooks, type Ebook } from 'src/cms/ebooks';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { getAsideData, type AsideData } from 'src/methods/getAsideData';

const title = getPageTitle('E-books');
const description =
  'Transforme sua cozinha com nossos e-books exclusivos. Receitas especiais, técnicas profissionais e dicas culinárias para elevar suas habilidades na cozinha.';

type Props = {
  ebooks: Ebook[];
  asideData: AsideData;
};

export default function EbooksPage({ ebooks }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="ebooks, livros de receitas, culinária digital, receitas especiais"
        />
        <link rel="canonical" href={getUrl('/ebooks')} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={getUrl('/ebooks')} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={getWebsiteName()} />
        <meta
          property="og:image"
          content="https://www.letscozinha.com.br/opengraph-image.jpg"
        />
      </Head>

      <Content
        title="E-books Lets Cozinha"
        description="Transforme sua cozinha com nossos e-books exclusivos."
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'E-books', href: '/ebooks', current: true },
        ]}
      >
        <Content.Section variant="list">
          {ebooks.length === 0 ? (
            <div className="text-center py-xl">
              <h2 className="text-2xl font-heading mb-md">
                Nenhum e-book encontrado
              </h2>
              <p className="text-text-light">
                Não há e-books disponíveis no momento. Volte em breve!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              {ebooks.map((ebook, index) => (
                <EbookCard
                  key={ebook.documentId}
                  ebook={ebook}
                  priority={index < 3}
                  variant={index === 0 ? 'featured' : 'default'}
                  showPrice
                />
              ))}
            </div>
          )}
        </Content.Section>
      </Content>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [ebooksResult, asideDataResult] = await Promise.allSettled([
    getAllEbooks(),
    getAsideData(),
  ]);

  const ebooks =
    ebooksResult.status === 'fulfilled' ? ebooksResult.value.allEbooks : [];

  const asideData =
    asideDataResult.status === 'fulfilled'
      ? asideDataResult.value
      : { featuredEbook: null, letsProfile: null, categoriesWithCounts: [], siteDescricao: null };

  return {
    props: { ebooks, asideData },
    revalidate: 3600,
  };
};
