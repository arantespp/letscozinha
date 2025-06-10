import * as React from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { JsonLd } from 'src/components/JsonLd';
import { Markdown } from 'src/components/Markdown';
import { getEbook, getAllEbooks } from 'src/cms/ebooks';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { allEbooks } = await getAllEbooks();

  return allEbooks.map((ebook) => ({
    slug: ebook.slug,
  }));
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const ebook = await getEbook({ slug: params.slug });

  if (!ebook) {
    return {};
  }

  const url = getUrl(`/ebooks/${ebook.slug}`);
  const title = getPageTitle(ebook.titulo);

  return {
    title,
    description: ebook.meta_descricao,
    keywords: ebook.keywords,
    openGraph: {
      title,
      description: ebook.meta_descricao,
      url,
      type: 'article',
      publishedTime: ebook.createdAt,
      modifiedTime: ebook.updatedAt,
      siteName: getWebsiteName(),
      images: ebook.imagem?.url ? [ebook.imagem.url] : undefined,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const ebook = await getEbook({ slug: params.slug });

  console.log('Ebook:', ebook);

  if (!ebook) {
    notFound();
  }

  const productSchema: any = {
    '@type': 'Product',
    name: ebook.titulo,
    description: ebook.meta_descricao,
    image: ebook.imagem?.url,
    url: getUrl(`/ebooks/${ebook.slug}`),
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
    <div className="pb-xl">
      <JsonLd schema={productSchema} />

      <div className="bg-gradient-to-b from-muted/50 to-neutral pt-md pb-lg">
        <div className="">
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'E-books', href: '/ebooks' },
              {
                name: ebook.titulo,
                href: `/ebooks/${ebook.slug}`,
                current: true,
              },
            ]}
          />

          <div className="mt-md grid md:grid-cols-2 gap-xl items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-sm">
                {ebook.titulo}
              </h1>
              {ebook.subtitulo && (
                <h2 className="text-xl md:text-2xl text-text-light mb-md">
                  {ebook.subtitulo}
                </h2>
              )}
              <div className="text-text-light text-lg mb-lg">
                <Markdown source={ebook.descricao} />
              </div>

              <div className="flex flex-col gap-sm">
                {ebook.preco && (
                  <div className="text-2xl font-bold text-primary">
                    R$ {ebook.preco.toFixed(2).replace('.', ',')}
                  </div>
                )}

                <div className="flex gap-sm">
                  {ebook.checkout_url && (
                    <Link
                      href={ebook.checkout_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-lg py-sm bg-primary text-text-dark rounded-full hover:bg-primary/80 transition-colors font-medium"
                    >
                      Comprar Agora
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {ebook.imagem && (
              <div className="flex justify-center">
                <div className="relative w-80 h-96 md:w-96 md:h-[480px]">
                  <Image
                    src={ebook.imagem.url}
                    alt={ebook.titulo}
                    fill
                    sizes="(max-width: 768px) 320px, 384px"
                    className="object-cover rounded-lg shadow-lg"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="">
        <div className="max-w-4xl mx-auto">
          <div className="py-md md:py-lg">
            <Markdown source={ebook.pagina_website} />
          </div>

          {ebook.checkout_url && (
            <div className="mt-xl text-center bg-muted rounded-lg p-lg">
              <h3 className="text-xl md:text-2xl font-heading mb-md">
                Interessado neste e-book?
              </h3>
              <div className="flex justify-center">
                <Link
                  href={ebook.checkout_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-lg py-sm bg-primary text-text-dark rounded-full hover:bg-primary/80 transition-colors font-medium"
                >
                  Comprar Agora
                </Link>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
