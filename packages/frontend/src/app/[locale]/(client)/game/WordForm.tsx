import { Letters } from '@glugg/shared';
import { LetterInput } from './LetterInput';
import { useCallback, useEffectEvent, useState } from 'react';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from 'cn';

export const WORD_MAX_LENGTH = 20;

function shuffleLetters(letters: Letters): Letters {
  const shuffledRing = [...letters.ring]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value) as Letters['ring'];

  return {
    center: letters.center,
    ring: shuffledRing,
  };
}

export function WordForm({
  letters: lettersProp,
  onWordSubmit = () => {
    // Do nothing
  },
  className = '',
}: {
  letters: Letters;
  onWordSubmit?: (word: string) => void;
  className?: string;
}) {
  const t = useTranslations('WordForm');

  const [word, setWord] = useState('');
  const [letters, setLetters] = useState(lettersProp);

  const addLetter = useCallback(
    (letter: string) => {
      setWord((word) =>
        word.split('').length < WORD_MAX_LENGTH
          ? word + letter.toLowerCase()
          : word,
      );
    },
    [setWord],
  );

  const deleteLetter = useCallback(() => {
    setWord((word) => word.substring(0, word.length - 1));
  }, [setWord]);

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      deleteLetter();
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      onWordSubmit(word);
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        className,
      )}
    >
      <p className="text-[1.2em]">
        {word ? (
          word.substring(0, 1).toUpperCase() + word.substring(1)
        ) : (
          <span className="text-gray-700">{t('wordPlaceholder')}</span>
        )}
      </p>
      <LetterInput
        letters={letters}
        onLetterInput={addLetter}
        className="text-[1.7em]"
      />
      <div className="flex flex-row items-center justify-center gap-2">
        <button onClick={deleteLetter}>{t('deleteButton')}</button>
        <button
          onClick={() => {
            setLetters(shuffleLetters);
          }}
        >
          {t('shuffleButton')}
        </button>
        <button
          onClick={() => {
            onWordSubmit(word);
          }}
        >
          {t('enterButton')}
        </button>
      </div>
    </div>
  );
}
