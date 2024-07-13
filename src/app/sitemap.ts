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

  const recipes = await getRecipes(query);

  const recipesSitemap = recipes.data.map((recipe) => ({
    url: `${BASE_URL}/receitas/${recipe.attributes.slug}`,
    lastModified: recipe.attributes.updatedAt,
  }));

  const categories = await getCategories(query);

  const categoriesSitemap = categories.data.map((category) => ({
    url: `${BASE_URL}/categorias/${category.attributes.slug}`,
    lastModified: category.attributes.updatedAt,
  }));

  const lastModified = [...recipes.data, ...categories.data].reduce(
    (acc, d) => {
      if (!acc) {
        return d.attributes.updatedAt;
      }

      if (d.attributes.updatedAt > acc) {
        return d.attributes.updatedAt;
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
    ...categoriesSitemap.sort(sortByUrl),
    ...recipesSitemap.sort(sortByUrl),
  ];
}
