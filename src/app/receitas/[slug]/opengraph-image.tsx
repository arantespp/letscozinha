import { ImageResponse } from 'next/og';
import { findRecipe } from 'src/cms/recipes';
import { getFontData } from 'src/methods/getFontData';

/**
 * It cannot be edge because edge functions do not support revalidation.
 */
export const revalidate = 86400; // 24 hours

type Params = {
  slug: string;
};

/**
 * https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata
 */
export async function generateImageMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const slug = (await params).slug;

  const recipe = await findRecipe({ slug });

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
  params: Params;
  id: number;
}) {
  const slug = params.slug;

  const recipe = await findRecipe({ slug });

  const imageUrl = recipe?.imagens?.[id]?.url;

  if (!imageUrl) {
    const fontData = await getFontData();

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
          <img width="500" src="https://letscozinha.com.br/logo-texto.png" />
          <p
            style={{
              fontFamily: '"PlayFair Display", serif',
              maxWidth: 1000,
              textAlign: 'center',
            }}
          >
            {recipe?.nome}
          </p>
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

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        }}
      >
        <img
          src={imageUrl}
          style={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
