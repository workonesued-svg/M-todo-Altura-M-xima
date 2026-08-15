import { useEffect, useState } from "react";
import { Check, Crown, Info, Timer } from "lucide-react";
import { useLocalPrice, type PriceInfo, type PlanId } from "@/lib/currency";

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(left / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return `${m}:${s}`;
}

const essentialItems = [
  "Rutina",
  "Nutrición",
  "Descanso",
  "Guía de las Placas de Crecimiento",
  "Acceso inmediato",
];

const proItems = [
  "Tracker de Evolución — 130 días",
  "Plan de Acción PRO",
  "Calendario de Crecimiento — 6 meses",
  "Checklist Semanal PRO",
  "El Secreto Verde",
  "Plan Nutricional PRO",
];

export function PriceBlock({
  plan,
  price,
  gold,
}: {
  plan: PlanId;
  price: PriceInfo;
  gold?: boolean;
}) {
  const planPrice = price[plan];
  return (
    <div className="mt-3">
      <p className="text-sm text-muted-foreground">
        Antes:{" "}
        <span className="line-through decoration-destructive/80 decoration-2">
          {planPrice.before}
        </span>
      </p>
      <p className="mt-0.5 flex flex-wrap items-baseline gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Ahora:
        </span>
        <span
          className={`text-5xl leading-none font-display ${gold ? "text-gold-gradient" : "text-foreground"}`}
        >
          {planPrice.now}
        </span>
      </p>
      {price.isLocal && (
        <p className="mt-0.5 text-[11px] text-muted-foreground">Precio base: {planPrice.usdNow}</p>
      )}
      <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        Precio promocional por tiempo limitado
      </p>
      {price.isLocal && (
        <div
          className={`mt-2 flex items-start gap-2 rounded-lg border px-3 py-2 ${
            gold ? "border-[var(--gold)]/30 bg-[var(--gold)]/10" : "border-primary/30 bg-primary/10"
          }`}
        >
          <Info
            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${gold ? "text-[var(--gold)]" : "text-primary"}`}
          />
          <p className="text-[11px] leading-snug text-muted-foreground">
            <span className={`font-bold ${gold ? "text-[var(--gold)]" : "text-primary"}`}>
              Precio aproximado.
            </span>{" "}
            Puede variar levemente respecto al checkout — la diferencia suele ser mínima.
          </p>
        </div>
      )}
    </div>
  );
}

export function PlanEssential({ price }: { price: PriceInfo }) {
  return (
    <article
      id="plan-essential"
      className="card-lift flex h-full flex-col rounded-2xl border border-primary/40 bg-card p-6 shadow-card"
    >
      <span className="w-fit rounded-full bg-primary/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary">
        Oferta especial
      </span>
      <h3 className="mt-4 text-3xl uppercase">Plan Essential</h3>
      <PriceBlock plan="essential" price={price} />
      <p className="mt-3 text-sm text-muted-foreground">
        Todo lo esencial para entender los fundamentos y empezar.
      </p>
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        Incluye:
      </p>
      <ul className="mt-3 space-y-2 lg:min-h-[15rem]">
        {essentialItems.map((i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {i}
          </li>
        ))}
      </ul>
      <a
        href="https://pay.hotmart.com/E107152836Q?off=vo72z49a&checkoutMode=10"
        className="glow-blue mt-8 flex w-full items-center justify-center rounded-xl bg-blue-gradient px-4 py-4 text-center text-sm font-extrabold uppercase tracking-wide text-primary-foreground shadow-blue active:scale-[0.98]"
      >
        Quiero el Essential — {price.essential.now}
      </a>
      <p className="mt-auto pt-3 text-center text-xs text-muted-foreground">
        Pago único · Acceso inmediato
      </p>
    </article>
  );
}

export function PlanPro({ price }: { price: PriceInfo }) {
  return (
    <article
      id="plan-pro"
      className="card-lift relative flex h-full flex-col rounded-2xl border-2 border-[var(--gold)] bg-[var(--navy)] p-6 shadow-gold"
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span className="rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-foreground">
          Más completo
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--gold)]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--gold)]">
          <Crown className="h-3 w-3" /> Opción recomendada
        </span>
      </div>
      <h3 className="mt-4 text-3xl uppercase text-gold-gradient">Plan PRO</h3>
      <PriceBlock plan="pro" price={price} gold />
      <p className="mt-3 text-sm text-muted-foreground">
        La opción para quien quiere seguir el método de forma mucho más completa y organizada.
      </p>
      <p className="mt-5 rounded-lg bg-[var(--gold)]/10 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--gold)]">
        Todo lo del Plan Essential +
      </p>
      <ul className="mt-3 space-y-2">
        {proItems.map((i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
            {i === "El Secreto Verde" ? (
              <span className="text-green-gradient font-bold tracking-wide">{i}</span>
            ) : (
              i
            )}
          </li>
        ))}
      </ul>
      <a
        href="https://pay.hotmart.com/F107153247F?checkoutMode=10"
        className="sheen-gold mt-8 flex w-full items-center justify-center rounded-xl bg-gold-gradient px-4 py-4 text-center text-sm font-extrabold uppercase tracking-wide text-gold-foreground shadow-gold active:scale-[0.98]"
      >
        <span className="relative z-10">Quiero el Plan PRO — {price.pro.now}</span>
      </a>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Para quien quiere seguir una estructura completa durante los próximos meses.
      </p>
    </article>
  );
}

export function Offer() {
  const time = useCountdown(15 * 60 - 1);
  const price = useLocalPrice();

  return (
    <section id="planes" className="relative overflow-hidden bg-hero-gradient px-5 py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl sm:text-4xl">Aprovecha el precio promocional</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Elige ahora cómo quieres empezar con Método Altura Máxima.
        </p>

        <div className="mx-auto mt-6 w-full max-w-xs rounded-2xl border border-destructive/50 bg-destructive/10 px-5 py-4 text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-destructive">
            <Timer className="h-3.5 w-3.5" /> Oferta disponible por:
          </p>
          <p className="mt-1 text-5xl leading-none font-display tabular-nums">{time}</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:items-stretch">
          {/* PRO primero en mobile, Essential a la izquierda en desktop */}
          <div className="order-2 h-full lg:order-1">
            <PlanEssential price={price} />
          </div>
          <div className="order-1 h-full lg:order-2">
            <PlanPro price={price} />
          </div>
        </div>
      </div>
    </section>
  );
}
