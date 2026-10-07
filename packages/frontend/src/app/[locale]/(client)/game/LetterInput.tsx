import { Letters } from '@glugg/shared';
import { cn } from 'cn';
import ExportedImage from 'next-image-export-optimizer';
import { useEffect } from 'react';

const absoluteStyle = 'absolute inset-0 m-auto w-[1.75em] h-[1.75em]';

export function LetterButton({
  letter,
  Image: ImageProp = <></>,
  onLetterInput = () => {
    // Do nothing
  },
}: {
  letter: string;
  Image?: React.ReactNode;
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
      className={`overlap-container ${absoluteStyle} pointer-events-auto hover-grow`}
    >
      {ImageProp}
      <div className="overlap">{letter.toUpperCase()}</div>
    </button>
  );
}

function CenterPlanet() {
  return (
    <ExportedImage
      src="/images/letterPicker/Center.png"
      loading="eager"
      alt=""
      width={200}
      height={200}
      className="overlap scale-130 -z-1"
    />
  );
}

function OuterPlanetBlue() {
  return (
    <ExportedImage
      src="/images/letterPicker/Outer_Blue.png"
      loading="eager"
      alt=""
      width={200}
      height={200}
      className="overlap scale-100 -z-1"
    />
  );
}

function OuterPlanetCyan() {
  return (
    <ExportedImage
      src="/images/letterPicker/Outer_Cyan.png"
      loading="eager"
      alt=""
      width={200}
      height={200}
      className="overlap scale-100 -z-1"
    />
  );
}

function OuterPlanetRed() {
  return (
    <ExportedImage
      src="/images/letterPicker/Outer_Red.png"
      loading="eager"
      alt=""
      width={200}
      height={200}
      className="overlap scale-100 -z-1"
    />
  );
}

function OuterPlanetOrange() {
  return (
    <ExportedImage
      src="/images/letterPicker/Outer_Orange.png"
      loading="eager"
      alt=""
      width={200}
      height={200}
      className="overlap scale-100 -z-1"
    />
  );
}

function OuterPlanet({ index }: { index: number }) {
  if (index === 0) {
    return <OuterPlanetRed />;
  } else if (index === 1 || index === 4 || index === 5) {
    return <OuterPlanetOrange />;
  } else if (index === 2) {
    return <OuterPlanetCyan />;
  } else {
    return <OuterPlanetBlue />;
  }
}

export function LetterInput({
  letters,
  onLetterInput = () => {
    // Do nothing
  },
  className = '',
}: {
  letters: Letters;
  onLetterInput?: (s: string) => void;
  className?: string;
}) {
  const sortedRing = [...letters.ring].sort();

  return (
    <div className={cn('overlap-container w-[7.3em] h-[7.7em]', className)}>
      <div className="flex overlap w-full h-full parchment-amber-800/10 -z-1" />
      <ExportedImage
        src="/images/letterPicker/Ring.png"
        loading="eager"
        alt=""
        width={800}
        height={800}
        className="overlap size-[5em] drop-shadow-md drop-shadow-neutral-800/60"
      />
      <div className="overlap relative w-[6em] h-[6.6em] drop-shadow-lg drop-shadow-neutral-800/60">
        {/* Center */}
        <LetterButton
          letter={letters.center}
          onLetterInput={onLetterInput}
          Image={<CenterPlanet />}
        />
        {sortedRing.map((letter, index) => {
          const i = letters.ring.findIndex((l) => l === letter);
          const rotation = `${(i * 60).toString()}deg`;

          return (
            <div
              className={`${absoluteStyle} transition-transform duration-400 pointer-events-none`}
              style={{ rotate: rotation }}
              key={index}
            >
              <div
                className={`${absoluteStyle} transition-transform duration-400 -translate-y-[2.25em]`}
                style={{ rotate: `-${rotation}` }}
              >
                <LetterButton
                  letter={letter}
                  onLetterInput={onLetterInput}
                  Image={<OuterPlanet index={index} />}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
