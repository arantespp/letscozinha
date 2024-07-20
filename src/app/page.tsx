import { RecipesList } from 'src/components/RecipesList';
import { getRecipes } from 'src/cms/getRecipes';
import { getCategories } from 'src/cms/getCategories';
import Link from 'next/link';
import qs from 'qs';

const Categories = async () => {
  const query = qs.stringify({
    pagination: {
      pageSize: 100,
    },
    sort: ['nome'],
  });

  const { categories } = await getCategories({ query });

  return (
    <aside className="flex flex-col gap-1 p-6 rounded-md bg-[#F5F5F5]">
      <h2 className="text-2xl">Categorias</h2>
      {categories.map((category) => (
        <div key={category.id}>
          <Link href={`/categorias/${category.slug}`}>{category.nome}</Link>
        </div>
      ))}
    </aside>
  );
};

export default async function Home() {
  const { recipes } = await getRecipes();

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8">
      <Categories />
      <div className="flex flex-col md:gap-4 flex-1">
        <section>
          <h1 className="">Lets Cozinha</h1>
          <p className="text-text-light">
            Seja bem-vindo ao Lets Cozinha, um site de receitas para você se
            inspirar e cozinhar.
          </p>
        </section>
        <section>
          <div>
            <h2>Receitas Favoritas</h2>
            <RecipesList recipes={recipes} />
          </div>
        </section>
      </div>
    </div>
  );
}
