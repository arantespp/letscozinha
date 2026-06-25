import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import { LinkIcon } from 'src/icons/icons';
import { getAllCategories } from 'src/cms/categories';
import { getAllRecipes } from 'src/cms/recipes';
import { getRecipeSchema } from 'src/methods/getRecipeSchema';
import Head from 'next/head';

const checkIfBadSlug = (slug: string) => {
  return (
    /\d$/.test(slug) ||
    slug.includes(' ') ||
    slug.includes('receita') ||
    slug.includes('categoria') ||
    slug.includes('lets')
  );
};

type RecipeStatus = {
  noImages: boolean;
  noFormatted: boolean;
  noCategories: boolean;
  noInstagram: boolean;
  badSlug: boolean;
  noRecipe: boolean;
};

type RecipeWithStatus = {
  id: number;
  documentId: string;
  nome: string;
  slug: string;
  status: RecipeStatus;
  cmsUrl: string;
  isComplete: boolean;
};

type CategoryStatus = {
  badSlug: boolean;
  noRecipes: boolean;
};

type CategoryWithStatus = {
  id: number;
  documentId: string;
  nome: string;
  slug: string;
  status: CategoryStatus;
  cmsUrl: string;
  isComplete: boolean;
};

type Props = {
  recipesWithStatus: RecipeWithStatus[];
  categoriesWithStatus: CategoryWithStatus[];
  allRecipesCount: number;
  incompleteRecipesCount: number;
  completeRecipesPercentage: number;
  incompleteItemsCount: number;
  totalItemsCount: number;
  completeItemsPercentage: number;
  allCategoriesCount: number;
  incompleteCategoriesCount: number;
};

