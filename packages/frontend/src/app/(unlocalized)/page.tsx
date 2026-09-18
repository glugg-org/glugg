import { Background } from '@/lib/components/Background';
import { DetectLocaleAndRedirect } from './DetectLocaleAndRedirect';

export default function RedirectPage() {
  return (
    <Background>
      <DetectLocaleAndRedirect />
    </Background>
  );
}
