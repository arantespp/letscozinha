import { NextRequest, NextResponse } from 'next/server';
import { getRecipe } from 'src/cms/recipes';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import type { Recipe } from 'src/cms/recipes';
import {
  baseStyles,
  ebookTemplates,
  type EbookTemplate,
} from 'src/ebook/templates';

// Logo em base64 para evitar problemas de caminhos
const LOGO_BASE64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAzLTI2VDIxOjQxOjE2LTAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMy0yN1QxNDoxNzo1NC0wMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wMy0yN1QxNDoxNzo1NC0wMzowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmNzQ2NTQyZi1hZmI2LTRlZTQtYmViNi1lOTk5YTUwOWQ4ZmMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyYTg3MDM2Yy1jNDJmLWE4NGEtOGZmMC0wOTI5MjgxZDBmZTYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NmE4OGE5MS0wOWEwLThkNGEtOWUzZS0wY2RkYzI5OWFmNzAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc2YTg4YTkxLTA5YTAtOGQ0YS05ZTNlLTBjZGRjMjk5YWY3MCIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0yNlQyMTo0MToxNi0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNzQ2NTQyZi1hZmI2LTRlZTQtYmViNi1lOTk5YTUwOWQ4ZmMiIHN0RXZ0OndoZW49IjIwMjAtMDMtMjdUMTQ6MTc6NTQtMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4wTOC9AAAGfElEQVR4nO2dS2wbRRjHf7bj2HHsJE7t1klaCfFoqBCpQJSHkCioQlQcEEIqXBBS1aptJQ5cOPQCHEA9wZUTrXrg0BYQgkMlQAIJiYcqKlUSJA6tSNqQ2LHj96vaj4O9ydrJ2vF6Z3Yd7/4/KYrX3v3mG//3nW9mvBlno9lcEGPYBk6qKigLLUVlyS0LbcM+BthWf+V02L2s1aHdWEHt2G5HUVm60C2D/B2KKstlq10VfIdbcst9+3F5uKbS0Bql59XT+HdnMJ6ZRCwnG7HsoJNGxuL4kzkSx7Mk3p0ndW4JY6mue5J1YcmxRKDp2+FqpnGtF4IrO/F/OE3gxdvwBrw6mghJsRZn5cxV0h9cJ3s+QSNr9ayhpVhacsohy48JFtGY/WtSbfLRCB5PP+0q+hDLCZaSTPC4O2tnLNYyVeoZswt6w+iOx57+Mco+GsZ0yqC6SmW1Tr1i0mzI7JNzWyEcjiG9XgYgWzRZWq6TzpgUy83OrRD+YXQltHJA+2gE1J5qjJ2IceCpPTxy/ygHHt/N9r3BdbEsflHgymdxLn60wJWPFpA1EnYWS044B+2lh3A4huH1ABYPPTvBkXcmmH7tDn789CbffvoHseNRwiGDvbv8xA5HeO6lKc5/PMfXZ36XJUdXMQSKYu+yUC/QdVv/zLl7efTcTr77/A8+fPU3Lo3ewv1iicaS9WRDQeHZC/dieirw0LH9+Pc99iQcgJnvE3z26nWuXprj4Xf3sRhNg9cPhY1a6S6GnXbHqQUajmEYXiRDKFhOV/nhtZt889Jv1PNVDh8O4POoGIZKqWhfZgmOeFvb6dYKRaXbwkCxXy9Kb+8fZKWzk+laF6GwsrlXQz4E9lHCkRJHshxJl+MWM7ufZltzk93lmHLkdAGFnLNbdSdg27fbUbuDDJxuDl07SDmGnHIjxYHD6bS92iWuW9qJrjnSvafVTqE5YsA+JdcqYQVJdSe3vNtxrY4dW+oky7hn3ZG+pdLx3M11SnGPNAc/eBd7i66Crpu6YjRbYOTbhX1KW32PtZnN10qJI1uczmk5YrvjMITD7PJoJJrbv3Rcy1a7UuvmXq3oWCeOEQUaGdHKMaLIEcMxnRNFTu44Y1GUyRHB3dJIlSOGOyOjB1kObZ1KQZaVQUiZI4J3o65k2XmSJVHQ1npwEFxJ6z1ZouKsRCnT/y1xFmTI2ybYrWXjDFR3skKlldLLGCdkDERJchxzlnc5OiM1ziG7MxbrKmubIXCZ0oGzS+vGedB0Zjw8BhQ5YiDnbOnSuaHJnRkTh+ZIt2lKc0P2cMxZfvcwpAtzhAeIjm1FbY0d1LVMxyhCjZdajFvKTe+ypuTGGcjYCTcbcXC7I/lZjY51hHZuaCYn6ZITFnvUbZfitENL9iBkODhJ6Y6UkMYQyG07VtYcEXS/K0k50nZnKOaGDLvW0Fxo79TxP9mSQ4YO3dWXrmMMYTkiGNRxuXnIPmQs1DnySoEjwxDKGTmk6IzshLvZ6YhgMEVOyAlZW+TIGI4IamurcIbpusyQ0h0po9RQOGzuZEtIwxA5bVty5IQhDnLEQKHOyPcbj6HQuiFnULYjJ3TdGapy5KgaonZHzJa2xwE3OrJ21JxBqHH/uWmGqNkR012GMBJzhJcdcgKGstW0ZmsSp2RttVuOcyS1G2qLZaiKIDm9OMppX3KOKCQzttMcMWSvzpEW49YxpTgigK43JYTOTwbCwOxOu5GxjR5j4y11pUuG4hcF2bsw5dOK7+dmbvuT30tltUsN2R29mKnQ3AzNxnWCfLu+MTfshBPLGXMwDJHw/aGsZKmZKs126+q2pXTa7c46TiGvD59/Mg7A8kqDYm5zT1hnRJGVIwJ2I4YfkuLz+fD5YCVd37DPGjRJTNYpJPLgdeHxQK1Wo9T4h8baU3/vf97xr3ZNjtixMADJ5SYPPBZaz5FSocb9j+6inqtAc7g3L7OZKvljS1xvXIVqheqq9Wq7WhXqtTqxQ752I+w9MgqXr5L5Jc+utIUOi9mFKgsXK+y5K4AvcgeGx8UIdDG/XMV78hbZuUXYIe810aXFOt7EJYwdk4xOjlBPmlSyZXzJnOvXlrUCQzAMj9Mub6i0gjeE7DMPN9YVBY/X5V9AcKrpstmO04X3IjcydQ25WXfaTtvtLsZ6hAx7Sx2eVfcw/Fy3+BKSsLUO45YvBt7DloDsVJFhZbNT2JYb+DYRBhaxvH5/9+kC9NuFdpLlSIjLGCTGv9zBNJZgUBjsAAAAAElFTkSuQmCC';

