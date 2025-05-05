/**
 * ============================================================
 * EBOOK CREATION GUIDELINES FOR AGENTS
 * ============================================================
 *
 * Purpose: This API route generates downloadable PDF recipe ebooks.
 *
 * Key Files:
 *  - `src/app/api/ebook/route.tsx`: This file. Contains the API endpoint logic, PDF structure, and component rendering.
 *    Also includes template definitions (styles and metadata).
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
 *    - Fetches the logo from `LOGO_URL`. Ensure logo styles respect the aspect ratio.
 * 4. Templating:
 *    - The `templateId` determines the visual style applied.
 *    - `baseStyles` apply to all templates (headers, footers, cover, TOC, basic text).
 *    - Template-specific styles are defined within each template object in `ebookTemplates`.
 * 5. Output: A PDF buffer is generated and returned with appropriate `Content-Type` and `Content-Disposition` headers.
 *
 * Best Practices:
 *  - Refer to `src/cms/recipes.ts` for the `Recipe` type structure.
 *  - Ensure recipe markdown follows the expected heading structure (`## Ingredientes`, etc.) for correct parsing.
 *  - Use `baseStyles` for consistency; override or add specifics in template styles.
 *  - Maintain the Cover Page -> TOC -> Recipe Pages structure.
 *  - Keep parsing logic within `RecipeItem` or dedicated helper functions.
 * ============================================================
 */
import { NextRequest, NextResponse } from 'next/server';
import { getRecipe } from 'src/cms/recipes';
import { renderToBuffer, Font, StyleSheet } from '@react-pdf/renderer'; // Updated import
import React from 'react';
import { Document, Page, Text, View, Image, Link } from '@react-pdf/renderer';
import type { Recipe } from 'src/cms/recipes';
import { BASE_URL } from 'src/constants';
import Markdown from 'react-markdown';
import type { Components } from 'react-markdown';
import path from 'node:path'; // Import path for font file paths

// Use the URL for the logo
const LOGO_URL = `${BASE_URL}/logo.png`;

// Website theme color constants from globals.css
const THEME = {
  colors: {
    primary: '#fab200', // Primary yellow color
    secondary: '#d8110d', // Secondary red color
    accent: '#4caf50', // Accent green color
    neutral: '#ffffff', // Background white
    muted: 'rgb(243 244 246)', // Light gray background
    textLight: '#737373', // Light gray text
    textDark: '#333333', // Dark text
  },
  spacing: {
    xs: '0.25rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '4rem',
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Lora',
  },
  radius: '4px',
};

// Helper function to get the absolute path to a font file
const getFontPath = (fontFilename: string) => {
  // Path to fonts in the public/assets directory
  return path.join(process.cwd(), 'public', 'assets', fontFilename);
};

// Register Playfair Display font
Font.register({
  family: 'Playfair Display',
  fonts: [
    {
      src: getFontPath('PlayfairDisplay-Regular.ttf'),
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: getFontPath('PlayfairDisplay-Bold.ttf'),
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: getFontPath('PlayfairDisplay-Italic.ttf'),
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: getFontPath('PlayfairDisplay-Medium.ttf'),
      fontWeight: 500,
      fontStyle: 'normal',
    },
    {
      src: getFontPath('PlayfairDisplay-SemiBold.ttf'),
      fontWeight: 600,
      fontStyle: 'normal',
    },
  ],
});

