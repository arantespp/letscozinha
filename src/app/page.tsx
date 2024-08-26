import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha } from 'src/cms/singleTypes';
import type { ItemList, WithContext, WebSite } from 'schema-dts';
import { BASE_URL } from 'src/constants';

export default async function Home() {
  const { letsCozinha } = await getLetsCozinha();

  /**
   * https://developers.google.com/search/docs/appearance/structured-data/recipe
   */
  const jsonLdItemList: WithContext<ItemList> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: letsCozinha.receitas_favoritas.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Recipe',
        name: recipe.nome,
        url: new URL(`/receitas/${recipe.slug}`, BASE_URL).href,
      },
    })),
  };

  /**
   * https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
   */
  const jsonLdWebSite: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: new URL('/receitas?search={search_term_string}', BASE_URL)
          .href,
      },
      query: 'required name=search_term_string',
    },
  };

  return (
    <div className="flex flex-col gap-md md:gap-lg flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <section>
        <div>
          <h2>Receitas Favoritas</h2>
          <RecipesList
            recipes={letsCozinha.receitas_favoritas}
            firstRecipePriority
          />
        </div>
      </section>
    </div>
  );
}
