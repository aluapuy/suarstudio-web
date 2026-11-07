import type { ReactNode } from "react";

type Props = {
  id?: string;
  dark?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({ id, dark, className = "", children }: Props) {
  return (
    <section
      id={id}
      className={`py-14 md:py-24 px-5 ${dark ? "bg-obsidian text-white" : ""} ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 mb-3">
      <span className="h-0.5 w-6 bg-brass rounded-full shrink-0" aria-hidden="true" />
      <p className="font-sans text-xs sm:text-sm font-bold tracking-wide text-terracotta">
        {children}
      </p>
    </div>
  );
}
