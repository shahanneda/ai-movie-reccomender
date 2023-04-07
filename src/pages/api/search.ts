// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export type SearchMovie = {
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
};

type SearchMovieReturnType = {
  result: Array<SearchMovie>;
};

export type GetSearchResponseType = Array<SearchMovie>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSearchResponseType>
) {
  console.log('api');
  const searchTerm = req.query.term;

  const result = await await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${process.env.TMDB_API_KEY}`
  );

  if (result.status != 200) {
    res.status(500);
    console.log(result.status);
    return;
  }
  const movies = ((await result.json()).results as Array<SearchMovie>).map(
    (movie) => {
      movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      return movie;
    }
  );

  console.log(movies);

  res.status(200).json(movies);
}
