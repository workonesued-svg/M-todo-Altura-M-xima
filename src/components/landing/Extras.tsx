import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mockupPlacas from "@/assets/mockup-placas-crecimiento.png";
import mockupPlanAccionCard from "@/assets/mockup-plan-accion-dashboard.png";
import mockupNutri from "@/assets/mockup-nutricional.jpg";
import mockupTracker from "@/assets/mockup-tracker.jpg";
import mockupMetodo from "@/assets/mockup-metodo.jpg";
import mockupCalendario from "@/assets/mockup-calendario.jpg";
import mockupSecretoVerde from "@/assets/mockup-secreto-verde.png";
import mockupChecklist from "@/assets/mockup-checklist-semanal.png";

const gallery = [
  { img: mockupMetodo, label: "Método Altura Máxima", pro: false },
  { img: mockupPlacas, label: "Guía de las Placas de Crecimiento", pro: false },
  { img: mockupPlanAccionCard, label: "Plan de Acción PRO", pro: true },
  { img: mockupTracker, label: "Tracker de Evolución", pro: true },
  { img: mockupCalendario, label: "Calendario de Crecimiento", pro: true },
  { img: mockupNutri, label: "Plan Nutricional PRO", pro: true },
  { img: mockupChecklist, label: "Checklist Semanal PRO", pro: true },
  { img: mockupSecretoVerde, label: "El Secreto Verde", pro: true },
];

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 16;
    setActive(Math.min(gallery.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 16;
    const i = Math.min(gallery.length - 1, Math.max(0, index));
    el.scrollTo({ left: i * step, behavior: "smooth" });
  };

  return (
    <section className="bg-[var(--surface)] pb-14">
      <div className="mx-auto max-w-5xl px-5">
        <h2 className="text-3xl sm:text-4xl">Mira todo lo que recibirás</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Contenido organizado para que puedas abrir, entender y empezar. Desliza o usa las flechas.
        </p>
      </div>

      <div className="relative mt-6">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2"
        >
          {gallery.map((g) => (
            <figure
              key={g.label}
              className="w-[72vw] max-w-xs shrink-0 snap-center overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card"
            >
              <div className="relative">
                <img
                  src={g.img}
                  alt={g.label}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
                    g.pro
                      ? "bg-gold-gradient text-gold-foreground shadow-gold"
                      : "bg-blue-gradient text-primary-foreground shadow-blue"
                  }`}
                >
                  {g.pro ? "Exclusivo Plan PRO" : "Incluido en Essential"}
                </span>
              </div>
              <figcaption className="px-4 py-3 text-sm font-semibold">{g.label}</figcaption>
            </figure>
          ))}

        </div>

        {/* Pistas visuales de que hay más contenido */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[var(--surface)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--surface)] to-transparent" />

        <button
          type="button"
          aria-label="Anterior"
          onClick={() => scrollTo(active - 1)}
          className="glow-blue absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-card/90 text-foreground backdrop-blur disabled:opacity-40"
          disabled={active === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => scrollTo(active + 1)}
          className="glow-blue absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border/70 bg-card/90 text-foreground backdrop-blur disabled:opacity-40"
          disabled={active === gallery.length - 1}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {gallery.map((g, i) => (
          <button
            key={g.label}
            type="button"
            aria-label={`Ir a ${g.label}`}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-gold-gradient" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
