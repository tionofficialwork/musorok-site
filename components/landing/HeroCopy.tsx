export default function HeroCopy() {
  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Вынос бытового мусора по кнопке
        </span>
        <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-black/70">
          Без звонков
        </span>
        <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-black/70">
          Понятная цена
        </span>
        <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-black/70">
          Заказ за пару минут
        </span>
      </div>

      <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
        Не хотите идти к мусорке?{" "}
        <span className="text-black/55">Вынесем за вас.</span>
      </h1>

      <p className="mt-5 max-w-xl text-base leading-7 text-black/70 sm:text-lg">
        МусорОК — сервис, который помогает быстро заказать вынос бытового
        мусора из квартиры, дома или офиса. Оставляете заявку на сайте —
        курьер забирает пакеты у двери.
      </p>

      <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm font-semibold text-black">Понятный процесс</div>
          <p className="mt-1 text-sm leading-6 text-black/65">
            Выбираете адрес, пакет и контакты — без сложной регистрации и
            лишних шагов.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm font-semibold text-black">Прозрачная подача</div>
          <p className="mt-1 text-sm leading-6 text-black/65">
            Сразу видно, что вы заказываете: бытовой мусор, понятные пакеты,
            понятная логика услуги.
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="#order"
          className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Оформить первый заказ
        </a>

        <a
          href="#how-it-works"
          className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/[0.03]"
        >
          Как это работает
        </a>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-black/60">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Заказ через сайт
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Без скрытых шагов
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Подходит для первого тестового заказа
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-black/10 bg-white/80 p-4 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-black">
              Зачем это работает на конверсию
            </div>
            <p className="mt-1 text-sm leading-6 text-black/65">
              Пользователь сразу понимает оффер: что это за сервис, что именно
              происходит после заявки и почему заказать легко уже сейчас.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl bg-black px-4 py-3 text-center text-white">
            <div className="text-xs uppercase tracking-[0.18em] text-white/60">
              MVP
            </div>
            <div className="mt-1 text-sm font-semibold">
              Упор на быстрый первый заказ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}