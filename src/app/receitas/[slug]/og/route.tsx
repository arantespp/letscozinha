import { ImageResponse } from 'next/og';
import { findRecipe } from 'src/cms/recipes';

export const runtime = 'edge';

type Params = {
  slug: string;
};

export async function GET(request: Request, context: { params: Params }) {
  try {
    const slug = context.params.slug;

    const recipe = await findRecipe({ slug });

    const imageUrl = recipe?.imagens?.[0]?.url;

    if (!imageUrl) {
      const fontData = await fetch(
        new URL(
          '../../../../../assets/PlayfairDisplay-Regular.ttf',
          import.meta.url
        )
      ).then((res) => res.arrayBuffer());

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
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
