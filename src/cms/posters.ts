import { CMS_URL, cmsFetch } from './config';
import { RECIPES_POPULATE, Recipe } from './recipes';

import qs from 'qs';
import type { CMSDataArrayResponse } from './types';

type PosterAttributes = {
  receita: Recipe;
};

export type CMSPostersResponse = CMSDataArrayResponse<PosterAttributes>;

export const getPosters = async ({ limit = 20 }: { limit: number }) => {
  const query = qs.stringify({
    pagination: {
      pageSize: limit,
    },
    populate: {
      receita: {
        populate: RECIPES_POPULATE,
      },
    },
    sort: ['createdAt:desc'],
  });

  // Sem cache: o fetch original não usava force-cache (dados sempre frescos)
  const response = await cmsFetch<CMSPostersResponse>(
    `${CMS_URL}/api/lets-cozinha-posters?${query}`,
    { cache: 'no-store' }
  );

  return { posters: response.data };
};
