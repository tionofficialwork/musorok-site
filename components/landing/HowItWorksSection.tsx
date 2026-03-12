export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Оставляете заявку на сайте",
      text: "Выбираете адрес, количество пакетов и оставляете контакты. Всё делается быстро, без звонков и длинных форм.",
    },
    {
      number: "02",
      title: "Подтверждаем и берём заказ в работу",
      text: "После заявки заказ появляется у нас в системе. Мы связываемся при необходимости и организуем вынос мусора по вашему адресу.",
    },
    {
      number: "03",
      title: "Пакеты забирают у двери",
      text: "Вам не нужно идти к контейнерам, спускаться с пакетами или тратить на это время. Сервис закрывает эту задачу за вас.",
    },
  ];

  const trustPoints = [
    "Понятный сценарий для первого заказа",
    "Без сложной регистрации",
    "Адрес и пакет выбираются сразу",
    "Стоимость видна заранее",
  ];

  return (
    <section
      id="how-it-works"
      className="border-t border-white/10 bg-[#050816]"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
            Как это работает
          </div>

          <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Три простых шага, чтобы не нести мусор самому
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Мы специально делаем процесс коротким и понятным: пользователь
            быстро оставляет заявку, видит логику услуги и понимает, что будет
            происходить дальше.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm sm:p-7"
            >
              <div className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl bg-white px-3 text-lg font-semibold text-black">
                {step.number}
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                {step.title}
              </h3>

              <p className="mt-4 text-base leading-7 text-white/65">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-white">
                Почему этот сценарий выглядит надёжно
              </div>
              <p className="mt-2 text-sm leading-6 text-white/60 sm:text-base">
                Пользователю не нужно разбираться в сложной механике сервиса.
                Уже на сайте видно, как делается заказ, что он выбирает и в чём
                конкретно ценность: не тратить время и силы на вынос мусора
                самостоятельно.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[420px]">
              {trustPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}