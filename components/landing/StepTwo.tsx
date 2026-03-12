import type { StepTwoProps } from "@/lib/types";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (!digits) return "";

  const normalized = digits.startsWith("7")
    ? digits
    : digits.startsWith("8")
      ? `7${digits.slice(1)}`
      : `7${digits}`;

  const trimmed = normalized.slice(0, 11);
  const country = "+7";
  const part1 = trimmed.slice(1, 4);
  const part2 = trimmed.slice(4, 7);
  const part3 = trimmed.slice(7, 9);
  const part4 = trimmed.slice(9, 11);

  let result = country;

  if (part1) result += ` (${part1}`;
  if (part1.length === 3) result += ")";
  if (part2) result += ` ${part2}`;
  if (part3) result += `-${part3}`;
  if (part4) result += `-${part4}`;

  return result;
}

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";

  if (digits.startsWith("7")) return digits.slice(0, 11);
  if (digits.startsWith("8")) return `7${digits.slice(1, 11)}`;

  return `7${digits}`.slice(0, 11);
}

export default function StepTwo({
  apartment,
  entrance,
  comment,
  leaveAtDoor,
  phone,
  shouldCall,
  setApartment,
  setEntrance,
  setComment,
  setLeaveAtDoor,
  setPhone,
  setShouldCall,
  onBack,
  onContinue,
}: StepTwoProps) {
  const normalizedPhone = normalizePhone(phone);
  const hasValidPhone = normalizedPhone.length === 11;
  const hasApartment = apartment.trim().length > 0;
  const canContinue = hasValidPhone && hasApartment;

  const helperText = !hasApartment
    ? "Укажите номер квартиры, чтобы мы понимали, откуда забрать мусор."
    : !hasValidPhone
      ? "Добавьте корректный номер телефона для связи по заказу."
      : "Детали заполнены — можно переходить к подтверждению заказа.";

  return (
    <div className="space-y-3">
      <div className="mb-1">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
          Шаг 2 из 3
        </div>
        <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
          Укажите детали заказа
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
          Заполните базовую информацию для выноса мусора: квартиру, телефон и,
          при необходимости, комментарий для исполнителя.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-white/55">Квартира</span>
          <input
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            placeholder="Например, 145"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
          {!hasApartment && apartment !== "" ? (
            <p className="mt-2 text-xs text-white/45">
              Укажите номер квартиры.
            </p>
          ) : (
            <p className="mt-2 text-xs text-white/38">
              Это обязательное поле для оформления заказа.
            </p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-white/55">
            Подъезд <span className="text-white/35">(необязательно)</span>
          </span>
          <input
            value={entrance}
            onChange={(e) => setEntrance(e.target.value)}
            placeholder="Например, 2"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm text-white/55">Телефон</span>
        <input
          value={formatPhone(phone)}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            const normalized = digits.startsWith("7")
              ? digits
              : digits.startsWith("8")
                ? `7${digits.slice(1)}`
                : digits
                  ? `7${digits}`
                  : "";

            setPhone(normalized.slice(0, 11));
          }}
          placeholder="+7 (999) 123-45-67"
          inputMode="tel"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
        />
        {!hasValidPhone && phone ? (
          <p className="mt-2 text-xs text-white/45">
            Введите полный номер телефона в формате +7 (999) 123-45-67
          </p>
        ) : (
          <p className="mt-2 text-xs text-white/38">
            Нужен для связи по заказу, если потребуется уточнение.
          </p>
        )}
      </label>

      <label className="block">
        <span className="mb-2 block text-sm text-white/55">
          Комментарий <span className="text-white/35">(необязательно)</span>
        </span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Например, мусор у двери, домофон не работает"
          rows={3}
          className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-sm text-white/55">Оставить у двери?</p>

          <div className="mt-3 flex gap-2">
            {(["yes", "no"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setLeaveAtDoor(value)}
                className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  leaveAtDoor === value
                    ? "bg-white text-black"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {value === "yes" ? "Да" : "Нет"}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-sm text-white/55">Нужно позвонить?</p>

          <div className="mt-3 flex gap-2">
            {(["yes", "no"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setShouldCall(value)}
                className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  shouldCall === value
                    ? "bg-white text-black"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {value === "yes" ? "Да" : "Нет"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 font-bold text-white transition hover:bg-white/10"
        >
          Назад
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className={`w-full rounded-2xl px-5 py-3.5 font-bold transition ${
            !canContinue
              ? "cursor-not-allowed bg-white/30 text-black/50"
              : "bg-white text-black hover:scale-[1.01]"
          }`}
        >
          {canContinue ? "Перейти к подтверждению" : "Далее"}
        </button>
      </div>

      <p
        className={`text-sm ${
          canContinue ? "text-emerald-300" : "text-white/45"
        }`}
      >
        {helperText}
      </p>
    </div>
  );
}