import type { Recipe } from 'src/cms/recipes';
import type { ItemList, ListItem } from 'schema-dts';
import { getRecipeSchema } from './getRecipeSchema';

/**
 * https://developers.google.com/search/docs/appearance/structured-data/recipe
 */
export async function getRecipesListSchema(
  recipes: Recipe[]
): Promise<ItemList> {
  const itemListElement: ListItem[] = [];

  for (const recipe of recipes) {
    const item = await getRecipeSchema(recipe);

    if (item) {
      itemListElement.push({
        '@type': 'ListItem',
        position: itemListElement.length + 1,
        item,
      });
    }
  }

  return {
    '@type': 'ItemList',
    itemListElement,
  };
}
