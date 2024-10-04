import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { getAllCategories } from 'src/cms/categories';
import { getAllRecipes } from 'src/cms/recipes';
import Link from 'next/link';

export const revalidate = 0;

export default async function StatusDasReceitas() {
  const { allRecipes } = await getAllRecipes();

  const recipesWithStatus = allRecipes
    .map((recipe) => {
      const status = {
        noImages: false,
        noFormatted: false,
        noCategories: false,
        noInstagram: false,
        slugEndsWithNumber: false,
      };

      if (!recipe.imagens || recipe.imagens.length === 0) {
        status.noImages = true;
      }

      if (!recipe.receita.includes('##') && recipe.receita.includes('**')) {
        status.noFormatted = true;
      }

      if (!recipe.categorias || recipe.categorias.length === 0) {
        status.noCategories = true;
      }

      if (!recipe.instagram_posts || recipe.instagram_posts.length === 0) {
        status.noInstagram = true;
      }

      if (/\d$/.test(recipe.slug)) {
        status.slugEndsWithNumber = true;
      }

      return { ...recipe, status };
    })
    .map((recipe) => {
      const cmsUrl = `${process.env.CMS_URL}/admin/content-manager/collection-types/api::lets-cozinha-receita.lets-cozinha-receita/${recipe.id}`;
      const isComplete = Object.values(recipe.status).every((value) => {
        return !value;
      });
      return { ...recipe, cmsUrl, isComplete };
    })
    .sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });

  const allRecipesCount = allRecipes.length;

  const incompleteRecipesCount = recipesWithStatus.reduce((acc, recipe) => {
    return acc + (recipe.isComplete ? 0 : 1);
  }, 0);

  const completeRecipesPercentage = Math.round(
    ((allRecipesCount - incompleteRecipesCount) / allRecipesCount) * 100
  );

  const incompleteItemsCount = recipesWithStatus.reduce((acc, recipe) => {
    return (
      acc +
      Object.values(recipe.status).reduce((acc, value) => {
        return acc + (value ? 1 : 0);
      }, 0)
    );
  }, 0);

  const totalItemsCount =
    allRecipesCount * Object.values(recipesWithStatus[0].status).length;

  const completeItemsPercentage = Math.round(
    ((totalItemsCount - incompleteItemsCount) / totalItemsCount) * 100
  );

  const { allCategories } = await getAllCategories();

  const categoriesWithStatus = allCategories
    .map((category) => {
      const status = {
        slugEndsWithNumber: false,
        noRecipes: false,
      };

      if (/\d$/.test(category.slug)) {
        status.slugEndsWithNumber = true;
      }

      const recipes = allRecipes.filter((recipe) => {
        return recipe.categorias?.some((cat) => cat.id === category.id);
      });

      if (recipes.length === 0) {
        status.noRecipes = true;
      }

      return { ...category, status };
    })
    .map((category) => {
      const cmsUrl = `${process.env.CMS_URL}/admin/content-manager/collection-types/api::lets-cozinha-categoria.lets-cozinha-categoria/${category.id}`;
      const isComplete = Object.values(category.status).every((value) => {
        return !value;
      });
      return { ...category, cmsUrl, isComplete };
    });

  const allCategoriesCount = allCategories.length;

  const incompleteCategoriesCount = categoriesWithStatus.reduce(
    (acc, category) => {
      return acc + (category.isComplete ? 0 : 1);
    },
    0
  );

  const tableClasses = 'border-separate border-spacing-xs my-lg';

  return (
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
          {categoriesWithStatus.map((category) => {
            return (
              <tr key={category.id} className="hover:bg-muted">
                <td>
                  <Link href={`/categorias/${category.slug}`} target="_blank">
                    {category.isComplete ? '✅' : ''} {category.nome}
                  </Link>
                </td>
                <td className="text-center">
                  {category.status.slugEndsWithNumber ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  {category.status.noRecipes ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  <a href={category.cmsUrl} target="_blank">
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>Receitas</h3>
      <table className={tableClasses}>
        <thead>
          <tr className="sticky top-0 bg-white">
            <th>Receita</th>
            <th>Imagens</th>
            <th>Formatação</th>
            <th>Categorias</th>
            <th>Instagram</th>
            <th>Slug</th>
            <th>CMS</th>
          </tr>
        </thead>
        <tbody>
          {recipesWithStatus.map((recipe) => {
            return (
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
                  {recipe.status.noCategories ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  {recipe.status.noInstagram ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  {recipe.status.slugEndsWithNumber ? '❌' : '✅'}
                </td>
                <td className="text-center">
                  <a href={recipe.cmsUrl} target="_blank">
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
