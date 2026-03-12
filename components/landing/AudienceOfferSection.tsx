export default function AudienceOfferSection() {
  const trustCards = [
    {
      title: "Понятная услуга",
      text: "Пользователь сразу понимает, что именно он заказывает: вынос бытового мусора от двери без лишней сложности.",
    },
    {
      title: "Прозрачный сценарий",
      text: "На сайте видно, как проходит заказ: адрес, пакет, стоимость и дальнейший шаг. Без ощущения неизвестности.",
    },
    {
      title: "Локальный запуск",
      text: "Сервис сфокусирован на Краснодаре, поэтому выглядит как конкретная городская услуга, а не абстрактный проект.",
    },
    {
      title: "Удобно попробовать",
      text: "Первый заказ можно сделать быстро: без регистрации, без долгих анкет и без необходимости долго разбираться.",
    },
  ];

  const trustPoints = [
    "Стоимость видна заранее",
    "Заказ оформляется через сайт",
    "Подходит для квартиры, дома и офиса",
    "Без сложной регистрации",
    "Понятный выбор по пакетам",
    "Упор на быстрый первый заказ",
  ];

  return (
    <section className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              Почему сервису можно доверять
            </div>

            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Не обещаем лишнего — делаем понятный и прозрачный сервис
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
              Доверие к такому продукту строится не на громких словах, а на
              понятной логике: что это за услуга, сколько она стоит, как
              оформляется заказ и почему её удобно попробовать уже сейчас.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {trustCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition hover:border-white/15 hover:bg-white/[0.055]"
                >
                  <div className="text-lg font-semibold text-white">
                    {card.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
              Сигналы доверия
            </div>

            <div className="mt-5 rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.07] p-5">
              <div className="text-xl font-semibold text-white">
                Сервис выглядит честно уже на первом экране
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
                Пользователь видит оффер, механику заказа и тарифы ещё до
                оформления. Это снижает тревогу и повышает шанс на первый заказ.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-sm leading-6 text-white/78">{point}</span>
                </div>
              ))}
            </div>

            <a
              href="#order"
              className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Оформить заказ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}