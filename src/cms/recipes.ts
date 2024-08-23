import { CMS_TOKEN, CMS_URL, API_MAX_LIMIT } from './config';
import type {
  CMSData,
  CMSDataArrayResponse,
  CMSImages,
  CMSMeta,
} from './types';
import { cache } from 'react';
import qs from 'qs';
import { mapCMSData } from './mapCMSData';
import { MeiliSearch } from 'meilisearch';

export const RECIPES_PAGE_SIZE = 15;

export const RECIPES_POPULATE = ['categorias', 'imagens', 'instagram_posts'];

type RecipeAttributes = {
  nome: string;
  descricao: string;
  slug: string;
  receita: string;
  updatedAt: string;
  meta_descricao: string;
  keywords: string;
  imagens?: CMSImages;
  instagram_posts?: {
    url: string;
  }[];
  categorias?: {
    data: CMSData<{
      id: number;
      nome: string;
      slug: string;
    }>[];
  };
};

export type CMSRecipesResponse = CMSDataArrayResponse<RecipeAttributes>;

const fetchRecipes = async (query?: string) => {
  const response = await fetch(
    `${CMS_URL}/api/lets-cozinha-receitas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json() as Promise<CMSRecipesResponse>);

  return response;
};

export const mapRecipe = (data: CMSRecipesResponse['data'][0]) => {
  const imagens = data.attributes.imagens?.data?.map(mapCMSData);
  const categorias = data.attributes.categorias?.data?.map(mapCMSData);
  return { ...mapCMSData(data), imagens, categorias };
};

export type Recipe = ReturnType<typeof mapRecipe>;

export const getAllRecipes = cache(async () => {
  const allData = [];
  let page = 1;

  while (true) {
    const query = qs.stringify({
      pagination: {
        page,
        pageSize: API_MAX_LIMIT,
      },
      populate: RECIPES_POPULATE,
      sort: ['updatedAt:desc'],
    });

    const { data, meta } = await fetchRecipes(query);

    allData.push(...data);

    if (meta?.pagination.pageCount === page) {
      break;
    }

    page++;
  }

  const allRecipes = allData.map(mapRecipe);

  return { allRecipes };
});

export const findRecipe = async ({
  id,
  slug,
}: {
  id?: number;
  slug?: string;
}) => {
  const { allRecipes } = await getAllRecipes();
  return allRecipes.find((recipe) => recipe.id === id || recipe.slug === slug);
};

type FilterRecipes = {
  categoryId?: number;
};

/**
 * Because we are using a cache, we can use `getAllRecipes` to paginate the
 * recipes without making additional requests to the CMS.
 */
export const getRecipes = async ({
  filter,
  page = '1',
}: {
  filter?: FilterRecipes;
  page?: string;
}) => {
  const { allRecipes } = await getAllRecipes();

  const recipes = (() => {
    if (!filter) {
      return allRecipes;
    }

    if (filter.categoryId) {
      return allRecipes.filter((recipe) =>
        recipe.categorias?.some((category) => category.id === filter.categoryId)
      );
    }

    return [];
  })();

  const pageSize = RECIPES_PAGE_SIZE;

  const meta: CMSMeta = {
    pagination: {
      page: parseInt(page, 10),
      pageSize,
      pageCount: Math.ceil(recipes.length / pageSize),
      total: recipes.length,
    },
  };

  const start = (parseInt(page, 10) - 1) * pageSize;

  const end = start + pageSize;

  return { recipes: recipes.slice(start, end), meta };
};

const meiliClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || '',
  apiKey: process.env.MEILISEARCH_API_KEY || '',
});

type MeiliRecipe = {
  id: number;
} & RecipeAttributes;

const meiliRecipesIndex = meiliClient.index<MeiliRecipe>(
  process.env.MEILISEARCH_INDEX || ''
);

const getRecipesFromMeiliHits = async (hits: MeiliRecipe[]) => {
  return hits as Recipe[];
};

export const searchRecipes = async ({ search }: { search: string }) => {
  const searchResults = await meiliRecipesIndex.search(search, {
    limit: RECIPES_PAGE_SIZE,
  });

  const recipes = await getRecipesFromMeiliHits(searchResults.hits);

  const meta: CMSMeta = {
    pagination: {
      page: 1,
      pageSize: RECIPES_PAGE_SIZE,
      pageCount: 1,
      total: recipes.length,
    },
  };

  return { recipes, meta };
};

export const searchSimilarRecipes = cache(
  async ({ recipeId }: { recipeId: number }) => {
    try {
      const id = `${process.env.MEILISEARCH_INDEX}-${recipeId}`;

      const searchResults = await meiliRecipesIndex.searchSimilarDocuments({
        id,
        limit: 3,
      });

      const recipes = await getRecipesFromMeiliHits(searchResults.hits);

      return recipes;
    } catch {
      return [];
    }
  }
);
