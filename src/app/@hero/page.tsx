import { SearchIcon } from 'src/icons/icons';
import { getLetsCozinha } from 'src/cms/singleTypes';
import Image from 'next/image';
import Link from 'next/link';

export default async function Hero() {
  const { letsCozinha } = await getLetsCozinha();

  const titulo = letsCozinha.titulo || 'Lets Cozinha';

  const descricao = letsCozinha.descricao;

  return (
    <div className="relative flex flex-col justify-center min-h-[320px] lg:h-[400px]">
      {/* <Image
        src={}
        alt="Foto da Lets"
        fill={true}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      /> */}
      <div className="container relative p-sm md:p-md">
        <div className="absolute inset-0 md:inset-0 bg-white opacity-85 z-0 rounded"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl text-center mb-lg">{titulo}</h1>
          <p className="text-text-light text-lg md:text-2xl text-center leading-snug">
            {descricao}
          </p>
          <Link
            href="/receitas"
            className="no-underline text-xl md:text-2xl mt-lg lg:mt-xl rounded px-md py-sm bg-muted text-text-dark hover:bg-primary hover:text-text-dark"
          >
            <span className="mr-sm">Buscar Receitas</span>
            <SearchIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
