import { BASE_URL, WEBSITE_NAME } from 'src/constants';
import { getRecipes } from 'src/cms/recipes';
import { getLetsCozinha } from 'src/cms/singleTypes';
import { getRecipeUrl } from 'src/methods/getRecipeUrl';
import { getUrl } from 'src/methods/getUrl';
import RSS from 'rss';

const NUMBER_OF_RECIPES_IN_FEED = 10;

export async function GET() {
  const { letsCozinha } = await getLetsCozinha();
  const { data } = await getRecipes({
    pagination: {
      pageSize: NUMBER_OF_RECIPES_IN_FEED,
    },
  });

  const feed = new RSS({
    title: letsCozinha.titulo,
    description: letsCozinha.descricao,
    site_url: BASE_URL,
    feed_url: getUrl('/feed.xml'),
    copyright: `${new Date().getFullYear()} ${WEBSITE_NAME}`,
    language: 'pt-BR',
    pubDate: new Date(),
  });

  const allRecipesWithImages = data
    .filter((recipe) => recipe.imagens?.length)
    .slice(0, NUMBER_OF_RECIPES_IN_FEED);

  allRecipesWithImages.forEach((recipe) => {
    const image = recipe.imagens?.[0];

    if (!image) {
      return;
    }

    feed.item({
      title: recipe.nome,
      description: recipe.meta_descricao,
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
