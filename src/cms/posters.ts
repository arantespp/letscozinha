import { CMS_TOKEN, CMS_URL } from './config';
import { RECIPES_POPULATE, type RecipeAttributes, mapRecipe } from './recipes';
import { mapCMSData } from './mapCMSData';
import qs from 'qs';
import type { CMSData, CMSDataArrayResponse } from './types';

type PosterAttributes = {
  receita: { data: CMSData<RecipeAttributes> };
};

export type CMSPostersResponse = CMSDataArrayResponse<PosterAttributes>;

const fetchPosters = async (query?: string) => {
  const response = await fetch(`${CMS_URL}/api/lets-cozinha-posters?${query}`, {
    headers: {
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
  }).then((res) => res.json() as Promise<CMSPostersResponse>);

  return response;
};

const mapPoster = (data: CMSPostersResponse['data'][0]) => {
  return {
    ...mapCMSData(data),
    receita: mapRecipe(data.attributes.receita.data),
  };
};

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

  const { data } = await fetchPosters(query);

  return { posters: data.map(mapPoster) };
};
