import type { Metadata } from "next";
import "./globals.css";
import YandexMetrica from "@/components/analytics/YandexMetrica";

const yandexMetricaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || 0);

export const metadata: Metadata = {
  title: "МусорОК — вынос бытового мусора по кнопке",
  description:
    "МусорОК — сервис выноса бытового мусора из квартиры или офиса. Быстрый заказ, понятные цены, удобный выезд.",
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