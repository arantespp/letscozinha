import { CMS_TOKEN, CMS_URL } from './config';

export type CMSResponse = {
  data: {
    id: number;
    attributes: {
      nome: string;
      slug: string;
      receita: string;
      updatedAt: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export const getRecipes = async (query?: string) => {
  const response: CMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha-receitas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  return response;
};
