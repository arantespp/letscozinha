import { CategoryTag } from 'src/components/CategoryTag';
import { getAllCategories, type Category } from 'src/cms/categories';
import { getRecipes } from 'src/cms/recipes';
import Link from 'next/link';
import Image from 'next/image';

export async function CategoriesList({
  direction = 'column',
  displayStyle = 'default',
  limit,
}: {
  direction?: 'row' | 'column';
  displayStyle?: 'default' | 'grid' | 'featured';
  limit?: number;
}) {
  const { allCategories } = await getAllCategories();

  const allCategoriesThatHaveRecipes = (
    await Promise.all(
      allCategories.map(async (category) => {
        const { data: recipes, meta } = await getRecipes({
          categoryDocumentId: category.documentId,
          pagination: {
            page: 1,
          },
        });

        if (recipes.length > 0) {
          return {
            ...category,
            recipeCount: meta?.pagination.total || recipes.length,
          };
        }

        return null;
      })
    )
  ).filter((category): category is Category & { recipeCount: number } => {
    return !!category;
  });

  if (displayStyle === 'grid') {
    const categoriesToShow = limit
      ? allCategoriesThatHaveRecipes.slice(0, limit)
      : allCategoriesThatHaveRecipes;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
        {categoriesToShow.map((category) => (
          <Link
            key={category.documentId}
            href={`/categorias/${category.slug}`}
            className="group no-underline flex flex-col items-center text-center bg-muted hover:bg-primary/10 rounded-lg p-md transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="w-16 h-16 mb-sm rounded-full bg-primary/20 flex items-center justify-center text-2xl font-heading">
              {category.nome.charAt(0)}
            </div>
            <h3 className="text-lg font-heading mb-xs">{category.nome}</h3>
            <p className="text-text-light text-sm mb-0">
              {category.recipeCount} receitas
            </p>
          </Link>
        ))}
      </div>
    );
  }

  if (displayStyle === 'featured') {
    const categoriesWithMoreRecipes = allCategoriesThatHaveRecipes.sort(
      (a, b) => b.recipeCount - a.recipeCount
    );

    const categoriesToShow = limit
      ? categoriesWithMoreRecipes.slice(0, limit)
      : categoriesWithMoreRecipes;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-lg">
        {categoriesToShow.map((category) => (
          <Link
            key={category.documentId}
            href={`/categorias/${category.slug}`}
            className="group no-underline block relative overflow-hidden rounded-lg aspect-[4/3] shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-text-dark/90 via-text-dark/40 to-transparent z-10"></div>

            {category.imagens?.[0] ? (
              <Image
                src={category.imagens[0].url}
                alt={category.nome}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/20"></div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-md z-20">
              <h3 className="text-xl font-heading text-neutral mb-xs">
                {category.nome}
              </h3>
              <div className="flex items-center">
                <span className="text-sm font-medium text-neutral/90">
                  {category.recipeCount} receitas
                </span>
                <span className="ml-auto text-primary group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // Default list style
  const className =
    direction === 'column'
      ? 'flex flex-col gap-[14px]'
      : 'flex flex-row flex-wrap gap-sm';

  const categoriesToShow = limit
    ? allCategoriesThatHaveRecipes.slice(0, limit)
    : allCategoriesThatHaveRecipes;

  return (
    <div className={className}>
      {categoriesToShow.map((category) => (
        <div key={category.documentId}>
          <CategoryTag {...category} />
        </div>
      ))}
    </div>
  );
}
