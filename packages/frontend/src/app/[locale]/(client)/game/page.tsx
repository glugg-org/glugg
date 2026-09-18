'use client';

import { Background } from '@/lib/components/background';
import { WordForm } from './WordForm';

export default function GamePage() {
  return (
    <Background>
      <p className="text-4xl">1:00</p>

      <WordForm
        letters={{ center: 'a', ring: ['b', 'c', 'd', 'e', 'f', 'g'] }}
        onWordSubmit={console.log}
      />
    </Background>
  );
}
