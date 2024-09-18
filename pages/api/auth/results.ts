// pages/api/results.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

interface Result {
  _id: string;
  studentEmail: string;
  quizId: string;
  result: number;
  courseId: string;
  createdAt: Date;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const resultsCollection = db.collection('results');

    const email = req.query.email as string; // Get the email from query parameters
    if (!email) {
      return res.status(400).json({ message: 'Email query parameter is required' });
    }

    const results = await resultsCollection.find({ studentEmail: email }).toArray();

    res.status(200).json({ results });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