// Register Lora font
Font.register({
  family: 'Lora',
  fonts: [
    {
      src: getFontPath('Lora-Regular.ttf'),
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: getFontPath('Lora-Bold.ttf'),
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: getFontPath('Lora-Italic.ttf'),
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
    {
      src: getFontPath('Lora-Medium.ttf'),
      fontWeight: 500,
      fontStyle: 'normal',
    },
    {
      src: getFontPath('Lora-SemiBold.ttf'),
      fontWeight: 600,
      fontStyle: 'normal',
    },
  ],
});

export type EbookStyles = ReturnType<typeof StyleSheet.create>;

/**
 * Common base styles for PDF pages and elements, matching website theme.
 */
export const baseStyles = StyleSheet.create({
  page: {
    backgroundColor: THEME.colors.neutral,
    padding: 30,
    fontFamily: THEME.fonts.body,
    color: THEME.colors.textDark,
    lineHeight: 1.5,
  },
  coverPage: {
    backgroundColor: THEME.colors.neutral,
    padding: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: THEME.fonts.body,
  },
  coverLogo: {
    width: 150,
    height: 94, // Adjusted height for 751x471 aspect ratio (150 / (751/471))
    marginBottom: 30,
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: THEME.colors.textDark,
    fontFamily: THEME.fonts.heading,
  },
  coverSubtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: THEME.colors.textLight,
    fontFamily: THEME.fonts.body,
  },
  coverDate: {
    fontSize: 12,
    color: THEME.colors.textLight,
    position: 'absolute',
    bottom: 50,
    fontFamily: THEME.fonts.body,
  },
  tocPage: {
    backgroundColor: THEME.colors.neutral,
    padding: 40,
    fontFamily: THEME.fonts.body,
  },
  tocTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: THEME.colors.textDark,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.muted,
    paddingBottom: 10,
    fontFamily: THEME.fonts.heading,
  },
  tocEntry: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 1.4,
    color: THEME.colors.textDark,
    fontFamily: THEME.fonts.body,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: THEME.fonts.heading,
    color: THEME.colors.textDark,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: THEME.fonts.heading,
    color: THEME.colors.textDark,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: THEME.fonts.heading,
    color: THEME.colors.textDark,
  },
  recipeId: {
    fontSize: 10,
    color: THEME.colors.textLight,
    marginBottom: 10,
    fontFamily: THEME.fonts.body,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: THEME.colors.textLight,
    fontSize: 10,
    fontFamily: THEME.fonts.body,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.muted,
    borderBottomStyle: 'solid',
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 31, // Adjusted height for 751x471 aspect ratio (50 / (751/471))
  },
  headerText: {
    fontSize: 10,
    color: THEME.colors.textLight,
    fontFamily: THEME.fonts.body,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.5,
    fontFamily: THEME.fonts.body,
    color: THEME.colors.textDark,
  },
  imagesContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  image: {
    width: '30%',
    height: 150,
    objectFit: 'cover',
    borderRadius: THEME.radius,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.muted,
    borderBottomStyle: 'solid',
    marginVertical: 15,
  },
  category: {
    backgroundColor: THEME.colors.muted,
    padding: '3 6',
    borderRadius: 12,
    fontSize: 9,
    color: THEME.colors.textDark,
    marginRight: 5,
    marginBottom: 5,
    fontFamily: THEME.fonts.body,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: THEME.fonts.heading,
    color: THEME.colors.textDark,
  },
  list: {
    marginLeft: 15,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 11,
    marginBottom: 3,
    lineHeight: 1.5,
    fontFamily: THEME.fonts.body,
    color: THEME.colors.textDark,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: THEME.colors.textDark,
    fontFamily: THEME.fonts.heading,
  },
  ingredientsList: {
    marginLeft: 15,
    marginBottom: 10,
  },
  stepsList: {
    marginLeft: 15,
    marginBottom: 10,
  },
  cookInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cookTime: {
    fontSize: 11,
    color: THEME.colors.textDark,
    fontFamily: THEME.fonts.body,
  },
  servings: {
    fontSize: 11,
    color: THEME.colors.textDark,
    fontFamily: THEME.fonts.body,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    right: 30,
    color: THEME.colors.textLight,
    fontFamily: THEME.fonts.body,
  },
  primaryButton: {
    backgroundColor: THEME.colors.primary,
    padding: 8,
    borderRadius: THEME.radius,
    textAlign: 'center',
  },
  primaryButtonText: {
    color: THEME.colors.textDark,
    fontFamily: THEME.fonts.body,
    fontWeight: 'bold',
  },
  accentText: {
    color: THEME.colors.accent,
    fontFamily: THEME.fonts.body,
  },
  primaryText: {
    color: THEME.colors.primary,
    fontFamily: THEME.fonts.body,
  },
  secondaryText: {
    color: THEME.colors.secondary,
    fontFamily: THEME.fonts.body,
  },
});

/**
 * Describes an eBook template with its metadata and style definitions.
 * @interface
 */
export interface EbookTemplate {
  /** Display name of the template which also serves as its unique identifier */
  name: string;
  /** Short description of the template style */
  description: string;
  /** StyleSheet definitions for PDF rendering */
  styles: EbookStyles;
  /** Title shown on the eBook cover/header */
  title: string;
}

