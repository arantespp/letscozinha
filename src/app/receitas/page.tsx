import { Search } from 'src/components/Search';
import { RecipesList } from 'src/components/RecipesList';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { getRecipes } from 'src/cms/getRecipes';

type Props = {
  searchParams?: {
    search?: string;
    page?: string;
  };
};

export const revalidate = 60;

export default async function Page({ searchParams }: Props) {
  const { recipes, meta } = await getRecipes(searchParams);

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            name: 'Home',
            href: '/',
          },
          {
            name: 'Receitas',
            href: '/receitas',
            current: true,
          },
        ]}
      />
      <h1>Todas as receitas</h1>
      <div>
        <div className="pt-5 pb-7">
          <Search />
        </div>
        <h2>Receitas</h2>
        <RecipesList recipes={recipes} pagination={meta?.pagination} />
      </div>
    </div>
  );
}
