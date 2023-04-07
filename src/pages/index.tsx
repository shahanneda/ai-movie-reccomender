import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="p-3 bg-slate-700 flex align-center justify-center">Ai Movie Recommender</h1>
      <input className="w-9/12 h-10 text-black p-3 justify-self-center self-center" type="text" placeholder="Search for a movie" />
      <main className="flex min-h-screen flex-col items-start justify-normal p-24">
      </main>
    </div>
  )
}
