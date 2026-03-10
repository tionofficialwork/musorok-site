import { prices } from "@/lib/constants";
import type { PriceOption } from "@/lib/types";

export default function StepOne({
  selectedPackageId,
  setSelectedPackageId,
  selectedPrice,
  addressSelected,
  onContinue,
}: {
  selectedPackageId: string;
  setSelectedPackageId: (value: string) => void;
  selectedPrice: PriceOption;
  addressSelected: boolean;
  onContinue: () => void;
}) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Пакеты</p>
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
                {item.id} пакет{item.id === "1" ? "" : item.id === "2-3" ? "а" : "ов"}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Стоимость</p>
          <p className="mt-3 text-3xl font-black">{selectedPrice.label}</p>
          <p className="mt-2 text-sm text-white/55">{selectedPrice.desc}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={!selectedPackageId || !addressSelected}
        className={`mt-4 w-full rounded-2xl px-5 py-3.5 font-bold transition ${
          !selectedPackageId || !addressSelected
            ? "cursor-not-allowed bg-white/30 text-black/50"
            : "bg-white text-black hover:scale-[1.01]"
        }`}
      >
        Продолжить
      </button>
    </div>
  );
}