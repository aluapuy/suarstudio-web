import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { getWhatsAppUrl, NAV_IDS } from "../config";
import { Emblem } from "./Emblem";
import { LangToggle } from "./LangToggle";
import { LinkButton } from "./ui/Button";

export default function Navbar() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open to prevent background bleed/scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const ctaUrl = getWhatsAppUrl(undefined, lang);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav
          aria-label="Main navigation"
          className="bg-alabaster/95 backdrop-blur-md border-b border-sand-border"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 lg:px-8">
            {/* ── Left: brand ── */}
            <a
              href="#top"
              className="flex items-center gap-2.5 min-h-11 py-1 pr-2 rounded-lg"
              onClick={() => setOpen(false)}
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
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="!text-xs !px-4 !py-2.5 shadow-sm"
                >
                  <span>{t.nav.cta}</span>
                </LinkButton>
              </div>

              {/* Discoverable mobile menu button with visible label */}
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
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer (Mounted outside backdrop-blur containing block) ── */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-obsidian/40 backdrop-blur-xs"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Sheet */}
            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-x-0 top-[61px] h-[calc(100dvh-61px)] flex flex-col justify-between bg-[#FAF7F2] border-t border-sand-border px-6 py-6 overflow-y-auto shadow-2xl"
            >
              <ul className="flex flex-col gap-2">
                {t.nav.links.map((label, i) => (
                  <li key={NAV_IDS[i]}>
                    <a
                      href={"#" + NAV_IDS[i]}
                      onClick={() => setOpen(false)}
                      className="flex items-center min-h-12 px-4 rounded-xl text-lg font-semibold text-charcoal hover:bg-sand active:bg-sand-border border border-transparent hover:border-sand-border transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-sand-border mt-auto">
                <LinkButton
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full justify-center py-3.5 text-base shadow-sm"
                  onClick={() => setOpen(false)}
                >
                  <span>{t.nav.cta}</span>
                </LinkButton>
                <p className="font-mono text-[11px] text-slate text-center mt-2.5">
                  WhatsApp: +62 819-4959-0814
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
