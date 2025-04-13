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
  const className = isSmall
    ? 'text-xs px-2 py-0.5'
    : 'text-sm px-3 py-1';

  return (
    <Link
      href={`/categorias/${slug}`}
      className="no-underline"
    >
      <span
        className={`inline-block bg-gray-100 text-text-dark rounded-full hover:bg-primary hover:text-text-dark transition-colors font-medium ${className}`}
      >
        {nome}
      </span>
    </Link>
  );
}
