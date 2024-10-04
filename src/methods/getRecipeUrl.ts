import { getUrl } from './getUrl';
import type { Recipe } from 'src/cms/recipes';

export function getRecipeUrl(recipe: Recipe) {
  return getUrl(`/receitas/${recipe.slug}`);
}
