import type { Recipe } from 'src/cms/recipes';
import type { ItemList, ListItem } from 'schema-dts';
import { getRecipeSchema } from './getRecipeSchema';

/**
 * https://developers.google.com/search/docs/appearance/structured-data/recipe
 */
export function getRecipesListSchema(recipes: Recipe[]): ItemList {
  const itemListElement = recipes.reduce<ListItem[]>((acc, recipe) => {
    const item = getRecipeSchema(recipe);

    if (item) {
      acc.push({
        '@type': 'ListItem',
        position: acc.length + 1,
        item,
      });
    }

    return acc;
  }, []);

  return {
    '@type': 'ItemList',
    itemListElement,
  };
}
