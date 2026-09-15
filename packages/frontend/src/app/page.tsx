export default function Home() {
  return (
    <main className="min-h-screen bg-[url(/background.jpg)] bg-cover text-black flex flex-col items-center justify-center gap-5">
      <h1 className="text-7xl">Glugg</h1>
      <a className="text-3xl" href="/game">
        Play
      </a>
    </main>
  );
}
