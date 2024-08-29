import type { Recipe } from 'src/cms/recipes';
import { getUrl } from './getUrl';

export function getRecipeUrl(recipe: Recipe) {
  return getUrl(`/receitas/${recipe.slug}`);
}
