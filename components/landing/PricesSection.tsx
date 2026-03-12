export default function PricesSection() {
  const plans = [
    {
      title: "1 пакет",
      price: "99 ₽",
      description: "Для быстрого и самого простого заказа, когда нужно вынести немного бытового мусора.",
      points: [
        "Подходит для небольшого объёма",
        "Удобно попробовать сервис впервые",
        "Понятный старт без лишних затрат",
      ],
      accent: false,
    },
    {
      title: "2–3 пакета",
      price: "149 ₽",
      description: "Оптимальный вариант для большинства обычных заказов из квартиры или дома.",
      points: [
        "Самый понятный повседневный сценарий",
        "Хороший баланс цены и объёма",
        "Часто подходит для регулярного использования",
      ],
      accent: true,
      badge: "Популярный вариант",
    },
    {
      title: "4+ пакетов",
      price: "199 ₽",
      description: "Когда мусора накопилось больше обычного и нужен более объёмный вынос за один раз.",
      points: [
        "Для более крупного бытового объёма",
        "Помогает закрыть задачу за один заказ",
        "Без необходимости носить всё самостоятельно",
      ],
      accent: false,
    },
  ];

  const included = [
    "Вынос бытового мусора от двери",
    "Понятный выбор пакета ещё до заявки",
    "Оформление заказа прямо на сайте",
  ];

  const notIncluded = [
    "Строительный мусор",
    "Крупногабаритные предметы",
    "Непрозрачная цена после заявки",
  ];

  return (
    <section id="prices" className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
            Тарифы
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Понятные цены без сложных условий
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Пользователь сразу видит стоимость и может выбрать подходящий
            вариант по количеству пакетов. Это снижает тревогу перед первым
            заказом и делает сервис прозрачнее.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`rounded-3xl border p-6 sm:p-7 ${
                plan.accent
                  ? "border-emerald-400/30 bg-emerald-400/[0.08] shadow-[0_0_0_1px_rgba(52,211,153,0.08)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">
                    {plan.title}
                  </div>
                  <div className="mt-3 text-4xl font-semibold tracking-tight text-white">
                    {plan.price}
                  </div>
                </div>

                {plan.badge ? (
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {plan.badge}
                  </span>
                ) : null}
              </div>

              <p className="mt-5 text-sm leading-6 text-white/65 sm:text-base">
                {plan.description}
              </p>

              <div className="mt-6 space-y-3">
                {plan.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    <span className="text-sm leading-6 text-white/78">{point}</span>
                  </div>
                ))}
              </div>

              <a
                href="#order"
                className={`mt-7 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  plan.accent
                    ? "bg-white text-black hover:bg-white/90"
                    : "border border-white/12 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Выбрать этот вариант
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <div className="text-lg font-semibold text-white">Что входит</div>
            <div className="mt-5 space-y-3">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-sm leading-6 text-white/78">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <div className="text-lg font-semibold text-white">Что важно заранее</div>
            <div className="mt-5 space-y-3">
              {notIncluded.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white/35" />
                  <span className="text-sm leading-6 text-white/72">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-lg font-semibold text-white">
                Цена видна до оформления заказа
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65 sm:text-base">
                Это важный сигнал доверия: человек понимает стоимость заранее,
                не оставляет заявку вслепую и проще решается попробовать сервис
                впервые.
              </p>
            </div>

            <a
              href="#order"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Перейти к заказу
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}