import { ImageResponse } from 'next/og';
import { OgTitleBar } from 'src/components/OgTitleBar';
import { getRecipeBySlug } from 'src/cms/recipes';
import { getFontData } from 'src/methods/getFontData';
import { BASE_URL } from 'src/constants';

type Params = {
  slug: string;
};

/**
 * Mesma justificativa da página de receita: gerar a og-image on-demand com o
 * cache frio recarrega todas as receitas, estourando o default de 15s da
 * Vercel. 60s dá margem para o warm-up concluir.
 */
export const maxDuration = 60;

/**
 * https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata
 */
export async function generateImageMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const slug = (await params).slug;

  const recipe = await getRecipeBySlug(slug);

  const images = recipe?.imagens;

  const commonMetadata = {
    size: { width: 1200, height: 630 },
    contentType: 'image/png',
  };

  if (!images) {
    return [
      {
        ...commonMetadata,
        id: 0,
        alt: recipe?.nome,
      },
    ];
  }

  return images.map((image, idx) => ({
    ...commonMetadata,
    id: idx,
    alt: `${recipe?.nome} - ${idx + 1}`,
  }));
}

/**
 * https://nextjs.org/docs/app/building-your-application/routing/route-handlers#generate-images-using-code-js-ts-tsx
 */
export default async function Image({
  params,
  id,
}: {
  params: Promise<Params>;
  id: number;
}) {
  const slug = (await params).slug;

  const recipe = await getRecipeBySlug(slug);

  const imageUrl = recipe?.imagens?.[id]?.url;

  if (!imageUrl) {
    const fontData = getFontData();

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            fontSize: 80,
            width: '100%',
            height: '100%',
            paddingTop: 50,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <img width="500" src={`${BASE_URL}/logo-texto.png`} />
          <p
            style={{
              fontFamily: '"PlayFair Display", serif',
              maxWidth: 1000,
              textAlign: 'center',
            }}
          >
            {recipe?.nome}
          </p>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#fab200',
              color: '#333333',
              fontFamily: '"PlayFair Display", serif',
              fontSize: 36,
              padding: '12px 40px',
              borderRadius: 9999,
              marginTop: 8,
            }}
          >
            Ver receita →
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'PlayFair Display',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  }

  const fontData = getFontData();

  // Foto em cover (sem barras brancas) + barra de marca com o nome da
  // receita: og-images com título legível performam melhor em compartilhamentos
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        }}
      >
        <img
          src={imageUrl}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        <OgTitleBar title={recipe?.nome} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'PlayFair Display',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
