type PricesSectionProps = {
  selectedPackageId: string;
  setSelectedPackageId: React.Dispatch<React.SetStateAction<string>>;
  setOrderStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
};

export default function PricesSection({
  selectedPackageId,
  setSelectedPackageId,
  setOrderStep,
}: PricesSectionProps) {
  const plans = [
    {
      id: "small",
      title: "1 пакет",
      price: "99 ₽",
      description:
        "Для быстрого и самого простого заказа, когда нужно вынести немного бытового мусора.",
      points: [
        "Подходит для небольшого объёма",
        "Удобно попробовать сервис впервые",
        "Понятный старт без лишних затрат",
      ],
      accent: false,
    },
    {
      id: "medium",
      title: "2–3 пакета",
      price: "149 ₽",
      description:
        "Оптимальный вариант для большинства обычных заказов из квартиры или дома.",
      points: [
        "Самый понятный повседневный сценарий",
        "Хороший баланс цены и объёма",
        "Часто подходит для регулярного использования",
      ],
      accent: true,
      badge: "Популярный вариант",
    },
    {
      id: "large",
      title: "4+ пакетов",
      price: "199 ₽",
      description:
        "Когда мусора накопилось больше обычного и нужен более объёмный вынос за один раз.",
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

  const handleSelect = (planId: string) => {
    setSelectedPackageId(planId);
    setOrderStep(1);

    const orderSection = document.getElementById("order");
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          {plans.map((plan) => {
            const isSelected = selectedPackageId === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative flex h-full flex-col rounded-3xl border p-6 transition sm:p-7 ${
                  isSelected
                    ? "border-emerald-400/60 bg-emerald-400/[0.14] shadow-[0_0_0_1px_rgba(52,211,153,0.20),0_20px_60px_rgba(16,185,129,0.08)]"
                    : plan.accent
                    ? "border-emerald-400/25 bg-emerald-400/[0.06]"
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

                  <div className="flex flex-col items-end gap-2">
                    {plan.badge ? (
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                        {plan.badge}
                      </span>
                    ) : null}

                    {isSelected ? (
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                        Вы выбрали
                      </span>
                    ) : null}
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-white/65 sm:text-base">
                  {plan.description}
                </p>

                <div className="mt-6 space-y-3">
                  {plan.points.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span
                        className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                          isSelected ? "bg-white" : "bg-emerald-400"
                        }`}
                      />
                      <span className="text-sm leading-6 text-white/78">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(plan.id)}
                  className={`mt-auto inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                    isSelected
                      ? "bg-white text-black hover:bg-white/90"
                      : plan.accent
                      ? "bg-white text-black hover:bg-white/90"
                      : "border border-white/12 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {isSelected ? "Тариф выбран" : "Выбрать этот вариант"}
                </button>

                <div className="mt-3 min-h-[20px] text-center text-xs">
                  {isSelected ? (
                    <span className="text-emerald-300">
                      Этот тариф уже подставлен в форму заказа
                    </span>
                  ) : (
                    <span className="text-transparent">.</span>
                  )}
                </div>
              </div>
            );
          })}
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
            <div className="text-lg font-semibold text-white">
              Что важно заранее
            </div>
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