import { Search } from 'src/components/Search';
import { RecipesList } from 'src/components/RecipesList';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  return (
    <main className="">
      <div className="">
        <h1 className="">Lets Cozinha</h1>
      </div>
      <div>
        <Search />
      </div>
      <div>
        <h2>Receitas</h2>
        <RecipesList query={searchParams?.query} />
      </div>
    </main>
  );
}
