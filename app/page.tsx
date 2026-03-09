"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const steps = [
    {
      title: "Оставляете заявку",
      text: "Нажимаете кнопку, указываете адрес и количество пакетов. Без долгих форм и лишних действий.",
    },
    {
      title: "Исполнитель приходит",
      text: "Человек рядом забирает мусор в удобное вам время и сразу относит его к контейнерам.",
    },
    {
      title: "Вы остаетесь дома",
      text: "Никаких лифтов, лестниц и походов до мусорки. Просто чисто и спокойно.",
    },
  ];

  const prices = [
    { id: "1", name: "Базовый", price: 99, label: "99 ₽", desc: "1 пакет бытового мусора" },
    { id: "2-3", name: "Семейный", price: 149, label: "149 ₽", desc: "2–3 пакета" },
    { id: "4+", name: "Много всего", price: 199, label: "от 199 ₽", desc: "4+ пакета или объёмный заказ" },
  ];

  const audience = [
    "Тем, кому просто лень выходить",
    "Семьям с детьми",
    "Тем, кто работает из дома",
    "Пожилым людям",
    "Жителям больших ЖК",
    "Тем, кто уже переоделся в домашнее",
  ];

  const faq = [
    {
      q: "Куда вы выносите мусор?",
      a: "В ближайшие разрешённые контейнеры для вашего дома или жилого комплекса. Формат работы можно отдельно уточнить при запуске в конкретном районе.",
    },
    {
      q: "Сколько ждать исполнителя?",
      a: "В пилотной версии можно обещать быстрый выезд в пределах района. Для лендинга удобно заявить формат: от 10 до 30 минут.",
    },
    {
      q: "Можно ли заказать на постоянной основе?",
      a: "Да. В следующей итерации можно добавить регулярный вынос по расписанию: каждый день или несколько раз в неделю.",
    },
  ];

  const krasnodarAreas = [
    "Фестивальный",
    "Юбилейный",
    "Центральный",
    "Черёмушки",
    "Гидростроителей",
    "Пашковский",
    "Западный обход",
    "Немецкая деревня",
  ];

  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [addressMode, setAddressMode] = useState<"map" | "manual">("map");
  const [selectedArea, setSelectedArea] = useState("Фестивальный");
  const [manualAddress, setManualAddress] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("2-3");

  const selectedPrice = useMemo(() => {
    return prices.find((item) => item.id === selectedPackageId) ?? prices[1];
  }, [selectedPackageId]);

  const addressLabel =
    addressMode === "manual"
      ? manualAddress || "Введите адрес вручную"
      : `Краснодар, ${selectedArea}`;

  return (
    <div className="min-h-screen bg-[#0f1011] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1011]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/musorok-logo-removebg-preview.png"
              alt="МусорОК"
              className="h-8 w-auto"
            />
            <span className="hidden text-sm text-white/60 md:block">
              Сервис выноса мусора в Краснодаре
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/75 md:flex">
            <a href="#how" className="transition hover:text-white">
              Как это работает
            </a>
            <a href="#prices" className="transition hover:text-white">
              Тарифы
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-32 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-44">
            <div>
              <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Лень выносить мусор?
                <span className="mt-3 block text-white/70">
                  МусорОК вынесет за тебя.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                Заказывайте вынос бытового мусора через сайт или приложение. Исполнитель
                приходит, забирает пакеты и относит их к контейнерам — быстро, просто и
                без лишней суеты.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30">
                <div className="rounded-[1.75rem] border border-white/10 bg-[#17181a] p-6">
                  <div className="mt-4 rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="mt-4 space-y-3">
                      <button
                        type="button"
                        onClick={() => setIsAddressOpen((prev) => !prev)}
                        className="w-full rounded-2xl bg-white/5 p-4 text-left transition hover:bg-white/10"
                      >
                        <p className="text-sm text-white/50">Адрес</p>
                        <p className="mt-1 font-medium">{addressLabel}</p>
                      </button>

                      {isAddressOpen && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <div className="mb-4 flex gap-2">
                            <button
                              type="button"
                              onClick={() => setAddressMode("map")}
                              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                                addressMode === "map"
                                  ? "bg-white text-black"
                                  : "bg-white/5 text-white hover:bg-white/10"
                              }`}
                            >
                              Выбрать на карте
                            </button>

                            <button
                              type="button"
                              onClick={() => setAddressMode("manual")}
                              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                                addressMode === "manual"
                                  ? "bg-white text-black"
                                  : "bg-white/5 text-white hover:bg-white/10"
                              }`}
                            >
                              Ввести вручную
                            </button>
                          </div>

                          {addressMode === "map" ? (
                            <div>
                              <div className="grid min-h-[220px] place-items-center rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#1d1f22,#111214)] p-6">
                                <div className="w-full max-w-sm">
                                  <div className="mb-4 flex items-center justify-between text-sm text-white/55">
                                    <span>Карта Краснодара</span>
                                    <span>Выберите район</span>
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    {krasnodarAreas.map((area) => (
                                      <button
                                        key={area}
                                        type="button"
                                        onClick={() => setSelectedArea(area)}
                                        className={`rounded-2xl border px-3 py-3 text-sm transition ${
                                          selectedArea === area
                                            ? "border-white bg-white text-black"
                                            : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                                        }`}
                                      >
                                        {area}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <p className="mt-3 text-sm text-white/45">
                                Пока это MVP-карта: на следующем этапе можно подключить
                                настоящую карту с пином.
                              </p>
                            </div>
                          ) : (
                            <div>
                              <input
                                value={manualAddress}
                                onChange={(e) => setManualAddress(e.target.value)}
                                placeholder="Например: Краснодар, ул. Красная, 176"
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-sm text-white/50">Пакеты</p>
                          <div className="mt-3 grid gap-2">
                            {prices.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedPackageId(item.id)}
                                className={`rounded-2xl border px-3 py-3 text-left text-sm font-medium transition ${
                                  selectedPackageId === item.id
                                    ? "border-white bg-white text-black"
                                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                                }`}
                              >
                                {item.id} пакет
                                {item.id === "1" ? "" : item.id === "2-3" ? "а" : "ов"}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-sm text-white/50">Стоимость</p>
                          <p className="mt-3 text-3xl font-black">{selectedPrice.label}</p>
                          <p className="mt-2 text-sm text-white/55">{selectedPrice.desc}</p>
                        </div>
                      </div>
                    </div>

                    <button className="mt-5 w-full rounded-2xl bg-white px-5 py-4 font-bold text-black transition hover:scale-[1.01]">
                      Заберите мусор
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
              Как это работает
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Три простых шага, чтобы не нести мусор самому
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-black">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-white/65">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="prices" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
                Тарифы
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Понятные цены без сложных условий
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {prices.map((item) => (
                <div
                  key={item.name}
                  className={`rounded-[1.75rem] border p-6 transition ${
                    selectedPackageId === item.id
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <p
                    className={`text-sm uppercase tracking-[0.18em] ${
                      selectedPackageId === item.id ? "text-black/45" : "text-white/45"
                    }`}
                  >
                    {item.name}
                  </p>

                  <p className="mt-4 text-4xl font-black">{item.label}</p>
                  <p
                    className={`mt-3 ${
                      selectedPackageId === item.id ? "text-black/65" : "text-white/65"
                    }`}
                  >
                    {item.desc}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedPackageId(item.id)}
                    className={`mt-8 w-full rounded-2xl px-4 py-3 font-semibold transition ${
                      selectedPackageId === item.id
                        ? "border border-black/10 bg-black text-white hover:opacity-90"
                        : "border border-white/15 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {selectedPackageId === item.id ? "Выбрано" : "Выбрать"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
                Для кого
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Сервис для тех, кто ценит время и комфорт
              </h2>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {audience.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white/85"
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

        <section id="cta" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
                  Оставить заявку
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Запустим МусорОК в вашем ЖК
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-white/65">
                  Оставьте контакты, чтобы первыми получить доступ к сервису и узнать о
                  запуске в вашем районе.
                </p>
              </div>

              <form className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                <div className="space-y-3">
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                    placeholder="Ваше имя"
                  />
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                    placeholder="Телефон"
                  />
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                    placeholder="ЖК или адрес"
                  />
                  <button className="w-full rounded-2xl bg-white px-5 py-4 font-bold text-black transition hover:scale-[1.01]">
                    Хочу доступ
                  </button>
                </div>

                <p className="mt-3 text-xs leading-5 text-white/40">
                  Нажимая кнопку, вы соглашаетесь на обработку данных. Текст политики
                  можно добавить на следующем этапе.
                </p>
              </form>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Частые вопросы
            </h2>
          </div>

          <div className="mt-10 grid gap-4">
            {faq.map((item) => (
              <div
                key={item.q}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-lg font-bold">{item.q}</h3>
                <p className="mt-3 leading-7 text-white/65">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© МусорОК — первая итерация лендинга</p>
          <p>powered by TION</p>
        </div>
      </footer>
    </div>
  );
}