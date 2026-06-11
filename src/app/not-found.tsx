import { headers } from 'next/headers';
import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha } from 'src/cms/singleTypes';
import { searchRecipes } from 'src/cms/recipes';
import * as React from 'react';

function extractKeywordsFromPath(path: string): string {
  return path
    .split('/')
    .join(' ')
    .split('-')
    .join(' ')
    .toLowerCase()
    .split(' ')
    .filter((word) => word.length > 2)
    .join(' ')
    .trim();
}

async function NotFoundRecipes() {
  const { letsCozinha } = await getLetsCozinha();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  const searchTerm = extractKeywordsFromPath(pathname);

  let relatedRecipes: any[] = [];
  if (searchTerm) {
    const searchResults = await searchRecipes({
      search: searchTerm,
      limit: 3,
    });
    relatedRecipes = searchResults.data;
  }

  const recipesToShow =
    relatedRecipes.length > 0 ? relatedRecipes : letsCozinha.receitas_favoritas;
  const recipesTitle =
    relatedRecipes.length > 0
      ? 'Receitas relacionadas ao que você procurava'
      : 'Aproveite para ver as nossas receitas favoritas';

  return (
    <div className="">
      <h3>{recipesTitle}</h3>
      <RecipesList recipes={recipesToShow} firstRecipePriority />
    </div>
  );
}

export default async function NotFound() {
  return (
    <div className="flex flex-col gap-md mt-md items-center text-center">
      <h2>Ops, página não encontrada</h2>
      <p className="max-w-[30rem]">
        Desculpe, mas a página que você está procurando não foi encontrada.
      </p>
      <React.Suspense fallback={null}>
        <NotFoundRecipes />
      </React.Suspense>
    </div>
  );
}
