import { Pagination } from './Pagination';
import RecipeCard from './RecipeCard';
import type { Recipe } from 'src/cms/recipes';

type RecipesListProps = {
  firstRecipePriority?: boolean;
  recipes: Recipe[];
  pagination?: {
    pageCount: number;
  };
};

export async function RecipesList(props: RecipesListProps) {
  return (
    <section className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-md my-md">
        {props.recipes.map((recipe: Recipe, index) => {
          const priority = index === 0 && props.firstRecipePriority;
          return (
            <RecipeCard priority={priority} key={recipe.id} recipe={recipe} />
          );
        })}
      </div>
      <div className="my-md">
        {props.pagination && <Pagination pagination={props.pagination} />}
      </div>
    </section>
  );
}
