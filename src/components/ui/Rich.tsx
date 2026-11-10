import type { ReactNode } from "react";

/**
 * Render text with *asterisks* as italic serif spans with optional hand-drawn brass underline or radiant glow.
 * Safe for the bilingual dictionary.
 */
export function Rich({
  text,
  underline = true,
  glow = false,
  accentClass = "text-terracotta",
}: {
  text: string;
  underline?: boolean;
  glow?: boolean;
  accentClass?: string;
}) {
  const parts = text.split(/(\*[^*]+\*)/g);
  const nodes: ReactNode[] = parts.map((p, i) => {
    if (!p.startsWith("*") || !p.endsWith("*")) return p;
    const content = p.slice(1, -1);

    if (glow) {
      return (
        <span
          key={i}
          className="relative inline-block font-serif italic mx-0.5 align-baseline"
        >
          {/* Delicate Warm Golden Ambient Backlight Halo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-3 -inset-y-1.5 rounded-full hero-halo-glow select-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(217, 155, 38, 0.22) 0%, rgba(224, 109, 59, 0.1) 50%, transparent 75%)",
            }}
          />

          {/* Crisp High-Contrast Gradient Shimmer Text */}
          <span className="relative z-10 hero-gradient-sweep-text font-serif italic">
            {content}
          </span>
        </span>
      );
    }

    return (
      <em
        key={i}
        className={`relative inline-block font-serif italic ${accentClass}`}
      >
        {content}
        {underline && (
          <svg
            className="pointer-events-none absolute -bottom-1 left-0 w-full h-2.5 text-brass overflow-visible"
            viewBox="0 0 240 12"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M3 8.5C62 2.5 172 2 237 7.5C192 10.5 104 11 42 8.5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}
      </em>
    );
  });

  return <>{nodes}</>;
}
