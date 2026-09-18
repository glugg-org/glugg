import ExportedImage from 'next-image-export-optimizer';
import { useEffect, useState } from 'react';
import './timer.css';

const REVEAL_CENTER = '50% 50%';

export function Timer({
  millis,
  initialMillis = 0,
  className = '',
}: {
  millis: number;
  initialMillis?: number;
  size?: number;
  className?: string;
}) {
  const [revealAngle, setRevealAngle] = useState(
    `${((initialMillis / millis) * 360).toString()}deg`,
  );
  const transition = `--reveal-angle ${millis.toString()}ms linear`;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRevealAngle('360deg');
  }, []);

  const maskStyle = {
    '--reveal-angle': revealAngle,

    maskImage: `conic-gradient(
      from 0deg at ${REVEAL_CENTER},
      transparent 0deg var(--reveal-angle),
      black var(--reveal-angle) 360deg
    )`,

    WebkitMaskImage: `conic-gradient(
      from 0deg at ${REVEAL_CENTER},
      transparent 0deg var(--reveal-angle),
      black var(--reveal-angle) 360deg
    )`,

    transition,
  } as React.CSSProperties;

  const moonMaskStyle = {
    '--reveal-angle': revealAngle,

    maskImage: `conic-gradient(
      from 0deg at ${REVEAL_CENTER},
      black 0deg var(--reveal-angle),
      transparent var(--reveal-angle) 360deg
    )`,

    WebkitMaskImage: `conic-gradient(
      from 0deg at ${REVEAL_CENTER},
      black 0deg var(--reveal-angle),
      transparent var(--reveal-angle) 360deg
    )`,

    transition,
  } as React.CSSProperties;

  return (
    <div
      className={`relative shrink-0 drop-shadow-lg drop-shadow-neutral-900/80 animate-wiggle-small ${className}`}
    >
      <div className="absolute inset-0" style={maskStyle}>
        <ExportedImage
          src="/images/Sol_Aspas.png"
          loading="eager"
          alt=""
          width={200}
          height={200}
          className="size-full"
        />
      </div>

      <div className="absolute inset-0" style={moonMaskStyle}>
        <ExportedImage
          src="/images/Luna.png"
          loading="eager"
          alt=""
          width={200}
          height={200}
          className="size-full -translate-y-[1px] -translate-x-[1px]"
        />
      </div>
    </div>
  );
}
