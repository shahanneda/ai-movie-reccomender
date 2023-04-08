import { GetSearchResponseType, SearchMovie } from '@/pages/api/search';
import React, { useEffect, useState } from 'react';
import { debounce } from 'debounce';
import Image from 'next/image';
import { MovieBrowser } from './MovieBrowser';

type Props = {
  term: string;
  selectedMovies: Set<SearchMovie>;
  setSelectedMovies: (movies: Set<SearchMovie>) => void;
};
export function MovieSearcher({
  term,
  selectedMovies,
  setSelectedMovies,
}: Props) {
  const [movies, setMovies] = useState<GetSearchResponseType>([]);
  async function fetchData() {
    console.log('fetching data');
    const res = (await (
      await fetch(`http://localhost:3000/api/search?term=${term}`)
    ).json()) as GetSearchResponseType;
    setMovies(res);
  }
  const debounceFetchData = debounce(fetchData, 500);

  useEffect(() => {
    debounceFetchData();
  }, [term]);

  return (
    <MovieBrowser
      movies={movies}
      selectedMovies={selectedMovies}
      setSelectedMovies={setSelectedMovies}
    />
  );
}
