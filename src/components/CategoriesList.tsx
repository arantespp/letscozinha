import { getAllCategories } from 'src/cms/categories';
import Link from 'next/link';

export async function CategoriesList() {
  const { allCategories } = await getAllCategories();

  return (
    <div className="flex flex-col">
      {allCategories.map((category) => (
        <Link
          key={category.id}
          href={`/categorias/${category.slug}`}
          className="mb-xs"
        >
          {category.nome}
        </Link>
      ))}
    </div>
  );
}
