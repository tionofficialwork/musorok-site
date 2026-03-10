import type { ReactNode } from "react";

export default function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center rounded-2xl px-3 py-2.5 text-sm font-semibold transition hover:scale-[1.03] active:scale-[0.97] ${
        active ? "bg-white text-black" : "bg-black/20 text-white hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}