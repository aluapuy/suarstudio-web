import { AudioLines } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import CylinderPhoneCarousel from "./CylinderPhoneCarousel";

const BAR_HEIGHTS = [12, 22, 16, 26, 12, 20, 28, 18, 24, 14, 20, 24, 12, 18];

export default function HeroMockup() {
  const { t } = useLang();

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="relative rounded-3xl bg-white border border-sand-border shadow-xl p-4 sm:p-6 flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-sand-border/80">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex h-2.5 w-2.5 rounded-full bg-cypress"
              aria-hidden="true"
            />
            <span className="font-mono text-xs font-bold tracking-wider text-charcoal">
              {t.mockup.sermon}
            </span>
          </div>

          <span className="font-mono text-[11px] font-bold text-terracotta bg-[#FDF5EE] border border-[#F3DEC9] rounded-lg px-2.5 py-1">
            {t.mockup.generatedBadge}
          </span>
        </div>

        {/* Status line (static, no endless loop) */}
        <div className="rounded-2xl bg-alabaster border border-sand-border/80 px-3.5 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-sm text-slate">
            <AudioLines
              className="w-4 h-4 text-brass shrink-0"
              aria-hidden="true"
            />
            <span>{t.mockup.mapping}</span>
          </div>
          <div
            className="flex items-end justify-center gap-1 h-7 shrink-0"
            aria-hidden="true"
          >
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full bg-brass/85"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>

        {/* 3D phone carousel */}
        <div className="w-full py-0.5">
          <CylinderPhoneCarousel />
        </div>
      </div>
    </div>
  );
}
