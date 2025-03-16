import { CMS_TOKEN, CMS_URL } from './config';
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

  const response: CMSPostersResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha-posters?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  return { posters: response.data };
};
