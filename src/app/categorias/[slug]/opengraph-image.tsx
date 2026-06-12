import { ImageResponse } from 'next/og';
import { OgTitleBar } from 'src/components/OgTitleBar';
import { getCategory } from 'src/cms/categories';
import { getFontData } from 'src/methods/getFontData';
import { getRecipes } from 'src/cms/recipes';
import { BASE_URL } from 'src/constants';

type Params = {
  slug: string;
};

const size = { width: 1200, height: 630 };

/**
 * https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata
 */
export async function generateImageMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const slug = (await params).slug;

  const category = await getCategory({ slug });

  if (category?.imagens) {
    return category?.imagens.map((image, idx) => ({
      size,
      contentType: 'image/png',
      id: idx,
      alt: `${category?.nome} - ${idx + 1}`,
    }));
  }

  return [
    {
      size,
      contentType: 'image/png',
      id: 0,
      alt: category?.nome,
    },
  ];
}

/**
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx
 */
export default async function OpenGraphImage({
  params,
  id,
}: {
  params: Promise<Params>;
  id: number;
}) {
  const slug = (await params).slug;

  const category = await getCategory({ slug });

  if (category?.imagens) {
    const imageUrl = category?.imagens?.[id]?.url;
    const fontData = getFontData();

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
          <OgTitleBar title={category?.nome} />
        </div>
      ),
      {
        ...size,
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

  const { data: recipes } = await getRecipes({
    categoryDocumentId: category?.documentId,
  });

  if (recipes) {
    const recipeImages = recipes
      .filter((recipe) => recipe?.imagens?.[0]?.url)
      .map((recipe) => {
        return recipe?.imagens?.[0].url;
      })
      .slice(0, 4);

    if (recipeImages.length > 0) {
      const fontData = getFontData();

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
            {recipeImages.map((imageUrl, idx) => (
              <img
                key={idx}
                src={imageUrl}
                style={{
                  objectFit: 'cover',
                  height: size.height,
                  width: size.width / recipeImages.length,
                }}
              />
            ))}
            <OgTitleBar title={category?.nome} />
          </div>
        ),
        {
          ...size,
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
  }

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
          {category?.nome}
        </p>
      </div>
    ),
    {
      ...size,
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
