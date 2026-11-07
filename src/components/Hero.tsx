import { useState, useEffect } from "react";
import { Check, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import { LinkButton, Button } from "./ui/Button";
import { Rich } from "./ui/Rich";
import { Section } from "./ui/Section";
import { Emblem } from "./Emblem";
import { CTA_URL } from "../config";
import HeroMockup from "./HeroMockup";

export default function Hero() {
  const { t } = useLang();
  const [videoOpen, setVideoOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  return (
    <Section id="top" className="pt-24 pb-12 md:pt-28 md:pb-20">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* ── Left: Copy & Trust Positioning ── */}
        <div className="w-full min-w-0 lg:w-[52%] flex flex-col gap-5 sm:gap-6">
          {/* Editorial Kicker (replaces AI-default capsule pill parked above H1, R-09) */}
          <div className="inline-flex items-center gap-3 self-start">
            <span
              className="h-0.5 w-7 bg-brass rounded-full shrink-0"
              aria-hidden="true"
            />
            <span className="font-sans text-xs sm:text-sm font-bold text-terracotta tracking-wide">
              {t.hero.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] leading-[1.08] text-charcoal">
            <Rich text={t.hero.headline} />
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate leading-relaxed max-w-xl">
            {t.hero.sub}
          </p>

          {/* 3 Pastoral & Church Team Trust Guarantees */}
          <ul className="flex flex-wrap gap-2.5 pt-1">
            {t.hero.trustPills.map((pill, idx) => (
              <li
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sand/90 border border-sand-border px-3 py-1.5 text-xs font-semibold text-charcoal"
              >
                <Check
                  className="w-3.5 h-3.5 text-cypress shrink-0"
                  aria-hidden="true"
                />
                <span>{pill}</span>
              </li>
            ))}
          </ul>

          {/* CTA group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3.5 pt-2">
            <div className="flex flex-col items-stretch sm:items-start gap-1.5">
              <LinkButton
                href={CTA_URL || "#investasi"}
                target={CTA_URL ? "_blank" : undefined}
                rel={CTA_URL ? "noopener noreferrer" : undefined}
                className="shadow-sm"
              >
                {t.hero.ctaPrimary}
              </LinkButton>
              <span className="text-xs text-slate font-mono pl-1">
                {t.hero.ctaNote}
              </span>
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={() => setVideoOpen(true)}
              className="bg-white/90"
            >
              <Play
                className="w-4 h-4 text-terracotta fill-terracotta shrink-0"
                aria-hidden="true"
              />
              <span>{t.hero.ctaSecondary}</span>
            </Button>
          </div>
        </div>

        {/* ── Right: Sacred Editorial Studio Mockup ── */}
        <div className="w-full lg:w-[48%]">
          <HeroMockup />
        </div>
      </div>

      {/* ── 45-Second Promo Video Modal ── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/85 p-4"
            onClick={() => setVideoOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={t.hero.videoModalTitle}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm rounded-3xl bg-obsidian border-2 border-brass shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-charcoal border-b border-white/15">
                <div className="flex items-center gap-2">
                  <Emblem className="w-4 h-4 text-brass shrink-0" />
                  <span className="font-mono text-xs text-white/90 truncate">
                    @suarstudio.co
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setVideoOpen(false)}
                  aria-label={t.hero.videoModalClose}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Vertical 9:16 Video Player */}
              <div className="aspect-[9/16] w-full bg-obsidian">
                <video
                  src="/video/suar-studio-promo.mp4"
                  width={540}
                  height={960}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
