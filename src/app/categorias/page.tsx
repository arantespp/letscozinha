import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { CategoriesList } from 'src/components/CategoriesList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Categorias de Receitas - Lets Cozinha | Encontre Sua Inspiração Culinária',
  description:
    'Explore diversas categorias de receitas e encontre inspirações para todos os gostos e dietas, desde pratos vegetarianos a sobremesas.',
  keywords:
    'categorias de receitas, receitas vegetarianas, sobremesas, pratos principais, aperitivos, receitas para dietas especiais',
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            name: 'Home',
            href: '/',
          },
          {
            name: 'Categorias',
            href: '/categorias',
            current: true,
          },
        ]}
      />
      <h1>Todas as categorias</h1>
      <CategoriesList />
    </div>
  );
}
