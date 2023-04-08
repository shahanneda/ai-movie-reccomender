import type { NextApiRequest, NextApiResponse } from 'next';
import { SearchMovie } from './search';

const MIN_MOVIES = 1;

export type PostRecommendationRequestType = {
  movieNames: Array<string>;
};

type PostRecommendationResponseType = {
  movies?: Array<SearchMovie>;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostRecommendationResponseType>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const body = JSON.parse(req.body);

  const movieNames = body?.movieNames;
  if (!movieNames || !movieNames.length || movieNames.length <= MIN_MOVIES) {
    res.status(400).send({ message: 'Not enough movie names provided!' });
    return;
  }
  console.log(movieNames);
  return res.status(200).json({ movies: [] });
}
