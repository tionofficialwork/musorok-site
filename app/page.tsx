import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#fffaf0] px-6 pb-10 pt-40 text-black sm:pt-44">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 1200 820"
        preserveAspectRatio="none"
      >
        <path
          d="M1280 18 C 1128 -18 1054 82 980 150 C 886 236 790 204 680 171 C 554 134 459 156 405 238 C 330 352 458 420 560 486 C 690 570 815 612 1004 602 C 1114 596 1196 548 1280 488"
          fill="none"
          stroke="#efe2bd"
          strokeLinecap="round"
          strokeWidth="96"
        />
        <path
          d="M1280 18 C 1128 -18 1054 82 980 150 C 886 236 790 204 680 171 C 554 134 459 156 405 238 C 330 352 458 420 560 486 C 690 570 815 612 1004 602 C 1114 596 1196 548 1280 488"
          fill="none"
          stroke="#f8efd5"
          strokeLinecap="round"
          strokeWidth="72"
        />
        <path
          d="M1260 32 C 1126 4 1062 92 991 158 C 896 246 790 216 686 184 C 570 148 478 166 424 244 C 348 354 468 414 568 480 C 700 566 818 600 998 592 C 1102 588 1188 540 1260 494"
          fill="none"
          stroke="#d9c89d"
          strokeDasharray="18 34"
          strokeLinecap="round"
          strokeWidth="5"
          opacity="0.42"
        />
      </svg>

      <header className="relative z-10 flex justify-center">
        <div className="text-[40px] font-normal leading-none tracking-[0] sm:text-[50px]">
          <span>Мусор </span>
          <span className="font-black text-[#9edca5]">ОК</span>
        </div>
      </header>

      <section className="relative z-10 flex flex-1 items-center justify-center pb-12 pt-8 text-center">
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
            className="pointer-events-none relative z-20 mx-auto mt-8 h-auto w-[180px] select-none drop-shadow-[0_18px_28px_rgba(0,0,0,0.14)] min-[520px]:absolute min-[520px]:left-[calc(50%+86px)] min-[520px]:top-1/2 min-[520px]:mt-0 min-[520px]:w-[170px] min-[520px]:-translate-y-[28%] sm:left-[calc(50%+128px)] sm:w-[220px] md:left-[calc(50%+168px)] md:w-[260px] lg:left-[calc(50%+198px)] lg:w-[310px]"
          />

          <Image
            src="/trash-bag.png"
            alt=""
            width={728}
            height={880}
            priority
            className="pointer-events-none absolute left-[calc(50%+146px)] top-1/2 z-10 h-auto w-[58px] translate-y-[95%] select-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)] min-[520px]:left-[calc(50%+216px)] min-[520px]:w-[62px] sm:left-[calc(50%+280px)] sm:w-[76px] md:left-[calc(50%+336px)] md:w-[88px] lg:left-[calc(50%+408px)] lg:w-[108px]"
          />
        </div>
      </section>

      <div className="absolute bottom-6 right-6 text-[13px] font-semibold tracking-[0] text-black/35 sm:bottom-8 sm:right-8">
        Powered by TION
      </div>
    </main>
  );
}
