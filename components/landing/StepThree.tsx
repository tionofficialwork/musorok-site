import ToggleButton from "@/components/landing/ToggleButton";
import type { PaymentMethod, SubmitStatus } from "@/lib/types";

export default function StepThree({
  paymentMethod,
  tip,
  customTip,
  total,
  packageLabel,
  apartment,
  entrance,
  setPaymentMethod,
  setTip,
  setCustomTip,
  onBack,
  onPay,
  submitStatus,
  submitMessage,
}: {
  paymentMethod: PaymentMethod;
  tip: number;
  customTip: string;
  total: number;
  packageLabel: string;
  apartment: string;
  entrance: string;
  setPaymentMethod: (value: PaymentMethod) => void;
  setTip: (value: number) => void;
  setCustomTip: (value: string) => void;
  onBack: () => void;
  onPay: () => void;
  submitStatus: SubmitStatus;
  submitMessage: string;
}) {
  const presetTips = [0, 50, 100];

  return (
    <div>
      <div className="grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Ваш заказ</p>
          <div className="mt-3 space-y-1 text-sm text-white/80">
            <p>{packageLabel}</p>
            {apartment && <p>кв. {apartment}</p>}
            {entrance && <p>подъезд {entrance}</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Способ оплаты</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <ToggleButton active={paymentMethod === "card"} onClick={() => setPaymentMethod("card")}>
              Картой
            </ToggleButton>
            <ToggleButton active={paymentMethod === "cash"} onClick={() => setPaymentMethod("cash")}>
              Наличные
            </ToggleButton>
            <ToggleButton active={paymentMethod === "sbp"} onClick={() => setPaymentMethod("sbp")}>
              СБП
            </ToggleButton>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Чаевые</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {presetTips.map((value) => (
              <ToggleButton
                key={value}
                active={tip === value && customTip === ""}
                onClick={() => {
                  setCustomTip("");
                  setTip(value);
                }}
              >
                {value === 0 ? "Без чаевых" : `${value} ₽`}
              </ToggleButton>
            ))}
          </div>

          <div className="mt-3">
            <input
              value={customTip}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setCustomTip(value);
                setTip(value ? Number(value) : 0);
              }}
              placeholder="Своя сумма чаевых"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-4 text-black">
          <p className="text-sm text-black/45">Итого</p>
          <p className="mt-2 text-4xl font-black">{total} ₽</p>
          <p className="mt-2 text-sm text-black/60">Стоимость заказа с учетом чаевых</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10"
        >
          Назад
        </button>
        <button
          type="button"
          onClick={onPay}
          disabled={submitStatus === "submitting"}
          className={`rounded-2xl px-5 py-3.5 font-bold transition ${
            submitStatus === "submitting"
              ? "cursor-wait bg-white/30 text-black/50"
              : "bg-white text-black hover:scale-[1.01]"
          }`}
        >
          {submitStatus === "submitting" ? "Сохраняем заказ..." : "Оплатить"}
        </button>
      </div>

      {submitStatus !== "idle" && (
        <p className={`mt-3 text-sm ${submitStatus === "error" ? "text-red-400" : "text-white/60"}`}>
          {submitMessage}
        </p>
      )}
    </div>
  );
}