import Image from 'next/image';
import { getLetsCozinha } from 'src/cms/singleTypes';

export default async function Hero() {
  const { letsCozinha } = await getLetsCozinha();

  const titulo = letsCozinha.titulo || 'Lets Cozinha';

  const descricao = letsCozinha.descricao;

  return (
    <div className="relative flex flex-col justify-center items-center min-h-[250px] lg:h-[350px]">
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
        <div className="relative z-10">
          <h1 className="text-5xl md:text-8xl text-center mb-lg">{titulo}</h1>
          <p className="text-text-light text-lg md:text-2xl text-center leading-snug">
            {descricao}
          </p>
        </div>
      </div>
    </div>
  );
}
