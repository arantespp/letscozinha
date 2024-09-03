import type { Recipe } from 'src/cms/recipes';
import { Recipe as RecipeSchema } from 'schema-dts';
import { getRecipeUrl } from './getRecipeUrl';
import { getLetsSchema } from './getLetsSchema';
import { getImageSchema } from './getImageSchema';
import { getMarkdownAst } from './getMarkdownAst';

/**
 * https://developers.google.com/search/docs/appearance/structured-data/recipe
 */
export async function getRecipeSchema(
  recipe: Recipe
): Promise<RecipeSchema | null> {
  if (!recipe.imagens) {
    return null;
  }

  const receitaJson = await getMarkdownAst(recipe.receita);

  const ingredientesHeadingIndex = receitaJson.children.findIndex(
    (node: any) => {
      return (
        node.type === 'heading' &&
        node.depth === 2 &&
        node.children?.[0]?.value === 'Ingredientes'
      );
    }
  );

  const ingredientesNextHeadingIndex = receitaJson.children.findIndex(
    (node: any, index: number) => {
      if (index <= ingredientesHeadingIndex) {
        return false;
      }

      if (node.type === 'heading' && node.depth === 2) {
        return true;
      }

      return false;
    }
  );

  // const modoDePreparoHeadingIndex = receitaJson.children.findIndex(
  //   (node: any) => {
  //     return (
  //       node.type === 'heading' &&
  //       node.depth === 2 &&
  //       node.children?.[0]?.value === 'Modo de preparo'
  //     );
  //   }
  // );

  const recipeIngredient = receitaJson.children
    .filter((node: any, index: number) => {
      if (index <= ingredientesHeadingIndex) {
        return false;
      }

      if (index >= ingredientesNextHeadingIndex) {
        return false;
      }

      if (node.type === 'list') {
        return true;
      }

      return false;
    })
    .flatMap((node: any) => {
      return node.children;
    })
    .filter((node: any) => {
      return node.type === 'listItem';
    })
    .flatMap((node: any) => {
      return node.children;
    })
    .flatMap((node: any) => {
      return node.children;
    })
    .map((node: any) => {
      return node.value;
    });

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
    recipeIngredient,
  };
}
