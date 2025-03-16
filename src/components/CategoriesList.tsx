import { CategoryTag } from 'src/components/CategoryTag';
import { getAllCategories, type Category } from 'src/cms/categories';
import { getRecipes } from 'src/cms/recipes';

export async function CategoriesList({
  direction = 'column',
}: {
  direction?: 'row' | 'column';
}) {
  const { allCategories } = await getAllCategories();

  const allCategoriesThatHaveRecipes = (
    await Promise.all(
      allCategories.map(async (category) => {
        const { data: recipes } = await getRecipes({
          categoryDocumentId: category.documentId,
          pagination: {
            page: 1,
          },
        });

        if (recipes.length > 0) {
          return category;
        }

        return null;
      })
    )
  ).filter((category): category is Category => {
    return !!category;
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
        <div key={category.documentId}>
          <CategoryTag {...category} />
        </div>
      ))}
    </div>
  );
}
