import { Metadata } from 'next';
import Link from 'next/link';
import { getAllSimplifiedRecipes } from 'src/cms/recipes';
import { ebookTemplates } from 'src/app/api/ebook/route';
import EbookSelector from './EbookSelector';

export const metadata: Metadata = {
  title: 'Geração de Ebook de Receitas | Lets Cozinha',
  description: 'Gere ebooks personalizados com as melhores receitas',
};

export default async function EbookGenerator() {
  const { allSimplifiedRecipes } = await getAllSimplifiedRecipes();

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1>Gerador de Ebook de Receitas</h1>
        <Link
          href="/private"
          className="bg-muted text-text-dark px-4 py-2 rounded-md hover:bg-muted/80"
        >
          Voltar ao Painel
        </Link>
      </div>

      <EbookSelector
        recipes={allSimplifiedRecipes}
        templates={ebookTemplates}
      />
    </div>
  );
}
