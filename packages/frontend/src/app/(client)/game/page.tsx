'use client';

import { WordForm } from './WordForm';

export default function GamePage() {
  return (
    <main className="min-h-screen bg-[url(/background.jpg)] bg-cover text-black flex flex-col items-center justify-center gap-5">
      <WordForm
        letters={{ center: 'a', ring: ['b', 'c', 'd', 'e', 'f', 'g'] }}
        onWordSubmit={console.log}
      />
    </main>
  );
}
