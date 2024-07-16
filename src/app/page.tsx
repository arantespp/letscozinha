import { RecipesList } from 'src/components/RecipesList';
import { CategoriesList } from 'src/components/CategoriesList';
import { getRecipes } from 'src/cms/getRecipes';

export default async function Home() {
  const { recipes } = await getRecipes();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="self-center text-center">
        Lets Cozinha - O Seu Site de Culinária
      </h1>
      <div>
        <CategoriesList />
      </div>
      <div>
        <h2>Receitas Favoritas</h2>
        <RecipesList recipes={recipes} />
      </div>
    </div>
  );
}
