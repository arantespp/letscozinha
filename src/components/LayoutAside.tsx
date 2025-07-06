import * as React from 'react';
import { CategoriesList } from './CategoriesList';
import { EbookCard } from './EbookCard';
import { Card } from './Card';
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
              src={letsCozinhaLets.imagem.url}
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
 * // Uso padrão
 * <LayoutAside />
 * ```
 */
export async function LayoutAside() {
  return (
    <aside className="w-full md:w-72 flex flex-col gap-md mt-xl md:mt-md">
      <React.Suspense fallback={null}>
        <ShowFeaturedEbook />
      </React.Suspense>

      <React.Suspense fallback={null}>
        <WhoIsLets />
      </React.Suspense>

      <Card className="h-full">
        <div className="flex flex-col gap-sm">
          <h3 className="font-heading text-lg text-center">Categorias</h3>
          <React.Suspense fallback={null}>
            <CategoriesList />
          </React.Suspense>
        </div>
      </Card>
    </aside>
  );
}
