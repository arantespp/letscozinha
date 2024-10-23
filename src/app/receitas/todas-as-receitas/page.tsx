import { getAllRecipes } from 'src/cms/recipes';
import Link from 'next/link';

export const revalidate = 0;

export default async function TodasAsReceitas() {
  const { allRecipes } = await getAllRecipes();

  const sortedRecipes = allRecipes.sort((a, b) => {
    if (a.nome < b.nome) {
      return -1;
    }
    if (a.nome > b.nome) {
      return 1;
    }
    return 0;
  });

  return (
    <div>
      <h1>Todas as receitas</h1>
      <p className="text-text-light">
        Número total de receitas: <strong>{sortedRecipes.length}</strong>
      </p>
      <ul>
        {sortedRecipes.map((recipe) => {
          return (
            <li key={recipe.id}>
              <Link href={`/receitas/${recipe.slug}`}>{recipe.nome}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
