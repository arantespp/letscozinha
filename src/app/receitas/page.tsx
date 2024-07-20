import { Search } from 'src/components/Search';
import { RecipesList } from 'src/components/RecipesList';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { getRecipes } from 'src/cms/getRecipes';
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