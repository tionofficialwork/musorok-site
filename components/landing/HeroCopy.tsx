export default function HeroCopy() {
  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          Вынос бытового мусора по кнопке
        </span>
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
          Без звонков
        </span>
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
          Понятная цена
        </span>
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
          Краснодар
        </span>
      </div>

      <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Не хотите идти к мусорке?
        <br />
        <span className="text-white/72">Вынесем за вас.</span>
      </h1>

      <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
        МусорОК — сервис, который помогает быстро заказать вынос бытового
        мусора из квартиры, дома или офиса в Краснодаре. Оставляете заявку на
        сайте — курьер забирает пакеты у двери.
      </p>

      <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Понятный процесс</div>
          <p className="mt-1 text-sm leading-6 text-white/65">
            Выбираете адрес, пакет и контакты — без сложной регистрации и
            лишних шагов.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Прозрачная цена</div>
          <p className="mt-1 text-sm leading-6 text-white/65">
            Сразу видно стоимость заказа, без заявки “вслепую” и непонятных
            условий.
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="#order"
          className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          Оформить первый заказ
        </a>

        <a
          href="#how-it-works"
          className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Как это работает
        </a>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Работаем в Краснодаре
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Без скрытых шагов
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Удобно для первого заказа
        </div>
      </div>
    </div>
  );
}