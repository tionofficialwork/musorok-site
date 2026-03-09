export default function MusorokLanding() {
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
    { name: "Базовый", price: "99 ₽", desc: "1 пакет бытового мусора" },
    { name: "Семейный", price: "149 ₽", desc: "2–3 пакета" },
    { name: "Много всего", price: "от 199 ₽", desc: "4+ пакета или объёмный заказ" },
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

  return (
    <div className="min-h-screen bg-[#0f1011] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1011]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white px-3 py-1 text-2xl font-black uppercase tracking-tight text-black">
              МусорОК
            </div>
            <span className="hidden text-sm text-white/60 md:block">Сервис выноса мусора по кнопке</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-white/75 md:flex">
            <a href="#how" className="transition hover:text-white">Как это работает</a>
            <a href="#prices" className="transition hover:text-white">Тарифы</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                Краснодар • пилотный запуск в больших ЖК
              </div>
              <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Лень выносить мусор?
                <span className="mt-3 block text-white/70">МусорОК вынесет за тебя.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
                Заказывайте вынос бытового мусора через сайт или приложение. Исполнитель приходит,
                забирает пакеты и относит их к контейнерам — быстро, просто и без лишней суеты.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#cta"
                  className="rounded-2xl bg-white px-6 py-4 text-center text-base font-bold text-black transition hover:scale-[1.02]"
                >
                  Оставить заявку
                </a>
                <a
                  href="#how"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Как это работает
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/60">
                <span className="rounded-full border border-white/10 px-3 py-2">от 99 ₽</span>
                <span className="rounded-full border border-white/10 px-3 py-2">10–30 минут</span>
                <span className="rounded-full border border-white/10 px-3 py-2">сайт + приложение</span>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30">
                <div className="rounded-[1.75rem] border border-white/10 bg-[#17181a] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/50">Первая итерация сервиса</p>
                      <p className="mt-2 text-4xl font-black tracking-tight">МусорОК</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-2 text-sm font-bold text-black">онлайн</div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <span>Заказ №001</span>
                      <span>Сейчас</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-sm text-white/50">Адрес</p>
                        <p className="mt-1 font-medium">Краснодар, ЖК рядом с вами</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-sm text-white/50">Пакеты</p>
                          <p className="mt-1 font-medium">2 пакета</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-sm text-white/50">Стоимость</p>
                          <p className="mt-1 font-medium">149 ₽</p>
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

        <section id="how" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Как это работает</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Три простых шага, чтобы не нести мусор самому</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-black">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-white/65">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="prices" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Тарифы</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Понятные цены без сложных условий</h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {prices.map((item) => (
                <div key={item.name} className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/45">{item.name}</p>
                  <p className="mt-4 text-4xl font-black">{item.price}</p>
                  <p className="mt-3 text-white/65">{item.desc}</p>
                  <button className="mt-8 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 font-semibold transition hover:bg-white/10">
                    Выбрать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Для кого</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Сервис для тех, кто ценит время и комфорт</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {audience.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white/85">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-black">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/45">Оффер</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Не носи мусор. Живи нормально.</h2>
              <p className="mt-4 leading-7 text-black/65">
                МусорОК — это бытовой сервис нового типа: открыл, заказал, отдал пакет, забыл о проблеме.
                Без звонков, ожиданий и лишней суеты.
              </p>
              <div className="mt-8 space-y-3">
                <div className="rounded-2xl bg-black/5 p-4">Подходит для пилотного запуска в одном районе или ЖК</div>
                <div className="rounded-2xl bg-black/5 p-4">Легко расширяется до приложения с подпиской</div>
                <div className="rounded-2xl bg-black/5 p-4">Можно развить в сервис микро-поручений</div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.04] p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Оставить заявку</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Запустим МусорОК в вашем ЖК</h2>
                <p className="mt-4 max-w-2xl leading-7 text-white/65">
                  Оставьте контакты, чтобы первыми получить доступ к сервису и узнать о запуске в вашем районе.
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
                  Нажимая кнопку, вы соглашаетесь на обработку данных. Текст политики можно добавить на следующем этапе.
                </p>
              </form>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Частые вопросы</h2>
          </div>
          <div className="mt-10 grid gap-4">
            {faq.map((item) => (
              <div key={item.q} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
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
          <p>Сделано в чёрно-белом стиле под ваш логотип</p>
        </div>
      </footer>
    </div>
  );
}
