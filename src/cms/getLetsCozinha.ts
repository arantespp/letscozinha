import { CMS_TOKEN, CMS_URL } from './config';
import type { CMSSingleDataResponse } from './types';
import qs from 'qs';
import {
  RECIPES_POPULATE,
  type CMSRecipesResponse,
  mapRecipe,
} from './recipes';
import { mapCMSData } from './mapCMSData';

type CMSResponse = CMSSingleDataResponse<{
  titulo: string;
  descricao?: string;
  receitas_favoritas_titulo: string;
  receitas_favoritas: CMSRecipesResponse;
}>;

export const getLetsCozinha = async () => {
  const query = qs.stringify({
    populate: {
      receitas_favoritas: {
        populate: RECIPES_POPULATE,
      },
    },
  });

  const response: CMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  const receitas_favoritas =
    response.data.attributes.receitas_favoritas.data.map(mapRecipe);

  const letsCozinha = {
    ...mapCMSData(response.data),
    receitas_favoritas,
  };

  return { letsCozinha };
};
