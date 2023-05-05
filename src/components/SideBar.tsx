import { GetSearchResponseType, SearchMovie } from '@/pages/api/search';
import React, { useEffect, useState } from 'react';
import { debounce } from 'debounce';
import Image from 'next/image';
import { Button } from './Button';

export function SideBar({
  movies,
  onReset,
  onRecommend,
}: {
  movies: Array<SearchMovie>;
  onReset: () => void;
  onRecommend: () => void;
}) {
  return (
    <div className=" p-8 pr-5 pl-5 basis-1/12 bottom-0 bg-slate-500 flex align-middle items-start justify-start h-screen flex-col">
      <div className="flex flex-col gap-4 mb-4">
        <Button className="" onClick={onRecommend}>
          Recommend
        </Button>
        <Button className="" type="reset" onClick={onReset}>
          Reset
        </Button>
      </div>
      <div>
        {movies.length > 0 ? (
          <h3 className="font-bold text-lg">You&apos;ve Selected: </h3>
        ) : null}
        <div className="flex flex-col  h-40 ">
          {movies.map((movie) => {
            return (
              <div key={movie.id} className="p-1 bg-slate-400 rounded-md m-3 ">
                {movie.original_title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
