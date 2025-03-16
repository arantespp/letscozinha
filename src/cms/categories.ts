import { API_MAX_LIMIT, CMS_TOKEN, CMS_URL } from './config';
import qs from 'qs';
import type { CMSDataArrayResponse, CMSImages, CMSData } from './types';

type CategoryAttributes = {
  nome: string;
  slug: string;
  imagens?: CMSImages;
  updatedAt: string;
  descricao: string;
};

export type CMSCategoriesResponse = CMSDataArrayResponse<CategoryAttributes>;

export type Category = CMSData<CategoryAttributes>;

export const getCategories = async ({
  page = 1,
}: {
  page?: number | string;
}) => {
  const query = qs.stringify({
    pagination: {
      page,
      pageSize: API_MAX_LIMIT,
    },
    sort: ['nome:asc'],
    populate: ['imagens'],
  });

  const response = await fetch(
    `${CMS_URL}/api/lets-cozinha-categorias?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
      cache: 'force-cache',
    }
  ).then((res) => res.json() as Promise<CMSCategoriesResponse>);

  return response;
};

export const getAllCategories = async () => {
  const allCategories = [];
  let page = 1;

  while (true) {
    const { data, meta } = await getCategories({ page });

    allCategories.push(...data);

    if (meta?.pagination.pageCount === page) {
      break;
    }

    page++;
  }

  return { allCategories };
};

export const getCategory = async ({
  documentId,
  slug,
}: {
  documentId?: string;
  slug?: string;
}) => {
  const { allCategories } = await getAllCategories();
  return allCategories.find(
    (category) => category.documentId === documentId || category.slug === slug
  );
};
