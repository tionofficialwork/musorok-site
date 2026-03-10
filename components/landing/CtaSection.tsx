export default function CtaSection() {
  return (
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
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                placeholder="Ваше имя"
              />
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                placeholder="Телефон"
              />
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
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
  );
}