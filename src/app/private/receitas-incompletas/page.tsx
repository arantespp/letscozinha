import { getAllRecipes } from 'src/cms/recipes';

export const revalidate = 0;

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ReceitasIncompletas() {
  const { allRecipes } = await getAllRecipes();

  const incompleteRecipes = allRecipes
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

      if (!recipe.receita.includes('##')) {
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
    .filter(({ status }) => {
      return Object.values(status).some((value) => value);
    })
    .map((recipe) => {
      const cmsUrl = `${process.env.CMS_URL}/admin/content-manager/collection-types/api::lets-cozinha-receita.lets-cozinha-receita/${recipe.id}`;
      return { ...recipe, cmsUrl };
    });

  const incompleteRecipesCount = incompleteRecipes.length;

  return (
    <div>
      <h2>Receitas Incompletas ({incompleteRecipesCount})</h2>
      <ul>
        {incompleteRecipes.map((recipe) => {
          return (
            <li key={recipe.id}>
              <a href={recipe.cmsUrl} target="_blank">
                {recipe.nome}
              </a>
              <ul className="pl-md">
                {recipe.status.noImages && <li>Sem imagens</li>}
                {recipe.status.noFormatted && <li>Sem formatação</li>}
                {recipe.status.noCategories && <li>Sem categorias</li>}
                {recipe.status.noInstagram && <li>Sem Instagram</li>}
                {recipe.status.slugEndsWithNumber && (
                  <li>Slug termina com número</li>
                )}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
