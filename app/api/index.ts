import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Respond
  res.status(200).json({ message: 'Log forwarded to Discord' });
}
