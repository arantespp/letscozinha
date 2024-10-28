import { Recipe as RecipeSchema } from 'schema-dts';
import { getImageSchema } from './getImageSchema';
import { getLetsSchema } from './getLetsSchema';
import { getMarkdownAst } from './getMarkdownAst';
import { getRecipeUrl } from './getRecipeUrl';
import type { Recipe } from 'src/cms/recipes';

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

  const modoDePreparoHeadingIndex = receitaJson.children.findIndex(
    (node: any) => {
      return (
        node.type === 'heading' &&
        node.depth === 2 &&
        node.children?.[0]?.value === 'Modo de preparo'
      );
    }
  );

  const modoDePreparoNextHeadingIndex = receitaJson.children.findIndex(
    (node: any, index: number) => {
      if (index <= modoDePreparoHeadingIndex) {
        return false;
      }

      if (node.type === 'heading' && node.depth === 2) {
        return true;
      }

      return false;
    }
  );

  const recipeInstructions = receitaJson.children
    .filter((node: any, index: number) => {
      if (index <= modoDePreparoHeadingIndex) {
        return false;
      }

      if (
        modoDePreparoNextHeadingIndex !== -1 &&
        index >= modoDePreparoNextHeadingIndex
      ) {
        return false;
      }

      if (node.type === 'paragraph') {
        return true;
      }

      if (node.type === 'heading' && node.depth === 3) {
        return true;
      }

      return false;
    })
    .map((node: any) => {
      return {
        type: node.type,
        texts: node.children
          .filter((node: any) => {
            return node.type === 'text';
          })
          .flatMap((nodeText: { value: string }) => {
            return nodeText.value.split('\n').map((text) => text.trim());
          }),
      };
    })
    .reduce(
      (acc: any, item: { type: string; texts: string[] }, index: number) => {
        if (item.type === 'heading') {
          acc.push({
            heading: item.texts[0],
            steps: [],
          });

          return acc;
        }

        if (index === 0 && item.type === 'paragraph') {
          acc.push({
            heading: undefined,
            steps: [],
          });
        }

        const lastStepsBlock = acc[acc.length - 1];

        lastStepsBlock.steps.push(...item.texts);

        return acc;
      },
      []
    )
    .flatMap((item: { heading?: string; steps: string[] }) => {
      return item.steps.map((step, index) => {
        const stepIndex = `Passo ${index + 1}`;
        const stepName = [item.heading, stepIndex]
          /**
           * item.heading can be undefined
           */
          .filter((str) => str)
          .join(' - ');

        return {
          '@type': 'HowToStep',
          name: stepName,
          text: step,
        };
      });
    });

  const recipeCategory = recipe.categorias
    ?.map((categoria) => categoria.nome)
    .join(', ');

  return {
    '@type': 'Recipe',
    name: recipe.nome,
    url: getRecipeUrl(recipe),
    image: recipe.imagens?.map((image) => {
      return getImageSchema(image);
    }),
    author: await getLetsSchema(),
    datePublished: recipe.updatedAt,
    description: recipe.meta_descricao,
    keywords: recipe.keywords,
    recipeIngredient,
    recipeCategory,
    recipeInstructions,
  };
}
