import Link from 'next/link';

export function CategoryTag({ nome, slug }: { nome: string; slug: string }) {
  return (
    <div className="w-fit	bg-gray-200 text-text-dark hover:text-neutral rounded hover:bg-secondary no-underline px-sm">
      <Link
        href={`/categorias/${slug}`}
        className="hover:text-neutral no-underline"
      >
        {nome}
      </Link>
    </div>
  );
}
