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
      <h1 className="self-center">Lets Cozinha - O Seu Site de Culinária</h1>
      <div>
        <CategoriesList />
      </div>
      <div>
        <div className="pt-5 pb-7">
          <Search />
        </div>
        <h2>Receitas</h2>
        <RecipesList search={searchParams?.search} />
      </div>
    </div>
  );
}
