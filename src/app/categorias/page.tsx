import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { CategoriesList } from 'src/components/CategoriesList';

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
