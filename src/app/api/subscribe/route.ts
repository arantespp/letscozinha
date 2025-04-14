import { NextRequest, NextResponse } from 'next/server';

const LISTMONK_URL = 'https://listmonk.lets.rocks/api/public/subscription';
const LISTMONK_LIST_UUID = '9a27b5c1-3168-4cde-a8fb-42bb6989017b';

/**
 * POST /api/subscribe
 *
 * Email subscription API endpoint that forwards requests to Listmonk
 * Only accepts requests from the same host
 */
export async function POST(request: NextRequest) {
  // Validate that the request is coming from our own origin
  const requestHost = request.headers.get('host');
  const origin = request.headers.get('origin');

  // Check if the request is coming from the same domain
  const isAllowedOrigin = origin ? new URL(origin).host === requestHost : true; // Allow requests with no origin (e.g., from server)

  if (!isAllowedOrigin) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid origin' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Forward the request to Listmonk
    const response = await fetch(LISTMONK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        list_uuids: [LISTMONK_LIST_UUID],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription successful',
    });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
