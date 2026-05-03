import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white px-6 pb-10 pt-24 text-black sm:pt-28">
      <header className="flex justify-center">
        <div className="text-[34px] font-normal leading-none tracking-[0] sm:text-[42px]">
          <span>Мусор </span>
          <span className="font-black text-[#9edca5]">ОК</span>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center pb-12 pt-8 text-center">
        <div className="relative flex min-h-[340px] w-full max-w-6xl items-center justify-center sm:min-h-[380px] lg:min-h-[460px]">
          <div className="relative z-10 mx-auto max-w-4xl">
            <h1 className="text-[32px] font-black leading-[1.08] tracking-[0] text-black sm:text-[48px] lg:text-[60px]">
              Привет, Краснодар!
              <span className="block">Мы скоро стартуем!</span>
            </h1>

            <p className="mt-5 text-[17px] font-medium leading-snug tracking-[0] text-black/45 sm:text-[21px]">
              Новости будут тут. Ждите!
            </p>
          </div>

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

      <div className="absolute bottom-6 right-6 text-[13px] font-semibold tracking-[0] text-black/35 sm:bottom-8 sm:right-8">
        Powered by TION
      </div>
    </main>
  );
}
