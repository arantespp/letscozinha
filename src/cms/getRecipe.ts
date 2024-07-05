import qs from 'qs';
import { CMS_TOKEN, CMS_URL } from './config';

type ImageFormat = {
  url: string;
  width: number;
  height: number;
};

type CMSResponse = {
  data: {
    id: number;
    attributes: {
      nome: string;
      slug: string;
      receita: string;
      imagens?: {
        data: {
          id: number;
          attributes: {
            url: string;
            width: number;
            height: number;
            formats: {
              large: ImageFormat;
              medium: ImageFormat;
              small: ImageFormat;
              thumbnail: ImageFormat;
            };
          };
        }[];
      };
    };
  }[];
};

export const getRecipe = async (args: { slug: string }) => {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: args.slug,
      },
    },
    populate: ['imagens'],
  });

  const response: CMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha-receitas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  const recipe = response.data[0];

  return recipe;
};
