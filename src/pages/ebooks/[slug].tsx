import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Content } from 'src/components/Content';
import { JsonLd } from 'src/components/JsonLd';
import { LinkButton } from 'src/components/LinkButton';
import { Markdown } from 'src/components/Markdown';
import { getEbook, getAllEbooks, type Ebook } from 'src/cms/ebooks';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { getAsideData, type AsideData } from 'src/methods/getAsideData';

type Props = {
  ebook: Ebook;
  asideData: AsideData;
};

function EbookHero({ ebook }: { ebook: Ebook }) {
  const imageSrc = ebook.imagem.formats.medium?.url || ebook.imagem.url;

  return (
    <div className="grid lg:grid-cols-2 gap-xl items-center">
      <div className="order-2 lg:order-1">
        <div className="text-text-light text-lg mb-lg leading-relaxed">
          <Markdown source={ebook.descricao} />
        </div>
        <div className="space-y-sm">
          {ebook.preco && (
            <div className="text-3xl lg:text-4xl font-bold text-primary">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(ebook.preco)}
            </div>
          )}
          {ebook.checkout_url && (
            <LinkButton
              href={ebook.checkout_url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-lg py-md text-lg font-semibold"
            >
              Comprar Agora
            </LinkButton>
          )}
        </div>
      </div>
      {ebook.imagem && (
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative w-full lg:w-96 xl:w-[420px] 2xl:w-[480px]">
            <Image
              src={imageSrc}
              alt={ebook.titulo}
              width={480}
              height={600}
              className="w-full h-auto object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function EbookPage({ ebook }: Props) {
  const url = getUrl(`/ebooks/${ebook.slug}`);
  const title = getPageTitle(ebook.titulo);

  const productSchema: any = {
    '@type': 'Product',
    name: ebook.titulo,
    description: ebook.meta_descricao,
    image: ebook.imagem?.url,
    url,
    ...(ebook.preco && {
      offers: {
        '@type': 'Offer',
        price: ebook.preco,
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
      },
    }),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={ebook.meta_descricao} />
        {ebook.keywords && <meta name="keywords" content={ebook.keywords} />}
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={ebook.meta_descricao} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={getWebsiteName()} />
        {ebook.imagem?.url && (
          <meta property="og:image" content={ebook.imagem.url} />
        )}
      </Head>

      <JsonLd schema={productSchema} />

      <Content
        title={ebook.titulo}
        description={ebook.subtitulo}
        breadcrumb={[
          { name: 'Home', href: '/' },
          { name: 'E-books', href: '/ebooks' },
          { name: ebook.titulo, current: true },
        ]}
      >
        <Content.Section variant="content">
          <EbookHero ebook={ebook} />
        </Content.Section>

        <Content.Section variant="content">
          <article className="prose prose-lg">
            <Markdown source={ebook.pagina_website} />
          </article>
        </Content.Section>

        {ebook.checkout_url && (
          <Content.Section variant="loose">
            <div className="text-center bg-gradient-to-r from-muted/50 to-muted rounded-lg p-lg lg:p-xl">
              <div className="grid lg:grid-cols-2 gap-lg items-center">
                {ebook.imagem && (
                  <div className="order-1 flex justify-center">
                    <div className="relative w-48 lg:w-56">
                      <Image
                        src={ebook.imagem.formats?.medium?.url || ebook.imagem.url}
                        alt={ebook.titulo}
                        width={240}
                        height={300}
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                )}
                <div className="order-2 text-center lg:text-left">
                  <h3 className="text-2xl lg:text-3xl font-playfair font-bold mb-md text-primary">
                    Transforme sua cozinha hoje mesmo
                  </h3>
                  <p className="text-text-light mb-lg">
                    Tenha acesso imediato a todas as receitas exclusivas.
                  </p>
                  <LinkButton
                    href={ebook.checkout_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-xl py-md text-lg font-semibold"
                  >
                    Comprar Agora
                  </LinkButton>
                </div>
              </div>
            </div>
          </Content.Section>
        )}
      </Content>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { allEbooks } = await getAllEbooks();
    return {
      paths: allEbooks.map((ebook) => ({ params: { slug: ebook.slug } })),
      fallback: 'blocking',
    };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;

  const [ebookResult, asideDataResult] = await Promise.allSettled([
    getEbook({ slug }),
    getAsideData(),
  ]);

  const ebook =
    ebookResult.status === 'fulfilled' ? ebookResult.value : null;

  if (!ebook) {
    return { notFound: true };
  }

  const asideData =
    asideDataResult.status === 'fulfilled'
      ? asideDataResult.value
      : { featuredEbook: null, letsProfile: null, categoriesWithCounts: [], siteDescricao: null };

  return {
    props: { ebook, asideData },
    revalidate: 3600,
  };
};
