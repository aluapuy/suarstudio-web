import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import { Section, SectionEyebrow } from "./ui/Section";
import { Rich } from "./ui/Rich";

export default function Faq() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <Section>
      <SectionEyebrow>{t.faq.eyebrow}</SectionEyebrow>
      <h2 className="font-serif text-3xl md:text-4xl text-obsidian">
        <Rich text={t.faq.heading} />
      </h2>

      <div className="mt-12 max-w-3xl mx-auto divide-y divide-sand-border">
        {t.faq.items.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-obsidian cursor-pointer"
              >
                <span>{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-slate" aria-hidden="true" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-slate">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
