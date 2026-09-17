import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen bg-[url(/background.jpg)] bg-cover text-black flex flex-col items-center justify-center gap-5">
      <h1 className="text-7xl">{t('title')}</h1>
      <Link className="text-3xl" href="/game">
        {t('playButton')}
      </Link>
    </main>
  );
}
