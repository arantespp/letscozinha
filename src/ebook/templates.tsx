/**
 * Module defining eBook PDF templates and shared styles.
 * Provides multiple layout options for rendering recipes in a PDF eBook.
 */
import { StyleSheet } from '@react-pdf/renderer';
export type EbookStyles = ReturnType<typeof StyleSheet.create>;

/**
 * Common base styles for PDF pages and elements.
 */
export const baseStyles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  // --- START: Added Cover Page Styles ---
  coverPage: {
    backgroundColor: '#FFFFFF',
    padding: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#333333',
  },
  coverSubtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666666',
  },
  coverDate: {
    fontSize: 12,
    color: '#999999',
    position: 'absolute',
    bottom: 50,
  },
  // --- END: Added Cover Page Styles ---
  // --- START: Added TOC Styles ---
  tocPage: {
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
  tocTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333333',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 10,
  },
  tocEntry: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 1.4,
    color: '#444444',
  },
  // --- END: Added TOC Styles ---
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeId: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#666666',
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 31, // Adjusted height for 751x471 aspect ratio (50 / (751/471))
  },
  headerText: {
    fontSize: 10,
    color: '#999999',
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.5,
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
    borderRadius: 5,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    borderBottomStyle: 'solid',
    marginVertical: 15,
  },
  category: {
    backgroundColor: '#f3f4f6',
    padding: '3 6',
    borderRadius: 12,
    fontSize: 9,
    color: '#666666',
    marginRight: 5,
    marginBottom: 5,
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
  },
  // Add base style for lists
  list: {
    marginLeft: 15,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 11,
    marginBottom: 3,
    lineHeight: 1.5,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
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
    color: '#555555',
  },
  servings: {
    fontSize: 11,
    color: '#555555',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    right: 30,
    color: '#999999',
  },
});

/**
 * Describes an eBook template with its metadata and style definitions.
 * @interface
 */
export interface EbookTemplate {
  /** Unique template identifier */
  id: string;
  /** Display name of the template */
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
    id: '1',
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
        borderColor: '#EEEEEE',
        borderStyle: 'solid',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
      },
      recipeHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
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
    id: '2',
    name: 'Revista',
    description:
      'Layout estilo revista com imagens maiores e listagem dos principais ingredientes. Ideal para um ebook mais visual.',
    styles: StyleSheet.create({
      page: {
        ...baseStyles.page,
        backgroundColor: '#FCFCFC',
      },
      recipeSection: {
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
      },
      recipeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
      },
      recipeImage: {
        marginBottom: 15,
        borderRadius: 5,
        width: '100%',
        height: 200,
        objectFit: 'cover',
      },
      sectionContainer: {
        marginBottom: 20,
      },
      ingredientsListContainer: {
        marginBottom: 10,
      },
      stepsListContainer: {
        marginBottom: 10,
      },
    }),
    title: 'Coletânea de Receitas - Estilo Revista',
  },
  {
    id: '3',
    name: 'Elegante',
    description:
      'Layout sofisticado com estilo gourmet: combina tipografia refinada, elementos decorativos sutis e layout em duas colunas para ingredientes e modo de preparo.',
    styles: StyleSheet.create({
      page: {
        ...baseStyles.page,
        padding: 50,
        backgroundColor: '#FAFAFA',
      },
      recipeSection: {
        marginBottom: 30,
        padding: 25,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'solid',
      },
      recipeHeader: {
        borderBottomWidth: 2,
        borderBottomColor: '#DDD',
        borderBottomStyle: 'solid',
        paddingBottom: 10,
        marginBottom: 15,
        alignItems: 'center',
      },
      recipeImage: {
        width: '100%',
        height: 220,
        objectFit: 'cover',
        borderRadius: 5,
        marginBottom: 20,
      },
      sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      ingredientsListContainer: {
        width: '45%',
      },
      stepsListContainer: {
        width: '45%',
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        borderBottomStyle: 'dashed',
        marginVertical: 20,
      },
    }),
    title: 'Coletânea de Receitas - Estilo Elegante',
  },
];
