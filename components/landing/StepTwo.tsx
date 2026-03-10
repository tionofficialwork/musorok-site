import ToggleButton from "@/components/landing/ToggleButton";
import type { YesNo } from "@/lib/types";

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
}: {
  apartment: string;
  entrance: string;
  comment: string;
  leaveAtDoor: YesNo;
  phone: string;
  shouldCall: YesNo;
  setApartment: (value: string) => void;
  setEntrance: (value: string) => void;
  setComment: (value: string) => void;
  setLeaveAtDoor: (value: YesNo) => void;
  setPhone: (value: string) => void;
  setShouldCall: (value: YesNo) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
            <p className="text-sm text-white/50">Квартира</p>
            <input
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              placeholder="Например: 55"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
            <p className="text-sm text-white/50">Подъезд</p>
            <input
              value={entrance}
              onChange={(e) => setEntrance(e.target.value)}
              placeholder="Например: 2"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
          <p className="text-sm text-white/50">Комментарий курьеру</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Например: домофон не работает, пакет у двери"
            rows={2}
            className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
            <p className="text-sm text-white/50">Забрать у двери?</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ToggleButton active={leaveAtDoor === "yes"} onClick={() => setLeaveAtDoor("yes")}>
                Да
              </ToggleButton>
              <ToggleButton active={leaveAtDoor === "no"} onClick={() => setLeaveAtDoor("no")}>
                Нет
              </ToggleButton>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-4">
            <p className="text-sm text-white/50">Телефон для связи</p>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Например: +7 (999) 123-45-67"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
            />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ToggleButton active={shouldCall === "yes"} onClick={() => setShouldCall("yes")}>
                Позвонить
              </ToggleButton>
              <ToggleButton active={shouldCall === "no"} onClick={() => setShouldCall("no")}>
                Не звонить
              </ToggleButton>
            </div>
          </div>
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
          onClick={onContinue}
          className="rounded-2xl bg-white px-5 py-3.5 font-bold text-black transition hover:scale-[1.01]"
        >
          К оплате
        </button>
      </div>
    </div>
  );
}