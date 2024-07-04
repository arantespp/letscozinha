import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const LETS_COZINHA_API_KEY = process.env.LETS_COZINHA_API_KEY;

export async function POST(request: NextRequest) {
  if (request.headers.get('x-api-key') !== LETS_COZINHA_API_KEY) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await request.json();

  for (const path of body.paths) {
    revalidatePath(path);
  }

  return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}
