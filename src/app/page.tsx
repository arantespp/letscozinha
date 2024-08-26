import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha } from 'src/cms/singleTypes';
import type { WebSite } from 'schema-dts';
import { BASE_URL, WEBSITE_NAME } from 'src/constants';
import { getRecipesListSchema } from 'src/methods/getRecipesListSchema';
import { JsonLd } from 'src/components/JsonLd';

export default async function Home() {
  const { letsCozinha } = await getLetsCozinha();

  /**
   * https://developers.google.com/search/docs/appearance/structured-data/recipe
   */
  const recipesListSchema = getRecipesListSchema(
    letsCozinha.receitas_favoritas
  );

  /**
   * https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
   */
  const websiteSchema: WebSite = {
    '@type': 'WebSite',
    url: BASE_URL,
    name: WEBSITE_NAME,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: new URL('/receitas?search={search_term_string}', BASE_URL)
          .href,
      },
      'query-input': 'required name=search_term_string',
    } as any,
  };

  return (
    <div className="flex flex-col gap-md md:gap-lg flex-1">
      <JsonLd schema={recipesListSchema} />
      <JsonLd schema={websiteSchema} />
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
