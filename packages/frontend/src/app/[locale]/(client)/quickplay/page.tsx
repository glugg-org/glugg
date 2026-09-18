import { Background } from '@/lib/components/Background';
import ExportedImage from 'next-image-export-optimizer';
import getLocale from '@/lib/i18n/getLocale';
import { QuickplayForm } from './QuickplayForm';
import { getTranslations } from 'next-intl/server';

export default async function Quickplay() {
  const t = await getTranslations('Quickplay');
  const locale = await getLocale();

  return (
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
            className="overlap drop-shadow-xl drop-shadow-neutral-900 animate-wiggle size-[200px] xl:size-[350px] hover-grow/[0.5s]"
          />
        </div>

        <div className="centered-flex flex-col gap-2 xl:gap-4 xl:-mt-6">
          <div className="centered-flex flex-col text-4xl font-bold xl:text-5xl">
            <h1>{t('title')}</h1>
            <div className="parchment-red-500/30 hover:parchment-red-500/45 transition-colors duration-200 w-full scale-x-120 h-[1.13em] -mt-[0.85em]" />
          </div>

          <QuickplayForm locale={locale} />
        </div>
      </div>
    </Background>
  );
}
