import { JsonLd } from 'src/components/JsonLd';
import { Markdown } from 'src/components/Markdown';
import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha, getLetsCozinhaLets } from 'src/cms/singleTypes';
import { getLetsSchema } from 'src/methods/getLetsSchema';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
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

  const width = Math.min(letsCozinhaLets.imagem.width, 500);

  const height = Math.min(letsCozinhaLets.imagem.height, 500);

  return (
    <div className="flex flex-col gap-md md:gap-lg flex-1">
      <JsonLd schema={letsSchema} />
      <h1>Conheça a Lets</h1>
      <Image
        src={letsCozinhaLets.imagem.url}
        alt={`Foto da ${letsCozinhaLets.nome}`}
        width={width}
        height={height}
      />
      <Markdown source={letsCozinhaLets.texto_completo} />
      <div>
        <h2>Receitas Favoritas</h2>
        <p>
          Aqui estão as minhas receitas favoritas, que quero compartilhar com
          vocês:
        </p>
        <RecipesList
          recipes={letsCozinha.receitas_favoritas}
          firstRecipePriority
        />
      </div>
    </div>
  );
}
