export function Background({
  children,
  className = '',
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <main
      className={`min-h-screen bg-cover text-black centered-flex flex-col gap-5
        before:absolute before:inset-0 before:bg-[url(/images/Background.jpg)] before:bg-size-[600px] before:bg-center before:-z-10
        before:brightness-130
        before:saturate-40
        ${className}`}
    >
      {children}
    </main>
  );
}
