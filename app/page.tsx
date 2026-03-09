"use client";

import { useEffect, useMemo, useRef, useState } from "react";

declare global {
  interface Window {
    ymaps: any;
  }
}

const YANDEX_MAPS_API_KEY =
  typeof process !== "undefined" && process.env
    ? process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY
    : undefined;

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

  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [addressMode, setAddressMode] = useState<"map" | "manual">("map");
  const [manualAddress, setManualAddress] = useState("");
  const [selectedMapAddress, setSelectedMapAddress] = useState("Краснодар, выберите точку на карте");
  const [draftMapAddress, setDraftMapAddress] = useState("Краснодар, выберите точку на карте");
  const [selectedPackageId, setSelectedPackageId] = useState("2-3");
  const [apartment, setApartment] = useState("");
  const [comment, setComment] = useState("");
  const [shouldCall, setShouldCall] = useState<"yes" | "no">("yes");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "sbp">("card");
  const [tip, setTip] = useState<0 | 50 | 100>(0);
  const [mapStatus, setMapStatus] = useState<"idle" | "loading" | "ready" | "error" | "fallback">("idle");

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarkRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  const selectedPrice = useMemo(() => {
    return prices.find((item) => item.id === selectedPackageId) ?? prices[1];
  }, [selectedPackageId]);

  const addressLabel = addressMode === "manual"
    ? manualAddress || "Введите адрес вручную"
    : selectedMapAddress;

  useEffect(() => {
    if (!isAddressOpen || addressMode !== "map") return;
    if (!YANDEX_MAPS_API_KEY) {
      setMapStatus("fallback");
      return;
    }

    const initializeMap = () => {
      if (!window.ymaps || !mapContainerRef.current || mapInstanceRef.current) return;

      setMapStatus("loading");

      window.ymaps.ready(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const krasnodarCenter = [45.03547, 38.975313];

        const map = new window.ymaps.Map(mapContainerRef.current, {
          center: krasnodarCenter,
          zoom: 12,
          controls: ["zoomControl", "geolocationControl"],
        });

        const placemark = new window.ymaps.Placemark(
          krasnodarCenter,
          {},
          {
            preset: "islands#blackDotIcon",
          }
        );

        map.geoObjects.add(placemark);
        mapInstanceRef.current = map;
        placemarkRef.current = placemark;
        setMapStatus("ready");

        window.ymaps
          .geocode(krasnodarCenter)
          .then((result: any) => {
            const firstGeoObject = result.geoObjects.get(0);
            if (firstGeoObject) {
              const address = firstGeoObject.getAddressLine();
              setDraftMapAddress(address);
            }
          })
          .catch(() => {
            setDraftMapAddress("Краснодар, выберите точку на карте");
          });

        map.events.add("click", (event: any) => {
          const coords = event.get("coords");

          if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords);
          }

          window.ymaps
            .geocode(coords)
            .then((result: any) => {
              const firstGeoObject = result.geoObjects.get(0);
              if (firstGeoObject) {
                const address = firstGeoObject.getAddressLine();
                setDraftMapAddress(address);
              } else {
                setDraftMapAddress(`Краснодар, ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`);
              }
            })
            .catch(() => {
              setDraftMapAddress(`Краснодар, ${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`);
            });
        });
      });
    };

    if (window.ymaps) {
      initializeMap();
      return;
    }

    if (scriptLoadedRef.current) return;

    scriptLoadedRef.current = true;
    setMapStatus("loading");

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAPS_API_KEY}&lang=ru_RU`;
    script.async = true;
    script.onload = initializeMap;
    script.onerror = () => setMapStatus("fallback");
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, [isAddressOpen, addressMode]);

  return (
    <div className="min-h-screen bg-[#0f1011] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1011]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/musorok-logo-removebg-preview.png" alt="МусорОК" className="h-8 w-auto" />
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
                <div className="rounded-[1.75rem] border border-[#2c3807]/40 bg-[#1a2105] p-6">
                  <div className="mt-4 rounded-3xl border border-white/10 bg-[#17181a] p-5">
                    <div className="mt-4 space-y-3">
                      <button
                        type="button"
                        onClick={() => {
                          setAddressMode("map");
                          setIsAddressOpen((prev) => !prev);
                        }}
                        className="w-full rounded-2xl bg-white/5 p-4 border border-white/10 text-left transition hover:bg-white/10"
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
                              {mapStatus === "fallback" ? (
                                <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#1d1f22,#111214)] p-5">
                                  <div className="mb-4 flex items-center justify-between text-sm text-white/50">
                                    <span>Карта Краснодара</span>
                                    <span>Preview mode</span>
                                  </div>
                                  <div className="grid min-h-[320px] place-items-center rounded-[1.5rem] border border-dashed border-white/10 bg-black/20 p-6 text-center">
                                    <div className="max-w-sm">
                                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl">
                                        📍
                                      </div>
                                      <p className="text-lg font-semibold">Карта будет видна на реальном сайте</p>
                                      <p className="mt-2 text-sm leading-6 text-white/50">
                                        В preview внутри чата внешние скрипты и env-переменные могут не отрабатывать.
                                        На localhost и Vercel загрузится настоящая Яндекс Карта.
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() => setSelectedMapAddress("Краснодар, ул. Красная, 176")}
                                        className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
                                      >
                                        Выбрать тестовый адрес
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  ref={mapContainerRef}
                                  className="min-h-[320px] overflow-hidden rounded-3xl border border-white/10"
                                />
                              )}
                              <p className="mt-3 text-sm text-white/45">
                                {mapStatus === "loading" && "Загружаем карту Краснодара..."}
                                {mapStatus === "ready" && "Кликните по карте, чтобы выбрать дом, потом нажмите «Выбрать адрес»."}
                                {mapStatus === "error" && "Карта не загрузилась. Проверьте API-ключ и перезапустите проект."}
                                {mapStatus === "fallback" && "В preview показывается аккуратная заглушка, а на живом сайте — настоящая карта."}
                              </p>
                              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                                <p className="text-sm text-white/50">Выбранный адрес</p>
                                <p className="mt-1 font-medium">{draftMapAddress}</p>
                                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedMapAddress(draftMapAddress);
                                      setIsAddressOpen(false);
                                    }}
                                    className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:scale-[1.01]"
                                  >
                                    Выбрать адрес
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setIsAddressOpen(false)}
                                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
                                  >
                                    Закрыть
                                  </button>
                                </div>
                              </div>
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
                        <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                          <p className="text-sm text-white/50">Пакеты</p>
                          <div className="mt-3 grid gap-2">
                            {prices.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedPackageId(item.id)}
                                className={`rounded-2xl border px-3 py-3 text-left text-sm font-medium transition duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                                  selectedPackageId === item.id
                                    ? "border-white bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                                }`}
                              >
                                {item.id} пакет{item.id === "1" ? "" : item.id === "2-3" ? "а" : "ов"}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                          <p className="text-sm text-white/50">Стоимость</p>
                          <p className="mt-3 text-3xl font-black">{selectedPrice.label}</p>
                          <p className="mt-2 text-sm text-white/55">{selectedPrice.desc}</p>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                          <p className="text-sm text-white/50">Квартира / подъезд</p>
                          <input
                            value={apartment}
                            onChange={(e) => setApartment(e.target.value)}
                            placeholder="Например: кв. 54, подъезд 2"
                            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                          />
                        </div>

                        <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                          <p className="text-sm text-white/50">Комментарий курьеру</p>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Например: домофон не работает, пакет у двери"
                            rows={3}
                            className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                          />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-2xl bg-white/5 p-4 border border-white/10 sm:col-span-1">
                            <p className="text-sm text-white/50">Позвонить?</p>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setShouldCall("yes")}
                                className={`rounded-2xl px-3 py-3 text-sm font-semibold transition flex items-center justify-center hover:scale-[1.03] active:scale-[0.97] ${
                                  shouldCall === "yes"
                                    ? "bg-white text-black"
                                    : "bg-black/20 text-white hover:bg-white/10"
                                }`}
                              >
                                Да
                              </button>
                              <button
                                type="button"
                                onClick={() => setShouldCall("no")}
                                className={`rounded-2xl px-3 py-3 text-sm font-semibold transition flex items-center justify-center hover:scale-[1.03] active:scale-[0.97] ${
                                  shouldCall === "no"
                                    ? "bg-white text-black"
                                    : "bg-black/20 text-white hover:bg-white/10"
                                }`}
                              >
                                Нет
                              </button>
                            </div>
                          </div>

                          <div className="rounded-2xl bg-white/5 p-4 border border-white/10 sm:col-span-2">
                            <p className="text-sm text-white/50">Способ оплаты</p>
                            <div className="mt-3 grid grid-cols-3 gap-2">
                              <button
                                type="button"
                                onClick={() => setPaymentMethod("card")}
                                className={`rounded-2xl px-3 py-3 text-sm font-semibold transition flex items-center justify-center hover:scale-[1.03] active:scale-[0.97] ${
                                  paymentMethod === "card"
                                    ? "bg-white text-black"
                                    : "bg-black/20 text-white hover:bg-white/10"
                                }`}
                              >
                                Картой
                              </button>
                              <button
                                type="button"
                                onClick={() => setPaymentMethod("cash")}
                                className={`rounded-2xl px-3 py-3 text-sm font-semibold transition flex items-center justify-center hover:scale-[1.03] active:scale-[0.97] ${
                                  paymentMethod === "cash"
                                    ? "bg-white text-black"
                                    : "bg-black/20 text-white hover:bg-white/10"
                                }`}
                              >
                                Наличные
                              </button>
                              <button
                                type="button"
                                onClick={() => setPaymentMethod("sbp")}
                                className={`rounded-2xl px-3 py-3 text-sm font-semibold transition flex items-center justify-center hover:scale-[1.03] active:scale-[0.97] ${
                                  paymentMethod === "sbp"
                                    ? "bg-white text-black"
                                    : "bg-black/20 text-white hover:bg-white/10"
                                }`}
                              >
                                СБП
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                          <p className="text-sm text-white/50">Чаевые</p>
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {[0, 50, 100].map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => setTip(value as 0 | 50 | 100)}
                                className={`rounded-2xl px-3 py-3 text-sm font-semibold transition flex items-center justify-center hover:scale-[1.03] active:scale-[0.97] ${
                                  tip === value
                                    ? "bg-white text-black"
                                    : "bg-black/20 text-white hover:bg-white/10"
                                }`}
                              >
                                {value === 0 ? "Без чаевых" : `${value} ₽`}
                              </button>
                            ))}
                          </div>
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
                  <p className={`text-sm uppercase tracking-[0.18em] ${selectedPackageId === item.id ? "text-black/45" : "text-white/45"}`}>
                    {item.name}
                  </p>
                  <p className="mt-4 text-4xl font-black">{item.label}</p>
                  <p className={`mt-3 ${selectedPackageId === item.id ? "text-black/65" : "text-white/65"}`}>{item.desc}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedPackageId(item.id)}
                    className={`mt-8 w-full rounded-2xl px-4 py-3 font-semibold transition duration-200 hover:scale-[1.02] active:scale-[0.98] ${
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
