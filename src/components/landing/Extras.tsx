import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Gift } from "lucide-react";
import { Placeholder } from "@/components/landing/Placeholder";

const examples = [
  { label: "O Pato de João", text: "Texto curto com perguntas de compreensão." },
  { label: "A Horta da Vovó", text: "Vocabulário novo e interpretação guiada." },
  { label: "O Dia de Chuva", text: "Atividade de escrita com as próprias palavras." },
];

export function ActivityExamples() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const step = useCallback(() => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 16 : 0;
  }, []);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const s = step();
    if (!s) return;
    setActive(Math.min(examples.length - 1, Math.max(0, Math.round(el.scrollLeft / s))));
  }, [step]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    const s = step();
    if (!el || !s) return;
    const i = Math.min(examples.length - 1, Math.max(0, index));
    el.scrollTo({ left: i * s, behavior: "smooth" });
  };

  return (
    <section className="bg-surface pb-12 pt-12">
      <div className="mx-auto max-w-md px-4">
        <h2 className="text-center text-[1.6rem] leading-[1.15] font-extrabold sm:text-3xl">
          Exemplos de atividades
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Deslize para ver como as páginas do método são organizadas.
        </p>
      </div>

      <div className="relative mt-5">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
        >
          {examples.map((e) => (
            <figure
              key={e.label}
              className="w-[78%] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-card shadow-card"
            >
              <Placeholder
                icon={FileText}
                variant="card"
                aspect="aspect-[3/4]"
                className="rounded-none"
              />
              <figcaption className="px-4 py-3">
                <p className="text-sm font-extrabold">{e.label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{e.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          aria-label="Anterior"
          onClick={() => scrollTo(active - 1)}
          className="absolute left-2 top-[38%] z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-card backdrop-blur disabled:opacity-40"
          disabled={active === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Próximo"
          onClick={() => scrollTo(active + 1)}
          className="absolute right-2 top-[38%] z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-card backdrop-blur disabled:opacity-40"
          disabled={active === examples.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {examples.map((e, i) => (
          <button
            key={e.label}
            type="button"
            aria-label={`Ir para ${e.label}`}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-primary" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

const bonuses = [
  "Sílabas Simples",
  "Sílabas Complexas",
  "Gêneros Textuais",
  "Alfabetização",
  "Ortografia",
  "Produção de Textos",
];

export function Bonuses() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-gradient px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-sun-foreground shadow-sun">
            <Gift className="h-3.5 w-3.5" />
            Bônus exclusivos
          </span>
        </div>
        <h2 className="mt-3 text-center text-[1.6rem] leading-[1.15] font-extrabold sm:text-3xl">
          Comprando hoje, você leva +6 apostilas de presente
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {bonuses.map((b) => (
            <article
              key={b}
              className="card-lift overflow-hidden rounded-2xl border border-border bg-card shadow-card"
            >
              <Placeholder
                icon={Gift}
                variant="sun"
                aspect="aspect-square"
                className="rounded-none"
                iconClassName="h-8 w-8"
              />
              <p className="px-3 py-2.5 text-center text-sm font-bold leading-snug">{b}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 rounded-2xl border border-primary/25 bg-primary/10 px-5 py-3 text-center text-sm font-extrabold text-primary">
          Total em bônus: de R$180,00 por R$0,00 hoje
        </p>
      </div>
    </section>
  );
}
