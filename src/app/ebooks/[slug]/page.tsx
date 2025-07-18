import * as React from 'react';
import { Content } from 'src/components/Content';
import { JsonLd } from 'src/components/JsonLd';
import { LinkButton } from 'src/components/LinkButton';
import { Markdown } from 'src/components/Markdown';
import { getEbook, getAllEbooks, Ebook } from 'src/cms/ebooks';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';

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

/**
 * Hero para Páginas de E-book Individual
 *
 * **Estratégia de Conversão**:
 * - First impression crítica para capturar atenção
 * - Capa em destaque (Von Restorff Effect)
 * - Descrição persuasiva + preço + CTA imediato
 * - Layout 2 colunas (info + imagem)
 *
 * **Laws of UX Implementadas**:
 * - Aesthetic-Usability: Design elegante = percepção de qualidade
 * - Fitts's Law: CTA grande e próximo às informações
 * - Peak-End Rule: Primeira impressão impactante
 * - Von Restorff Effect: E-book destacado visualmente
 *
 * **Mobile Optimization**:
 * - Imagem primeiro (order-1)
 * - Informações abaixo (order-2)
 * - CTAs touch-friendly (44px+)
 *
 * **Performance**:
 * - Imagem com priority para LCP
 * - Responsive images otimizadas
 */
function EbookHero({ ebook }: { ebook: Ebook }) {
  const imageSrc = ebook.imagem.formats.medium?.url || ebook.imagem.url;

  return (
    <div className="grid lg:grid-cols-2 gap-xl items-center">
      {/* Informações do E-book */}
      <div className="order-2 lg:order-1">
        <div className="text-text-light text-lg mb-lg leading-relaxed">
          <Markdown source={ebook.descricao} />
        </div>

        {/* Preço e CTA Principal */}
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

      {/* Imagem do E-book */}
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

/**
 * E-book Sales Page
 *
 * Página de vendas otimizada seguindo padrões do README.md:
 *
 * **Layout Structure**:
 * - Content: Layout padrão com Content.tsx (70% desktop, 100% mobile)
 * - Hero: Integrado via Content.Section variant="hero"
 * - Aside: Via parallel route (@aside/ebooks/[slug])
 *
 * **Laws of UX Implementadas**:
 * - Fitts's Law: CTAs grandes (44px+) touch-friendly
 * - Peak-End Rule: Hero impactante + CTA final forte
 * - Von Restorff Effect: E-book destacado visualmente
 * - Aesthetic-Usability: Design limpo = percepção de usabilidade
 * - Cognitive Load: Foco em uma ação principal (comprar)
 * - Chunking: Conteúdo organizado em seções lógicas
 *
 * **Conversão Estratégica (Timing Otimizado)**:
 * - Timing 1: Hero com valor imediato (capa + descrição + CTA)
 * - Timing 2: Benefícios detalhados (página_website)
 * - Timing 3: CTA final no momento ideal (Peak-End Rule)
 *
 * **Otimizações Implementadas**:
 * - Hero integrado com Content.Section para espaçamento consistente
 * - Remoção de divs desnecessárias seguindo padrão Content.tsx
 * - Estrutura semântica otimizada para conversão
 * - CTAs posicionados estrategicamente (Jakob's Law)
 *
 * **Mobile Optimization**:
 * - Content responsivo via Content.tsx
 * - CTAs touch-friendly (44px+ altura)
 * - Layout adaptável automaticamente
 *
 * **Performance & SEO**:
 * - Structured data (Product schema)
 * - Breadcrumb navigation integrado
 * - Metadata completa para compartilhamento
 * - Hero com priority image para LCP
 */
export default async function Page(props: Props) {
  const params = await props.params;
  const ebook = await getEbook({ slug: params.slug });

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
    <>
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
        {/* Hero Section - Timing 1: Primeira impressão + CTA imediato */}
        <Content.Section variant="content">
          <EbookHero ebook={ebook} />
        </Content.Section>

        {/* Content Section - Timing 2: Benefícios detalhados */}
        <Content.Section variant="content">
          <article className="prose prose-lg">
            <Markdown source={ebook.pagina_website} />
          </article>
        </Content.Section>

        {/* CTA Final - Timing 3: Peak-End Rule */}
        {ebook.checkout_url && (
          <Content.Section variant="loose">
            <div className="text-center bg-gradient-to-r from-muted/50 to-muted rounded-lg p-lg lg:p-xl">
              <div className="grid lg:grid-cols-2 gap-lg items-center">
                {/* Imagem do E-book no CTA */}
                {ebook.imagem && (
                  <div className="order-1 lg:order-1 flex justify-center">
                    <div className="relative w-48 lg:w-56">
                      <Image
                        src={
                          ebook.imagem.formats?.medium?.url || ebook.imagem.url
                        }
                        alt={ebook.titulo}
                        width={240}
                        height={300}
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                )}

                {/* Texto e CTA */}
                <div className="order-2 lg:order-2 text-center lg:text-left">
                  <h3 className="text-2xl lg:text-3xl font-playfair font-bold mb-md text-primary">
                    Transforme sua cozinha hoje mesmo
                  </h3>
                  <p className="text-text-light mb-lg">
                    Tenha acesso imediato a todas as receitas exclusivas e
                    comece a criar pratos incríveis na sua cozinha.
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
