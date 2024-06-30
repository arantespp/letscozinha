type CMSResponse = {
  data: {
    id: number;
    attributes: {
      nome: string;
      slug: string;
      receita: string;
    };
  }[];
};

export const getRecipes = async (query?: string) => {
  const response: CMSResponse = await fetch(
    `http://localhost:1337/api/lets-cozinha-receitas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  return response;
};
