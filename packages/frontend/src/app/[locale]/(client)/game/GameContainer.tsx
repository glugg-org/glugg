'use client';

import { Letters } from '@glugg/shared';
import { Timer } from './Timer';
import { WordForm } from './WordForm';
import { useEffect, useState } from 'react';
import { Leaderboard } from './Leaderboard';

export function GameContainer() {
  const game = {
    initialMillis: 0,
    letters: { center: 'a', ring: ['b', 'c', 'd', 'e', 'f', 'g'] },
  };

  const [leaderboard, setLeaderboard] = useState<Record<string, number>>({
    UserA: 1000,
    USERBASDHAUDHASLGDFYASDFL: 100,
    Emilio: 198320931,
    Javi: 1293,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard((leaderboard) =>
        Object.fromEntries(
          Object.entries(leaderboard).map(([user, _score]) => [
            user,
            Math.floor(Math.random() * 1000),
          ]),
        ),
      );
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [setLeaderboard]);

  return (
    <div className="centered-flex flex-col gap-6">
      <Timer
        millis={59000}
        initialMillis={game.initialMillis}
        className="size-[140px] xl:size-[200px]"
      />

      <Leaderboard leaderboard={leaderboard} />

      <WordForm letters={game.letters as Letters} onWordSubmit={console.log} />
    </div>
  );
}
