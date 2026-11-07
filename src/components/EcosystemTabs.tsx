import { Check } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { Section } from "./ui/Section";
import { Rich } from "./ui/Rich";

export default function EcosystemTabs() {
  const { t } = useLang();

  return (
    <Section id="hasil-karya" dark>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-3 mb-3">
            <span
              className="h-0.5 w-6 bg-brass rounded-full shrink-0"
              aria-hidden="true"
            />
            <p className="font-sans text-xs sm:text-sm font-bold tracking-wide text-brass">
              {t.eco.eyebrow}
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-white max-w-2xl leading-tight">
            <Rich text={t.eco.heading} accentClass="text-brass" />
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
            {t.eco.sub}
          </p>
        </div>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {t.eco.tabs.map((tab, i) => (
          <article
            key={i}
            className="rounded-2xl bg-white/[0.05] border border-white/15 p-6 flex flex-col gap-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif text-2xl text-white">{tab.label}</h3>
              <span className="font-mono text-xs bg-brass/20 text-brass border border-brass/50 rounded-lg px-2.5 py-1 font-semibold">
                {tab.countTag}
              </span>
            </div>
            <p className="font-sans text-xs font-bold text-brass tracking-wide">
              {tab.mood}
            </p>
            <p className="text-white/85 leading-relaxed text-sm sm:text-base">
              {tab.body}
            </p>
            <ul className="flex flex-wrap gap-2 pt-1 mt-auto">
              {tab.specs.map((spec) => (
                <li
                  key={spec}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/20 px-2.5 py-1 font-mono text-xs text-white/95"
                >
                  <Check
                    className="w-3.5 h-3.5 text-brass shrink-0"
                    aria-hidden="true"
                  />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold text-brass">
        <span className="h-2 w-2 rounded-full bg-brass shrink-0" aria-hidden="true" />
        <span>{t.eco.deliverableCount}</span>
      </p>
    </Section>
  );
}
