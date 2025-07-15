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
import type { Ebook } from './ebooks';

export const RECIPES_PAGE_SIZE = 15;

export const RECIPES_POPULATE = [
  'categorias',
  'imagens',
  'instagram_posts',
  // 'mostrar_ebook',
  'mostrar_ebook.imagem',
];

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
  mostrar_ebook?: Ebook;
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
    let filters: any | undefined = {};

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

const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST || '';
const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || '';

// Initialize MeiliSearch client only if host is provided
const meiliClient = MEILISEARCH_HOST
  ? new MeiliSearch({
      host: MEILISEARCH_HOST,
      apiKey: MEILISEARCH_API_KEY,
    })
  : null;

type MeiliRecipe = {
  documentId: string;
} & RecipeAttributes;

// Only initialize index if client exists
const meiliRecipesIndex = meiliClient
  ? meiliClient.index<MeiliRecipe>('lets-cozinha-receita')
  : null;

const getRecipesFromMeiliHits = async (hits: MeiliRecipe[]) => {
  return hits as Recipe[];
};

export const searchRecipes = async (args: {
  search: string;
  limit?: number;
}) => {
  // Check if MeiliSearch is available
  if (!meiliRecipesIndex) {
    console.warn(
      'MeiliSearch is not configured. Search functionality is disabled.'
    );
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: args.limit || RECIPES_PAGE_SIZE,
          pageCount: 1,
          total: 0,
        },
      },
    };
  }

  try {
    const searchResults = await meiliRecipesIndex.search(args.search, {
      limit: args.limit || RECIPES_PAGE_SIZE,
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
  } catch (error) {
    console.error('MeiliSearch error:', error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: args.limit || RECIPES_PAGE_SIZE,
          pageCount: 1,
          total: 0,
        },
      },
    };
  }
};

export const searchSimilarRecipes = unstable_cache(
  async ({ recipe }: { recipe: Recipe }) => {
    // Check if MeiliSearch is available
    if (!meiliRecipesIndex) {
      console.warn(
        'MeiliSearch is not configured. Similar recipes functionality is disabled.'
      );
      return [];
    }

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

const meiliEbookIndex = meiliClient
  ? meiliClient.index<Ebook>('lets-cozinha-ebook')
  : null;

export const getRecommendedEbook = unstable_cache(
  async (recipe: Recipe): Promise<Ebook | null> => {
    if (!meiliEbookIndex) {
      console.warn(
        'MeiliSearch is not configured. Recommended eBook functionality is disabled.'
      );
      return null;
    }

    try {
      // await meiliEbookIndex.updateSettings({
      //   filterableAttributes: ['checkout_url'],
      // });

      const searchResults = await meiliEbookIndex.search(recipe.nome, {
        limit: 1,
        filter: 'NOT checkout_url IS NULL AND NOT checkout_url IS EMPTY',
        hybrid: {
          semanticRatio: 0.9,
          embedder: 'lets-cozinha-ebook-openai-embedder',
        },
        showRankingScore: true,
      });

      const data = searchResults.hits;
      return data[0] || null;
    } catch (error) {
      console.error('MeiliSearch error:', error);
      return null;
    }
  },
  ['getRecommendedEbook'],
  {
    revalidate: false,
  }
);
