import { BASE_URL } from 'src/constants';

/**
 * Barra de título para imagens Open Graph geradas com next/og (Satori).
 *
 * Renderiza um gradiente escuro na base da imagem com o logo e o título,
 * garantindo marca e legibilidade consistentes nas og-images de receitas,
 * categorias e e-books. Usar apenas dentro de ImageResponse — somente
 * estilos suportados pelo Satori (todo container precisa de display flex).
 *
 * O texto usa a fonte "PlayFair Display": registre-a via `fonts` nas
 * opções do ImageResponse (getFontData).
 */
export function OgTitleBar({ title }: { title?: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '40px 48px 32px',
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))',
      }}
    >
      <img
        src={`${BASE_URL}/logo.png`}
        width={72}
        height={72}
        style={{ borderRadius: 9999 }}
      />
      <p
        style={{
          fontFamily: '"PlayFair Display", serif',
          fontSize: 52,
          color: 'white',
          margin: 0,
          maxWidth: 1000,
        }}
      >
        {title}
      </p>
    </div>
  );
}
