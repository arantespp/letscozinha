import { LinkButton } from './LinkButton';
import Image from 'next/image';
import { getLetsCozinhaLets } from 'src/cms/singleTypes';

export async function CookingCTA() {
  const { letsCozinhaLets } = await getLetsCozinhaLets();

  return (
    <section className="container my-lg md:my-xl overflow-hidden px-sm md:px-0">
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-md md:p-xl relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="w-full h-full bg-[url('/cooking-pattern.svg')] bg-repeat" />
        </div>

        <div className="grid md:grid-cols-2 gap-lg md:gap-xl items-center">
          <div className="flex flex-col gap-md text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-0">
              Desperte o Chef que Há em Você
            </h2>
            <p className="text-base md:text-lg">
              Explore nossa coleção de receitas deliciosas e transforme sua
              cozinha em um espaço de criatividade e sabor.
            </p>
            <div className="flex flex-wrap gap-sm justify-center md:justify-start">
              <LinkButton
                href="/receitas"
                className="bg-primary hover:bg-primary/80 text-text-dark font-medium transition-colors"
              >
                Explorar Receitas
              </LinkButton>
              <LinkButton
                href="/conheca-a-lets"
                className="bg-transparent border border-primary text-text-dark hover:bg-primary/10 transition-colors"
              >
                Sobre a Lets
              </LinkButton>
            </div>
          </div>

          <div className="relative mx-auto mt-md md:mt-0">
            <div className="relative aspect-square w-52 md:w-64 lg:w-80 overflow-hidden rounded-full">
              <div className="absolute inset-0 border-6 md:border-8 border-neutral rounded-full z-10" />
              <Image
                src={letsCozinhaLets.imagem.url}
                alt="Cozinhando com a Lets"
                fill
                sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 320px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
