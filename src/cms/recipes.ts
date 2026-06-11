import { API_MAX_LIMIT, CMS_URL, cmsFetch } from './config';
import { Meilisearch as MeiliSearch } from 'meilisearch';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import qs from 'qs';
import type {
  CMSDataArrayResponse,
  CMSImages,
  CMSMeta,
  CMSData,
} from './types';
import type { Ebook } from './ebooks';

export const RECIPES_PAGE_SIZE = 10;

export const RECIPES_POPULATE = [
  'categorias',
  'imagens',
  'instagram_posts',
  // 'mostrar_ebook',
  'mostrar_ebook.imagem',
];

/**
 * Perfil "card": campos e relações mínimos para renderizar RecipeCard,
 * feeds e og-images de listas. Exclui o markdown completo da receita
 * (campo mais pesado) e relações usadas apenas na página de detalhe.
 */
export const RECIPE_CARD_FIELDS = [
  'nome',
  'slug',
  'meta_descricao',
  'createdAt',
  'updatedAt',
];

export const RECIPE_CARD_POPULATE = ['categorias', 'imagens'];

/** Tag para purgar os caches de receitas via revalidateTag (/api/revalidate) */
export const CMS_RECIPES_TAG = 'cms-recipes';

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

/**
 * Busca receitas para contextos de LISTA (cards, feeds, og-images).
 *
 * Retorna apenas o perfil "card" (RECIPE_CARD_FIELDS/POPULATE): os objetos
 * NÃO incluem `receita`, `instagram_posts` nem `mostrar_ebook`. Para a
 * receita completa use `getRecipe`/`getAllRecipes`.
 */
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
      fields: RECIPE_CARD_FIELDS,
      populate: RECIPE_CARD_POPULATE,
    })}`;
  })();

  const response = await cmsFetch<CMSRecipesResponse>(url);

  return response;
};

/**
 * Páginas de 50 receitas COMPLETAS (com markdown) cacheadas individualmente.
 *
 * pageSize 50 mantém cada entrada abaixo do limite de ~2MB do data cache.
 * Sort por createdAt:asc evita que itens mudem de página entre requisições.
 * revalidate de 1h garante atualização mesmo sem revalidateTag; o webhook
 * do CMS pode purgar imediatamente via /api/revalidate com CMS_RECIPES_TAG.
 */
const getFullRecipesPage = unstable_cache(
  async (page: number) => {
    const query = qs.stringify({
      pagination: {
        page,
        pageSize: 50,
      },
      populate: RECIPES_POPULATE,
      sort: ['createdAt:asc'],
    });

    // force-cache (default do cmsFetch), como em getAllEbooks: fetch com
    // no-store dentro de unstable_cache marca a rota como dinâmica e quebra
    // a geração estática das páginas de receita
    return cmsFetch<CMSRecipesResponse>(
      `${CMS_URL}/api/lets-cozinha-receitas?${query}`,
      { next: { tags: [CMS_RECIPES_TAG] } }
    );
  },
  ['getFullRecipesPage'],
  {
    revalidate: 3600,
    tags: [CMS_RECIPES_TAG],
  }
);

/**
 * Todas as receitas completas em ~N/50 requisições cacheadas.
 *
 * React cache() deduplica chamadas dentro do mesmo render; o unstable_cache
 * das páginas compartilha o resultado entre páginas e builds. Substitui o
 * padrão anterior de uma requisição ao CMS por receita durante o build.
 */
export const getAllRecipes = cache(async () => {
  const allRecipes: Recipe[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const response = await getFullRecipesPage(page);
    allRecipes.push(...response.data);
    pageCount = response.meta?.pagination.pageCount || 1;
    page++;
  } while (page <= pageCount);

  return { allRecipes };
});

/**
 * Receita completa por slug ou documentId, via lookup em memória sobre
 * getAllRecipes — não dispara uma requisição ao CMS por receita.
 */
export const getRecipe = async (
  args: { documentId: string } | { slug: string }
) => {
  const { allRecipes } = await getAllRecipes();

  if ('documentId' in args) {
    return allRecipes.find((recipe) => recipe.documentId === args.documentId);
  }

  return allRecipes.find((recipe) => recipe.slug === args.slug);
};

export const getRecipesWithPagination = async ({
  page = 1,
  pageSize = RECIPES_PAGE_SIZE,
}: {
  page?: number | string;
  pageSize?: number;
}) => {
  // Perfil "card": consumido apenas por listas (RecipesList)
  const query = qs.stringify({
    pagination: {
      page,
      pageSize,
    },
    fields: RECIPE_CARD_FIELDS,
    populate: RECIPE_CARD_POPULATE,
    sort: ['updatedAt:desc'],
  });

  const response = await cmsFetch<CMSRecipesResponse>(
    `${CMS_URL}/api/lets-cozinha-receitas?${query}`
  );

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

    const response = await cmsFetch<CMSDataArrayResponse<SimplifiedRecipe>>(
      `${CMS_URL}/api/lets-cozinha-receitas?${query}`
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
    if (!meiliRecipesIndex) {
      return [];
    }

    const id = `lets-cozinha-receita-${recipe.documentId}`;

    const similars = await meiliRecipesIndex.searchSimilarDocuments({
      id,
      limit: 3,
      embedder: 'lets-cozinha-receita-openai-embedder',
    });

    const data = await getRecipesFromMeiliHits(similars.hits);

    return data;
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
      return null;
    }

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
  },
  ['getRecommendedEbook'],
  {
    revalidate: false,
  }
);
