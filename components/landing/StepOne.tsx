import { prices } from "@/lib/constants";
import type { StepOneProps } from "@/lib/types";

export default function StepOne({
  selectedPackageId,
  setSelectedPackageId,
  selectedPrice,
  addressSelected,
  onContinue,
}: StepOneProps) {
  const canContinue = Boolean(selectedPackageId) && addressSelected;

  const helperText = !addressSelected
    ? "Сначала выберите адрес на карте или введите его вручную."
    : !selectedPackageId
    ? "Теперь выберите подходящий тариф по количеству пакетов."
    : "Адрес и тариф выбраны — можно переходить к деталям заказа.";

  return (
    <div>
      <div className="mb-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
          Шаг 1 из 3
        </div>
        <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
          Выберите адрес и тариф
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
          Сначала укажите, откуда нужно забрать мусор, и выберите подходящий
          вариант по количеству пакетов.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Тариф</p>

          <div className="mt-3 grid gap-2">
            {prices.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPackageId(item.id)}
                className={`rounded-2xl border px-3 py-2.5 text-left text-sm font-medium transition duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  selectedPackageId === item.id
                    ? "border-white bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {item.id} пакет
                {item.id === "1" ? "" : item.id === "2-3" ? "а" : "ов"}
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs leading-5 text-white/45">
            Выберите вариант по количеству пакетов — цену видно сразу.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Стоимость</p>
          <p className="mt-3 text-3xl font-black text-white">
            {selectedPrice.label}
          </p>
          <p className="mt-2 text-sm text-white/55">{selectedPrice.desc}</p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <p className="text-xs uppercase tracking-[0.16em] text-white/35">
              Что дальше
            </p>
            <p className="mt-2 text-sm leading-6 text-white/65">
              После выбора адреса и тарифа вы перейдёте к деталям заказа:
              квартире, подъезду, комментарию и контактам.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={!canContinue}
        className={`mt-4 w-full rounded-2xl px-5 py-3.5 font-bold transition ${
          !canContinue
            ? "cursor-not-allowed bg-white/30 text-black/50"
            : "bg-white text-black hover:scale-[1.01]"
        }`}
      >
        {canContinue ? "Перейти к деталям заказа" : "Продолжить"}
      </button>

      <p
        className={`mt-2 text-sm ${
          canContinue ? "text-emerald-300" : "text-white/45"
        }`}
      >
        {helperText}
      </p>
    </div>
  );
}