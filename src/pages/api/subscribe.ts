import type { NextApiRequest, NextApiResponse } from 'next';

const LISTMONK_URL = 'https://listmonk.lets.rocks/api/public/subscription';
const LISTMONK_LIST_UUID = '9a27b5c1-3168-4cde-a8fb-42bb6989017b';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const requestHost = req.headers.host;
  const origin = req.headers.origin;

  if (origin) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== requestHost) {
        return res.status(403).json({ error: 'Unauthorized: Invalid origin' });
      }
    } catch {
      return res.status(403).json({ error: 'Unauthorized: Invalid origin' });
    }
  }

  const body = req.body as { email?: string };

  if (!body.email || typeof body.email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const response = await fetch(LISTMONK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: body.email,
        list_uuids: [LISTMONK_LIST_UUID],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.error || 'Failed to subscribe' });
    }

    return res.json({ success: true, message: 'Subscription successful' });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
