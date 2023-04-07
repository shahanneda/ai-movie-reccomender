import { GetSearchResponseType, SearchMovie } from '@/pages/api/search';
import React, { useEffect, useState } from 'react';
import { debounce } from 'debounce';
import Image from 'next/image';

type Props = {
  term: string;
};
export function MovieBrowser({ term }: Props) {
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

  const [selectedMovies, setSelectedMovies] = useState<Set<SearchMovie>>(
    new Set()
  );

  return (
    <div className="flex flex-row flex-wrap  gap-10 p-16">
      {movies.map((movie) => {
        console.log(movie.poster_path);
        return (
          <MovieTile
            movie={movie}
            key={movie.id}
            selected={selectedMovies.has(movie)}
            setSelected={(selected) => {
            }}
          />
        );
      })}
    </div>
  );
}

function MovieTile({
  movie,
  selected,
  setSelected,
}: {
  movie: SearchMovie;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}) {
  return (
    <button
      className={`block rounded-lg p-4 shadow-sm border-solid border-2 border-slate-700 w-40 hover:shadow-md hover:shadow-slate-200 ${
        selected ? 'shadow-md shadow-slate-200' : ''
      }`}
      onClick={() => setSelected(!selected)}
    >
      {movie.poster_path ? (
        <Image
          src={movie.poster_path}
          width={100}
          height={200}
          alt={`${movie.original_title} poster`}
          className="h-56 w-full rounded-md object-cover"
        />
      ) : null}

      <div className="mt-2">
        <div className="mt-6 flex items-center gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500 break-before-all w-8/12">
                {movie.original_title}
              </p>
              {/* <p className="font-medium break-before-all w-8/12 h-3">{movie.overview}</p> */}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
