import { API_MAX_LIMIT, CMS_TOKEN, CMS_URL } from './config';
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

export type SimplifiedRecipe = Pick<
  Recipe,
  'documentId' | 'nome' | 'slug' | 'updatedAt'
>;

export const getAllSimplifiedRecipes = async () => {
  let allSimplifiedRecipes: SimplifiedRecipe[] = [];
  let page = 1;
  let pageCount = 1;

  const fetchPage = async () => {
    const query = qs.stringify({
      pagination: {
        page,
        pageSize: API_MAX_LIMIT,
      },
      fields: ['nome', 'slug', 'updatedAt'],
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
      (res) => res.json() as Promise<CMSDataArrayResponse<SimplifiedRecipe>>
    );

    return response;
  };

  do {
    const response = await fetchPage();
    allSimplifiedRecipes.push(...response.data);
    pageCount = response.meta?.pagination.pageCount || 1;
    page++;
  } while (page <= pageCount);

  return { allSimplifiedRecipes };
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

export const searchRecipes = async (args: {
  search: string;
  limit?: number;
}) => {
  const searchResults = await meiliRecipesIndex.search(args.search, {
    limit: RECIPES_PAGE_SIZE,
  });

  const data = await getRecipesFromMeiliHits(searchResults.hits);

  const meta: CMSMeta = {
    pagination: {
      page: 1,
      pageSize: args.limit || RECIPES_PAGE_SIZE,
      pageCount: 1,
      total: data.length,
    },
  };

  return { data, meta };
};

export const searchSimilarRecipes = unstable_cache(
  async ({ recipe }: { recipe: Recipe }) => {
    try {
      const id = `lets-cozinha-receita-${recipe.id}`;

      const similars = await meiliRecipesIndex.searchSimilarDocuments({
        id,
        limit: 3,
        embedder: 'lets-cozinha-receita-openai-embedder',
      });

      const data = await getRecipesFromMeiliHits(similars.hits);

      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  ['searchSimilarRecipes'],
  {
    revalidate: false,
  }
);
