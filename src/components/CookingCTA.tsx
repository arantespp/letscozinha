import { LinkButton } from './LinkButton';
import Image from 'next/image';
import Link from 'next/link';

type CookingCTAProps = {
  imageUrl?: string;
  priority?: boolean;
};

export function CookingCTA({ imageUrl, priority = false }: CookingCTAProps) {
  return (
    <section className="my-lg md:my-xl overflow-hidden md:px-0">
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-md md:p-xl relative">
        <div className="grid md:grid-cols-2 gap-lg md:gap-xl items-center">
          <div className="flex flex-col gap-md text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-0">
              Desperte o Chef que Há em Você
            </h2>
            <p className="text-base md:text-lg">
              Explore nossa coleção de receitas deliciosas e transforme sua
              cozinha em um espaço de criatividade e sabor.
            </p>
            {/* Botões em coluna no mobile (largura total, toque fácil) */}
            <div className="flex flex-col sm:flex-row gap-sm justify-center md:justify-start">
              <LinkButton
                href="/receitas"
                className="bg-primary hover:bg-primary/80 text-text-dark font-medium transition-colors min-h-[44px] w-full sm:w-auto"
              >
                Explorar Receitas
              </LinkButton>
              <LinkButton
                href="/conheca-a-lets"
                className="bg-transparent border border-primary text-text-dark hover:bg-primary/10 transition-colors min-h-[44px] w-full sm:w-auto"
              >
                Sobre a Lets
              </LinkButton>
            </div>
          </div>

          {imageUrl && (
            <div className="relative mx-auto mt-md md:mt-0">
              <Link href="/conheca-a-lets" className="block">
                <div className="relative aspect-square w-52 md:w-64 lg:w-80 overflow-hidden rounded-full cursor-pointer hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 border-6 md:border-8 border-neutral rounded-full z-10" />
                  <Image
                    src={imageUrl}
                    alt="Cozinhando com a Lets"
                    fill
                    sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, 320px"
                    className="object-cover"
                    priority={priority}
                  />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
