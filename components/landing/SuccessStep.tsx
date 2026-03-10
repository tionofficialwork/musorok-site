export default function SuccessStep({
  message,
  onNewOrder,
}: {
  message: string;
  onNewOrder: () => void;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-center lg:p-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-black">
        ✓
      </div>

      <h3 className="mt-5 text-2xl font-black">Заказ оформлен</h3>

      <p className="mt-3 text-sm leading-6 text-white/65">{message}</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-sm text-white/75">
        Исполнитель увидит заказ в списке и сможет взять его в работу.
      </div>

      <button
        type="button"
        onClick={onNewOrder}
        className="mt-6 w-full rounded-2xl bg-white px-5 py-3.5 font-bold text-black transition hover:scale-[1.01]"
      >
        Оформить еще один заказ
      </button>
    </div>
  );
}