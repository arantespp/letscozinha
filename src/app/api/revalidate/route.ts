import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const LETS_COZINHA_API_KEY = process.env.LETS_COZINHA_API_KEY;

export async function POST(request: NextRequest) {
  const headers = request.headers;

  if (headers.get('x-api-key') !== LETS_COZINHA_API_KEY) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { paths } = await request.json();

  for (const path of paths) {
    revalidatePath(path);
  }

  return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}
