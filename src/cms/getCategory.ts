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

export const getCategory = async (args: { id: string } | { slug: string }) => {
  if ('id' in args) {
    const response = await fetch(
      `${CMS_URL}/api/lets-cozinha-categorias/${args.id}`,
      {
        headers: {
          Authorization: `Bearer ${CMS_TOKEN}`,
        },
      }
    );

    const category = await response.json();

    return category as CMSResponse['data'][number];
  }

  const query = qs.stringify({
    filters: {
      slug: {
        $eq: args.slug,
      },
    },
  });

  const response: CMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha-categorias?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  const category = response.data[0];

  return category;
};
