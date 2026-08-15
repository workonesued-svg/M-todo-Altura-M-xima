import { useEffect, useState } from "react";
import { Check, Info } from "lucide-react";
import { useLocalPrice } from "@/lib/currency";
import { scrollToPlan } from "@/lib/scroll-to-plan";

export function FinalCta() {
  const price = useLocalPrice();

  return (
    <section className="bg-[oklch(0.10_0.02_264)] px-5 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl leading-tight sm:text-4xl">
          Deja de seguir improvisando y empieza a trabajar tu potencial de forma más clara.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Empieza hoy a cuidar mejor los factores que sí puedes controlar.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => scrollToPlan("plan-essential")}
            className="card-lift order-2 w-full rounded-2xl border border-primary/40 bg-card p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:order-1"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              Plan Essential
            </p>
            <p className="text-xs text-muted-foreground line-through">{price.essential.before}</p>
            <p className="mt-1 text-4xl font-display">{price.essential.now}</p>
            {price.isLocal && (
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Precio base: {price.essential.usdNow}
              </p>
            )}
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-primary" /> Los fundamentos para empezar
            </p>
          </button>
          <button
            type="button"
            onClick={() => scrollToPlan("plan-pro")}
            className="card-lift order-1 w-full rounded-2xl border-2 border-[var(--gold)] bg-[var(--navy)] p-5 text-left shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/60 sm:order-2"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
              Plan PRO · Recomendado
            </p>
            <p className="text-xs text-muted-foreground line-through">{price.pro.before}</p>
            <p className="mt-1 text-4xl font-display text-gold-gradient">{price.pro.now}</p>
            {price.isLocal && (
              <p className="mt-0.5 text-[10px] text-muted-foreground">Precio base: {price.pro.usdNow}</p>
            )}
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-[var(--gold)]" /> La estructura completa
            </p>
          </button>
        </div>

        {price.isLocal && (
          <div className="mx-auto mt-3 flex w-fit max-w-full items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] text-muted-foreground">
            <Info className="h-3.5 w-3.5 shrink-0 text-primary" />
            <span>
              <span className="font-bold text-primary">Precio aproximado.</span> La diferencia suele ser
              mínima.
            </span>
          </div>
        )}

        <a
          href="#planes"
          className="sheen-gold mt-7 flex w-full items-center justify-center rounded-xl bg-gold-gradient px-6 py-4 text-base font-extrabold uppercase tracking-wide text-gold-foreground shadow-gold active:scale-[0.98]"
        >
          <span className="relative z-10">Quiero empezar ahora</span>
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-5 py-8 text-center">
      <p className="text-xs text-muted-foreground">
        © 2026 Método Altura Máxima. Todos los derechos reservados.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        <a href="#planes" className="hover:text-foreground">
          Términos de Uso
        </a>{" "}
        ·{" "}
        <a href="#planes" className="hover:text-foreground">
          Política de Privacidad
        </a>{" "}
        ·{" "}
        <a href="#planes" className="hover:text-foreground">
          Contacto
        </a>
      </p>
    </footer>
  );
}

export function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-[oklch(0.12_0.02_264)]/95 p-3 backdrop-blur transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#planes"
        className="pulse-cta glow-blue mx-auto flex max-w-md items-center justify-center rounded-xl bg-blue-gradient px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-primary-foreground shadow-blue"
      >
        Ver planes
      </a>
    </div>
  );
}
