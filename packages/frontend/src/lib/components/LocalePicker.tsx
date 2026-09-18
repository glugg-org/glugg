'use client';

/* eslint-disable @next/next/no-img-element */
import { locales } from '@/i18n/locales';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu } from '@base-ui/react/menu';

function LocaleButton({ locale }: { locale: (typeof locales)[number] }) {
  return (
    <div className="overlap-container size-full hover-grow mix-blend-multiply">
      <div className="overlap parchment-amber-800/15 size-full scale-130" />
      <img
        src={`/images/locales/${locale}.png`}
        alt={`Select ${locale}`}
        className="overlap sepia-60 size-full border-neutral-700 border-3"
      />
    </div>
  );
}

export function LocalePicker({ locale }: { locale: (typeof locales)[number] }) {
  const pathname = usePathname();

  return (
    <div className="centered-flex flex-col gap-4 xl:gap-6 absolute top-4 right-4 xl:top-6 xl:right-6">
      <Menu.Root>
        <Menu.Trigger className="size-10 xl:size-16         ">
          <LocaleButton locale={locale} />
        </Menu.Trigger>

        <Menu.Portal>
          <Menu.Positioner
            sideOffset={({ anchor: { height } }) => 0.4 * height}
          >
            <Menu.Popup
              className="relative origin-[var(--transform-origin)]
                         transition-[scale,opacity] duration-100 ease-out
                         data-ending-style:scale-[0.5] data-ending-style:opacity-0
                         data-starting-style:scale-[0.5] data-starting-style:opacity-0
                        "
            >
              {locales
                .filter((l) => l !== locale)
                .map((locale) => (
                  <Menu.LinkItem
                    key={locale}
                    className="size-10 xl:size-16 centered-flex"
                    render={
                      <Link href={pathname} locale={locale}>
                        <LocaleButton locale={locale} />
                      </Link>
                    }
                  />
                ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}
