import { MetadataRoute } from 'next';
import { BASE_URL } from 'src/constants';
import { getRecipes } from 'src/cms/getRecipes';
import { getCategories } from 'src/cms/getCategories';
import qs from 'qs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const query = qs.stringify(
    {
      fields: ['slug', 'updatedAt'],
      pagination: {
        pageSize: 9999,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { recipes } = await getRecipes({ query });

  const recipesSitemap = recipes.map((recipe) => ({
    url: `${BASE_URL}/receitas/${recipe.slug}`,
    lastModified: recipe.updatedAt,
  }));

  const { categories } = await getCategories({ query });

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
    ...categoriesSitemap.sort(sortByUrl),
    ...recipesSitemap.sort(sortByUrl),
  ];
}
