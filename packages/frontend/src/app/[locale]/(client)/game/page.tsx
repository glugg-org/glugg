'use client';

import { Background } from '@/lib/components/background';
import { WordForm } from './WordForm';
import { Timer } from './Timer';

export default function GamePage() {
  return (
    <Background className="gap-24">
      <Timer millis={59000} className="size-[170px] xl:size-[200px]" />

      <WordForm
        letters={{ center: 'a', ring: ['b', 'c', 'd', 'e', 'f', 'g'] }}
        onWordSubmit={console.log}
      />
    </Background>
  );
}
