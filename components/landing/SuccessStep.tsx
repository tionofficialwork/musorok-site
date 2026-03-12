import type { SuccessStepProps } from "@/lib/types";

export default function SuccessStep({
  message,
  onNewOrder,
}: SuccessStepProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-black">
        ✓
      </div>

      <div>
        <h3 className="text-xl font-bold">Заказ отправлен</h3>
        <p className="mt-2 text-sm text-white/65">{message}</p>
        <p className="mt-3 text-sm text-white/45">
          Мы сохранили заявку. Следующим шагом можно будет показывать статус заказа,
          назначение исполнителя и примерное время выполнения.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left">
        <p className="text-sm font-medium text-white/75">Что дальше</p>
        <ul className="mt-2 space-y-1 text-sm text-white/50">
          <li>• Заказ уже записан в базу данных</li>
          <li>• Следующий этап MVP — панель исполнителя или админка</li>
          <li>• Потом можно добавить статусы: новый, принят, выполнен</li>
        </ul>
      </div>

      <button
        type="button"
        onClick={onNewOrder}
        className="w-full rounded-2xl bg-white px-5 py-3.5 font-bold text-black transition hover:scale-[1.01]"
      >
        Создать новый заказ
      </button>
    </div>
  );
}