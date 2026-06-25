import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha } from 'src/cms/singleTypes';
import type { Recipe } from 'src/cms/recipes';
import { getAsideData, type AsideData } from 'src/methods/getAsideData';

type Props = {
  fallbackRecipes: Recipe[];
  asideData: AsideData;
};

export default function NotFound({ fallbackRecipes }: Props) {
  return (
    <>
      <Head>
        <title>Página não encontrada | Lets Cozinha</title>
      </Head>
      <div className="flex flex-col gap-md mt-md items-center text-center">
        <h2>Ops, página não encontrada</h2>
        <p className="max-w-[30rem]">
          Desculpe, mas a página que você está procurando não foi encontrada.
        </p>
        {fallbackRecipes.length > 0 && (
          <div className="w-full text-left">
            <h3>Aproveite para ver as nossas receitas favoritas</h3>
            <RecipesList recipes={fallbackRecipes} firstRecipePriority />
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [letsCozinhaResult, asideDataResult] = await Promise.allSettled([
    getLetsCozinha(),
    getAsideData(),
  ]);

  const fallbackRecipes =
    letsCozinhaResult.status === 'fulfilled'
      ? letsCozinhaResult.value.letsCozinha.receitas_favoritas || []
      : [];

  const asideData =
    asideDataResult.status === 'fulfilled'
      ? asideDataResult.value
      : { featuredEbook: null, letsProfile: null, categoriesWithCounts: [], siteDescricao: null };

  return {
    props: { fallbackRecipes, asideData },
    revalidate: 3600,
  };
};
