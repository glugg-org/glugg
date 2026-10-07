import { backgroundStyle } from '@/lib/components/Background';
import { Drawer } from '@base-ui/react';
import { cn } from 'cn';
import { useTranslations } from 'next-intl';

export function WordList({
  words,
  className = '',
}: {
  words: string[];
  className?: string;
}) {
  return (
    <div className={cn('h-full overlap-container', className)}>
      <div className="overlap size-full parchment-amber-800/10 scale-y-107" />
      <div
        className={cn(
          `
        overlap
        h-full
        overflow-y-auto
        px-[7%]
        py-[1em]
        [mask-image:linear-gradient(to_bottom,transparent,black_1em,black_calc(100%-1em),transparent)]
        [mask-size:100%_100%]
        [mask-repeat:no-repeat]
        [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_1em,black_calc(100%-1em),transparent)]
        [-webkit-mask-size:100%_100%]
        [-webkit-mask-repeat:no-repeat]
      `,
          className,
        )}
      >
        <ul className="centered-flex flex-wrap gap-x-[0.08em] gap-y-[0.18em]">
          {words.map((word) => (
            <li
              key={word}
              className="parchment-amber-800/15 px-[0.5em] py-[0.04em]"
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WordListColumn({
  words,
  className = '',
}: {
  words: string[];
  className?: string;
}) {
  const t = useTranslations('WordList');

  return (
    <div
      className={cn(
        'hidden lg:flex flex-col justify-center items-center gap-[1em]',
        className,
      )}
    >
      <div className="centered-flex flex-col text-[1.2em] font-bold w-fit">
        <h2>{t('title')}</h2>
        <div className="parchment-orange-500/30 hover:parchment-orange-500/45 transition-colors duration-200 w-full scale-x-130 h-[1.13em] -mt-[1.1em]" />
      </div>
      <WordList words={words} className="h-[75dvh]" />
    </div>
  );
}

export function WordListDrawer({
  words,
  className = '',
}: {
  words: string[];
  className?: string;
}) {
  const t = useTranslations('WordList');

  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.SwipeArea className="absolute inset-y-0 right-0 w-10" />
      <Drawer.Trigger className="lg:hidden overlap-container hover-grow mix-blend-multiply size-10 absolute top-4 right-4">
        <div className="overlap parchment-amber-800/15 size-full scale-130" />
        <div className="overlap centered-flex flex-col justify-evenly size-full">
          <div className="overlap parchment-neutral-800/80 w-full h-1.5" />
          <div className="overlap parchment-neutral-800/80 w-full h-1.5" />
          <div className="overlap parchment-neutral-800/80 w-full h-1.5" />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="lg:hidden [--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport
          className={`
          lg:hidden
          [--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] fixed inset-0 flex items-stretch justify-end p-(--viewport-padding)
        `}
        >
          <Drawer.Popup
            className={cn(
              `[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px]
            h-full w-[calc(90dvw+3rem)] max-w-[calc(90dvw+3rem)]
            supports-[-webkit-touch-callout:none]:w-[calc(90dvw+3rem)] supports-[-webkit-touch-callout:none]:max-w-[(90-dvw+3rem)]
            -mr-[3rem]
            border-l-4 border-neutral-800 p-6 pr-[calc(1.5rem+3rem)] outline-none
            shadow-[0.25rem_0.25rem_0] shadow-black/12
            
            overflow-y-auto overscroll-contain touch-auto
            
            [transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]
            data-swiping:select-none data-ending-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-starting-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]
            supports-[-webkit-touch-callout:none]:mr-0
            supports-[-webkit-touch-callout:none]:border supports-[-webkit-touch-callout:none]:pr-6
            text-black
            `,
              backgroundStyle,
              className,
            )}
          >
            <Drawer.Content className="w-full centered-flex flex-col h-full gap-[1em]">
              <Drawer.Title className="centered-flex flex-col text-[1.2em] font-bold">
                {t('title')}
                <div className="parchment-orange-500/30 hover:parchment-orange-500/45 transition-colors duration-200 w-full scale-x-130 h-[1.13em] -mt-[1.1em]" />
              </Drawer.Title>
              <div className="relative h-[75dvh] flex">
                <Drawer.Description render={() => <WordList words={words} />} />
              </div>
              <div className="flex justify-end">
                <Drawer.Close className="text-[1.1em] parchment-amber-200/90 hover:parchment-amber-300/65 px-4 py-1 text-center text-amber-950 hover-grow">
                  Close
                </Drawer.Close>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
