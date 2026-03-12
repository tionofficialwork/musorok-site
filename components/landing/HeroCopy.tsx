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
          Заказ за пару минут
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
        <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Понятный процесс</div>
          <p className="mt-1 text-sm leading-6 text-white/65">
            Выбираете адрес, пакет и контакты — без сложной регистрации и
            лишних шагов.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
          <div className="text-sm font-semibold text-white">Прозрачная подача</div>
          <p className="mt-1 text-sm leading-6 text-white/65">
            Сразу видно, что вы заказываете: бытовой мусор, понятные пакеты,
            понятная логика услуги.
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

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Заказ через сайт
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Без скрытых шагов
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Подходит для первого тестового заказа
        </div>
      </div>

      <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            Гео
          </div>
          <div className="mt-2 text-sm font-semibold text-white">
            Работаем в Краснодаре
          </div>
          <p className="mt-1 text-sm leading-6 text-white/60">
            Локальный сервис с понятной зоной запуска без ощущения “непонятно
            где и как это вообще работает”.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            Цена
          </div>
          <div className="mt-2 text-sm font-semibold text-white">
            Стоимость видна заранее
          </div>
          <p className="mt-1 text-sm leading-6 text-white/60">
            Пользователь сразу видит пакет и цену, а не оставляет заявку
            “вслепую”.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            Первый заказ
          </div>
          <div className="mt-2 text-sm font-semibold text-white">
            Удобно попробовать
          </div>
          <p className="mt-1 text-sm leading-6 text-white/60">
            Не нужно разбираться долго: открыл сайт, выбрал пакет, оставил
            заявку.
          </p>
        </div>
      </div>
    </div>
  );
}