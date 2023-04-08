import { GetSearchResponseType, SearchMovie } from '@/pages/api/search';
import React, { useEffect, useState } from 'react';
import { debounce } from 'debounce';
import Image from 'next/image';
import { Button } from './Button';

export function BottomBar({
  movies,
  onReset,
  onRecommend,
}: {
  movies: Array<SearchMovie>;
  onReset: () => void;
  onRecommend: () => void;
}) {
  return (
    <div className=" p-8 pr-20 pl-20 basis-3/12 bottom-0 bg-slate-500 flex align-middle items-start justify-between h-screen">
      <div>
        <h3 className="font-bold text-lg">You&apos;ve Selected: </h3>
        <div className="flex flex-col  h-40 ">
          {movies.map((movie) => {
            return <span key={movie.id}>{movie.original_title}</span>;
          })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button label="Recommend" className="ml-10" onClick={onRecommend} />
        <Button
          label="Reset"
          className="ml-10"
          type="reset"
          onClick={onReset}
        />
      </div>
    </div>
  );
}
