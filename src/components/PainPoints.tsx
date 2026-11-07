import {
  Scissors,
  AlertTriangle,
  ShieldCheck,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import { Section, SectionEyebrow } from "./ui/Section";
import { Rich } from "./ui/Rich";
import { Badge } from "./ui/Badge";

const cardVariants = {
  hidden: { opacity: 0.95, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function PainPoints() {
  const { t } = useLang();
  const comp = t.why.comparison;

  return (
    <Section id="cara-kerja" className="border-t border-sand-border/60">
      <SectionEyebrow>{t.why.eyebrow}</SectionEyebrow>
      <h2 className="text-3xl md:text-5xl font-serif text-charcoal max-w-3xl leading-tight">
        <Rich text={t.why.heading} />
      </h2>
      <p className="text-slate mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
        {t.why.sub}
      </p>

      {/* ── Top: 3-Way Comparison (Manual Burnout vs. Generic "AI Slop" vs. Suar Standard) ── */}
      <div className="grid lg:grid-cols-3 gap-6 mt-12">
        {/* Card 1: Manual Volunteer Grind */}
        <motion.div
          className="rounded-3xl bg-white border border-sand-border p-6 sm:p-7 flex flex-col justify-between shadow-sm"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          custom={0}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-terracotta">
                <span className="w-8 h-8 rounded-full bg-[#FDF5EE] border border-[#F3DEC9] flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-terracotta" />
                </span>
                {comp.manual.tag}
              </span>
              <span className="font-mono text-[11px] text-slate bg-sand px-2.5 py-0.5 rounded-full">
                {comp.manual.status}
              </span>
            </div>

            <h3 className="font-sans text-2xl font-extrabold text-charcoal mb-2">
              {comp.manual.title}
            </h3>
            <p className="text-sm text-slate leading-relaxed mb-6">
              {comp.manual.subtitle}
            </p>
          </div>

          {/* Multi-Track NLE Timeline Visualizer */}
          <div className="relative rounded-2xl bg-alabaster border border-sand-border p-3.5 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold text-slate">
                {comp.manual.timelineLabel}
              </span>
              <span className="font-mono text-[10px] font-bold text-terracotta">
                01:14:22
              </span>
            </div>
            {/* Video Track */}
            <div className="flex gap-1.5 mb-1.5">
              <div className="h-2.5 flex-[2] rounded bg-[#C89D7C]" />
              <div className="h-2.5 flex-1 rounded bg-[#D9B89C]" />
              <div className="h-2.5 flex-[1.5] rounded bg-[#C89D7C]" />
            </div>
            {/* Caption Track */}
            <div className="flex gap-1.5 mb-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="h-2 flex-1 rounded bg-[#D5C49A]" />
              ))}
            </div>
            {/* Audio Track */}
            <div className="h-2 w-full rounded bg-sand overflow-hidden">
              <div className="h-full w-3/4 bg-terracotta/80" />
            </div>
            {/* Red Playhead Line */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 left-[74%] w-0.5 bg-[#DC2626] shadow-[0_0_8px_rgba(220,38,38,0.6)]"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Card 2: Generic "AI Slop" Bots */}
        <motion.div
          className="rounded-3xl bg-white border border-[#F0D9C8] p-6 sm:p-7 flex flex-col justify-between shadow-sm"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          custom={1}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#B45309]">
                <span className="w-8 h-8 rounded-full bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                </span>
                {comp.genericAi.tag}
              </span>
              <span className="font-mono text-[11px] font-semibold text-[#991B1B] bg-[#FEF2F2] px-2.5 py-0.5 rounded-full">
                {comp.genericAi.status}
              </span>
            </div>

            <h3 className="font-sans text-2xl font-extrabold text-[#991B1B] mb-2">
              {comp.genericAi.title}
            </h3>
            <p className="text-sm text-slate leading-relaxed mb-6">
              {comp.genericAi.subtitle}
            </p>
          </div>

          {/* Visual "Bad AI Cut" Quote Box */}
          <div className="rounded-2xl bg-[#FEF2F2] border border-dashed border-[#FCA5A5] p-4 flex items-center justify-between gap-3">
            <p className="font-serif italic text-base font-bold text-[#7F1D1D]">
              {comp.genericAi.badQuote}
            </p>
            <span className="shrink-0 font-mono text-[11px] font-extrabold bg-[#DC2626] text-white px-2.5 py-1 rounded-md">
              {comp.genericAi.badCutBadge}
            </span>
          </div>
        </motion.div>

        {/* Card 3: The Suar Studio Standard (Human-Stewarded + AI Precision) */}
        <motion.div
          className="rounded-3xl bg-[#FFFDF9] border-2 border-brass p-6 sm:p-7 flex flex-col justify-between shadow-lg relative"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          custom={2}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cypress">
                <span className="w-8 h-8 rounded-full bg-cypress-tint border border-cypress/30 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-cypress" />
                </span>
                {comp.suarStandard.tag}
              </span>
              <Badge>{comp.suarStandard.status}</Badge>
            </div>

            <h3 className="font-sans text-2xl font-extrabold text-charcoal mb-2">
              {comp.suarStandard.title}
            </h3>
            <p className="text-sm text-slate leading-relaxed mb-6">
              {comp.suarStandard.subtitle}
            </p>
          </div>

          {/* Human + AI Verification Box */}
          <div className="rounded-2xl bg-cypress-tint/70 border border-cypress/25 p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal">
              <Check className="w-4 h-4 text-cypress shrink-0" />
              <span>{comp.suarStandard.check1}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal">
              <Check className="w-4 h-4 text-cypress shrink-0" />
              <span>{comp.suarStandard.check2}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom: 3 Editorial Feature Columns (Clean & Borderless) ── */}
      <div className="grid md:grid-cols-3 gap-8 sm:gap-10 mt-12 pt-10 border-t border-sand-border/70">
        {t.why.benefits.map((b, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-terracotta tracking-wider uppercase mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta shrink-0" aria-hidden="true" />
              {b.badge}
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mb-2 leading-snug">
              {b.title}
            </h4>
            <p className="text-sm text-slate leading-relaxed">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
