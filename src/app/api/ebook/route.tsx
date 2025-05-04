/**
 * ============================================================
 * EBOOK CREATION GUIDELINES FOR AGENTS
 * ============================================================
 *
 * Purpose: This API route generates downloadable PDF recipe ebooks.
 *
 * Key Files:
 *  - `src/app/api/ebook/route.tsx`: This file. Contains the API endpoint logic, PDF structure, and component rendering.
 *  - `src/ebook/templates.tsx`: Defines available ebook templates (styles and metadata). Contains `baseStyles` for common elements and template-specific styles.
 *  - `src/cms/recipes.ts`: Contains the `Recipe` type definition and functions (`getRecipe`) to fetch recipe data from the CMS.
 *
 * Workflow:
 * 1. Trigger: A POST request is sent to `/api/ebook` with `recipeIds` (required array of strings) and `templateId` (optional string, defaults to '1').
 * 2. Data Fetching: The `getRecipe` function is called for each ID to retrieve full recipe details.
 * 3. PDF Rendering: `@react-pdf/renderer` is used.
 *    - `EbookPdf` component: Defines the overall document structure (Cover Page, Table of Contents, Recipe Pages).
 *    - `RecipeItem` component: Renders individual recipe details. It parses the `receita` (markdown) field to extract:
 *        - Ingredients (under `## Ingredientes` heading, using list format `-` or `*`).
 *        - Steps (under `## Modo de Preparo` heading, using numbered or list format).
 *        - Cook Time (under `## Tempo de Preparo` heading).
 *        - Servings (under `## Rendimento` heading).
 *    - Fetches the logo from `LOGO_URL`. Ensure logo styles in `templates.tsx` respect the aspect ratio.
 * 4. Templating:
 *    - The `templateId` determines the visual style applied.
 *    - `baseStyles` in `templates.tsx` apply to all templates (headers, footers, cover, TOC, basic text).
 *    - Template-specific styles are defined within each template object in `ebookTemplates` in `templates.tsx`.
 * 5. Output: A PDF buffer is generated and returned with appropriate `Content-Type` and `Content-Disposition` headers.
 *
 * Best Practices:
 *  - Refer to `src/cms/recipes.ts` for the `Recipe` type structure.
 *  - When adding/modifying templates, edit `src/ebook/templates.tsx`.
 *  - Ensure recipe markdown follows the expected heading structure (`## Ingredientes`, etc.) for correct parsing.
 *  - Use `baseStyles` for consistency; override or add specifics in template styles.
 *  - Maintain the Cover Page -> TOC -> Recipe Pages structure.
 *  - Keep parsing logic within `RecipeItem` or dedicated helper functions.
 * ============================================================
 */
import { NextRequest, NextResponse } from 'next/server';
import { getRecipe } from 'src/cms/recipes';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { Document, Page, Text, View, Image, Link } from '@react-pdf/renderer';
import type { Recipe } from 'src/cms/recipes';
import {
  baseStyles,
  ebookTemplates,
  type EbookTemplate,
} from 'src/ebook/templates';
import { BASE_URL } from 'src/constants';
import Markdown from 'react-markdown';
import type { Components } from 'react-markdown';

// Use the URL for the logo
const LOGO_URL = `${BASE_URL}/logo.png`;

// Helper function to get a template by ID
export function getTemplateById(templateId: string): EbookTemplate {
  return (
    ebookTemplates.find((template) => template.id === templateId) ||
    ebookTemplates[0]
  );
}

// Helper to get URL for images that might have signed URLs
export function getImageUrl(image: any) {
  if (!image) return null;
  return image.url;
}

// Define PDF components for Markdown
const pdfComponents = (template: EbookTemplate): Components => ({
  h2: ({ children }) => <Text style={baseStyles.sectionTitle}>{children}</Text>,
  p: ({ children }) => <Text style={baseStyles.paragraph}>{children}</Text>,
  ul: ({ children }) => (
    // Use baseStyles.list directly as template.styles.listContainer doesn't exist
    <View style={baseStyles.list}>{children}</View>
  ),
  ol: ({ children }) => (
    // Use baseStyles.list directly as template.styles.listContainer doesn't exist
    <View style={baseStyles.list}>{children}</View>
  ),
  // Explicitly type props for li to include ordered and index
  li: ({
    children,
    ordered,
    index,
  }: {
    children?: React.ReactNode;
    ordered?: boolean;
    index?: number;
  }) => (
    <Text style={baseStyles.listItem}>
      {ordered ? `${(index ?? 0) + 1}. ` : '• '}
      {children}
    </Text>
  ),
  strong: ({ children }) => (
    <Text style={{ ...baseStyles.paragraph, fontWeight: 'bold' }}>
      {children}
    </Text>
  ),
});

