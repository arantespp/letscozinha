import { BASE_URL, WEBSITE_NAME } from 'src/constants';
import { getLetsCozinha } from 'src/cms/singleTypes';
import { getPosters } from 'src/cms/posters';
import { getRecipeUrl } from 'src/methods/getRecipeUrl';
import { getUrl } from 'src/methods/getUrl';
import RSS from 'rss';

const NUMBER_OF_RECIPES = 20;

export async function GET() {
  const { letsCozinha } = await getLetsCozinha();
  const { posters } = await getPosters({ limit: NUMBER_OF_RECIPES });

  const feed = new RSS({
    title: letsCozinha.titulo,
    description: letsCozinha.descricao,
    site_url: BASE_URL,
    feed_url: getUrl('/ultimas-publicacoes.xml'),
    copyright: `${new Date().getFullYear()} ${WEBSITE_NAME}`,
    language: 'pt-BR',
    pubDate: new Date(),
  });

  const allRecipesWithImages = posters
    .map((poster) => poster.receita)
    .filter((recipe) => recipe.imagens?.length);

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
