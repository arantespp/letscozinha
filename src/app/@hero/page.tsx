import { SearchIcon } from 'src/icons/icons';
import { getLetsCozinha } from 'src/cms/singleTypes';
import Image from 'next/image';
import Link from 'next/link';

export default async function Hero() {
  const { letsCozinha } = await getLetsCozinha();
  const titulo = letsCozinha.titulo || 'Lets Cozinha';
  const descricao = letsCozinha.descricao;
  const featuredRecipes = letsCozinha.receitas_favoritas?.slice(0, 3) || [];

  return (
    <div className="bg-gradient-to-b from-primary/10 to-neutral">
      <div className="container relative py-lg md:py-xl lg:py-2xl">
        <div className="grid md:grid-cols-2 gap-xl items-center">
          {/* Hero Content */}
          <div className="flex flex-col items-start z-10 order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-md">
              {titulo}
            </h1>

            <p className="text-text-light text-lg md:text-xl leading-relaxed mb-lg max-w-xl">
              {descricao}
            </p>

            <Link
              href="/receitas"
              className="no-underline text-lg md:text-xl rounded-full px-lg py-sm bg-primary text-text-dark hover:bg-primary/80 transition-colors shadow-sm flex items-center"
            >
              <span className="mr-sm">Buscar Receitas</span>
              <SearchIcon />
            </Link>

            {/* Food highlight badges */}
            <div className="flex flex-wrap gap-sm mt-xl">
              <span className="bg-accent/10 text-text-dark text-sm px-sm py-xs rounded-full">
                🥗 Saudável
              </span>
              <span className="bg-primary/10 text-text-dark text-sm px-sm py-xs rounded-full">
                🍰 Sobremesas
              </span>
              <span className="bg-secondary/10 text-text-dark text-sm px-sm py-xs rounded-full">
                🍲 Pratos Principais
              </span>
            </div>
          </div>

          {/* Hero Image Collage */}
          <div className="relative order-1 md:order-2">
            <div className="grid grid-cols-2 gap-sm">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-md transform rotate-2">
                {featuredRecipes[0]?.imagens?.[0] ? (
                  <Image
                    src={featuredRecipes[0].imagens[0].url}
                    alt={featuredRecipes[0].nome || 'Receita destaque'}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/40 to-secondary/30"></div>
                )}
              </div>

              <div className="grid gap-sm">
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-md transform -rotate-1">
                  {featuredRecipes[1]?.imagens?.[0] ? (
                    <Image
                      src={featuredRecipes[1].imagens[0].url}
                      alt={featuredRecipes[1].nome || 'Receita destaque'}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-accent/20"></div>
                  )}
                </div>

                <div className="aspect-square relative rounded-lg overflow-hidden shadow-md transform rotate-1">
                  {featuredRecipes[2]?.imagens?.[0] ? (
                    <Image
                      src={featuredRecipes[2].imagens[0].url}
                      alt={featuredRecipes[2].nome || 'Receita destaque'}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/30 to-primary/20"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-primary/20 -z-10"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-accent/20 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
