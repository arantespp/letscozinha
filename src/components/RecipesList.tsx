import { Pagination } from './Pagination';
import RecipeCard from './RecipeCard';
import type { Recipe } from 'src/cms/recipes';

type RecipesListProps = {
  recipes: Recipe[];
  pagination?: {
    pageCount: number;
  };
};

export async function RecipesList(props: RecipesListProps) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {props.recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div className="my-md">
        {props.pagination && <Pagination pagination={props.pagination} />}
      </div>
    </section>
  );
}
