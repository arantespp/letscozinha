import { MeiliSearch } from 'meilisearch';
import Link from 'next/link';
import { getRecipes as getRecipesFromCMS } from 'src/cms/getRecipes';

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || '',
  apiKey: process.env.MEILISEARCH_API_KEY || '',
});

type Recipe = {
  nome: string;
  slug: string;
};

function RecipesCard({ recipe }: { recipe: Recipe }) {
  const href = `/receitas/${recipe.slug}`;

  return (
    <div>
      <Link href={href} className="underline">
        {recipe.nome}
      </Link>
    </div>
  );
}

type RecipesListProps = {
  query?: string;
};

const getRecipes = async ({ query }: RecipesListProps): Promise<Recipe[]> => {
  if (query) {
    const index = client.index<Recipe>(process.env.MEILISEARCH_INDEX || '');
    const recipes = await index.search(query);
    return recipes.hits;
  }

  const { data } = await getRecipesFromCMS();

  return data.map((recipe) => ({
    nome: recipe.attributes.nome,
    slug: recipe.attributes.slug,
  }));
};

export async function RecipesList({ query }: RecipesListProps) {
  const recipes = await getRecipes({ query });

  return (
    <div>
      {recipes.map((recipe: Recipe) => (
        <RecipesCard key={recipe.nome} recipe={recipe} />
      ))}
    </div>
  );
}
