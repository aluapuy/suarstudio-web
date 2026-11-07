import type { ReactNode } from "react";

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full bg-cypress-tint text-cypress text-xs font-semibold px-3 py-1 ${className}`}
    >
      {children}
    </span>
  );
}
