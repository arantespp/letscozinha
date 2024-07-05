import { MeiliSearch } from 'meilisearch';
import Link from 'next/link';
import {
  getRecipes as getRecipesFromCMS,
  type CMSResponse,
} from 'src/cms/getRecipes';
import qs from 'qs';

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
  search?: string;
  query?: string;
};

const getRecipes = async ({
  search,
  query,
}: RecipesListProps): Promise<{
  recipes: Recipe[];
  meta?: CMSResponse['meta'];
}> => {
  if (search) {
    const index = client.index<Recipe>(process.env.MEILISEARCH_INDEX || '');
    const recipes = await index.search(search);
    return { recipes: recipes.hits };
  }

  const recipesQuery = qs.stringify({
    sort: ['updatedAt:desc'],
  });

  const { data = [], meta } = await getRecipesFromCMS(query || recipesQuery);

  return {
    recipes: data.map((recipe) => ({
      nome: recipe.attributes.nome,
      slug: recipe.attributes.slug,
    })),
    meta,
  };
};

export async function RecipesList(props: RecipesListProps) {
  const { recipes } = await getRecipes(props);

  return (
    <div>
      {recipes.map((recipe: Recipe) => (
        <RecipesCard key={recipe.nome} recipe={recipe} />
      ))}
    </div>
  );
}
