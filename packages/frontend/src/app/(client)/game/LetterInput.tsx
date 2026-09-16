import { Letters } from '@glugg/shared';
import { useEffect } from 'react';

export function LetterButton({
  letter,
  className = '',
  onLetterInput = () => {
    // Do nothing
  },
}: {
  letter: string;
  className?: string;
  onLetterInput?: (letter: string) => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (event.key.toLowerCase() === letter) {
        event.preventDefault();
        onLetterInput(letter);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [letter, onLetterInput]);

  return (
    <button
      onClick={() => {
        onLetterInput(letter);
      }}
      className={`flex justify-center items-center absolute inset-0 m-auto w-[1.75em] h-[1.75em] ${className}`}
    >
      {letter}
    </button>
  );
}

export function LetterInput({
  letters,
  onLetterInput = () => {
    // Do nothing
  },
}: {
  letters: Letters;
  onLetterInput?: (s: string) => void;
}) {
  return (
    <div className="relative w-[6em] h-[6.6em] text-4xl">
      {/* Center */}
      <LetterButton
        letter={letters.center}
        onLetterInput={onLetterInput}
        className=""
      />
      {/* Top */}
      <LetterButton
        letter={letters.ring[0]}
        onLetterInput={onLetterInput}
        className="-translate-y-[2.25em]"
      />
      {/* Top-right */}
      <LetterButton
        letter={letters.ring[1]}
        onLetterInput={onLetterInput}
        className="translate-x-[2em] -translate-y-[1em]"
      />
      {/* Bottom-right */}
      <LetterButton
        letter={letters.ring[2]}
        onLetterInput={onLetterInput}
        className="translate-x-[2em] translate-y-[1em]"
      />
      {/* Bottom */}
      <LetterButton
        letter={letters.ring[3]}
        onLetterInput={onLetterInput}
        className="translate-y-[2.25em]"
      />
      {/* Bottom-left */}
      <LetterButton
        letter={letters.ring[4]}
        onLetterInput={onLetterInput}
        className="-translate-x-[2em] translate-y-[1em]"
      />
      {/* Top-left */}
      <LetterButton
        letter={letters.ring[5]}
        onLetterInput={onLetterInput}
        className="-translate-x-[2em] -translate-y-[1em]"
      />
    </div>
  );
}
