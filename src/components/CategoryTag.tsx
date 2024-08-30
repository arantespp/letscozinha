import Link from 'next/link';

export function CategoryTag({
  nome,
  slug,
  isSmall,
}: {
  nome: string;
  slug: string;
  isSmall?: boolean;
}) {
  const fontSize = isSmall ? 'text-sm' : 'text-base';

  return (
    <div className="w-fit	bg-gray-200 text-text-dark hover:text-neutral rounded hover:bg-primary no-underline px-sm">
      <Link
        href={`/categorias/${slug}`}
        className={`hover:text-neutral no-underline ${fontSize}`}
      >
        {nome}
      </Link>
    </div>
  );
}
