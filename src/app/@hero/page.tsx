import { getAllEbooks } from 'src/cms/ebooks';
import { LinkButton } from 'src/components/LinkButton';
import Image from 'next/image';
import { Suspense } from 'react';

// Hero da Home - E-book principal + headline impactante + CTA grande
// Seguindo UX Laws: Fitts's Law (CTAs 44px+), Peak-End Rule (impacto inicial)
async function HomeHero() {
  try {
    const { allEbooks } = await getAllEbooks();

    // Pega o primeiro e-book como principal
    const featuredEbook = allEbooks[0];

    if (!featuredEbook) {
      return null;
    }

    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto py-xl">
          <div className="grid md:grid-cols-2 gap-lg md:gap-xl items-center">
            {/* Conteúdo Principal - Lado Esquerdo */}
            <div className="flex flex-col gap-lg">
              {/* Headline Impactante */}
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
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-lg border border-white/20 shadow-lg">
                <div className="flex items-start gap-md">
                  {/* Capa do E-book */}
                  <div className="relative w-20 h-28 md:w-24 md:h-32 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                    {featuredEbook.imagem?.url ? (
                      <Image
                        src={featuredEbook.imagem.url}
                        alt={featuredEbook.titulo}
                        fill
                        sizes="(max-width: 768px) 80px, 96px"
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/20"></div>
                    )}
                  </div>

                  {/* Informações do E-book */}
                  <div className="flex-1 space-y-sm">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold font-heading text-text-dark leading-tight">
                        {featuredEbook.titulo}
                      </h2>
                      {featuredEbook.subtitulo && (
                        <p className="text-md text-text-dark/70 mt-xs">
                          {featuredEbook.subtitulo}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-text-dark/80 line-clamp-2">
                      {featuredEbook.descricao}
                    </p>

                    {/* Preço */}
                    {featuredEbook.preco && (
                      <div className="flex items-center gap-xs">
                        <span className="text-2xl font-bold text-primary">
                          R$ {featuredEbook.preco.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-sm text-text-dark/60">
                          PDF Digital
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTAs Grandes - Fitts's Law (44px+) */}
                <div className="flex flex-col sm:flex-row gap-sm mt-lg">
                  <LinkButton
                    href={
                      featuredEbook.checkout_url ||
                      `/ebooks/${featuredEbook.slug}`
                    }
                    className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-xl py-lg rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl min-h-[44px] flex-1 text-center"
                  >
                    🛒 Comprar Agora
                  </LinkButton>

                  <LinkButton
                    href={`/ebooks/${featuredEbook.slug}`}
                    className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold text-lg px-xl py-lg rounded-lg transition-all min-h-[44px] flex-1 text-center"
                  >
                    📖 Ver Detalhes
                  </LinkButton>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-md text-sm text-text-dark/70">
                <div className="flex items-center gap-xs">
                  <span className="text-text-warning">⭐⭐⭐⭐⭐</span>
                  <span>Mais de 500 clientes satisfeitos</span>
                </div>
              </div>
            </div>

            {/* Imagem do E-book - Lado Direito */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative w-full max-w-[300px] md:max-w-[400px]">
                {featuredEbook.imagem?.url ? (
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src={featuredEbook.imagem.url}
                      alt={featuredEbook.titulo}
                      fill
                      sizes="(max-width: 768px) 300px, 400px"
                      style={{ objectFit: 'cover' }}
                      priority
                      className="hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay com efeito de brilho */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl shadow-2xl"></div>
                )}

                {/* Badge de Destaque */}
                <div className="absolute -top-2 -right-2 bg-accent text-white px-sm py-xs rounded-full text-xs font-bold shadow-lg transform rotate-12">
                  🔥 Mais Vendido
                </div>
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
