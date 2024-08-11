import { getLetsCozinhaLets } from 'src/cms/singleTypes';
import Image from 'next/image';
import { Markdown } from 'src/components/Markdown';

export default async function Home() {
  const { letsCozinhaLets } = await getLetsCozinhaLets();

  return (
    <div className="flex flex-col gap-md md:gap-lg flex-1">
      <section>
        <div>
          <h1>Conheça a Lets</h1>
          <Image
            src={letsCozinhaLets.imagem.url}
            alt="Foto da Lets"
            width={500}
            height={500}
          />
          <Markdown source={letsCozinhaLets.texto_completo} />
        </div>
      </section>
    </div>
  );
}
