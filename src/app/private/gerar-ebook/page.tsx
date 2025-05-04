import { getAllSimplifiedRecipes } from 'src/cms/recipes';
import EbookSelector from './EbookSelector';

export default async function GerarEbookPage() {
  // Buscar receitas diretamente do CMS
  const { allSimplifiedRecipes } = await getAllSimplifiedRecipes();

  // Ordenar receitas por nome
  const sortedRecipes = [...allSimplifiedRecipes].sort((a, b) => {
    return a.nome.localeCompare(b.nome);
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gerador de Ebooks de Receitas</h1>
      <EbookSelector recipes={sortedRecipes} />
    </div>
  );
}
