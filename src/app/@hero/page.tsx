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
      <div className="container relative py-md md:py-lg px-sm md:px-0">
        <div className="grid md:grid-cols-2 gap-lg items-center">
          {/* Hero Content */}
          <div className="flex flex-col items-center md:items-start z-10 order-2 md:order-1 md:pr-md text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading mb-md">
              {titulo}
            </h1>

            <p className="text-text-light text-base md:text-lg lg:text-xl leading-relaxed mb-lg w-full">
              {descricao}
            </p>

            <Link
              href="/receitas"
              className="no-underline text-base md:text-lg rounded-full px-md md:px-lg py-sm bg-primary text-text-dark hover:bg-primary/80 transition-colors shadow-md flex items-center"
            >
              <span className="mr-sm">Buscar Receitas</span>
              <SearchIcon className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>

          {/* Hero Image Collage */}
          <div className="relative order-1 md:order-2 md:h-[450px] mb-md md:mb-0 flex justify-center">
            <div className="grid grid-cols-2 gap-sm h-full w-full max-w-[280px] md:max-w-full">
              <div className="h-[160px] md:h-full aspect-[3/4] md:aspect-auto relative rounded-lg overflow-hidden shadow-md transform rotate-2">
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
                <div className="h-[75px] md:h-[220px] aspect-square md:aspect-auto relative rounded-lg overflow-hidden shadow-md transform -rotate-1">
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

                <div className="h-[75px] md:h-[220px] aspect-square md:aspect-auto relative rounded-lg overflow-hidden shadow-md transform rotate-1">
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
            <div className="absolute -bottom-4 -left-4 w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 -z-10"></div>
            <div className="absolute -top-4 -right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/20 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
