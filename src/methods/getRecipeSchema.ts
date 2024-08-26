import type { Recipe } from 'src/cms/recipes';
import { Recipe as RecipeSchema } from 'schema-dts';
import { getRecipeUrl } from './getRecipeUrl';

/**
 * https://developers.google.com/search/docs/appearance/structured-data/recipe
 */
export function getRecipeSchema(recipe: Recipe): RecipeSchema | null {
  if (!recipe.imagens) {
    return null;
  }

  return {
    '@type': 'Recipe',
    name: recipe.nome,
    url: getRecipeUrl(recipe),
    image: recipe.imagens?.map((image) => {
      return {
        '@type': 'ImageObject',
        url: image.url,
        width: {
          '@type': 'QuantitativeValue',
          value: image.width,
        },
        height: {
          '@type': 'QuantitativeValue',
          value: image.height,
        },
      };
    }),
    author: {
      '@type': 'Person',
      name: 'Letícia Ferreira',
    },
    datePublished: recipe.updatedAt,
    description: recipe.descricao,
    keywords: recipe.keywords,
  };
}
