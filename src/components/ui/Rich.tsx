import type { ReactNode } from "react";

/**
 * Render text with *asterisks* as italic serif spans with optional hand-drawn brass underline.
 * Safe for the bilingual dictionary.
 */
export function Rich({
  text,
  underline = true,
  accentClass = "text-terracotta",
}: {
  text: string;
  underline?: boolean;
  accentClass?: string;
}) {
  const parts = text.split(/(\*[^*]+\*)/g);
  const nodes: ReactNode[] = parts.map((p, i) =>
    p.startsWith("*") && p.endsWith("*") ? (
      <em
        key={i}
        className={`relative inline-block font-serif italic ${accentClass}`}
      >
        {p.slice(1, -1)}
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
    ) : (
      p
    ),
  );
  return <>{nodes}</>;
}