// Helper function to get a template by ID
export function getTemplateById(templateId: string): EbookTemplate {
  return (
    ebookTemplates.find((template) => template.id === templateId) ||
    ebookTemplates[0]
  );
}

// Helper function to extract ingredients from markdown
export function parseIngredientsFromMarkdown(markdown: string): string[] {
  if (!markdown) return [];

  // Look for the ingredients section and the list that follows
  const ingredientsMatch = markdown.match(
    /## Ingredientes\s+([\s\S]*?)(?=##|$)/
  );
  if (!ingredientsMatch) return [];

  const ingredientsSection = ingredientsMatch[1];

  // Extract list items (items that start with - or *)
  const ingredients = ingredientsSection
    .split('\n')
    .filter(
      (line) => line.trim().startsWith('-') || line.trim().startsWith('*')
    )
    .map((line) => line.trim().replace(/^[-*]\s+/, ''));

  return ingredients;
}

// Helper to get URL for images that might have signed URLs
export function getImageUrl(image: any) {
  if (!image) return null;
  return image.url;
}

// Recipe component for Template 1 (Minimalist)
const Template1RecipeItem = ({ recipe }: { recipe: Recipe }) => {
  const mainImage = recipe.imagens?.[0];
  const template = getTemplateById('1');

  return (
    <View style={template.styles.recipeSection}>
      <View style={template.styles.recipeHeader}>
        <Text style={baseStyles.recipeTitle}>{recipe.nome}</Text>
        <View style={baseStyles.categoriesContainer}>
          {recipe.categorias?.map((category) => (
            <Text key={category.documentId} style={baseStyles.category}>
              {category.nome}
            </Text>
          ))}
        </View>
      </View>

      {mainImage && (
        <Image src={getImageUrl(mainImage)} style={baseStyles.image} />
      )}

      <Text style={baseStyles.paragraph}>
        {recipe.meta_descricao || recipe.descricao?.substring(0, 150) + '...'}
      </Text>

      <Text style={baseStyles.recipeId}>ID: {recipe.documentId}</Text>
    </View>
  );
};

