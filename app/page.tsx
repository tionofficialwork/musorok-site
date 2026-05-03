import Image from "next/image";

const launchNotes = [
  {
    label: "Город",
    value: "Краснодар",
  },
  {
    label: "Статус",
    value: "финальная подготовка",
  },
  {
    label: "Старт",
    value: "скоро",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#07130f] text-[#f8fff4]">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#35d07f_0%,#f5d35f_48%,#5bb8ff_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#07130f_0%,#0e241c_52%,#2c2a1d_100%)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:92px_92px]" />
        <div className="absolute bottom-0 right-[-12%] h-[70%] w-[58%] bg-[#f5d35f]/10 [clip-path:polygon(32%_0,100%_12%,100%_100%,0_100%)]" />
        <div className="absolute left-[-12%] top-28 h-[58%] w-[44%] bg-[#35d07f]/10 [clip-path:polygon(0_0,88%_18%,62%_100%,0_82%)]" />
      </div>

      <section className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-6 py-7 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between gap-5">
          <Image
            src="/musorok-start-logo.svg"
            alt="МусорОК"
            width={496}
            height={144}
            priority
            className="h-14 w-auto sm:h-16"
          />

          <div className="hidden items-center gap-3 border-l border-white/25 pl-5 text-sm font-semibold uppercase text-white/70 sm:flex">
            <span className="h-2 w-2 bg-[#35d07f]" />
            Краснодар
          </div>
        </header>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
          <div className="max-w-4xl">
            <p className="mb-6 flex items-center gap-4 text-sm font-black uppercase text-[#f5d35f] sm:text-base">
              <span className="h-px w-12 bg-[#f5d35f]" />
              Стартуем скоро
            </p>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-[0] text-white sm:text-5xl md:text-7xl">
              Привет, Краснодар.
              <span className="block text-[#dfffe9]">
                МусорОК почти готов.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/74 sm:text-xl">
              Мы наводим финальный порядок и совсем скоро покажем ваш новый
              сервис для выноса мусора из квартиры. Без лишнего шума, зато с
              понятным стартом.
            </p>

            <dl className="mt-12 grid gap-5 border-y border-white/15 py-6 sm:grid-cols-3">
              {launchNotes.map((note) => (
                <div key={note.label} className="min-w-0">
                  <dt className="text-xs font-bold uppercase text-white/45">
                    {note.label}
                  </dt>
                  <dd className="mt-2 text-lg font-black text-white">
                    {note.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            aria-hidden
            className="relative min-h-[300px] border-t border-white/15 pt-8 sm:min-h-[360px] lg:min-h-[560px] lg:border-l lg:border-t-0 lg:pl-10"
          >
            <div className="absolute inset-0 lg:left-10">
              <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:46px_46px]" />
              <div className="absolute bottom-0 left-2 h-[72%] w-[62%] border border-white/12 bg-[#06100d]/40" />
              <div className="absolute right-0 top-2 h-[82%] w-[68%] border border-white/12 bg-[#0b2119]/70" />
              <div className="absolute right-8 top-10 h-28 w-28 border-8 border-[#f5d35f]" />
              <div className="absolute bottom-12 left-10 h-40 w-40 bg-[#35d07f]" />
            </div>

            <div className="relative flex h-full min-h-[300px] items-center justify-center sm:min-h-[360px] lg:min-h-[560px]">
              <div className="relative flex h-56 w-56 items-center justify-center border border-white/15 bg-[#f8fff4] text-[#07130f] shadow-[18px_18px_0_#35d07f] sm:h-72 sm:w-72">
                <span className="absolute left-8 top-8 h-12 w-12 border-8 border-[#f5d35f]" />
                <span className="text-7xl font-black leading-none tracking-[0] sm:text-8xl">
                  ОК
                </span>
                <span className="absolute bottom-8 right-8 h-4 w-20 bg-[#5bb8ff]" />
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-white/12 pt-5 text-sm font-semibold text-white/50">
          МусорОК / бережный запуск / Краснодар
        </footer>
      </section>
    </main>
  );
}