export default function StatusDasReceitas({
  recipesWithStatus,
  categoriesWithStatus,
  allRecipesCount,
  incompleteRecipesCount,
  completeRecipesPercentage,
  incompleteItemsCount,
  totalItemsCount,
  completeItemsPercentage,
  allCategoriesCount,
  incompleteCategoriesCount,
}: Props) {
  const tableClasses =
    'border-separate border-spacing-xs my-lg block max-w-full overflow-x-auto';

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Status das Receitas</title>
      </Head>

      <div>
        <h2>Status das Receitas</h2>

        <h3>Geral</h3>
        <table className={tableClasses}>
          <thead>
            <tr>
              <th></th>
              <th>Incompletos</th>
              <th>Completos</th>
              <th>Total</th>
              <th>Completos (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Receitas</td>
              <td className="text-center">{incompleteRecipesCount}</td>
              <td className="text-center">
                {allRecipesCount - incompleteRecipesCount}
              </td>
              <td className="text-center">{allRecipesCount}</td>
              <td className="text-center">{completeRecipesPercentage}%</td>
            </tr>
            <tr>
              <td>Itens</td>
              <td className="text-center">{incompleteItemsCount}</td>
              <td className="text-center">
                {totalItemsCount - incompleteItemsCount}
              </td>
              <td className="text-center">{totalItemsCount}</td>
              <td className="text-center">{completeItemsPercentage}%</td>
            </tr>
            <tr>
              <td>Categorias</td>
              <td className="text-center">{incompleteCategoriesCount}</td>
              <td className="text-center">
                {allCategoriesCount - incompleteCategoriesCount}
              </td>
              <td className="text-center">{allCategoriesCount}</td>
              <td className="text-center">
                {Math.round(
                  ((allCategoriesCount - incompleteCategoriesCount) /
                    allCategoriesCount) *
                    100
                )}
                %
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Categorias</h3>
        <table className={tableClasses}>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Slug</th>
              <th>Tem Receitas?</th>
              <th>CMS</th>
            </tr>
          </thead>
          <tbody>
            {categoriesWithStatus.map((category) => (
              <tr key={category.id} className="hover:bg-muted">
                <td>
                  <Link href={`/categorias/${category.slug}`} target="_blank">
                    {category.isComplete ? '✅' : ''} {category.nome}
                  </Link>
                </td>
                <td className="text-center">
                  {category.status.badSlug ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  {category.status.noRecipes ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  <a href={category.cmsUrl} target="_blank">
                    <LinkIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Receitas</h3>
        <table className={tableClasses}>
          <thead>
            <tr className="sticky top-0 bg-white">
              <th>Receita</th>
              <th>Imagens</th>
              <th>Formatação</th>
              <th>Conteúdo</th>
              <th>Categorias</th>
              <th>Instagram</th>
              <th>Slug</th>
              <th>CMS</th>
            </tr>
          </thead>
          <tbody>
            {recipesWithStatus.map((recipe) => (
              <tr key={recipe.id} className="hover:bg-muted">
                <td>
                  <Link href={`/receitas/${recipe.slug}`} target="_blank">
                    {recipe.isComplete ? '✅' : ''} {recipe.nome}
                  </Link>
                </td>
                <td className="text-center">
                  {recipe.status.noImages ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  {recipe.status.noFormatted ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  {recipe.status.noRecipe ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  {recipe.status.noCategories ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  {recipe.status.noInstagram ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  {recipe.status.badSlug ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  <a href={recipe.cmsUrl} target="_blank">
                    <LinkIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { allRecipes } = await getAllRecipes();

  const recipesWithStatus = (
    await Promise.all(
      allRecipes.map(async (recipe) => {
        const schema = await getRecipeSchema(recipe);

        const noFormatted = (() => {
          if (!schema?.recipeIngredient) return true;
          if (
            Array.isArray(schema?.recipeIngredient) &&
            schema?.recipeIngredient.length <= 1
          )
            return true;
          if (!schema?.recipeInstructions) return true;
          if (
            Array.isArray(schema?.recipeInstructions) &&
            schema?.recipeInstructions.length <= 1
          )
            return true;
          return false;
        })();

        const status: RecipeStatus = {
          noImages: !recipe.imagens || recipe.imagens.length === 0,
          noFormatted,
          noCategories: !recipe.categorias || recipe.categorias.length === 0,
          noInstagram:
            !recipe.instagram_posts || recipe.instagram_posts.length === 0,
          badSlug: checkIfBadSlug(recipe.slug),
          noRecipe: !recipe.receita || recipe.receita.trim() === '',
        };

        const cmsUrl = `${process.env.CMS_URL}/admin/content-manager/collection-types/api::lets-cozinha-receita.lets-cozinha-receita/${recipe.documentId}`;
        const isComplete = Object.values(status).every((v) => !v);

        return { ...recipe, status, cmsUrl, isComplete };
      })
    )
  ).sort((a, b) => a.nome.localeCompare(b.nome));

  const allRecipesCount = allRecipes.length;
  const incompleteRecipesCount = recipesWithStatus.filter(
    (r) => !r.isComplete
  ).length;
  const completeRecipesPercentage = Math.round(
    ((allRecipesCount - incompleteRecipesCount) / allRecipesCount) * 100
  );
  const incompleteItemsCount = recipesWithStatus.reduce(
    (acc, r) => acc + Object.values(r.status).filter(Boolean).length,
    0
  );
  const totalItemsCount =
    allRecipesCount * Object.keys(recipesWithStatus[0]?.status || {}).length;
  const completeItemsPercentage = Math.round(
    ((totalItemsCount - incompleteItemsCount) / totalItemsCount) * 100
  );

  const { allCategories } = await getAllCategories();

  const categoriesWithStatus = allCategories
    .map((category) => {
      const recipes = recipesWithStatus.filter((r) =>
        r.categorias?.some((c) => c.documentId === category.documentId)
      );
      const status: CategoryStatus = {
        badSlug: checkIfBadSlug(category.slug),
        noRecipes: recipes.length === 0,
      };
      const cmsUrl = `${process.env.CMS_URL}/admin/content-manager/collection-types/api::lets-cozinha-categoria.lets-cozinha-categoria/${category.documentId}`;
      const isComplete = Object.values(status).every((v) => !v);
      return { ...category, status, cmsUrl, isComplete };
    });

  return {
    props: {
      recipesWithStatus,
      categoriesWithStatus,
      allRecipesCount,
      incompleteRecipesCount,
      completeRecipesPercentage,
      incompleteItemsCount,
      totalItemsCount,
      completeItemsPercentage,
      allCategoriesCount: allCategories.length,
      incompleteCategoriesCount: categoriesWithStatus.filter(
        (c) => !c.isComplete
      ).length,
    },
  };
};
