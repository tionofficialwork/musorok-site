"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

type YandexMetricaProps = {
  counterId: number;
};

export default function YandexMetrica({
  counterId,
}: YandexMetricaProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!counterId) return;
    if (typeof window === "undefined") return;
    if (typeof window.ym !== "function") return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    window.ym(counterId, "hit", url);
  }, [counterId, pathname, searchParams]);

  return (
    <>
      <Script
        id="yandex-metrica"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${counterId}, "init", {
              defer: true,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          `,
        }}
      />

      <noscript>
        <div>
          <img
            src={"https://mc.yandex.ru/watch/" + counterId}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}