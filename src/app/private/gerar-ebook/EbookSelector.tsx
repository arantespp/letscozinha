'use client';

import { useState } from 'react';

interface Recipe {
  documentId: string;
  nome: string;
  slug: string;
  categorias?: {
    documentId: string;
    nome: string;
  }[];
}

interface EbookSelectorProps {
  recipes: Recipe[];
}

export default function EbookSelector({ recipes }: EbookSelectorProps) {
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Extrair todas as categorias únicas
  const allCategories = recipes.reduce(
    (categories, recipe) => {
      recipe.categorias?.forEach((category) => {
        if (!categories.some((cat) => cat.documentId === category.documentId)) {
          categories.push(category);
        }
      });
      return categories;
    },
    [] as { documentId: string; nome: string }[]
  );

  // Filtrar receitas quando os filtros mudam
  const handleFilterChange = () => {
    let filtered = recipes;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter((recipe) =>
        recipe.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoria
    if (activeCategory) {
      filtered = filtered.filter((recipe) =>
        recipe.categorias?.some((cat) => cat.documentId === activeCategory)
      );
    }

    setFilteredRecipes(filtered);
  };

  const handleCheckboxChange = (documentId: string) => {
    setSelectedRecipes((prev) => {
      if (prev.includes(documentId)) {
        return prev.filter((id) => id !== documentId);
      } else {
        return [...prev, documentId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRecipes.length === filteredRecipes.length) {
      setSelectedRecipes([]);
    } else {
      setSelectedRecipes(filteredRecipes.map((recipe) => recipe.documentId));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setTimeout(handleFilterChange, 100);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveCategory(e.target.value || null);
    setTimeout(handleFilterChange, 100);
  };

  const handleGenerateEbook = async () => {
    if (selectedRecipes.length === 0) {
      setError('Selecione pelo menos uma receita');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/ebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeIds: selectedRecipes,
          templateId: selectedTemplate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao gerar o ebook');
      }

      // Criar um blob a partir da resposta PDF
      const blob = await response.blob();

      // Criar um link para baixar o blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'receitas-ebook.pdf';
      document.body.appendChild(a);
      a.click();

      // Limpar
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      setError(err instanceof Error ? err.message : 'Erro ao gerar o ebook');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pb-24">
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Selecione o Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`border rounded-lg p-4 cursor-pointer ${selectedTemplate === '1' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
            onClick={() => setSelectedTemplate('1')}
          >
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="template"
                id="template1"
                checked={selectedTemplate === '1'}
                onChange={() => setSelectedTemplate('1')}
                className="mr-2"
              />
              <label htmlFor="template1" className="font-medium cursor-pointer">
                Template 1: Minimalista
              </label>
            </div>
            <p className="text-sm text-text-light">
              Layout clean e simples, ideal para receitas com descrições curtas.
              Exibe o nome da receita, categoria e uma breve descrição.
            </p>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer ${selectedTemplate === '2' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
            onClick={() => setSelectedTemplate('2')}
          >
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="template"
                id="template2"
                checked={selectedTemplate === '2'}
                onChange={() => setSelectedTemplate('2')}
                className="mr-2"
              />
              <label htmlFor="template2" className="font-medium cursor-pointer">
                Template 2: Revista
              </label>
            </div>
            <p className="text-sm text-text-light">
              Layout estilo revista com imagens maiores e listagem dos
              principais ingredientes. Ideal para um ebook mais visual.
            </p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label htmlFor="search" className="block text-sm font-medium mb-1">
              Buscar receitas
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border rounded"
              placeholder="Digite o nome da receita..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="w-full md:w-1/2">
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Filtrar por categoria
            </label>
            <select
              id="category"
              className="w-full p-2 border rounded"
              value={activeCategory || ''}
              onChange={handleCategoryChange}
            >
              <option value="">Todas as categorias</option>
              {allCategories.map((category) => (
                <option key={category.documentId} value={category.documentId}>
                  {category.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">
            Mostrando {filteredRecipes.length} de {recipes.length} receitas
          </span>

          <button
            onClick={handleSelectAll}
            className="px-4 py-2 text-sm bg-primary text-text-dark rounded-md hover:bg-primary/80"
          >
            {selectedRecipes.length === filteredRecipes.length
              ? 'Desmarcar Todos'
              : 'Selecionar Todos'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Lista de receitas */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Selecione as receitas</h2>

        <div className="border rounded-lg divide-y overflow-hidden">
          {filteredRecipes.length === 0 ? (
            <div className="p-4 text-center text-text-light">
              Nenhuma receita encontrada com os filtros aplicados.
            </div>
          ) : (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.documentId}
                className="p-3 hover:bg-muted cursor-pointer flex items-center"
                onClick={() => handleCheckboxChange(recipe.documentId)}
              >
                <input
                  type="checkbox"
                  id={`recipe-${recipe.documentId}`}
                  checked={selectedRecipes.includes(recipe.documentId)}
                  onChange={() => handleCheckboxChange(recipe.documentId)}
                  className="mr-3 h-5 w-5"
                />
                <label
                  htmlFor={`recipe-${recipe.documentId}`}
                  className="cursor-pointer flex-1"
                >
                  <div className="font-medium">{recipe.nome}</div>
                  <div className="text-xs text-text-light flex flex-wrap gap-1 mt-1">
                    {recipe.categorias?.map((cat) => (
                      <span
                        key={cat.documentId}
                        className="bg-muted px-2 py-0.5 rounded-full"
                      >
                        {cat.nome}
                      </span>
                    ))}
                  </div>
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Botão fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center shadow-lg">
        <div className="text-sm">
          <span className="font-medium">{selectedRecipes.length}</span>{' '}
          receita(s) selecionada(s) • Template:{' '}
          {selectedTemplate === '1' ? 'Minimalista' : 'Revista'}
        </div>
        <button
          onClick={handleGenerateEbook}
          disabled={isGenerating || selectedRecipes.length === 0}
          className={`px-6 py-2 rounded-md ${
            isGenerating || selectedRecipes.length === 0
              ? 'bg-muted text-text-light cursor-not-allowed'
              : 'bg-primary text-text-dark hover:bg-primary/80'
          }`}
        >
          {isGenerating ? 'Gerando...' : 'Gerar Ebook'}
        </button>
      </div>
    </div>
  );
}
