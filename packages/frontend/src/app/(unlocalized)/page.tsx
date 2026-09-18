import { Background } from '@/lib/components/background';
import { DetectLocaleAndRedirect } from './DetectLocaleAndRedirect';

export default function RedirectPage() {
  return (
    <Background>
      <DetectLocaleAndRedirect />
    </Background>
  );
}
