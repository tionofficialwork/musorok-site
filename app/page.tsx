import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#fffaf0] px-6 pb-6 pt-[74px] text-black min-[390px]:pb-8 min-[390px]:pt-[84px] min-[520px]:px-6 min-[520px]:pb-10 min-[520px]:pt-40 sm:pt-44">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full min-[520px]:block"
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

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full min-[520px]:hidden"
        viewBox="0 0 390 844"
        preserveAspectRatio="none"
      >
        <path
          d="M454 136 C 334 160 306 246 350 332 C 402 434 312 486 224 550 C 144 608 108 700 -54 770"
          fill="none"
          stroke="#efe2bd"
          strokeLinecap="round"
          strokeWidth="66"
        />
        <path
          d="M454 136 C 334 160 306 246 350 332 C 402 434 312 486 224 550 C 144 608 108 700 -54 770"
          fill="none"
          stroke="#f8efd5"
          strokeLinecap="round"
          strokeWidth="46"
        />
        <path
          d="M442 148 C 344 170 318 248 362 326 C 412 420 318 480 232 542 C 156 598 116 690 -42 760"
          fill="none"
          stroke="#d9c89d"
          strokeDasharray="13 25"
          strokeLinecap="round"
          strokeWidth="4"
          opacity="0.35"
        />
      </svg>

      <header className="relative z-10 flex justify-center">
        <div className="text-[36px] font-normal leading-none tracking-[0] min-[390px]:text-[38px] min-[520px]:text-[40px] sm:text-[50px]">
          <span>Мусор </span>
          <span className="font-black text-[#9edca5]">ОК</span>
        </div>
      </header>

      <section className="relative z-10 flex flex-1 items-center justify-center pb-8 pt-7 text-center min-[390px]:pb-11 min-[390px]:pt-8 min-[520px]:pb-12 min-[520px]:pt-8">
        <div className="relative flex min-h-[410px] w-full max-w-6xl flex-col items-center justify-center min-[390px]:min-h-[460px] min-[520px]:min-h-[340px] min-[520px]:flex-row sm:min-h-[380px] lg:min-h-[460px]">
          <div className="relative z-10 mx-auto max-w-[340px] min-[520px]:max-w-4xl">
            <h1 className="text-[28px] font-black leading-[1.08] tracking-[0] text-black min-[390px]:text-[30px] min-[520px]:text-[32px] sm:text-[48px] lg:text-[60px]">
              Привет, Краснодар!
              <span className="block">Мы скоро стартуем!</span>
            </h1>

            <p className="mt-3 text-[15px] font-medium leading-snug tracking-[0] text-black/45 min-[390px]:text-[16px] min-[520px]:mt-5 sm:text-[21px]">
              Новости будут тут. Ждите!
            </p>
          </div>

          <div className="relative z-20 mt-8 flex items-end justify-center gap-0 min-[390px]:mt-9 min-[520px]:hidden">
            <Image
              src="/mobile-character.png"
              alt=""
              width={1024}
              height={1536}
              priority
              className="pointer-events-none h-auto w-[150px] select-none drop-shadow-[0_18px_28px_rgba(0,0,0,0.13)] min-[390px]:w-[170px]"
            />

            <Image
              src="/trash-bag.png"
              alt=""
              width={728}
              height={880}
              priority
              className="pointer-events-none mb-3 h-auto w-[60px] -translate-x-1 select-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)] min-[390px]:mb-4 min-[390px]:w-[70px]"
            />
          </div>

          <Image
            src="/launch-character.png"
            alt=""
            width={1024}
            height={1536}
            priority
            className="pointer-events-none z-20 mx-auto hidden h-auto select-none drop-shadow-[0_18px_28px_rgba(0,0,0,0.14)] min-[520px]:absolute min-[520px]:left-[calc(50%+86px)] min-[520px]:top-1/2 min-[520px]:block min-[520px]:w-[170px] min-[520px]:-translate-y-[28%] sm:left-[calc(50%+128px)] sm:w-[220px] md:left-[calc(50%+168px)] md:w-[260px] lg:left-[calc(50%+198px)] lg:w-[310px]"
          />

          <Image
            src="/trash-bag.png"
            alt=""
            width={728}
            height={880}
            priority
            className="pointer-events-none absolute left-[calc(50%+216px)] top-1/2 z-10 hidden h-auto w-[62px] translate-y-[95%] select-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)] min-[520px]:block sm:left-[calc(50%+280px)] sm:w-[76px] md:left-[calc(50%+336px)] md:w-[88px] lg:left-[calc(50%+408px)] lg:w-[108px]"
          />
        </div>
      </section>

      <div className="absolute bottom-5 right-5 text-[12px] font-semibold tracking-[0] text-black/35 min-[520px]:bottom-6 min-[520px]:right-6 min-[520px]:text-[13px] sm:bottom-8 sm:right-8">
        Powered by TION
      </div>
    </main>
  );
}
