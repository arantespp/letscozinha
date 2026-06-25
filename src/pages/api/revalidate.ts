import type { NextApiRequest, NextApiResponse } from 'next';

const LETS_COZINHA_API_KEY = process.env.LETS_COZINHA_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.headers['x-api-key'] !== LETS_COZINHA_API_KEY) {
    return res.status(401).send('Unauthorized');
  }

  const { paths, tags } = req.body as {
    paths?: string[];
    tags?: string[];
  };

  if (!paths && !tags) {
    return res.status(400).json({
      revalidated: false,
      now: Date.now(),
      message: 'Missing paths or tags to revalidate',
    });
  }

  try {
    for (const path of paths || []) {
      await res.revalidate(path);
    }

    return res.json({ success: true, now: Date.now(), paths, tags });
  } catch (error) {
    return res.status(500).json({ error: String(error) });
  }
}
