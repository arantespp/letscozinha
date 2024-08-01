import { Search } from 'src/components/Search';
import { RecipesList } from 'src/components/RecipesList';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { getRecipes, searchRecipes } from 'src/cms/recipes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todas as Receitas - Lets Cozinha | Busque e Descubra Novos Sabores',
  description:
    'Encontre todas as nossas receitas em um só lugar. Use nossa busca para filtrar por ingredientes, tempo de preparo e preferências dietéticas.',
  keywords:
    'todas as receitas, buscar receitas, receitas por ingredientes, receitas rápidas, receitas detalhadas, receitas favoritas',
};

type Props = {
  searchParams?: {
    search?: string;
    page?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const { recipes, meta } = await (async () => {
    if (searchParams?.search) {
      return searchRecipes({ search: searchParams.search });
    }

    return getRecipes({ page: searchParams?.page });
  })();

  return (
    <div className="flex flex-col">
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
      <h1 className="my-none">Todas as receitas</h1>
      <div>
        <div className="my-lg">
          <Search />
        </div>
        <h2>Receitas</h2>
        <RecipesList recipes={recipes} pagination={meta?.pagination} />
      </div>
    </div>
  );
}
