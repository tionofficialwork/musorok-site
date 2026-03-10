export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1011]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <a href="#top" className="flex items-center">
            <img
              src="/musorok-logo-removebg-preview.png"
              alt="МусорОК"
              className="h-8 w-auto cursor-pointer"
            />
          </a>
          <span className="hidden text-sm text-white/60 md:block">
            Сервис выноса мусора в Краснодаре
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-white/75 md:flex">
          <a href="#how" className="transition hover:text-white">
            Как это работает
          </a>
          <a href="#prices" className="transition hover:text-white">
            Тарифы
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
}