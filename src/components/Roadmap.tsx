import { Search, HeartHandshake, Globe2, BookOpen, Clock } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { Section } from "./ui/Section";
import { Rich } from "./ui/Rich";

const ICONS = [Search, HeartHandshake, Globe2, BookOpen] as const;

export default function Roadmap() {
  const { t } = useLang();

  return (
    <Section id="inovasi-ai" dark>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 mb-3">
            <span
              className="h-0.5 w-6 bg-brass rounded-full shrink-0"
              aria-hidden="true"
            />
            <p className="font-sans text-xs sm:text-sm font-bold tracking-wide text-brass">
              {t.roadmap.eyebrow}
            </p>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight">
            <Rich text={t.roadmap.heading} accentClass="text-brass" />
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
            {t.roadmap.sub}
          </p>
        </div>

        <div className="self-start lg:self-end shrink-0 inline-flex items-center gap-2 rounded-xl bg-brass/15 border border-brass/50 px-4 py-2 font-mono text-xs font-bold text-brass">
          <Clock className="w-4 h-4 shrink-0 text-brass" aria-hidden="true" />
          <span>{t.roadmap.statusPill}</span>
        </div>
      </div>

      <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {t.roadmap.items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <li
              key={item.title}
              className="rounded-2xl bg-white/[0.05] border border-white/15 p-6 flex flex-col gap-4 hover:border-brass/40 hover:bg-white/[0.08] transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-brass" aria-hidden="true" />
              </div>
              <p className="font-mono text-[11px] font-bold text-brass tracking-wider">
                {item.badge}
              </p>
              <h3 className="font-serif text-lg sm:text-xl text-white leading-snug">
                {item.title}
              </h3>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
