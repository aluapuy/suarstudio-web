import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import { Section, SectionEyebrow } from "./ui/Section";
import { Rich } from "./ui/Rich";
import WhatsAppDemo from "./WhatsAppDemo";

const fadeUp = {
  hidden: { opacity: 0.95, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function SopTimeline() {
  const { t } = useLang();
  const steps = t.sop.steps;

  return (
    <Section id="garansi-teologis" className="border-t border-sand-border/60">
      <div className="max-w-3xl mb-10">
        <SectionEyebrow>{t.sop.eyebrow}</SectionEyebrow>
        <h2 className="font-serif text-3xl md:text-5xl text-charcoal leading-tight mb-4">
          <Rich text={t.sop.heading} />
        </h2>
        <p className="text-slate text-base sm:text-lg leading-relaxed">
          {t.sop.sub}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* LEFT: 3 steps + one guarantee line */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative pl-1">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex gap-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-brass text-charcoal w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="border-l-2 border-dashed border-brass/50 flex-1 min-h-10 my-1" />
                  )}
                </div>

                <div
                  className={`flex-1 rounded-2xl bg-sand/70 border border-sand-border p-5 ${
                    i < steps.length - 1 ? "mb-5" : "mb-0"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="font-sans text-xs font-bold text-terracotta tracking-wide">
                      {step.when}
                    </span>
                    {step.code && (
                      <span className="font-mono text-[11px] font-semibold bg-white text-charcoal rounded-md px-2.5 py-0.5 border border-sand-border">
                        {step.code}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="flex items-start gap-2.5 text-sm text-charcoal leading-relaxed border-l-2 border-cypress pl-3.5">
            <ShieldCheck
              className="w-4 h-4 text-cypress shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{t.sop.antiSlopText}</span>
          </p>
        </div>

        {/* RIGHT: WhatsApp simulator */}
        <div className="lg:col-span-6">
          <div className="mb-4">
            <span className="font-sans text-xs font-bold text-cypress tracking-wide">
              {t.demo.eyebrow}
            </span>
            <h3 className="font-serif text-2xl text-charcoal mt-1">
              <Rich text={t.demo.heading} underline={false} />
            </h3>
            <p className="text-sm text-slate mt-1">{t.demo.sub}</p>
          </div>
          <WhatsAppDemo />
        </div>
      </div>
    </Section>
  );
}
