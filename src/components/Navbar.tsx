import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { CTA_URL, NAV_IDS } from "../config";
import { Emblem } from "./Emblem";
import { LangToggle } from "./LangToggle";
import { LinkButton } from "./ui/Button";

export default function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const ctaHref = CTA_URL || "#investasi";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-alabaster/95 backdrop-blur-md border-b border-sand-border">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 lg:px-8"
      >
        {/* ── Left: brand ── */}
        <a
          href="#top"
          className="flex items-center gap-2.5 min-h-11 py-1 pr-2 rounded-lg"
        >
          <Emblem className="w-8 h-8 text-brass shrink-0" />
          <div className="flex flex-col">
            <span className="font-serif text-xl leading-none text-charcoal">
              Suar Studio
            </span>
            <span className="font-mono text-[11px] text-slate">
              @suarstudio.co
            </span>
          </div>
        </a>

        {/* ── Center: desktop links ── */}
        <ul className="hidden lg:flex items-center gap-2">
          {t.nav.links.map((label, i) => (
            <li key={NAV_IDS[i]}>
              <a
                href={"#" + NAV_IDS[i]}
                className="inline-flex items-center min-h-11 px-3 text-sm font-medium text-slate hover:text-charcoal active:text-terracotta transition-colors rounded-lg"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right: toggle + CTA + labeled mobile menu button ── */}
        <div className="flex items-center gap-2.5">
          <LangToggle />

          <div className="hidden md:block">
            <LinkButton
              href={ctaHref}
              target={CTA_URL ? "_blank" : undefined}
              rel={CTA_URL ? "noopener noreferrer" : undefined}
              variant="primary"
              className="!text-xs !px-4 !py-2.5"
            >
              <span>{t.nav.cta}</span>
            </LinkButton>
          </div>

          {/* Discoverable mobile menu button with visible label (antislop-layoutmobile) */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center gap-1.5 min-h-11 px-3 py-2 rounded-xl border border-sand-border bg-sand/70 hover:bg-sand active:bg-sand-border text-charcoal text-xs font-semibold cursor-pointer"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
            <span>{t.nav.menuLabel}</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 36 }}
            className="fixed inset-x-0 top-[61px] bottom-0 z-40 flex flex-col bg-alabaster px-6 py-6 border-t border-sand-border lg:hidden overflow-y-auto"
          >
            <ul className="flex flex-col gap-2">
              {t.nav.links.map((label, i) => (
                <li key={NAV_IDS[i]}>
                  <a
                    href={"#" + NAV_IDS[i]}
                    onClick={() => setOpen(false)}
                    className="flex items-center min-h-12 px-3 rounded-xl text-lg font-semibold text-charcoal hover:bg-sand active:bg-sand-border"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <LinkButton
                href={ctaHref}
                target={CTA_URL ? "_blank" : undefined}
                rel={CTA_URL ? "noopener noreferrer" : undefined}
                variant="primary"
                className="w-full justify-center"
                onClick={() => setOpen(false)}
              >
                <span>{t.nav.cta}</span>
              </LinkButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
