import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { MovieBrowser } from '@/components/MovieBrowser';
import { SideBar } from '@/components/SideBar';
import { SearchMovie } from './api/search';
import { PostRecommendationRequestType } from './api/recommend';
import { MovieSearcher } from '@/components/MovieSearcher';
import { ResultsPanel } from '@/components/ResultsPanel';
import FullPageSpinner from '@/components/FullPageSpinner';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovies, setSelectedMovies] = useState<Set<SearchMovie>>(
    new Set()
  );
  const [recommendedMovies, setRecommendedMovies] = useState<
    Array<SearchMovie>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchRecommendations() {
    console.log('fetching recommendations');
    const body: PostRecommendationRequestType = {
      movieNames: Array.from(selectedMovies).map(
        (movie) => movie.original_title
      ),
    };

    setIsLoading(true);
    fetch(`/api/recommend`, { method: 'post', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setRecommendedMovies(res.movies);
      })
      .catch((err) => {
        alert('Error:' + err);
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-row-reverse h-screen max-h-full bg-black">
      <div className="basis-11/12 h-full max-h-full">
        <div className="" style={{ height: '20%' }}>
          <h1 className="p-3 bg-slate-800 flex align-center justify-center text-white">
            AI Movie Recommender
          </h1>
          <h1 className="p-3 bg-slate-700 flex align-center justify-center text-white">
            Select some of your favorite movies, then click Recommend
          </h1>
          <input
            className="w-full h-10 text-white p-3 justify-self-center self-center bg-slate-600 "
            type="text"
            placeholder="Search for a movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <MovieBrowser movies={recommendedMovies} /> */}

        <MovieSearcher
          term={searchTerm}
          selectedMovies={selectedMovies}
          setSelectedMovies={setSelectedMovies}
        />
      </div>
      <SideBar
        movies={Array.from(selectedMovies)}
        onReset={() => {
          setSelectedMovies(new Set());
        }}
        onRecommend={() => {
          fetchRecommendations();
        }}
        key={selectedMovies.size}
      />

      {recommendedMovies && recommendedMovies.length > 0 ? (
        <ResultsPanel
          movies={recommendedMovies}
          reset={() => {
            setRecommendedMovies([]);
            setSelectedMovies(new Set());
          }}
        />
      ) : null}
      {isLoading ? <FullPageSpinner /> : null}
    </div>
  );
}
