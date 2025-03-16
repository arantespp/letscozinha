import { CMS_TOKEN, CMS_URL } from './config';
import { MeiliSearch } from 'meilisearch';
import { unstable_cache } from 'next/cache';
import qs from 'qs';
import type {
  CMSDataArrayResponse,
  CMSImages,
  CMSMeta,
  CMSData,
} from './types';

export const RECIPES_PAGE_SIZE = 15;

export const RECIPES_POPULATE = ['categorias', 'imagens', 'instagram_posts'];

export type RecipeAttributes = {
  nome: string;
  descricao: string;
  slug: string;
  receita: string;
  createdAt: string;
  updatedAt: string;
  meta_descricao: string;
  keywords: string;
  imagens?: CMSImages;
  instagram_posts?: {
    url: string;
  }[];
  categorias?: {
    documentId: string;
    nome: string;
    slug: string;
  }[];
};

export type CMSRecipesResponse = CMSDataArrayResponse<RecipeAttributes>;

export type Recipe = CMSData<RecipeAttributes>;

export const getRecipes = async (args: {
  documentIds?: string[];
  slugs?: string[];
  categoryDocumentId?: string;
  pagination?: {
    page?: number | string;
    pageSize?: number;
  };
}) => {
  const url = (() => {
    let filters: any | undefined;

    if (args.documentIds) {
      filters = {
        documentId: {
          $in: args.documentIds,
        },
      };
    }

    if (args.slugs) {
      filters = {
        slug: {
          $in: args.slugs,
        },
      };
    }

    if (args.categoryDocumentId) {
      filters = {
        categorias: {
          documentId: {
            $eq: args.categoryDocumentId,
          },
        },
      };
    }

    return `${CMS_URL}/api/lets-cozinha-receitas?${qs.stringify({
      pagination: {
        page: args.pagination?.page || 1,
        pageSize: args.pagination?.pageSize || RECIPES_PAGE_SIZE,
      },
      filters,
      populate: RECIPES_POPULATE,
    })}`;
  })();

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
    cache: 'force-cache',
  }).then((res) => res.json() as Promise<CMSRecipesResponse>);

  return response;
};

export const getRecipe = async (
  args: { documentId: string } | { slug: string }
) => {
  if ('documentId' in args) {
    const response = getRecipes({ documentIds: [args.documentId] });
    return (await response).data[0];
  }

  const response = getRecipes({ slugs: [args.slug] });
  return (await response).data[0];
};

export const getRecipesWithPagination = async ({
  page = 1,
  pageSize = RECIPES_PAGE_SIZE,
}: {
  page?: number | string;
  pageSize?: number;
}) => {
  const query = qs.stringify({
    pagination: {
      page,
      pageSize,
    },
    populate: RECIPES_POPULATE,
    sort: ['updatedAt:desc'],
  });

  const response = await fetch(
    `${CMS_URL}/api/lets-cozinha-receitas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
      cache: 'force-cache',
    }
  ).then((res) => res.json() as Promise<CMSRecipesResponse>);

  return response;
};

export const getAllSimplifiedRecipes = async () => {
  const query = qs.stringify({
    pagination: {
      page: 1,
      pageSize: 1000,
    },
    fields: ['nome', 'slug'],
    sort: ['updatedAt:desc'],
  });

  const response = await fetch(
    `${CMS_URL}/api/lets-cozinha-receitas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
      cache: 'force-cache',
    }
  ).then(
    (res) =>
      res.json() as Promise<{
        data: Array<Pick<Recipe, 'documentId' | 'nome' | 'slug'>>;
      }>
  );

  return {
    allSimplifiedRecipes: response.data,
  };
};

const meiliClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || '',
  apiKey: process.env.MEILISEARCH_API_KEY || '',
});

type MeiliRecipe = {
  documentId: string;
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

  const data = await getRecipesFromMeiliHits(searchResults.hits);

  const meta: CMSMeta = {
    pagination: {
      page: 1,
      pageSize: RECIPES_PAGE_SIZE,
      pageCount: 1,
      total: data.length,
    },
  };

  return { data, meta };
};

export const searchSimilarRecipes = unstable_cache(
  async ({ recipeDocumentId }: { recipeDocumentId: string }) => {
    try {
      const id = `${process.env.MEILISEARCH_INDEX}-${recipeDocumentId}`;

      const searchResults = await meiliRecipesIndex.searchSimilarDocuments({
        id,
        limit: 3,
        embedder: 'default',
      });

      // console.log(searchResults);

      const recipes = await getRecipesFromMeiliHits(searchResults.hits);

      return recipes;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  ['searchSimilarRecipes'],
  {
    revalidate: 60 * 60 * 24, // 24 hours
  }
);