// Generic Recipe component that works with any template
const RecipeItem = ({
  recipe,
  template,
}: {
  recipe: Recipe;
  template: EbookTemplate;
}) => {
  const mainImage = recipe.imagens?.[0];
  let cookTime: string | null = null;
  let servings: string | null = null;

  try {
    const timeMatch = recipe.receita?.match(/## Tempo de Preparo\s+(.*)/);
    cookTime = timeMatch ? timeMatch[1].trim() : null;
    const servingsMatch = recipe.receita?.match(/## Rendimento\s+(.*)/);
    servings = servingsMatch ? servingsMatch[1].trim() : null;
  } catch (e) {
    /* ignore */
  }

  return (
    <View style={template.styles.recipeSection}>
      <View style={template.styles.recipeHeader}>
        <Text style={baseStyles.recipeTitle}>{recipe.nome}</Text>
        {recipe.categorias &&
          Array.isArray(recipe.categorias) &&
          recipe.categorias.length > 0 && (
            <View style={baseStyles.categoriesContainer}>
              {recipe.categorias.map((cat) => (
                <Text key={cat.documentId} style={baseStyles.category}>
                  {cat.nome}
                </Text>
              ))}
            </View>
          )}
      </View>
      {mainImage && (
        <Image
          src={getImageUrl(mainImage)}
          style={template.styles.recipeImage || baseStyles.image}
        />
      )}
      <Text style={baseStyles.paragraph}>
        {recipe.meta_descricao || recipe.descricao + '...'}
      </Text>
      {(cookTime || servings) && (
        <View style={baseStyles.cookInfo}>
          {cookTime && <Text style={baseStyles.cookTime}>⌛ {cookTime}</Text>}
          {servings && <Text style={baseStyles.servings}>🍽️ {servings}</Text>}
        </View>
      )}
      {recipe.receita && (
        <View style={template.styles.sectionContainer || baseStyles.section}>
          <Markdown components={pdfComponents(template)}>
            {recipe.receita}
          </Markdown>
        </View>
      )}
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
  const generationDate = new Date().toLocaleDateString();

  return (
    <Document
      title={`Ebook de Receitas - ${template.title}`}
      author="Lets Cozinha"
      subject="Coletânea de Receitas Selecionadas"
      keywords={recipes.map((r) => r.keywords || r.nome).join(', ')}
      producer="Lets Cozinha Ebook Generator"
      creator="Lets Cozinha"
    >
      {/* --- START: Cover Page --- */}
      <Page size="A4" style={baseStyles.coverPage} fixed>
        <Image src={LOGO_URL} style={baseStyles.coverLogo} />
        <Text style={baseStyles.coverTitle}>{template.title}</Text>
        <Text style={baseStyles.coverSubtitle}>
          Uma seleção especial de receitas
        </Text>
        <Text style={baseStyles.coverDate}>Gerado em {generationDate}</Text>
        <Text style={baseStyles.footer}>
          © {new Date().getFullYear()} Lets Cozinha - Todos os direitos
          reservados
        </Text>
      </Page>
      {/* --- END: Cover Page --- */}

      {/* --- START: Table of Contents --- */}
      <Page size="A4" style={baseStyles.tocPage}>
        <View style={baseStyles.header} fixed>
          <Image src={LOGO_URL} style={baseStyles.logo} />
          <Text style={baseStyles.headerText}>Índice de Receitas</Text>
        </View>
        <Text style={baseStyles.tocTitle}>Índice</Text>
        {recipes.map((recipe) => (
          <View key={`toc-${recipe.documentId}`} style={baseStyles.tocEntry}>
            <Text>{recipe.nome}</Text>
          </View>
        ))}
        <Text style={baseStyles.footer} fixed>
          © {new Date().getFullYear()} Lets Cozinha - Todos os direitos
          reservados
        </Text>
        <Text
          style={baseStyles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      {/* --- END: Table of Contents --- */}

      {/* --- START: Recipe Pages --- */}
      {recipes.map((recipe, index) => (
        <Page key={recipe.documentId} size="A4" style={template.styles.page}>
          <View style={baseStyles.header} fixed>
            <Image src={LOGO_URL} style={baseStyles.logo} />
            <Text style={baseStyles.headerText}>
              {template.title} - {generationDate}
            </Text>
          </View>

          <RecipeItem recipe={recipe} template={template} />

          {index < recipes.length - 1 && template.styles.separator && (
            <View style={template.styles.separator} />
          )}

          <Text style={baseStyles.footer} fixed>
            © {new Date().getFullYear()} Lets Cozinha - Todos os direitos
            reservados
          </Text>
          <Text
            style={baseStyles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      ))}
      {/* --- END: Recipe Pages --- */}
    </Document>
  );
};

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

    const recipesData = await Promise.all(
      recipeIds.map(async (id) => {
        try {
          const recipe = await getRecipe({ documentId: id });
          return recipe;
        } catch (fetchError) {
          return null;
        }
      })
    );

    const validRecipes = recipesData.filter(Boolean) as Recipe[];

    if (validRecipes.length === 0) {
      console.error('[EBOOK GEN] No valid recipes found after filtering.');
      return NextResponse.json(
        { error: 'Nenhuma receita válida encontrada' },
        { status: 400 }
      );
    }

    const pdfBuffer = await renderToBuffer(
      <EbookPdf recipes={validRecipes} templateId={templateId || '1'} />
    );

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="receitas-ebook.pdf"',
      },
    });
  } catch (error) {
    console.error('[EBOOK GEN] Erro fatal ao gerar PDF:', error);
    if (error instanceof Error) {
      console.error('[EBOOK GEN] Error Name:', error.name);
      console.error('[EBOOK GEN] Error Message:', error.message);
      console.error('[EBOOK GEN] Error Stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Falha ao gerar o PDF' },
      { status: 500 }
    );
  }
}