// Recipe component for Template 2 (Magazine style)
const Template2RecipeItem = ({ recipe }: { recipe: Recipe }) => {
  const mainImage = recipe.imagens?.[0];
  const template = getTemplateById('2');

  return (
    <View style={template.styles.recipeSection}>
      <View style={template.styles.recipeHeader}>
        <Text style={baseStyles.recipeTitle}>{recipe.nome}</Text>
      </View>

      {mainImage && (
        <Image
          src={getImageUrl(mainImage)}
          style={template.styles.recipeImage}
        />
      )}

      <View style={baseStyles.categoriesContainer}>
        {recipe.categorias?.map((category) => (
          <Text key={category.documentId} style={baseStyles.category}>
            {category.nome}
          </Text>
        ))}
      </View>

      <Text style={baseStyles.paragraph}>
        {recipe.meta_descricao || recipe.descricao?.substring(0, 200) + '...'}
      </Text>

      <View style={baseStyles.separator} />

      <View style={baseStyles.section}>
        <Text style={baseStyles.sectionTitle}>Ingredientes Principais</Text>
        {parseIngredientsFromMarkdown(recipe.receita)
          .slice(0, 5)
          .map((ingredient, index) => (
            <Text key={index} style={baseStyles.listItem}>
              • {ingredient}
            </Text>
          ))}
      </View>

      <Text style={baseStyles.recipeId}>ID: {recipe.documentId}</Text>
    </View>
  );
};

// Main PDF Document component
const EbookPdf = ({
  recipes,
  templateId,
}: {
  recipes: Recipe[];
  templateId: string;
}) => {
  const template = getTemplateById(templateId);
  const isTemplate2 = templateId === '2';

  const RecipeItemComponent = isTemplate2
    ? Template2RecipeItem
    : Template1RecipeItem;

  return (
    <Document>
      <Page size="A4" style={template.styles.page}>
        <View style={baseStyles.header}>
          <Image src={LOGO_BASE64} style={baseStyles.logo} />
          <Text style={baseStyles.headerText}>
            Gerado em {new Date().toLocaleDateString()}
          </Text>
        </View>

        <Text style={baseStyles.title}>{template.title}</Text>
        <Text style={baseStyles.subtitle}>Template: {templateId}</Text>

        {recipes.map((recipe) => (
          <RecipeItemComponent key={recipe.documentId} recipe={recipe} />
        ))}

        <Text style={baseStyles.footer}>
          © {new Date().getFullYear()} Lets Cozinha - Todos os direitos
          reservados
        </Text>
      </Page>
    </Document>
  );
};

/**
 * Rota da API para gerar ebooks em PDF a partir de IDs de receitas
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipeIds, templateId } = body;

    if (!recipeIds || !Array.isArray(recipeIds) || recipeIds.length === 0) {
      return NextResponse.json(
        { error: 'Recipe IDs são obrigatórios' },
        { status: 400 }
      );
    }

    // Busca os dados das receitas
    const recipesData = await Promise.all(
      recipeIds.map(async (id) => {
        return await getRecipe({ documentId: id });
      })
    );

    // Filtra receitas indefinidas (caso algum ID seja inválido)
    const validRecipes = recipesData.filter(Boolean);

    if (validRecipes.length === 0) {
      return NextResponse.json(
        { error: 'Nenhuma receita válida encontrada' },
        { status: 400 }
      );
    }

    // Gera o buffer do PDF usando o componente EbookPdf
    const pdfBuffer = await renderToBuffer(
      <EbookPdf recipes={validRecipes} templateId={templateId || '1'} />
    );

    // Retorna o PDF como resposta para download
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="receitas-ebook.pdf"',
      },
    });
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json(
      { error: 'Falha ao gerar o PDF' },
      { status: 500 }
    );
  }
}
