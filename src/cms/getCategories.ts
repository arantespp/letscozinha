import { CMS_TOKEN, CMS_URL } from './config';

type CMSResponse = {
  data: {
    id: number;
    attributes: {
      nome: string;
      slug: string;
      updatedAt: string;
    };
  }[];
};

export const getCategories = async (query?: string) => {
  const response: CMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha-categorias?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  return response;
};
