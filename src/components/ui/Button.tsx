import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl min-h-11 font-semibold text-sm transition-all active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-terracotta text-white hover:bg-terracotta-hover active:bg-terracotta-hover px-6 py-3",
  secondary:
    "border border-charcoal/25 text-charcoal hover:bg-sand active:bg-sand-border px-6 py-3",
  ghost:
    "text-charcoal hover:text-terracotta hover:bg-sand/60 active:bg-sand px-3.5 py-2.5",
};

type BtnProps = { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkBtnProps = {
  variant?: Variant;
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: BtnProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}

export function LinkButton({
  variant = "primary",
  className = "",
  href,
  ...props
}: LinkBtnProps) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
