import * as React from 'react';
import { CategoriesList } from './CategoriesList';
import { getLetsCozinhaLets, getLetsCozinha } from 'src/cms/singleTypes';
import Image from 'next/image';
import Link from 'next/link';

async function ShowFeaturedEbook() {
  const { letsCozinha } = await getLetsCozinha();

  if (
    !letsCozinha.ebooks_favoritos ||
    letsCozinha.ebooks_favoritos.length === 0
  ) {
    return null;
  }

  const featuredEbook = letsCozinha.ebooks_favoritos[0];

  const href = `/ebooks/${featuredEbook.slug}`;

  return (
    <div className="flex flex-col gap-sm items-center">
      <Link href={href}>
        <div className="w-full">
          <Image
            className="w-full h-auto"
            src={featuredEbook.imagem.url}
            alt={featuredEbook.titulo}
            width={300}
            height={400}
          />
        </div>
      </Link>
      <Link href={href}>
        <span className="font-heading text-xl">{featuredEbook.titulo}</span>
      </Link>
      <span className="italic text-center whitespace-pre-line leading-normal">
        {featuredEbook.meta_descricao}
      </span>
    </div>
  );
}

async function WhoIsLets() {
  const { letsCozinhaLets } = await getLetsCozinhaLets();

  const summary = `"${letsCozinhaLets.resumo}"`;

  return (
    <div className="flex flex-col gap-sm items-center">
      <Link href="/conheca-a-lets">
        <div className="size-image-sm relative">
          <Image
            className="size-image-sm rounded-full"
            src={letsCozinhaLets.imagem.url}
            alt="Foto da Lets"
            fill
          />
        </div>
      </Link>
      <Link href="/conheca-a-lets">
        <span className="font-heading text-xl">Conheça a Lets</span>
      </Link>
      <span className="italic text-center whitespace-pre-line leading-normal">
        {summary}
      </span>
    </div>
  );
}

export async function LayoutAside() {
  return (
    <aside className="w-full md:w-72 flex flex-col rounded p-md mt-xl md:mt-md bg-muted">
      <React.Suspense fallback={null}>
        <ShowFeaturedEbook />
      </React.Suspense>
      <hr className="my-md"></hr>
      <React.Suspense fallback={null}>
        <WhoIsLets />
      </React.Suspense>
      <hr className="my-md"></hr>
      <React.Suspense fallback={null}>
        <CategoriesList />
      </React.Suspense>
    </aside>
  );
}
