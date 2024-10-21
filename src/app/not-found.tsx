import { HeaderNav } from 'src/components/HeaderNav';
import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha } from 'src/cms/singleTypes';

export default async function NotFound() {
  const { letsCozinha } = await getLetsCozinha();

  return (
    <div className="flex flex-col gap-sm mt-md items-center text-center">
      <h2>Ops, página não encontrada</h2>
      <p className="max-w-[30rem]">
        Desculpe, mas a página que você está procurando não foi encontrada.
        Enquanto isso, você pode voltar para{' '}
      </p>
      <HeaderNav isColumn />
      <div className="my-2xl">
        <h2>Aproveite para ver as nossas receitas favoritas</h2>
        <RecipesList
          recipes={letsCozinha.receitas_favoritas}
          firstRecipePriority
        />
      </div>
    </div>
  );
}
