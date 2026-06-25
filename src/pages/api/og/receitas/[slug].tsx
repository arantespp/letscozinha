import { ImageResponse } from 'next/og';
import { OgTitleBar } from 'src/components/OgTitleBar';
import { getRecipe } from 'src/cms/recipes';
import { getFontData } from 'src/methods/getFontData';
import { BASE_URL } from 'src/constants';
import type { NextApiRequest } from 'next';

export const config = { runtime: 'nodejs' };

export default async function handler(req: NextApiRequest) {
  const { slug } = req.query as { slug: string };

  const recipe = await getRecipe({ slug });

  const imageUrl = recipe?.imagens?.[0]?.url;
  const fontData = getFontData();

  if (!imageUrl) {
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
        fonts: [{ name: 'PlayFair Display', data: fontData, style: 'normal' }],
      }
    );
  }

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
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
        <OgTitleBar title={recipe?.nome} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'PlayFair Display', data: fontData, style: 'normal' }],
    }
  );
}
