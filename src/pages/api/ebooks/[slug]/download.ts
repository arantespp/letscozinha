import type { NextApiRequest, NextApiResponse } from 'next';
import { getEbook } from 'src/cms/ebooks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query as { slug: string };

  const ebook = await getEbook({ slug });

  if (!ebook?.pdf) {
    return res.status(404).send('Ebook não encontrado');
  }

  try {
    const cdnResponse = await fetch(ebook.pdf.url);

    if (!cdnResponse.ok) {
      return res.status(404).send('Arquivo não encontrado');
    }

    const fileBuffer = await cdnResponse.arrayBuffer();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${slug}.pdf"`
    );
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.send(Buffer.from(fileBuffer));
  } catch (error) {
    console.error('Erro ao baixar o arquivo:', error);
    res.status(500).send('Erro interno ao baixar o arquivo');
  }
}
