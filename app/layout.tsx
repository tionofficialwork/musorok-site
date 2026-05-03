import type { Metadata } from "next";
import "./globals.css";
import YandexMetrica from "@/components/analytics/YandexMetrica";

const yandexMetricaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || 0);

export const metadata: Metadata = {
  metadataBase: new URL("https://musorok-site.vercel.app"),

  title: {
    default: "МусорОК — скоро в Краснодаре",
    template: "%s | МусорОК",
  },

  description:
    "МусорОК готовится к запуску в Краснодаре. Скоро покажем новый сервис для выноса мусора из квартиры.",

  openGraph: {
    title: "МусорОК — скоро в Краснодаре",
    description:
      "Мы наводим финальный порядок и скоро покажем новый сервис для выноса мусора из квартиры.",
    url: "https://musorok-site.vercel.app",
    siteName: "МусорОК",
    locale: "ru_RU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "МусорОК — скоро в Краснодаре",
    description:
      "Скоро покажем новый сервис для выноса мусора из квартиры.",
  },

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
        {yandexMetricaId > 0 ? (
          <YandexMetrica counterId={yandexMetricaId} />
        ) : null}
      </body>
    </html>
  );
}
