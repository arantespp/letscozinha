import qs from 'qs';

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

export const getRecipe = async (args: { id: string } | { slug: string }) => {
  if ('id' in args) {
    const response = await fetch(
      `${process.env.CMS_URL}/api/lets-cozinha-receitas/${args.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CMS_TOKEN}`,
        },
      }
    );

    const recipe = await response.json();

    return recipe as CMSResponse['data'][number];
  }

  const query = qs.stringify({
    filters: {
      slug: {
        $eq: args.slug,
      },
    },
  });

  const response: CMSResponse = await fetch(
    `${process.env.CMS_URL}/api/lets-cozinha-receitas?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  const recipe = response.data[0];

  return recipe;
};
