import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { MovieBrowser } from '@/components/MovieBrowser';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('john wick');
  return (
    <div className="flex flex-col">
      <h1 className="p-3 bg-slate-700 flex align-center justify-center">
        Ai Movie Recommender
      </h1>
      <input
        className="w-11/12 h-10 text-white p-3 justify-self-center self-center bg-slate-600 rounded-lg"
        type="text"
        placeholder="Search for a movie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <MovieBrowser term={searchTerm} />
    </div>
  );
}
