import type { AddressSelectorProps } from "@/lib/types";

export default function AddressSelector({
  isAddressOpen,
  setIsAddressOpen,
  addressMode,
  setAddressMode,
  addressLabel,
  manualAddress,
  setManualAddress,
  mapStatus,
  mapContainerRef,
  setSelectedMapAddress,
}: AddressSelectorProps) {
  const isMapMode = addressMode === "map";

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setAddressMode("map");
          setIsAddressOpen((prev) => !prev);
        }}
        className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10 lg:p-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-white/50">Адрес</p>
            <p className="mt-1 font-medium">{addressLabel}</p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
            {isAddressOpen ? "Скрыть" : "Изменить"}
          </div>
        </div>
      </button>

      {isAddressOpen && (
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 lg:p-4">
          <div className="mb-4 flex gap-2">
            <button
              type="button"
              onClick={() => setAddressMode("map")}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                isMapMode
                  ? "bg-white text-black"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Выбрать на карте
            </button>

            <button
              type="button"
              onClick={() => setAddressMode("manual")}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                !isMapMode
                  ? "bg-white text-black"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Ввести вручную
            </button>
          </div>

          {isMapMode ? (
            <div>
              {mapStatus === "fallback" ? (
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#1d1f22,#111214)] p-5">
                  <div className="mb-4 flex items-center justify-between text-sm text-white/50">
                    <span>Карта Краснодара</span>
                    <span>Preview mode</span>
                  </div>

                  <div className="grid min-h-[220px] place-items-center rounded-[1.5rem] border border-dashed border-white/10 bg-black/20 p-6 text-center lg:min-h-[240px]">
                    <div className="max-w-sm">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl">
                        📍
                      </div>

                      <p className="text-lg font-semibold">
                        Карта будет видна на реальном сайте
                      </p>

                      <p className="mt-2 text-sm leading-6 text-white/50">
                        В preview внутри чата внешние скрипты и env-переменные
                        могут не отрабатывать. На localhost и Vercel загрузится
                        настоящая Яндекс Карта.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedMapAddress("Краснодар, ул. Красная, 176");
                          setIsAddressOpen(false);
                        }}
                        className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-white/10"
                      >
                        Выбрать тестовый адрес
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  ref={mapContainerRef}
                  className="min-h-[220px] overflow-hidden rounded-3xl border border-white/10 lg:min-h-[240px]"
                />
              )}

              <p className="mt-3 text-sm text-white/45">
                {mapStatus === "loading" && "Загружаем карту Краснодара..."}
                {mapStatus === "ready" &&
                  "Кликните по карте, чтобы сразу выбрать адрес."}
                {mapStatus === "error" &&
                  "Карта не загрузилась. Проверьте API-ключ и перезапустите проект."}
                {mapStatus === "fallback" &&
                  "В preview показывается аккуратная заглушка, а на живом сайте — настоящая карта."}
              </p>
            </div>
          ) : (
            <div>
              <input
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                placeholder="Например: Краснодар, ул. Красная, 176"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
              />

              <p className="mt-2 text-sm text-white/45">
                Введите адрес в свободной форме: улица, дом, корпус, подъезд.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}