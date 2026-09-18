'use client';

import { Background } from '@/lib/components/background';
import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';
import './[locale]/globals.css';
import { useEffect, useState } from 'react';
import { getBrowserLocale } from '@/lib/i18n/getBrowserLocale';

export default function NotFound() {
  const [t, setT] = useState<Record<string, string>>();

  useEffect(() => {
    const locale = getBrowserLocale();

    import(`../../messages/${locale}.json`)
      .then((t) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setT(t.default.NotFound);
      })
      .catch(() => {
        // Do nothing
      })
      .finally(() => {
        // Do nothing
      });
  });

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Background className="gap-7 xl:gap-12">
          <div className="centered-flex flex-col gap-6 xl:flex-row xl:gap-15">
            <div className="overlap-container">
              <div className="overlap size-[245px] xl:size-[450px] parchment-amber-800/10" />
              <ExportedImage
                src="/images/Logo.png"
                loading="eager"
                alt=""
                width={350}
                height={350}
                className="overlap drop-shadow-xl drop-shadow-neutral-900 animate-wiggle size-[200px] xl:size-[350px] hover-grow/[0.5s] rotate-180"
              />
            </div>

            <div className="centered-flex flex-col gap-7 xl:gap-10 xl:-mt-6">
              <div className="centered-flex flex-col gap-2">
                <div className="centered-flex flex-col text-3xl sm:text-4xl font-bold md:text-5xl lg:text-6xl">
                  <h1>{t ? t.title : ''}</h1>
                  <div className="parchment-red-500/30 hover:parchment-red-500/45 transition-colors duration-200 w-[110%] h-[1.13em] -mt-[0.85em]" />
                </div>

                <div className="centered-flex flex-col text-2xl xl:text-6xl">
                  <p>{t ? t.description : ''}</p>
                  <div className="parchment-orange-500/30 hover:parchment-orange-500/45 transition-colors duration-200 w-[110%] h-[1.13em] -mt-[0.85em]" />
                </div>
              </div>

              <Link
                className="text-3xl parchment-amber-200/90 hover:parchment-amber-300/65 px-4 py-3 min-w-40 text-center text-amber-950 xl:text-4xl xl:min-w-70 xl:text-5xl xl:py-6 hover-grow"
                href="/"
              >
                {t ? t.return : ''}
              </Link>
            </div>
          </div>
        </Background>
      </body>
    </html>
  );
}
