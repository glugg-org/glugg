import { Link } from '@/i18n/navigation';
import { Background } from '@/lib/components/background';
import { useTranslations } from 'next-intl';
import ExportedImage from 'next-image-export-optimizer';

export default function Home() {
  const t = useTranslations('HomePage');

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

        <div className="centered-flex flex-col gap-7 xl:gap-10 xl:-mt-6">
          <div className="centered-flex flex-col text-7xl font-bold xl:text-[5.5rem]">
            <h1>{t('title')}</h1>
            <div className="parchment-red-500/30 hover:parchment-red-500/45 transition-colors duration-200 w-[4em] h-[1.13em] -mt-[0.85em]" />
          </div>

          <Link
            className="text-3xl parchment-amber-200/90 hover:parchment-amber-300/65 px-4 py-3 min-w-40 text-center text-amber-950 xl:text-4xl xl:min-w-70 xl:text-5xl xl:py-6 hover-grow"
            href="/game"
          >
            {t('playButton')}
          </Link>
        </div>
      </div>
    </Background>
  );
}
