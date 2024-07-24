import { Pagination } from './Pagination';
import RecipeCard from './RecipeCard';
import type { Recipe } from 'src/cms/getRecipes';

type RecipesListProps = {
  recipes: Recipe[];
  pagination?: {
    pageCount: number;
  };
};

export async function RecipesList(props: RecipesListProps) {
  return (
    <div className="grid md:grid-cols-1 md:grid-cols-2 gap-md">
      {props.recipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      <div className="my-md">
        {props.pagination && <Pagination pagination={props.pagination} />}
      </div>
    </div>
  );
}
