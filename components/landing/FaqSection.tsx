export default function FaqSection() {
  const faqs = [
    {
      question: "Что именно можно заказать через МусорОК?",
      answer:
        "Сервис предназначен для выноса бытового мусора: обычных пакетов из квартиры, дома или офиса. Пользователь выбирает подходящий пакетный вариант и оставляет заявку через сайт.",
    },
    {
      question: "Как оформить заказ?",
      answer:
        "Нужно выбрать адрес, указать количество пакетов и оставить контактные данные. После этого заявка отправляется в систему, и заказ берётся в работу.",
    },
    {
      question: "Цена известна заранее?",
      answer:
        "Да. Стоимость видна на сайте до оформления заказа. Это помогает сразу понять подходящий вариант и не оставлять заявку вслепую.",
    },
    {
      question: "Нужно ли звонить или долго переписываться?",
      answer:
        "Нет, базовый сценарий построен так, чтобы пользователь мог быстро оставить заявку прямо на сайте без лишних действий и сложной регистрации.",
    },
    {
      question: "Подходит ли сервис для первого пробного заказа?",
      answer:
        "Да. МусорОК как раз рассчитан на простой первый сценарий: понятный оффер, прозрачные тарифы и короткая форма без перегруза.",
    },
    {
      question: "Что не входит в услугу?",
      answer:
        "Сайт ориентирован именно на бытовой мусор в пакетах. Если речь идёт о строительном мусоре, крупногабаритных предметах или нестандартном объёме, это уже не базовый сценарий услуги.",
    },
  ];

  return (
    <section id="faq" className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              FAQ
            </div>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Частые вопросы перед первым заказом
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
              Здесь мы закрываем основные сомнения перед первым заказом:
              что входит в услугу, как всё работает и почему оформить заявку
              можно спокойно уже сейчас.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
              <div className="text-lg font-semibold text-white">
                Всё построено вокруг простого сценария
              </div>
              <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
                Пользователь не должен долго разбираться. Чем понятнее оффер,
                шаги и тарифы, тем выше доверие и вероятность первого заказа.
              </p>

              <a
                href="#order"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Перейти к оформлению
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/15 hover:bg-white/[0.055] sm:p-7"
              >
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/68 sm:text-base">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}