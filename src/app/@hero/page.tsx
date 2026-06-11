import { getAllEbooks } from 'src/cms/ebooks';
import { LinkButton } from 'src/components/LinkButton';
import Image from 'next/image';
import { Suspense } from 'react';

/**
 * Hero da Home - E-book principal + headline impactante + CTA grande.
 *
 * Decisões de design (Laws of UX):
 * - Cognitive Load: uma única ação principal (conhecer o e-book); a compra
 *   acontece na página de vendas, após a entrega de valor
 * - Fitts's Law: CTA com 44px+ de altura
 * - Aesthetic-Usability: sem emojis ou claims não verificáveis, alinhado ao
 *   posicionamento gourmet da marca
 */
async function HomeHero() {
  try {
    const { allEbooks } = await getAllEbooks();

    // Pega o primeiro e-book como principal
    const featuredEbook = allEbooks[0];

    if (!featuredEbook) {
      return null;
    }

    const formattedPrice = featuredEbook.preco
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(featuredEbook.preco)
      : null;

    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto py-lg md:py-xl">
          <div className="grid md:grid-cols-2 gap-lg md:gap-xl items-center">
            {/* Conteúdo Principal - Lado Esquerdo */}
            <div className="flex flex-col gap-lg">
              <div className="space-y-md">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-text-dark leading-tight">
                  Transforme sua
                  <span className="text-primary block">Cozinha em Arte</span>
                </h1>
                <p className="text-lg md:text-xl text-text-dark/80 leading-relaxed">
                  Descubra receitas exclusivas que vão revolucionar sua forma de
                  cozinhar. Você vai se surpreender com o que pode fazer na sua
                  cozinha!
                </p>
              </div>

              {/* E-book Principal */}
              <div className="space-y-sm">
                <h2 className="text-2xl md:text-3xl font-heading text-text-dark leading-tight mb-0">
                  {featuredEbook.titulo}
                </h2>
                {featuredEbook.subtitulo && (
                  <p className="text-base md:text-lg text-text-light">
                    {featuredEbook.subtitulo}
                  </p>
                )}
                {formattedPrice && (
                  <p className="text-text-dark mb-0">
                    <span className="text-2xl font-bold">{formattedPrice}</span>
                    <span className="text-sm text-text-light ml-2">
                      PDF Digital
                    </span>
                  </p>
                )}
              </div>

              {/* CTA Único - Fitts's Law (44px+, largura total no mobile) */}
              <LinkButton
                href={`/ebooks/${featuredEbook.slug}`}
                className="font-semibold text-lg px-xl py-md min-h-[44px] w-full sm:w-auto sm:self-start shadow-lg"
              >
                Conhecer o E-book
              </LinkButton>
            </div>

            {/* Imagem do E-book - Lado Direito */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative w-full max-w-[260px] md:max-w-[400px]">
                {featuredEbook.imagem?.url ? (
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={featuredEbook.imagem.url}
                      alt={featuredEbook.titulo}
                      fill
                      sizes="(max-width: 768px) 260px, 400px"
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl shadow-2xl"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Erro ao carregar hero da home:', error);
    return null;
  }
}

export default function HeroPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[400px] md:h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse"></div>
      }
    >
      <HomeHero />
    </Suspense>
  );
}
