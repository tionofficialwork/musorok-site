import SectionTitle from "@/components/landing/SectionTitle";
import { audience } from "@/lib/constants";

export default function AudienceOfferSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <SectionTitle
            eyebrow="Для кого"
            title="Сервис для тех, кто ценит время и комфорт"
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {audience.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/85"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-black">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/45">
            Оффер
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Не носи мусор. Живи нормально.
          </h2>
          <p className="mt-4 leading-7 text-black/65">
            МусорОК — это бытовой сервис нового типа: открыл, заказал, отдал пакет,
            забыл о проблеме. Без звонков, ожиданий и лишней суеты.
          </p>
          <div className="mt-8 space-y-3">
            <div className="rounded-2xl bg-black/5 p-4">
              Подходит для пилотного запуска в одном районе или ЖК
            </div>
            <div className="rounded-2xl bg-black/5 p-4">
              Легко расширяется до приложения с подпиской
            </div>
            <div className="rounded-2xl bg-black/5 p-4">
              Можно развить в сервис микро-поручений
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}