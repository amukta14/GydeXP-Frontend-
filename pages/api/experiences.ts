import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../data.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 200));

  // Return the mock data
  res.status(200).json(data);
} 