'use client';

import { Letters } from '@glugg/shared';
import { Timer } from './Timer';
import { WordForm } from './WordForm';
import { useEffect, useState } from 'react';
import { Leaderboard } from './Leaderboard';
import { WordList, WordListColumn, WordListDrawer } from './WordListDrawer';

const words = [
  'oak',
  'lantern',
  'whisper',
  'cactus',
  'moonlight',
  'river',
  'quartz',
  'butterfly',
  'thunderstorm',
  'map',
  'velvet',
  'sunflower',
  'keyboard',
  'labyrinth',
  'ocean',
  'spark',
  'telescope',
  'meadow',
  'extraordinary',
  'pencil',
  'firefly',
  'architecture',
  'cloud',
  'adventure',
  'crystal',
  'symphony',
  'pineapple',
  'serendipity',
  'book',
  'constellation',
  'fox',
  'bridge',
  'cinnamon',
  'star',
  'mountain',
  'breeze',
  'dragonfly',
  'compass',
  'rainbow',
  'whistle',
  'horizon',
  'marshmallow',
  'garden',
  'volcano',
  'feather',
  'blueprint',
  'waterfall',
  'echo',
  'magnificent',
  'island',
  'raindrop',
  'chocolate',
  'tornado',
  'silhouette',
  'forest',
  'kaleidoscope',
  'journey',
  'diamond',
  'fireplace',
  'extraordinary',
];

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
    <div className="flex justify-center items-center gap-40">
      <div className="centered-flex flex-col gap-6">
        <WordListDrawer words={words} />

        <Timer
          millis={59000}
          initialMillis={game.initialMillis}
          className="size-[140px] xl:size-[200px]"
        />

        <Leaderboard leaderboard={leaderboard} />

        <WordForm
          letters={game.letters as Letters}
          onWordSubmit={console.log}
        />
      </div>
      <WordListColumn words={words} />
    </div>
  );
}
