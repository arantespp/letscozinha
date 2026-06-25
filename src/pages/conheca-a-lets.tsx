import Head from 'next/head';
import Image from 'next/image';
import type { GetStaticProps } from 'next';
import { JsonLd } from 'src/components/JsonLd';
import { Markdown } from 'src/components/Markdown';
import { RecipesList } from 'src/components/RecipesList';
import { getLetsCozinha, getLetsCozinhaLets } from 'src/cms/singleTypes';
import { getLetsSchema } from 'src/methods/getLetsSchema';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { SocialNav } from 'src/components/SocialNav';
import type { Recipe } from 'src/cms/recipes';
import { getAsideData, type AsideData } from 'src/methods/getAsideData';

type LetsProfile = {
  nome: string;
  resumo: string;
  texto_completo: string;
  imagem: { url: string };
};

type Props = {
  letsProfile: LetsProfile;
  favoriteRecipes: Recipe[];
  letsSchema: any;
  asideData: AsideData;
};

export default function ConhecaALets({
  letsProfile,
  favoriteRecipes,
  letsSchema,
}: Props) {
  const title = getPageTitle(letsProfile.nome);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={letsProfile.resumo} />
        <link rel="canonical" href={getUrl('/conheca-a-lets')} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={letsProfile.resumo} />
        <meta property="og:image" content={letsProfile.imagem.url} />
        <meta property="og:url" content={getUrl('/conheca-a-lets')} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={getWebsiteName()} />
      </Head>

      <JsonLd schema={letsSchema} />

      <div className="md:px-0 py-lg flex flex-col gap-xl flex-1">
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-md md:p-xl overflow-hidden relative">
          <div className="grid md:grid-cols-2 gap-lg items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-md">
                {letsProfile.nome}
              </h1>
              <div className="text-text-light text-lg leading-relaxed mb-lg italic">
                "{letsProfile.resumo}"
              </div>
              <div className="flex flex-wrap gap-md">
                <SocialNav
                  className="flex gap-sm"
                  linkClassName="flex items-center justify-center w-10 h-10 bg-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-sm"
                  iconClassName="text-xl"
                  noLabel
                />
              </div>
            </div>
            <div className="flex justify-center order-1 md:order-2">
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={letsProfile.imagem.url}
                    alt={`Foto da ${letsProfile.nome}`}
                    fill
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-headings:font-heading prose-headings:text-text-dark prose-p:text-text-light prose-a:text-primary">
            <Markdown source={letsProfile.texto_completo} />
          </div>
        </section>

        {favoriteRecipes.length > 0 && (
          <section className="mt-lg">
            <div className="flex justify-between items-center mb-md">
              <h2 className="text-2xl md:text-3xl font-heading mb-0">
                Receitas Favoritas
              </h2>
            </div>
            <p className="text-text-light mb-lg max-w-3xl">
              Aqui estão as minhas receitas favoritas, que quero compartilhar
              com vocês.
            </p>
            <RecipesList recipes={favoriteRecipes} firstRecipePriority />
          </section>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [letsResult, letsCozinhaResult, letsSchemaResult, asideDataResult] =
    await Promise.allSettled([
      getLetsCozinhaLets(),
      getLetsCozinha(),
      getLetsSchema(),
      getAsideData(),
    ]);

  if (letsResult.status === 'rejected') {
    return { notFound: true };
  }

  const letsProfile = letsResult.value.letsCozinhaLets;
  const favoriteRecipes =
    letsCozinhaResult.status === 'fulfilled'
      ? letsCozinhaResult.value.letsCozinha.receitas_favoritas || []
      : [];

  const asideData =
    asideDataResult.status === 'fulfilled'
      ? asideDataResult.value
      : { featuredEbook: null, letsProfile: null, categoriesWithCounts: [], siteDescricao: null };

  return {
    props: {
      letsProfile,
      favoriteRecipes,
      letsSchema:
        letsSchemaResult.status === 'fulfilled'
          ? letsSchemaResult.value
          : null,
      asideData,
    },
    revalidate: 3600,
  };
};
