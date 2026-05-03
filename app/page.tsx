import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[100svh] flex-col overflow-hidden bg-white px-6 pb-10 pt-12 text-black sm:pt-16">
      <header className="flex justify-center">
        <div className="text-[34px] font-semibold leading-none tracking-[0] sm:text-[42px]">
          <span>Мусор </span>
          <span className="font-black text-[#9edca5]">ОК</span>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center py-8 text-center">
        <div className="relative flex min-h-[340px] w-full max-w-6xl items-center justify-center sm:min-h-[380px] lg:min-h-[460px]">
          <h1 className="relative z-10 mx-auto max-w-4xl text-[32px] font-black leading-[1.08] tracking-[0] text-black sm:text-[48px] lg:text-[60px]">
            Привет, Краснодар!
            <span className="block">Мы скоро стартуем!</span>
          </h1>

          <Image
            src="/launch-character.png"
            alt=""
            width={1024}
            height={1536}
            priority
            className="pointer-events-none relative z-20 mx-auto mt-8 h-auto w-[180px] select-none drop-shadow-[0_18px_28px_rgba(0,0,0,0.14)] min-[520px]:absolute min-[520px]:left-[calc(50%+104px)] min-[520px]:top-1/2 min-[520px]:mt-0 min-[520px]:w-[170px] min-[520px]:-translate-y-[36%] sm:left-[calc(50%+150px)] sm:w-[220px] md:left-[calc(50%+190px)] md:w-[260px] lg:left-[calc(50%+225px)] lg:w-[310px]"
          />
        </div>
      </section>
    </main>
  );
}
