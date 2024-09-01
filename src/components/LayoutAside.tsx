import Image from 'next/image';
import { getLetsCozinhaLets } from 'src/cms/singleTypes';
import * as React from 'react';
import { CategoriesList } from './CategoriesList';
import Link from 'next/link';

async function WhoIsLets() {
  const { letsCozinhaLets } = await getLetsCozinhaLets();

  const summary = `"${letsCozinhaLets.resumo}"`;

  return (
    <div className="flex flex-col gap-sm items-center">
      <div className="size-image-sm relative">
        <Image
          className="size-image-sm rounded-full"
          src={letsCozinhaLets.imagem.url}
          alt="Foto da Lets"
          fill
        />
      </div>
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
        <WhoIsLets />
      </React.Suspense>
      <hr className="my-md"></hr>
      <React.Suspense fallback={null}>
        <CategoriesList />
      </React.Suspense>
    </aside>
  );
}
