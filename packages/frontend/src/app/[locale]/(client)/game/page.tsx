'use client';

import { Background } from '@/lib/components/background';
import { WordForm } from './WordForm';
import { Timer } from './Timer';

export default function GamePage() {
  return (
    <Background>
      <Timer millis={59000} />

      <WordForm
        letters={{ center: 'a', ring: ['b', 'c', 'd', 'e', 'f', 'g'] }}
        onWordSubmit={console.log}
      />
    </Background>
  );
}
