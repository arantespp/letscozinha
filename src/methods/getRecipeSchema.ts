import type { Recipe } from 'src/cms/recipes';
import { Recipe as RecipeSchema } from 'schema-dts';
import { getRecipeUrl } from './getRecipeUrl';
import { getLetsSchema } from './getLetsSchema';
import { getImageSchema } from './getImageSchema';

/**
 * https://developers.google.com/search/docs/appearance/structured-data/recipe
 */
export async function getRecipeSchema(
  recipe: Recipe
): Promise<RecipeSchema | null> {
  if (!recipe.imagens) {
    return null;
  }

  return {
    '@type': 'Recipe',
    name: recipe.nome,
    url: getRecipeUrl(recipe),
    image: recipe.imagens?.map((image) => {
      return getImageSchema(image);
    }),
    author: await getLetsSchema(),
    datePublished: recipe.updatedAt,
    description: recipe.descricao,
    keywords: recipe.keywords,
  };
}
