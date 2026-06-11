import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

const LETS_COZINHA_API_KEY = process.env.LETS_COZINHA_API_KEY;

/**
 * POST /api/revalidate
 *
 * Body: { paths?: string[], type?: 'page' | 'layout', tags?: string[] }
 *
 * `paths` revalida rotas (revalidatePath). `tags` purga caches de dados
 * taggeados (revalidateTag) — ex.: 'cms-recipes' para o cache de receitas
 * completas. O webhook do CMS deve enviar ambos ao atualizar conteúdo.
 */
export async function POST(request: NextRequest) {
  if (request.headers.get('x-api-key') !== LETS_COZINHA_API_KEY) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { paths, type, tags } = await request.json();

  if (!paths && !tags) {
    return NextResponse.json(
      {
        revalidated: false,
        now: Date.now(),
        message: 'Missing paths or tags to revalidate',
      },
      {
        status: 400,
      }
    );
  }

  for (const path of paths || []) {
    revalidatePath(path, type);
  }

  for (const tag of tags || []) {
    revalidateTag(tag, 'max');
  }

  return new NextResponse(
    JSON.stringify({ success: true, now: Date.now(), paths, type, tags }),
    {
      status: 200,
    }
  );
}
