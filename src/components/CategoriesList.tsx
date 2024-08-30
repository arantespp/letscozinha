import { getAllCategories } from 'src/cms/categories';
import { CategoryTag } from 'src/components/CategoryTag';

export async function CategoriesList({
  direction = 'column',
}: {
  direction?: 'row' | 'column';
}) {
  const { allCategories } = await getAllCategories();

  const className = (() => {
    if (direction === 'column') {
      return 'flex flex-col gap-[14px]';
    }

    return 'flex flex-row flex-wrap gap-lg';
  })();

  return (
    <div className={className}>
      {allCategories.map((category) => (
        <div key={category.id}>
          <CategoryTag {...category} />
        </div>
      ))}
    </div>
  );
}
