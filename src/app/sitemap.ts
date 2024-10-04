import { BASE_URL } from 'src/constants';
import { MetadataRoute } from 'next';
import { getAllCategories } from 'src/cms/categories';
import { getAllRecipes } from 'src/cms/recipes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { allRecipes } = await getAllRecipes();

  const recipesSitemap = allRecipes.map((recipe) => ({
    url: `${BASE_URL}/receitas/${recipe.slug}`,
    lastModified: recipe.updatedAt,
  }));

  const { allCategories } = await getAllCategories();

  const categoriesSitemap = allCategories.map((category) => ({
    url: `${BASE_URL}/categorias/${category.slug}`,
    lastModified: category.updatedAt,
  }));

  const lastModified = [...recipesSitemap, ...categoriesSitemap].reduce(
    (acc, d) => {
      if (!acc) {
        return d.lastModified;
      }

      if (d.lastModified > acc) {
        return d.lastModified;
      }

      return acc;
    },
    ''
  );

  const sortByUrl = (a: { url: string }, b: { url: string }) =>
    a.url.localeCompare(b.url);

  return [
    {
      url: BASE_URL,
      lastModified,
    },
    {
      url: `${BASE_URL}/conheca-a-lets`,
      lastModified,
    },
    {
      url: `${BASE_URL}/categorias`,
      lastModified,
    },
    ...categoriesSitemap.sort(sortByUrl),
    {
      url: `${BASE_URL}/receitas`,
      lastModified,
    },
    ...recipesSitemap.sort(sortByUrl),
  ];
}
