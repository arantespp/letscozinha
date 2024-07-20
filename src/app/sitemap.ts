import { MetadataRoute } from 'next';
import { BASE_URL } from 'src/constants';
import { getAllRecipes } from 'src/cms/getRecipes';
import { getAllCategories } from 'src/cms/getCategories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { recipes } = await getAllRecipes();

  const recipesSitemap = recipes.map((recipe) => ({
    url: `${BASE_URL}/receitas/${recipe.slug}`,
    lastModified: recipe.updatedAt,
  }));

  const { categories } = await getAllCategories();

  const categoriesSitemap = categories.map((category) => ({
    url: `${BASE_URL}/categorias/${category.slug}`,
    lastModified: category.updatedAt,
  }));

  const lastModified = [...recipes, ...categories].reduce((acc, d) => {
    if (!acc) {
      return d.updatedAt;
    }

    if (d.updatedAt > acc) {
      return d.updatedAt;
    }

    return acc;
  }, '');

  const sortByUrl = (a: { url: string }, b: { url: string }) =>
    a.url.localeCompare(b.url);

  return [
    {
      url: BASE_URL,
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
