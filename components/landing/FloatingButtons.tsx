export default function FloatingButtons({
  showTopButton,
}: {
  showTopButton: boolean;
}) {
  return (
    <>
      <button
        onClick={() =>
          document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
        }
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#2c3807] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105 md:hidden"
      >
        Заказать вынос мусора
      </button>

      {showTopButton && (
        <button
          onClick={() =>
            document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
          }
          className="fixed bottom-6 right-6 z-50 rounded-full bg-white px-4 py-3 text-sm font-bold text-black shadow-lg transition hover:scale-105"
        >
          ↑ Наверх
        </button>
      )}
    </>
  );
}