/**
 * Collection of predefined eBook templates.
 * @type {EbookTemplate[]}
 */
export const ebookTemplates: EbookTemplate[] = [
  {
    name: 'Minimalista',
    description:
      'Layout clean e simples, ideal para receitas com descrições curtas. Exibe o nome da receita, categoria e uma breve descrição.',
    styles: StyleSheet.create({
      page: {
        ...baseStyles.page,
        padding: 40,
      },
      recipeSection: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: THEME.colors.muted,
        borderStyle: 'solid',
        borderRadius: THEME.radius,
        backgroundColor: THEME.colors.neutral,
      },
      recipeHeader: {
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.muted,
        borderBottomStyle: 'solid',
        paddingBottom: 10,
        marginBottom: 10,
      },
      sectionContainer: {
        marginBottom: 15,
      },
      ingredientsListContainer: {
        width: '100%',
      },
      stepsListContainer: {
        width: '100%',
      },
    }),
    title: 'Coletânea de Receitas - Estilo Minimalista',
  },
  {
    name: 'Revista',
    description:
      'Layout estilo revista com imagens maiores e listagem dos principais ingredientes. Ideal para um ebook mais visual.',
    styles: StyleSheet.create({
      page: {
        ...baseStyles.page,
        backgroundColor: THEME.colors.neutral,
      },
      recipeSection: {
        marginBottom: 30,
        padding: 20,
        backgroundColor: THEME.colors.neutral,
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: THEME.colors.primary,
        borderLeftStyle: 'solid',
      },
      recipeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: THEME.colors.muted,
        borderBottomStyle: 'solid',
        paddingBottom: 10,
      },
      recipeImage: {
        marginBottom: 15,
        borderRadius: THEME.radius,
        width: '100%',
        height: 200,
        objectFit: 'cover',
      },
      sectionContainer: {
        marginBottom: 20,
      },
      ingredientsListContainer: {
        marginBottom: 10,
        backgroundColor: THEME.colors.muted,
        padding: 10,
        borderRadius: THEME.radius,
      },
      stepsListContainer: {
        marginBottom: 10,
      },
    }),
    title: 'Coletânea de Receitas - Estilo Revista',
  },
  {
    name: 'Elegante',
    description:
      'Layout sofisticado com estilo gourmet: combina tipografia refinada, elementos decorativos sutis e layout limpo para ingredientes e modo de preparo.',
    styles: StyleSheet.create({
      page: {
        ...baseStyles.page,
        padding: 50,
        backgroundColor: THEME.colors.neutral,
      },
      recipeSection: {
        marginBottom: 30,
        padding: 25,
        backgroundColor: THEME.colors.neutral,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: THEME.colors.muted,
        borderStyle: 'solid',
      },
      recipeHeader: {
        borderBottomWidth: 2,
        borderBottomColor: THEME.colors.primary,
        borderBottomStyle: 'solid',
        paddingBottom: 10,
        marginBottom: 15,
        alignItems: 'center',
      },
      recipeImage: {
        width: '100%',
        height: 220,
        objectFit: 'cover',
        borderRadius: THEME.radius,
        marginBottom: 20,
      },
      sectionContainer: {
        marginBottom: 20,
      },
      ingredientsListContainer: {
        width: '100%',
        backgroundColor: THEME.colors.muted,
        padding: 10,
        borderRadius: THEME.radius,
      },
      stepsListContainer: {
        width: '100%',
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.primary,
        borderBottomStyle: 'dashed',
        marginVertical: 20,
      },
    }),
    title: 'Coletânea de Receitas - Estilo Elegante',
  },
  {
    name: 'Lets Cozinha',
    description:
      'Layout oficial do Lets Cozinha, com as cores e estilos do site. Combina elementos visuais da marca com um layout prático e atraente.',
    styles: StyleSheet.create({
      page: {
        ...baseStyles.page,
        padding: 40,
      },
      recipeSection: {
        marginBottom: 25,
        padding: 20,
        borderRadius: THEME.radius,
        backgroundColor: THEME.colors.neutral,
        borderTopWidth: 5,
        borderTopColor: THEME.colors.primary,
        borderTopStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.muted,
        borderBottomStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: THEME.colors.muted,
        borderLeftStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: THEME.colors.muted,
        borderRightStyle: 'solid',
      },
      recipeHeader: {
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.muted,
        borderBottomStyle: 'solid',
        paddingBottom: 15,
        marginBottom: 15,
      },
      recipeImage: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
        borderRadius: THEME.radius,
        marginBottom: 15,
      },
      sectionContainer: {
        marginBottom: 20,
      },
      ingredientsListContainer: {
        backgroundColor: THEME.colors.muted,
        padding: 15,
        borderRadius: THEME.radius,
        marginBottom: 15,
        borderLeftWidth: 3,
        borderLeftColor: THEME.colors.secondary,
        borderLeftStyle: 'solid',
      },
      stepsListContainer: {
        marginBottom: 15,
        padding: 15,
        borderRadius: THEME.radius,
        backgroundColor: '#FAFAFA',
        borderLeftWidth: 3,
        borderLeftColor: THEME.colors.accent,
        borderLeftStyle: 'solid',
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.muted,
        borderBottomStyle: 'solid',
        marginVertical: 15,
      },
    }),
    title: 'Livro de Receitas do Lets Cozinha',
  },
  {
    name: 'Premium Lets Cozinha',
    description:
      'Template premium que une o melhor dos estilos: visual marcante, imagens grandes, layout limpo para ingredientes e preparo, cores da marca Lets Cozinha e detalhes elegantes.',
    styles: StyleSheet.create({
      page: {
        ...baseStyles.page,
        padding: 48,
        backgroundColor: THEME.colors.neutral,
      },
      recipeSection: {
        marginBottom: 32,
        padding: 28,
        backgroundColor: THEME.colors.neutral,
        borderRadius: 12,
        borderTopWidth: 6,
        borderTopColor: THEME.colors.primary,
        borderTopStyle: 'solid',
        borderLeftWidth: 3,
        borderLeftColor: THEME.colors.secondary,
        borderLeftStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: THEME.colors.muted,
        borderRightStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.muted,
        borderBottomStyle: 'solid',
        boxShadow: '0 2px 8px rgba(250,178,0,0.04)',
      },
      recipeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: THEME.colors.primary,
        borderBottomStyle: 'solid',
        paddingBottom: 12,
        marginBottom: 18,
      },
      recipeImage: {
        width: '100%',
        height: 230,
        objectFit: 'cover',
        borderRadius: THEME.radius,
        marginBottom: 22,
        borderWidth: 2,
        borderColor: THEME.colors.primary,
        borderStyle: 'solid',
      },
      sectionContainer: {
        marginBottom: 20,
      },
      ingredientsListContainer: {
        width: '100%',
        backgroundColor: THEME.colors.muted,
        padding: 14,
        borderRadius: THEME.radius,
        borderLeftWidth: 4,
        borderLeftColor: THEME.colors.secondary,
        borderLeftStyle: 'solid',
        marginBottom: 0,
      },
      stepsListContainer: {
        width: '100%',
        backgroundColor: '#FAFAFA',
        padding: 14,
        borderRadius: THEME.radius,
        borderLeftWidth: 4,
        borderLeftColor: THEME.colors.accent,
        borderLeftStyle: 'solid',
        marginBottom: 0,
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.primary,
        borderBottomStyle: 'dashed',
        marginVertical: 22,
      },
    }),
    title: 'Ebook Premium Lets Cozinha',
  },
];

// Helper function to get a template by name
export function getTemplateById(templateName: string): EbookTemplate {
  return (
    ebookTemplates.find((template) => template.name === templateName) ||
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
  ul: ({ children }) => <View style={baseStyles.list}>{children}</View>,
  ol: ({ children }) => <View style={baseStyles.list}>{children}</View>,
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
    <Text
      style={{
        ...baseStyles.paragraph,
        fontFamily: THEME.fonts.body,
        fontWeight: 'bold',
      }}
    >
      {children}
    </Text>
  ),
  em: ({ children }) => (
    <Text
      style={{
        ...baseStyles.paragraph,
        fontFamily: THEME.fonts.body,
        fontStyle: 'italic',
      }}
    >
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

    // Use the template name as the identifier, default to 'Minimalista'
    const pdfBuffer = await renderToBuffer(
      <EbookPdf
        recipes={validRecipes}
        templateId={templateId || 'Minimalista'}
      />
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
