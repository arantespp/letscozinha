import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const LETS_COZINHA_API_KEY = process.env.LETS_COZINHA_API_KEY;

export async function POST(request: NextRequest) {
  if (request.headers.get('x-api-key') !== LETS_COZINHA_API_KEY) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { paths, type } = await request.json();

  if (!paths) {
    return NextResponse.json(
      {
        revalidated: false,
        now: Date.now(),
        message: 'Missing paths to revalidate',
      },
      {
        status: 400,
      }
    );
  }

  for (const path of paths) {
    if (type) {
      revalidatePath(path, type);
    } else {
      revalidatePath(path);
    }
  }

  return new NextResponse(
    JSON.stringify({ success: true, now: Date.now(), paths, type }),
    {
      status: 200,
    }
  );
}
