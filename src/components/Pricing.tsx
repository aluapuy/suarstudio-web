import { Check } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { getWhatsAppUrl, type TierKey } from "../config";
import { useGeoPricing } from "../hooks/useGeoPricing";
import { Section, SectionEyebrow } from "./ui/Section";
import { Rich } from "./ui/Rich";
import { LinkButton } from "./ui/Button";

const KEYS: TierKey[] = ["echo", "nextgen", "family"];

export default function Pricing() {
  const { t, lang } = useLang();
  const voucher = t.pricing.voucher;
  const { pricing, region, setRegion } = useGeoPricing();

  return (
    <Section id="investasi" className="border-t border-sand-border/60">
      <SectionEyebrow>{t.pricing.eyebrow}</SectionEyebrow>
      <h2 className="font-serif text-3xl md:text-5xl text-obsidian leading-tight">
        <Rich text={t.pricing.heading} />
      </h2>
      <p className="mt-4 max-w-2xl text-slate text-base sm:text-lg">
        {t.pricing.sub}
      </p>

      {/* ── Region / Currency Switcher ── */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs font-semibold text-slate mr-1">
          {t.pricing.currencySelectorLabel}
        </span>
        {[
          { key: "ID" as const, label: "🇮🇩 Indonesia (IDR)" },
          { key: "AU" as const, label: "🇦🇺 Australia (AUD)" },
          { key: "GLOBAL" as const, label: "🌏 Diaspora / Global (USD)" },
          { key: "CA" as const, label: "🇨🇦 Canada (CAD)" },
        ].map((item) => {
          const isActive = region === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setRegion(item.key)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-charcoal text-white shadow-sm ring-2 ring-brass"
                  : "bg-sand/70 text-slate hover:text-charcoal hover:bg-sand border border-sand-border"
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3 Pricing Tiers ── */}
      <div className="grid md:grid-cols-3 gap-6 mt-8 items-stretch">
        {KEYS.map((key, i) => {
          const tier = t.pricing.tiers[i];
          const price = pricing[key];
          const isPopular = i === 1;

          return (
            <div
              key={key}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between ${
                isPopular
                  ? "bg-[#FFFDF9] border-2 border-brass shadow-lg md:-translate-y-1.5"
                  : "bg-sand/85 border border-sand-border"
              }`}
            >
              {isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-charcoal text-white text-xs font-semibold px-4 py-1 rounded-lg whitespace-nowrap">
                  {t.pricing.popular}
                </span>
              )}

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-obsidian">
                  {tier.name}
                </h3>

                <div className="mt-4">
                  {price.originalFormatted && (
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-serif text-slate/50 line-through text-base sm:text-lg decoration-terracotta/60 decoration-1">
                        {price.originalFormatted}
                      </span>
                      <span className="font-mono text-[10px] font-extrabold text-terracotta bg-[#FDF5EE] border border-[#F3DEC9] px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {t.pricing.discountBadge}
                      </span>
                    </div>
                  )}

                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl text-obsidian font-semibold">
                      {price.formatted}
                    </span>
                    <span className="text-slate text-sm font-medium">
                      {t.pricing.perMonth}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-terracotta font-semibold mt-3 pb-4 border-b border-sand-border">
                  {tier.focus}
                </p>

                <ul className="mt-5 space-y-3">
                  {tier.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-sm text-charcoal"
                    >
                      <Check
                        className="w-4 h-4 text-cypress mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-2">
                <LinkButton
                  href={getWhatsAppUrl(
                    lang === "en"
                      ? `Hi Suar Studio, I'd like to claim the 2-Week Free Trial for ${tier.name}.`
                      : `Halo Suar Studio, saya mau klaim Uji Coba Gratis 2 Minggu untuk paket ${tier.name}.`,
                    lang
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={isPopular ? "primary" : "secondary"}
                  className="w-full"
                >
                  {tier.cta || t.pricing.cta}
                </LinkButton>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate text-center mt-6 font-mono">
        {t.pricing.note}
      </p>

      {/* ── Perforated Founding Partner "TRIAL PASS #0001" Voucher ── */}
      <div className="mt-12 relative rounded-3xl bg-[#FFFDF8] border-2 border-brass shadow-lg p-6 sm:p-10 overflow-hidden">
        {/* Left & Right Perforated Ticket Notches */}
        <div
          className="hidden sm:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-alabaster border-r-2 border-brass"
          aria-hidden="true"
        />
        <div
          className="hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-alabaster border-l-2 border-brass"
          aria-hidden="true"
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-extrabold text-terracotta bg-[#FDF5EE] border border-[#F3DEC9] rounded-lg px-3.5 py-1">
                <span
                  className="h-2 w-2 rounded-full bg-terracotta shrink-0"
                  aria-hidden="true"
                />
                <span>{voucher.passNumber}</span>
              </span>
              <span className="font-mono text-[11px] font-extrabold text-cypress border-2 border-cypress/70 rounded px-2.5 py-0.5">
                {voucher.stamp}
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-charcoal">
              {voucher.title}
            </h3>

            <p className="text-sm sm:text-base text-slate leading-relaxed">
              {voucher.subtitle}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {voucher.badges.map((b) => (
                <span
                  key={b}
                  className="font-mono text-xs font-semibold text-cypress bg-cypress-tint px-3 py-1 rounded-lg"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right Perforated Stub CTA */}
          <div className="w-full lg:w-auto lg:pl-8 lg:border-l-2 lg:border-dashed lg:border-sand-border flex flex-col items-stretch sm:items-center gap-2.5 shrink-0">
            <LinkButton
              href={getWhatsAppUrl(
                lang === "en"
                  ? "Hi Suar Studio, I'd like to claim the 2-Week Free Trial Voucher Pass (#0001)."
                  : "Halo Suar Studio, saya mau klaim Voucher Tiket Uji Coba Gratis 2 Minggu (#0001).",
                lang
              )}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="px-7 py-4 text-base shadow-sm"
            >
              <span>{voucher.cta}</span>
            </LinkButton>
            <span className="font-mono text-xs text-slate text-center">
              {voucher.subtext}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
