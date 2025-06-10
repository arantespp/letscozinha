import { NextRequest } from 'next/server';
import { getEbook } from 'src/cms/ebooks';

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const ebook = await getEbook({ slug });

  if (!ebook?.pdf) {
    return new Response('Ebook não encontrado', { status: 404 });
  }

  try {
    const cdnResponse = await fetch(ebook.pdf.url);

    if (!cdnResponse.ok) {
      return new Response('Arquivo não encontrado', { status: 404 });
    }

    const fileBuffer = await cdnResponse.arrayBuffer();

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${slug}.pdf"`,
        'Cache-Control': 'public, max-age=31536000', // opcional
      },
    });
  } catch (error) {
    console.error('Erro ao baixar o arquivo:', error);
    return new Response('Erro interno ao baixar o arquivo', { status: 500 });
  }
}
