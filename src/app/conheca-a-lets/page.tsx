import { JsonLd } from 'src/components/JsonLd';
import { Markdown } from 'src/components/Markdown';
import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha, getLetsCozinhaLets } from 'src/cms/singleTypes';
import { getLetsSchema } from 'src/methods/getLetsSchema';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { SocialNav } from 'src/components/SocialNav';
import Image from 'next/image';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { letsCozinhaLets } = await getLetsCozinhaLets();

  if (!letsCozinhaLets) {
    return {};
  }

  const title = getPageTitle(letsCozinhaLets.nome);

  return {
    title,
    description: letsCozinhaLets.resumo,
    openGraph: {
      title,
      description: letsCozinhaLets.resumo,
      images: letsCozinhaLets.imagem.url,
      url: getUrl('/conheca-a-lets'),
      type: 'website',
      siteName: getWebsiteName(),
    },
  };
}

export default async function ConhecaALets() {
  const { letsCozinhaLets } = await getLetsCozinhaLets();
  const { letsCozinha } = await getLetsCozinha();

  const letsSchema = await getLetsSchema();

  return (
    <div className="container px-sm md:px-0 py-lg flex flex-col gap-xl flex-1">
      <JsonLd schema={letsSchema} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-md md:p-xl overflow-hidden relative">
        <div className="grid md:grid-cols-2 gap-lg items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-md">
              {letsCozinhaLets.nome}
            </h1>
            <div className="text-text-light text-lg leading-relaxed mb-lg italic">
              "{letsCozinhaLets.resumo}"
            </div>
            <div className="flex flex-wrap gap-md">
              <SocialNav
                className="flex gap-sm"
                linkClassName="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-sm"
                iconClassName="text-xl"
                noLabel
              />
            </div>
          </div>
          <div className="flex justify-center order-1 md:order-2">
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={letsCozinhaLets.imagem.url}
                  alt={`Foto da ${letsCozinhaLets.nome}`}
                  fill
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/5 -z-10"></div>
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-accent/5 -z-10"></div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto">
        <div className="prose prose-lg prose-headings:font-heading prose-headings:text-text-dark prose-p:text-text-light prose-a:text-primary">
          <Markdown source={letsCozinhaLets.texto_completo} />
        </div>
      </section>

      {/* Favorite Recipes */}
      <section className="mt-lg">
        <div className="flex justify-between items-center mb-md">
          <h2 className="text-2xl md:text-3xl font-heading mb-0">
            Receitas Favoritas
          </h2>
        </div>
        <p className="text-text-light mb-lg max-w-3xl">
          Aqui estão as minhas receitas favoritas, que quero compartilhar com
          vocês. Cada uma tem um significado especial para mim e espero que
          vocês também gostem!
        </p>
        <RecipesList
          recipes={letsCozinha.receitas_favoritas}
          firstRecipePriority
        />
      </section>
    </div>
  );
}
