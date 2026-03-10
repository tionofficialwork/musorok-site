import SectionTitle from "@/components/landing/SectionTitle";
import { faq } from "@/lib/constants";

export default function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-32 mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionTitle eyebrow="FAQ" title="Частые вопросы" />
      <div className="mt-10 grid gap-4">
        {faq.map((item) => (
          <div
            key={item.q}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
          >
            <h3 className="text-lg font-bold">{item.q}</h3>
            <p className="mt-3 leading-7 text-white/65">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}