import { CMS_TOKEN, CMS_URL, API_MAX_LIMIT } from './config';
import type { CMSResponse } from './types';
import qs from 'qs';

type Attributes = {
  nome: string;
  slug: string;
  updatedAt: string;
};

type Response = CMSResponse<Attributes>;

export const getCategories = async ({ query }: { query?: string } = {}) => {
  const response = await fetch(
    `${CMS_URL}/api/lets-cozinha-categorias?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  );

  const { data = [], meta } = (await response.json()) as Response;

  return {
    categories: data.map((d) => {
      return {
        id: d.id,
        ...d.attributes,
      };
    }),
    meta,
  };
};

export const getAllCategories = async () => {
  const categories = [];
  let page = 1;

  while (true) {
    const query = qs.stringify({
      pagination: {
        page,
        pageSize: API_MAX_LIMIT,
      },
      sort: ['nome:asc'],
    });

    const { categories: pageCategories, meta } = await getCategories({ query });

    categories.push(...pageCategories);

    if (meta.pagination.pageCount === page) {
      break;
    }

    page += 1;
  }

  return { categories };
};
