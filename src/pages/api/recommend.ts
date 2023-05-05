import { generateRecommendations } from '@/lib/ai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { addPosterToMovies, SearchMovie, searchMovieDbByTerm } from './search';

const MIN_MOVIES = 1;

export type PostRecommendationRequestType = {
  movieNames: Array<string>;
};

type PostRecommendationResponseType = {
  movies?: Array<SearchMovie>;
  message?: string;
};

const MAX_MOVIE_NAME_LENGTH = 20;
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
  const recs = await generateRecommendations(
    movieNames.map((m: string) => m.substring(0, MAX_MOVIE_NAME_LENGTH))
  );

  const recsWithMovieMetadata = await Promise.all(
    recs.map(async (movie: string) => {
      const dbResult = await (await searchMovieDbByTerm(movie)).json();
      return dbResult.results[0];
    })
  );

  const recsWithMetadataAndPoster = await addPosterToMovies(
    recsWithMovieMetadata
  );

  return res.status(200).json({ movies: recsWithMetadataAndPoster });
}
