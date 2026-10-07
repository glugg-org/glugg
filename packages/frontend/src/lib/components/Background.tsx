import { cn } from 'cn';

export const backgroundStyle = `
        before:absolute before:inset-0
        before:bg-size-[600px] before:bg-center before:-z-10
        before:bg-[url(/images/Background.jpg)]
        before:brightness-130 before:saturate-40
`;

export function Background({
  children,
  className = '',
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <main
      className={cn(
        'min-h-screen bg-cover text-black centered-flex flex-col gap-5',
        backgroundStyle,
        className,
      )}
    >
      {children}
    </main>
  );
}
