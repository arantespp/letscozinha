import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const LETS_COZINHA_API_KEY = process.env.LETS_COZINHA_API_KEY;

export async function POST(request: NextRequest) {
  console.log('AAAAAAAAA');

  if (request.headers.get('x-api-key') !== LETS_COZINHA_API_KEY) {
    console.log('BBB');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  console.log('CCCCCC');

  const body = await request.json();

  console.log('Revalidating paths:', body);

  for (const path of body.paths) {
    revalidatePath(path);
  }

  return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}
