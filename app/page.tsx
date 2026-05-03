const roundedFont =
  "'SF Compact Rounded', 'SF Pro Rounded', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export default function Home() {
  return (
    <main
      className="flex min-h-[100svh] flex-col bg-white px-6 py-7 text-black"
      style={{ fontFamily: roundedFont }}
    >
      <header className="flex justify-center">
        <div className="text-[34px] font-semibold leading-none tracking-[0] sm:text-[42px]">
          <span>Мусор </span>
          <span className="font-black text-[#9edca5]">ОК</span>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center text-center">
        <h1 className="max-w-4xl text-[42px] font-black leading-[1.08] tracking-[0] text-black sm:text-[64px] lg:text-[82px]">
          Привет, Краснодар!
          <span className="block">Мы скоро стартуем!</span>
        </h1>
      </section>
    </main>
  );
}
