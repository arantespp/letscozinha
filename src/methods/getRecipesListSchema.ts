import { getRecipeUrl } from './getRecipeUrl';
import type { ItemList, ListItem } from 'schema-dts';
import type { Recipe } from 'src/cms/recipes';

/**
 * https://developers.google.com/search/docs/appearance/structured-data/recipe
 */
export async function getRecipesListSchema(
  recipes: Recipe[]
): Promise<ItemList> {
  const itemListElement: ListItem[] = [];

  for (const recipe of recipes) {
    itemListElement.push({
      '@type': 'ListItem',
      position: itemListElement.length + 1,
      url: getRecipeUrl(recipe),
    });
  }

  return {
    '@type': 'ItemList',
    itemListElement,
  };
}
