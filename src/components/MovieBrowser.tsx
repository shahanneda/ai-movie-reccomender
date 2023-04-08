import { GetSearchResponseType, SearchMovie } from '@/pages/api/search';
import React, { useEffect, useState } from 'react';
import { debounce } from 'debounce';
import Image from 'next/image';

type Props = {
  movies: Array<SearchMovie>;
  selectedMovies?: Set<SearchMovie>;
  setSelectedMovies?: (movies: Set<SearchMovie>) => void;
};
export function MovieBrowser({
  movies,
  selectedMovies = new Set(),
  setSelectedMovies = () => {},
}: Props) {
  return (
    <div className="flex flex-row flex-wrap  gap-10 p-16 h-5/6 overflow-auto align-middle justify-center">
      {movies.map((movie) => {
        return (
          <MovieTile
            movie={movie}
            key={movie.id}
            selected={selectedMovies.has(movie)}
            setSelected={(selected) => {
              if (selected) {
                setSelectedMovies(new Set([...selectedMovies, movie]));
              } else {
                const newSet = new Set(selectedMovies);
                newSet.delete(movie);
                setSelectedMovies(newSet);
              }
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
