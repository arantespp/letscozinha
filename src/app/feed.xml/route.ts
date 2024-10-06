import RSS from 'rss';
import { getLetsCozinha } from 'src/cms/singleTypes';
import { getAllRecipes } from 'src/cms/recipes';
import { BASE_URL, WEBSITE_NAME } from 'src/constants';
import { getUrl } from 'src/methods/getUrl';
import { getRecipeUrl } from 'src/methods/getRecipeUrl';

const NUMBER_OF_RECIPES_IN_FEED = 10;

export async function GET() {
  const { letsCozinha } = await getLetsCozinha();
  const { allRecipes } = await getAllRecipes();

  const feed = new RSS({
    title: letsCozinha.titulo,
    description: letsCozinha.descricao,
    site_url: BASE_URL,
    feed_url: getUrl('/feed.xml'),
    copyright: `${new Date().getFullYear()} ${WEBSITE_NAME}`,
    language: 'pt-BR',
    pubDate: new Date(),
  });

  const allRecipesWithImages = allRecipes
    .filter((recipe) => recipe.imagens?.length)
    .slice(0, NUMBER_OF_RECIPES_IN_FEED);

  allRecipesWithImages.forEach((recipe) => {
    const image = recipe.imagens?.[0];

    if (!image) {
      return;
    }

    feed.item({
      title: recipe.nome,
      description: recipe.descricao,
      url: getRecipeUrl(recipe),
      date: recipe.createdAt,
      enclosure: {
        url: image.url,
        size: image.height,
        type: image.mime,
      },
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
