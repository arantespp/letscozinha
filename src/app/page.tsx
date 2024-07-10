import { Search } from 'src/components/Search';
import { RecipesList } from 'src/components/RecipesList';
import { CategoriesList } from 'src/components/CategoriesList';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Search />
      </div>
      <div>
        <hr />
        <CategoriesList />
        <hr />
      </div>
      <div>
        <h2>Receitas</h2>
        <RecipesList search={searchParams?.search} />
      </div>
    </div>
  );
}
