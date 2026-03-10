import SectionTitle from "@/components/landing/SectionTitle";
import { steps } from "@/lib/constants";

export default function HowItWorksSection() {
  return (
    <section id="how" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionTitle
        eyebrow="Как это работает"
        title="Три простых шага, чтобы не нести мусор самому"
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-black">
              0{i + 1}
            </div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="mt-3 leading-7 text-white/65">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}