import { CategoryTag } from 'src/components/CategoryTag';
import { getAllCategories } from 'src/cms/categories';
import { getAllRecipes } from 'src/cms/recipes';

export async function CategoriesList({
  direction = 'column',
}: {
  direction?: 'row' | 'column';
}) {
  const { allCategories } = await getAllCategories();
  const { allRecipes } = await getAllRecipes();

  const allCategoriesThatHaveRecipes = allCategories.filter((category) => {
    return allRecipes.some((recipe) =>
      recipe.categorias?.map((categoria) => categoria.id).includes(category.id)
    );
  });

  const className = (() => {
    if (direction === 'column') {
      return 'flex flex-col gap-[14px]';
    }

    return 'flex flex-row flex-wrap gap-lg';
  })();

  return (
    <div className={className}>
      {allCategoriesThatHaveRecipes.map((category) => (
        <div key={category.id}>
          <CategoryTag {...category} />
        </div>
      ))}
    </div>
  );
}
