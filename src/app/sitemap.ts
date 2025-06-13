import { BASE_URL } from 'src/constants';
import { MetadataRoute } from 'next';
import { getAllCategories } from 'src/cms/categories';
import { getAllSimplifiedRecipes } from 'src/cms/recipes';
import { getAllEbooks } from 'src/cms/ebooks';
import { getUrl } from 'src/methods/getUrl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { allSimplifiedRecipes } = await getAllSimplifiedRecipes();

  const recipesSitemap = allSimplifiedRecipes.map((recipe) => ({
    url: `${BASE_URL}/receitas/${recipe.slug}`,
    lastModified: recipe.updatedAt,
  }));

  const { allCategories } = await getAllCategories();

  const categoriesSitemap = allCategories.map((category) => ({
    url: `${BASE_URL}/categorias/${category.slug}`,
    lastModified: category.updatedAt,
  }));

  const { allEbooks } = await getAllEbooks();

  const ebooksSitemap = allEbooks.map((ebook) => ({
    url: `${BASE_URL}/ebooks/${ebook.slug}`,
    lastModified: ebook.updatedAt,
  }));

  const lastModified = [
    ...recipesSitemap,
    ...categoriesSitemap,
    ...ebooksSitemap,
  ].reduce((acc, d) => {
    if (!acc) {
      return d.lastModified;
    }

    if (d.lastModified > acc) {
      return d.lastModified;
    }

    return acc;
  }, '');

  const sortByUrl = (a: { url: string }, b: { url: string }) =>
    a.url.localeCompare(b.url);

  const pages = [
    '/conheca-a-lets',
    '/contato',
    '/receitas/todas-as-receitas',
    '/politica-de-privacidade',
    '/termos-de-uso',
    '/categorias',
    '/receitas',
    '/ebooks',
  ];

  return [
    {
      url: BASE_URL,
      lastModified,
    },
    ...pages.map((page) => ({
      url: getUrl(page),
      lastModified,
    })),
    ...categoriesSitemap.sort(sortByUrl),
    ...recipesSitemap.sort(sortByUrl),
    ...ebooksSitemap.sort(sortByUrl),
  ];
}
