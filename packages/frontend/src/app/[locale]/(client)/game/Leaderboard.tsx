import { AnimatePresence, motion } from 'motion/react';

const MAX = 3;

export function Leaderboard({
  leaderboard,
  className = '',
}: {
  leaderboard: Record<string, number>;
  className?: string;
}) {
  const entries = Object.entries(leaderboard)
    .sort(([, a], [, b]) => b - a)
    .slice(0, MAX);

  return (
    <div
      className={`overlap-container text-xl h-[4.5em] w-[12em] ${className}`}
    >
      <div className="overlap w-full h-full">
        <div className="w-full h-[1.4em] parchment-amber-500/30 my-0.5" />
        <div className="w-full h-[1.4em] parchment-orange-500/30 my-0.5" />
        <div className="w-full h-[1.4em] parchment-red-500/30 my-0.5" />
      </div>
      <div className="overlap w-full h-full overflow-y-hidden">
        <AnimatePresence initial={false}>
          {entries.map(([id, value], index) => (
            <motion.div
              key={id}
              layout
              animate={{ opacity: 1, y: 0 }}
              initial={{
                opacity: 0,
                y: `${(1.525 * (MAX - index)).toString()}em`,
              }}
              exit={{
                opacity: 0,
                y: `${(1.525 * (MAX - index)).toString()}em`,
                position: 'absolute',
              }}
              transition={{
                layout: {
                  duration: 0.2,
                  ease: 'easeInOut',
                },
                opacity: {
                  duration: 0.1,
                  ease: 'easeOut',
                },
              }}
              className="grid grid-cols-[0.75em_4em_2em] gap-4 items-center justify-center my-0.5"
            >
              <div className="overflow-hidden text-right tabular-nums">
                {index + 1}
              </div>
              <div className="overflow-hidden">{id}</div>
              <div className="overflow-hidden text-right tabular-nums">
                {value}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
