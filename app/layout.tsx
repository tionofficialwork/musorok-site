import type { Metadata } from "next";
import "./globals.css";
import YandexMetrica from "@/components/analytics/YandexMetrica";

const yandexMetricaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || 0);

export const metadata: Metadata = {
  metadataBase: new URL("https://musorok-site.vercel.app"),

  title: {
    default: "МусорОК — вынос мусора из квартиры",
    template: "%s | МусорОК",
  },

  description:
    "МусорОК — сервис выноса бытового мусора из квартиры или офиса. Закажите вынос мусора онлайн за 2 минуты.",

  openGraph: {
    title: "МусорОК — вынос мусора из квартиры",
    description:
      "Закажите вынос мусора из квартиры или офиса за пару минут. Без звонков, фиксированная цена.",
    url: "https://musorok-site.vercel.app",
    siteName: "МусорОК",
    locale: "ru_RU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "МусорОК — вынос мусора",
    description:
      "Сервис выноса мусора из квартиры. Быстрый заказ онлайн.",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        {children}
        {yandexMetricaId > 0 && (
          <YandexMetrica counterId={yandexMetricaId} />
        )}
      </body>
    </html>
  );
}