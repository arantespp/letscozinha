import { getAllSimplifiedRecipes } from 'src/cms/recipes';
import Link from 'next/link';

export default async function TodasAsReceitas() {
  const { data } = await getAllSimplifiedRecipes();

  const sortedRecipes = data.sort((a, b) => {
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
            <li key={recipe.documentId}>
              <Link href={`/receitas/${recipe.slug}`}>{recipe.nome}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
