import { MetadataRoute } from 'next';
import { BASE_URL } from 'src/constants';
import { getRecipes } from 'src/cms/getRecipes';
import { getCategories } from 'src/cms/getCategories';
import qs from 'qs';

async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

/**
 * https://github.com/vercel/next.js/discussions/50419#discussioncomment-6189168
 */
export async function GET(): Promise<Response> {
  const headers = new Headers();

  headers.set('Content-Type', 'application/xml');

  const sitemapAsJson = await sitemap();

  const sitemapAsXml = sitemapAsJson
    .map(
      (entry) => `
      <url>
        <loc>${entry.url}</loc>
        <lastmod>${entry.lastModified}</lastmod>
      </url>
    `
    )
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapAsXml}
      </urlset>
    `,
    {
      headers,
    }
  );
}
