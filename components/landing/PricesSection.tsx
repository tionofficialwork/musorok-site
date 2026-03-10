import SectionTitle from "@/components/landing/SectionTitle";
import { prices } from "@/lib/constants";
import type { OrderStep } from "@/lib/types";

export default function PricesSection({
  selectedPackageId,
  setSelectedPackageId,
  setOrderStep,
}: {
  selectedPackageId: string;
  setSelectedPackageId: (value: string) => void;
  setOrderStep: (value: OrderStep) => void;
}) {
  return (
    <section id="prices" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
        <SectionTitle eyebrow="Тарифы" title="Понятные цены без сложных условий" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {prices.map((item) => (
            <div
              key={item.name}
              className={`rounded-[1.75rem] border p-6 transition ${
                selectedPackageId === item.id
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-black/20"
              }`}
            >
              <p
                className={`text-sm uppercase tracking-[0.18em] ${
                  selectedPackageId === item.id ? "text-black/45" : "text-white/45"
                }`}
              >
                {item.name}
              </p>
              <p className="mt-4 text-4xl font-black">{item.label}</p>
              <p
                className={`mt-3 ${
                  selectedPackageId === item.id ? "text-black/65" : "text-white/65"
                }`}
              >
                {item.desc}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedPackageId(item.id);
                  setOrderStep(1);
                  document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`mt-8 w-full rounded-2xl px-4 py-3 font-semibold transition duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  selectedPackageId === item.id
                    ? "border border-black/10 bg-black text-white hover:opacity-90"
                    : "border border-white/15 bg-white/5 hover:bg-white/10"
                }`}
              >
                {selectedPackageId === item.id ? "Выбрано" : "Выбрать"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}