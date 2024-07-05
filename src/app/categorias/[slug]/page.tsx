import { getCategories } from 'src/cms/getCategories';
import { getCategory } from 'src/cms/getCategory';
import Link from 'next/link';
import { RecipesList } from 'src/components/RecipesList';
import qs from 'qs';

export async function generateStaticParams() {
  const { data } = await getCategories();

  return data.map((category) => ({
    slug: category.attributes.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const category = await getCategory({ slug: params.slug });

  const recipesQuery = qs.stringify(
    {
      filters: {
        categorias: {
          id: {
            $eq: category.id,
          },
        },
      },
      populate: ['categorias'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  return (
    <div className="flex flex-col gap-3">
      <Link href="/" className="underline">
        Home
      </Link>
      <h1>Categoria - {category.attributes.nome}</h1>
      <RecipesList query={recipesQuery} />
    </div>
  );
}
