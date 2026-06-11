import * as React from 'react';
import { CategoriesList } from './CategoriesList';
import { EbookCard } from './EbookCard';
import { Card } from './Card';
import { EmailSubscription } from './EmailSubscription';
import { getLetsCozinhaLets, getLetsCozinha } from 'src/cms/singleTypes';
import Image from 'next/image';
import Link from 'next/link';

async function ShowFeaturedEbook() {
  const { letsCozinha } = await getLetsCozinha();

  if (
    !letsCozinha.ebooks_favoritos ||
    letsCozinha.ebooks_favoritos.length === 0
  ) {
    return null;
  }

  const featuredEbook = letsCozinha.ebooks_favoritos[0];

  return <EbookCard ebook={featuredEbook} variant="minimal" priority />;
}

async function WhoIsLets() {
  const { letsCozinhaLets } = await getLetsCozinhaLets();

  const summary = `"${letsCozinhaLets.resumo}"`;

  const src =
    letsCozinhaLets.imagem.formats.small?.url || letsCozinhaLets.imagem.url;

  return (
    <Card className="h-full">
      <div className="flex flex-col gap-sm items-center text-center">
        <Link
          href="/conheca-a-lets"
          className="hover:opacity-80 transition-opacity"
        >
          <div className="size-image-sm relative">
            <Image
              className="size-image-sm rounded-full object-cover"
              src={src}
              alt="Foto da Lets"
              fill
            />
          </div>
        </Link>
        <Link
          href="/conheca-a-lets"
          className="no-underline hover:text-primary transition-colors min-h-[44px] flex items-center justify-center"
        >
          <span className="font-heading text-xl">Conheça a Lets</span>
        </Link>
        <span className="italic text-center whitespace-pre-line leading-normal text-text-light">
          {summary}
        </span>
      </div>
    </Card>
  );
}

interface LayoutAsideProps {
  /** Configurações das seções do aside */
  sections?: {
    /** Mostrar e-book em destaque */
    featuredEbook?: boolean;
    /** Mostrar seção "Quem é a Lets" */
    whoIsLets?: boolean;
    /** Mostrar lista de categorias */
    categories?: boolean;
    /** Mostrar newsletter personalizada */
    newsletter?: {
      title: string;
      description: string;
      formLayout?: 'row' | 'column';
      textAlignment?: 'left' | 'center';
    };
  };
}

/**
 * Layout Aside Component - Sidebar de conversão com elementos estratégicos.
 *
 * Este componente implementa o sidebar de conversão seguindo os princípios
 * das Laws of UX definidos no projeto. Foca em 3 elementos essenciais:
 * conversão (e-book), credibilidade (Lets) e navegação (categorias).
 *
 * Features:
 * - E-book contextual usando EbookCard variant minimal
 * - Card encapsulation para "Quem é a Lets" seguindo padrão do projeto
 * - Touch-friendly links (44px+ seguindo Fitts's Law)
 * - Sticky behavior para manter conversão visível
 * - Mobile: empilhado abaixo do content principal
 * - Desktop: 30% width, sidebar fixa
 *
 * Cognitive Load Optimization:
 * - Máximo 3 seções para não sobrecarregar
 * - Separadores visuais claros entre seções
 * - Hierarquia visual bem definida
 *
 * Conversion Strategy:
 * - E-book em destaque no topo (conversão principal)
 * - Credibilidade no meio (autoridade/confiança)
 * - Navegação no final (exploração)
 *
 * @example
 * ```tsx
 * // Uso padrão (todas as seções)
 * <LayoutAside />
 *
 * // Página de e-books (sem featured ebook, com newsletter personalizada)
 * <LayoutAside
 *   sections={{
 *     featuredEbook: false,
 *     whoIsLets: true,
 *     categories: true,
 *     newsletter: {
 *       title: "Novidades de E-books",
 *       description: "Receba avisos sobre novos lançamentos e ofertas especiais dos nossos e-books.",
 *       formLayout: "column",
 *       textAlignment: "center"
 *     }
 *   }}
 * />
 * ```
 */
export async function LayoutAside({ sections = {} }: LayoutAsideProps = {}) {
  // Configurações padrão
  const config = {
    featuredEbook: true,
    whoIsLets: true,
    categories: true,
    newsletter: null,
    ...sections,
  };
  return (
    <aside className="w-full md:w-72 flex flex-col gap-md mt-xl md:mt-md">
      {config.newsletter && (
        <EmailSubscription
          title={config.newsletter.title}
          description={config.newsletter.description}
          formLayout={config.newsletter.formLayout}
          textAlignment={config.newsletter.textAlignment}
        />
      )}

      {config.featuredEbook && (
        <React.Suspense fallback={null}>
          <ShowFeaturedEbook />
        </React.Suspense>
      )}

      {config.whoIsLets && (
        <React.Suspense fallback={null}>
          <WhoIsLets />
        </React.Suspense>
      )}

      {config.categories && (
        <Card className="h-full">
          <div className="flex flex-col gap-sm">
            <h3 className="font-heading text-lg text-center">Categorias</h3>
            <React.Suspense fallback={null}>
              <CategoriesList />
            </React.Suspense>
          </div>
        </Card>
      )}
    </aside>
  );
}
