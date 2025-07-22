import { ItemList } from 'schema-dts';
import { JsonLd } from './JsonLd';
import { Pagination } from './Pagination';
import { getRecipesListSchema } from 'src/methods/getRecipesListSchema';
import RecipeCard from './RecipeCard';
import type { Recipe } from 'src/cms/recipes';

type RecipesListProps = {
  addCarouselSchema?: boolean;
  firstRecipePriority?: boolean;
  recipes: Recipe[];
  pagination?: {
    pageCount: number;
  };
  /** Variant of the recipe cards */
  variant?: 'default' | 'compact';
};

export async function RecipesList(props: RecipesListProps) {
  /**
   * https://developers.google.com/search/docs/appearance/structured-data/carousel
   */
  const recipesCarouselSchema: ItemList = await getRecipesListSchema(
    props.recipes
  );

  const isCompact = props.variant === 'compact';

  // Grid classes based on variant
  const gridClasses = isCompact
    ? 'grid grid-cols-2 md:grid-cols-3 gap-sm md:gap-sm lg:gap-md'
    : 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-md';

  return (
    <section className="">
      {props.addCarouselSchema && <JsonLd schema={recipesCarouselSchema} />}
      <div className={gridClasses}>
        {props.recipes.map((recipe: Recipe, index) => {
          const priority = index === 0 && props.firstRecipePriority;
          return (
            <RecipeCard
              priority={priority}
              key={recipe.id}
              recipe={recipe}
              variant={props.variant}
            />
          );
        })}
      </div>
      {props.pagination && (
        <div className="mt-lg">
          <Pagination pagination={props.pagination} />
        </div>
      )}
    </section>
  );
}
