export function Background({
  children,
  className = '',
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <main
      className={`min-h-screen bg-cover text-black flex flex-col items-center justify-center gap-5
        before:absolute before:inset-0 before:bg-[url(/images/background.jpg)] before:bg-cover before:bg-center before:-z-10
        before:brightness-130
        before:saturate-40
        ${className}`}
    >
      {children}
    </main>
  );
}
