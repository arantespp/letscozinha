import type { GetServerSideProps } from 'next';
import { BASE_URL } from 'src/constants';
import { getAllCategories } from 'src/cms/categories';
import { getAllSimplifiedRecipes } from 'src/cms/recipes';
import { getAllEbooks } from 'src/cms/ebooks';
import { getUrl } from 'src/methods/getUrl';

function generateSiteMap(
  recipes: { url: string; lastModified: string }[],
  categories: { url: string; lastModified: string }[],
  ebooks: { url: string; lastModified: string }[],
  lastModified: string
) {
  const staticPages = [
    '/',
    '/conheca-a-lets',
    '/contato',
    '/receitas/todas-as-receitas',
    '/politica-de-privacidade',
    '/termos-de-uso',
    '/categorias',
    '/receitas',
    '/ebooks',
  ];

  const sortByUrl = (a: { url: string }, b: { url: string }) =>
    a.url.localeCompare(b.url);

  const allPages = [
    ...staticPages.map((p) => ({
      url: p === '/' ? BASE_URL : getUrl(p),
      lastModified,
    })),
    ...categories.sort(sortByUrl),
    ...recipes.sort(sortByUrl),
    ...ebooks.sort(sortByUrl),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [recipesResult, categoriesResult, ebooksResult] =
    await Promise.allSettled([
      getAllSimplifiedRecipes(),
      getAllCategories(),
      getAllEbooks(),
    ]);

  const recipes =
    recipesResult.status === 'fulfilled'
      ? recipesResult.value.allSimplifiedRecipes.map((r) => ({
          url: `${BASE_URL}/receitas/${r.slug}`,
          lastModified: r.updatedAt,
        }))
      : [];

  const categories =
    categoriesResult.status === 'fulfilled'
      ? categoriesResult.value.allCategories.map((c) => ({
          url: `${BASE_URL}/categorias/${c.slug}`,
          lastModified: c.updatedAt,
        }))
      : [];

  const ebooks =
    ebooksResult.status === 'fulfilled'
      ? ebooksResult.value.allEbooks.map((e) => ({
          url: `${BASE_URL}/ebooks/${e.slug}`,
          lastModified: e.updatedAt,
        }))
      : [];

  const allItems = [...recipes, ...categories, ...ebooks];
  const lastModified = allItems.reduce((acc, d) => {
    return d.lastModified > acc ? d.lastModified : acc;
  }, '');

  const sitemap = generateSiteMap(recipes, categories, ebooks, lastModified);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(sitemap);
  res.end();

  return { props: {} };
};
