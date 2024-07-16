import { getCategories } from 'src/cms/getCategories';
import Link from 'next/link';
import qs from 'qs';

export async function CategoriesList() {
  const query = qs.stringify({
    sort: ['nome'],
  });

  const { categories } = await getCategories({ query });

  return (
    <div className="flex justify-center flex-wrap">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categorias/${category.slug}`}
          className="mx-2 my-1"
        >
          {category.nome}
        </Link>
      ))}
    </div>
  );
}
