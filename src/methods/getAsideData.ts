import { getAllCategories, type Category } from 'src/cms/categories';
import { getLetsCozinha, getLetsCozinhaLets } from 'src/cms/singleTypes';
import { getRecipes } from 'src/cms/recipes';
import { pickEbookForCard, type EbookForCard } from 'src/cms/ebooks';

export type CategoryWithCount = Category & { recipeCount: number };

export type AsideData = {
  featuredEbook: EbookForCard | null;
  letsProfile: {
    nome: string;
    resumo: string;
    imagem: { url: string; formats?: { small?: { url: string } } };
  } | null;
  categoriesWithCounts: CategoryWithCount[];
  siteDescricao: string | null;
};

async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const { allCategories } = await getAllCategories();

  const results = await Promise.all(
    allCategories.map(async (category) => {
      const { data: recipes } = await getRecipes({
        categoryDocumentId: category.documentId,
        pagination: { page: 1, pageSize: 1 },
      });

      if (recipes.length > 0) {
        return { ...category, recipeCount: recipes.length } as CategoryWithCount;
      }
      return null;
    })
  );

  return results.filter((c): c is CategoryWithCount => c !== null);
}

export async function getAsideData(): Promise<AsideData> {
  const [letsCozinhaResult, letsCozinhaLetsResult, categoriesResult] =
    await Promise.allSettled([
      getLetsCozinha(),
      getLetsCozinhaLets(),
      getCategoriesWithCounts(),
    ]);

  return {
    featuredEbook:
      letsCozinhaResult.status === 'fulfilled'
        ? letsCozinhaResult.value.letsCozinha.ebooks_favoritos?.[0]
          ? pickEbookForCard(letsCozinhaResult.value.letsCozinha.ebooks_favoritos[0])
          : null
        : null,
    letsProfile:
      letsCozinhaLetsResult.status === 'fulfilled'
        ? letsCozinhaLetsResult.value.letsCozinhaLets
        : null,
    categoriesWithCounts:
      categoriesResult.status === 'fulfilled' ? categoriesResult.value : [],
    siteDescricao:
      letsCozinhaResult.status === 'fulfilled'
        ? (letsCozinhaResult.value.letsCozinha.descricao ?? null)
        : null,
  };
}
