'use client';

import { useState, useEffect } from 'react';
import { type EbookTemplate } from 'src/app/api/ebook/route';
import { type SimplifiedRecipe } from 'src/cms/recipes';

interface EbookSelectorProps {
  recipes: SimplifiedRecipe[];
  templates: EbookTemplate[];
}

export default function EbookSelector({
  recipes,
  templates,
}: EbookSelectorProps) {
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    templates[0]?.name || 'Minimalista'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<SimplifiedRecipe[]>(
    []
  );

  // Initialize filteredRecipes with recipes when component mounts or recipes change
  useEffect(() => {
    if (Array.isArray(recipes)) {
      // Sort recipes by name in ascending order
      const sortedRecipes = [...recipes].sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );
      setFilteredRecipes(sortedRecipes);
    } else {
      console.error('Recipes is not an array:', recipes);
      setFilteredRecipes([]);
    }
  }, [recipes]);

  // Filtrar receitas quando os filtros mudam
  const handleFilterChange = () => {
    if (!Array.isArray(recipes)) {
      console.error('Recipes is not an array in handleFilterChange');
      setFilteredRecipes([]);
      return;
    }

    let filtered = [...recipes];

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter((recipe) =>
        recipe.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort the filtered recipes alphabetically
    filtered.sort((a, b) => a.nome.localeCompare(b.nome));

    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [searchTerm]);

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
          {templates.map((template) => (
            <div
              key={template.name}
              className={`border rounded-lg p-4 cursor-pointer ${
                selectedTemplate === template.name
                  ? 'border-primary bg-primary/5'
                  : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedTemplate(template.name)}
            >
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="template"
                  id={`template-${template.name}`}
                  checked={selectedTemplate === template.name}
                  onChange={() => setSelectedTemplate(template.name)}
                  className="mr-2"
                />
                <label
                  htmlFor={`template-${template.name}`}
                  className="font-medium cursor-pointer"
                >
                  {template.name}
                </label>
              </div>
              <p className="text-sm text-text-light">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div className="w-full">
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
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">
            Mostrando {filteredRecipes.length} de{' '}
            {Array.isArray(recipes) ? recipes.length : 0} receitas
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
          {!Array.isArray(filteredRecipes) || filteredRecipes.length === 0 ? (
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
          {templates.find((t) => t.name === selectedTemplate)?.name ||
            'Selecionado'}
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
