import type { PaymentMethod, StepThreeProps } from "@/lib/types";

const paymentOptions: { id: PaymentMethod; label: string }[] = [
  { id: "card", label: "Карта" },
  { id: "cash", label: "Наличные" },
  { id: "sbp", label: "СБП" },
];

const tipOptions = [0, 49, 99, 149];

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
}: StepThreeProps) {
  const isSubmitting = submitStatus === "submitting";
  const hasError = submitStatus === "error" && Boolean(submitMessage);

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-white/50">Способ оплаты</p>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {paymentOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPaymentMethod(item.id)}
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                paymentMethod === item.id
                  ? "bg-white text-black"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-white/50">Чаевые исполнителю</p>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tipOptions.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setTip(value);
                setCustomTip(value === 0 ? "" : String(value));
              }}
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                tip === value
                  ? "bg-white text-black"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {value === 0 ? "Без чаевых" : `${value} ₽`}
            </button>
          ))}
        </div>

        <input
          value={customTip}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setCustomTip(value);
            setTip(value ? Number(value) : 0);
          }}
          placeholder="Или введите свою сумму"
          inputMode="numeric"
          className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-white/25"
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-white/50">Итог заказа</p>

        <div className="mt-3 space-y-2 text-sm text-white/70">
          <div className="flex items-center justify-between gap-3">
            <span>Тариф</span>
            <span className="text-right">{packageLabel}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span>Квартира</span>
            <span className="text-right">{apartment || "Не указана"}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span>Подъезд</span>
            <span className="text-right">{entrance || "Не указан"}</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span>Чаевые</span>
            <span className="text-right">{tip} ₽</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-base font-semibold">К оплате</span>
          <span className="text-2xl font-black">{total} ₽</span>
        </div>
      </div>

      {hasError ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm font-medium text-red-200">{submitMessage}</p>
        </div>
      ) : null}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className={`w-full rounded-2xl border px-5 py-3.5 font-bold transition ${
            isSubmitting
              ? "cursor-not-allowed border-white/5 bg-white/5 text-white/35"
              : "border-white/10 bg-white/5 hover:bg-white/10"
          }`}
        >
          Назад
        </button>

        <button
          type="button"
          onClick={onPay}
          disabled={isSubmitting}
          className={`w-full rounded-2xl px-5 py-3.5 font-bold transition ${
            isSubmitting
              ? "cursor-not-allowed bg-white/30 text-black/50"
              : "bg-white text-black hover:scale-[1.01]"
          }`}
        >
          {isSubmitting ? "Отправляем..." : "Оформить заказ"}
        </button>
      </div>
    </div>
  );
}