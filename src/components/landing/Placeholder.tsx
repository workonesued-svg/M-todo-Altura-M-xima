import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "cta" | "sun" | "card";

const VARIANT_BG: Record<Variant, string> = {
  primary: "bg-primary-gradient",
  cta: "bg-cta-gradient",
  sun: "bg-sun-gradient",
  card: "bg-secondary",
};

const VARIANT_TEXT: Record<Variant, string> = {
  primary: "text-primary-foreground",
  cta: "text-cta-foreground",
  sun: "text-sun-foreground",
  card: "text-foreground",
};

/**
 * Placeholder visual standing in for a future photo/mockup. Keeps the
 * page's aspect ratios and layout final now so real images can drop in
 * later with width:100%/height:auto and nothing else needs to change.
 */
export function Placeholder({
  icon: Icon,
  label,
  variant = "primary",
  aspect = "aspect-[4/5]",
  className = "",
  iconClassName = "h-10 w-10",
}: {
  icon: LucideIcon;
  label?: string;
  variant?: Variant;
  aspect?: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={`relative flex ${aspect} w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl ${VARIANT_BG[variant]} ${VARIANT_TEXT[variant]} ${className}`}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-black/10" />
      <Icon className={`${iconClassName} shrink-0 drop-shadow-sm`} strokeWidth={1.75} />
      {label && (
        <span className="max-w-[80%] text-center text-xs font-bold uppercase leading-snug tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}
