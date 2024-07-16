import { CMS_TOKEN, CMS_URL, RECIPES_PAGE_SIZE } from './config';
import { MeiliSearch } from 'meilisearch';
import qs from 'qs';

const meiliClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || '',
  apiKey: process.env.MEILISEARCH_API_KEY || '',
});

type CMSResponse = {
  data: {
    id: number;
    attributes: {
      nome: string;
      slug: string;
      receita: string;
      updatedAt: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

const fetchRecipes = async (query?: string) => {
  const response: CMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha-receitas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  return response;
};

type MeiliRecipe = {
  id: number;
} & CMSResponse['data'][number]['attributes'];

export const getRecipes = async ({
  search,
  query,
  page = '1',
}: {
  query?: string;
  search?: string;
  page?: string;
} = {}) => {
  if (search) {
    const index = meiliClient.index<MeiliRecipe>(
      process.env.MEILISEARCH_INDEX || ''
    );
    const recipes = await index.search(search);
    return { recipes: recipes.hits };
  }

  const recipesQuery = qs.stringify({
    pagination: {
      page,
      pageSize: RECIPES_PAGE_SIZE,
    },
    sort: ['nome:asc'],
  });

  const { data = [], meta } = await fetchRecipes(query || recipesQuery);

  return {
    recipes: data.map((recipe) => ({
      id: recipe.id,
      ...recipe.attributes,
    })),
    meta,
  };
};
