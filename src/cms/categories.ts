import { CMS_TOKEN, CMS_URL, API_MAX_LIMIT } from './config';
import type { CMSDataArrayResponse, CMSImages, CMSMeta } from './types';
import { cache } from 'react';
import qs from 'qs';
import { mapCMSData } from './mapCMSData';

type CategoryAttributes = {
  nome: string;
  slug: string;
  imagens?: CMSImages;
  updatedAt: string;
};

export type CMSCategoriesResponse = CMSDataArrayResponse<CategoryAttributes>;

const fetchCategories = async (query?: string) => {
  const response = await fetch(
    `${CMS_URL}/api/lets-cozinha-categorias?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json() as Promise<CMSCategoriesResponse>);

  return response;
};

export const mapCategory = (data: CMSCategoriesResponse['data'][0]) => {
  const imagens = data.attributes.imagens?.data?.map(mapCMSData);
  return { ...mapCMSData(data), imagens };
};

export type Category = ReturnType<typeof mapCategory>;

export const getAllCategories = cache(async () => {
  const allData = [];
  let page = 1;

  while (true) {
    const query = qs.stringify({
      pagination: {
        page,
        pageSize: API_MAX_LIMIT,
      },
      sort: ['nome:asc'],
    });

    const { data, meta } = await fetchCategories(query);

    allData.push(...data);

    if (meta?.pagination.pageCount === page) {
      break;
    }

    page++;
  }

  const allCategories = allData.map(mapCategory);

  return { allCategories };
});

export const findCategory = async ({
  id,
  slug,
}: {
  id?: number;
  slug?: string;
}) => {
  const { allCategories } = await getAllCategories();
  return allCategories.find(
    (category) => category.id === id || category.slug === slug
  );
};