import { CategoriesList } from 'src/components/CategoriesList';

export default async function CategoriesPage() {
  return (
    <>
      <h1>Categorias</h1>
      <p>Veja as nossas categorias disponíveis:</p>
      <CategoriesList direction="row" />
    </>
  );
}
