import { ImageResponse } from 'next/og';
import { BASE_URL } from 'src/constants';
import { getEbook } from 'src/cms/ebooks';
import { getFontData } from 'src/methods/getFontData';

type Params = {
  slug: string;
};

export const size = { width: 1200, height: 630 };

export const contentType = 'image/png';

export const alt = 'E-book Lets Cozinha';

/**
 * Imagem Open Graph de venda do e-book: capa à esquerda e título,
 * subtítulo e preço à direita sobre fundo da marca. A capa original tem
 * proporção de livro (retrato) e ficaria distorcida/cortada se usada
 * diretamente como og-image 1200x630.
 */
export default async function OpenGraphImage({ params }: { params: Params }) {
  const ebook = await getEbook({ slug: params.slug });
  const fontData = await getFontData();

  const formattedPrice = ebook?.preco
    ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(ebook.preco)
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          backgroundColor: '#fff8ec',
          fontFamily: '"PlayFair Display", serif',
        }}
      >
        {ebook?.imagem?.url && (
          <img
            src={ebook.imagem.url}
            style={{
              height: 530,
              width: 380,
              objectFit: 'cover',
              borderRadius: 16,
              marginLeft: 60,
              boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            }}
          />
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '0 60px',
          }}
        >
          <img src={`${BASE_URL}/logo-texto.png`} width={260} />
          <p
            style={{
              fontSize: 56,
              color: '#333333',
              lineHeight: 1.15,
              margin: '32px 0 0',
            }}
          >
            {ebook?.titulo}
          </p>
          {ebook?.subtitulo && (
            <p
              style={{
                fontSize: 30,
                color: '#737373',
                margin: '16px 0 0',
              }}
            >
              {ebook.subtitulo}
            </p>
          )}
          {formattedPrice && (
            <div
              style={{
                display: 'flex',
                marginTop: 32,
                backgroundColor: '#fab200',
                color: '#333333',
                fontSize: 36,
                padding: '12px 32px',
                borderRadius: 9999,
                alignSelf: 'flex-start',
              }}
            >
              {formattedPrice}
            </div>
          )}
        </div>
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
