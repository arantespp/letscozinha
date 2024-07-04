import { getCategories } from 'src/cms/getCategories';
import Link from 'next/link';
import qs from 'qs';

export async function CategoriesList() {
  const query = qs.stringify({
    sort: ['nome'],
  });

  const { data } = await getCategories(query);

  return (
    <div className="flex gap-4 flex-wrap">
      {data.map((category) => (
        <Link
          key={category.id}
          href={`/categorias/${category.attributes.slug}`}
        >
          {category.attributes.nome}
        </Link>
      ))}
    </div>
  );
}
