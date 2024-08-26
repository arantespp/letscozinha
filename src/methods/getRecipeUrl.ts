import type { Recipe } from 'src/cms/recipes';
import { BASE_URL } from 'src/constants';

export function getRecipeUrl(recipe: Recipe) {
  return new URL(`/receitas/${recipe.slug}`, BASE_URL).href;
}
