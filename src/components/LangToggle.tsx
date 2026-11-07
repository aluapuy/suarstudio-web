import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import type { Lang } from "../i18n/dictionary";

const options: { value: Lang; label: string }[] = [
  { value: "id", label: "ID" },
  { value: "en", label: "EN" },
];

export function LangToggle() {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className="relative flex items-center bg-sand border border-sand-border rounded-xl p-1 gap-0.5"
    >
      {options.map((opt) => {
        const isActive = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLang(opt.value)}
            className={`relative z-10 min-h-9 min-w-10 px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
              isActive ? "text-white" : "text-charcoal hover:text-terracotta"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="lang-indicator"
                className="absolute inset-0 bg-charcoal rounded-lg"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
