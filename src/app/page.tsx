import { RecipesList } from 'src/components/RecipesList';
import { getAllCategories } from 'src/cms/categories';
import Link from 'next/link';
import { getLetsCozinha } from 'src/cms/getLetsCozinha';

const Categories = async () => {
  const { allCategories } = await getAllCategories();

  return (
    <aside className="flex flex-col rounded p-md bg-[#F5F5F5]">
      <h2 className="text-2xl">Categorias</h2>
      <div className="flex flex-col gap-xs">
        {allCategories.map((category) => (
          <div key={category.id}>
            <Link href={`/categorias/${category.slug}`}>{category.nome}</Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default async function Home() {
  const { letsCozinha } = await getLetsCozinha();

  return (
    <div className="flex flex-col-reverse md:flex-row gap-lg">
      <Categories />
      <div className="flex flex-col gap-md flex-1">
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
            <RecipesList recipes={letsCozinha.receitas_favoritas} />
          </div>
        </section>
      </div>
    </div>
  );
}
