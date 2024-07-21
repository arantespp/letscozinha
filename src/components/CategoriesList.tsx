import { getCategories } from 'src/cms/getCategories';
import Link from 'next/link';
import qs from 'qs';

export async function CategoriesList() {
  const query = qs.stringify({
    sort: ['nome'],
  });

  const { categories } = await getCategories({ query });

  return (
    <div className="flex flex-col">
      {categories.map((category) => (
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
