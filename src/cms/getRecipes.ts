import { CMS_TOKEN, CMS_URL, RECIPES_PAGE_SIZE, API_MAX_LIMIT } from './config';
import { MeiliSearch } from 'meilisearch';
import qs from 'qs';
import type { CMSResponse } from './types';

const meiliClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || '',
  apiKey: process.env.MEILISEARCH_API_KEY || '',
});

type Attributes = {
  nome: string;
  descricao: string;
  slug: string;
  receita: string;
  updatedAt: string;
  imagens: {
    url: string;
  }[];
};

type Response = CMSResponse<Attributes>;

export type Recipe = {
  id: number;
} & Attributes;

const fetchRecipes = async (query?: string) => {
  const response: Response = await fetch(
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
} & Attributes;

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

export const getAllRecipes = async () => {
  const recipes = [];
  let page = 1;

  while (true) {
    const query = qs.stringify({
      pagination: {
        page,
        pageSize: API_MAX_LIMIT,
      },
      sort: ['nome:asc'],
    });

    const { recipes: pageRecipes, meta } = await getRecipes({ query });

    recipes.push(...pageRecipes);

    if (meta?.pagination.pageCount === page) {
      break;
    }

    page++;
  }

  return { recipes };
};
