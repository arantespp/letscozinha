import { StyleSheet } from '@react-pdf/renderer';

// Define a type for the template
export interface EbookTemplate {
  id: string;
  name: string;
  description: string;
  styles: {
    page: any;
    recipeSection: any;
    recipeHeader: any;
    recipeImage?: any;
  };
  title: string;
}

// Base styles that are common to all templates
export const baseStyles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
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
    borderBottom: '1px solid #EEEEEE',
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
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
    borderBottom: '1px solid #EEEEEE',
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
  listItem: {
    fontSize: 11,
    marginBottom: 3,
    lineHeight: 1.5,
  },
});

// Define each template with its specific styles
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
        border: '1px solid #EEEEEE',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
      },
      recipeHeader: {
        borderBottom: '1px solid #EEEEEE',
        paddingBottom: 10,
        marginBottom: 10,
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
    }),
    title: 'Coletânea de Receitas - Estilo Revista',
  },
];
