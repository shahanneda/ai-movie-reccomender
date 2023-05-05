import { SearchMovie } from '@/pages/api/search';
import React from 'react';
import { Button } from './Button';
import { MovieBrowser } from './MovieBrowser';

function ResultsPanel({
  movies,
  reset,
}: {
  movies: Array<SearchMovie>;
  reset: () => void;
}) {
  return (
    <div className="fixed z-30 bg-slate-800 w-screen h-screen flex flex-col items-center justify-center">
      <div className="p-3 flex justify-center flex-col align-middle items-center bg-slate-700 w-screen text-white">
        <h2>GPT recommends the following movies for you</h2>
      </div>
      <div className="p-3 flex justify-center flex-col align-middle items-center bg-slate-600 w-screen text-white">
        <h2>Click on each film to see its description</h2>
      </div>
      <Button className="m-5 w-32" onClick={reset}>
        Try again
      </Button>
      <MovieBrowser movies={movies} allowFlipping />
    </div>
  );
}

export { ResultsPanel };
