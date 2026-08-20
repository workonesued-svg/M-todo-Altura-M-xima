import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useCheckoutFlow } from "@/components/landing/checkout-flow-context";
import { checkoutLinks } from "@/lib/checkout";

export function FinalCta() {
  const { openBasicOffer } = useCheckoutFlow();

  return (
    <section id="final-cta" className="bg-hero-gradient px-4 py-14">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-[1.7rem] leading-[1.15] font-extrabold sm:text-3xl">
          Ajude seu filho ou aluno a compreender o que lê, sem transformar o momento de aprender em
          uma frustração.
        </h2>
        <p className="mt-3 text-base font-bold text-foreground">
          Comece hoje por apenas <span className="text-xl text-cta">R$17,90</span>.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={openBasicOffer}
            data-checkout-trigger="basico-final-card"
            className="card-lift w-full rounded-2xl border-2 border-primary/25 bg-card p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
              Kit Leitura em Blocos™
            </p>
            <p className="text-xs text-muted-foreground line-through">R$67,90</p>
            <p className="mt-1 text-3xl font-display">R$17,90</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-primary" /> O essencial em 6 etapas
            </p>
          </button>
          <a
            href={checkoutLinks.premium}
            data-checkout="premium-final-card"
            className="card-lift w-full rounded-2xl border-2 border-primary bg-card p-4 text-left shadow-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
              Kit Premium · Mais escolhido
            </p>
            <p className="text-xs text-muted-foreground line-through">R$87,90</p>
            <p className="mt-1 text-3xl font-display text-primary-gradient">R$37,90</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-primary" /> Classes gramaticais e caligrafia
            </p>
          </a>
        </div>

        <button
          type="button"
          onClick={openBasicOffer}
          data-checkout-trigger="basico-final-cta"
          className="cta-single-line sheen-cta mt-6 flex w-full items-center justify-center rounded-2xl bg-cta-gradient px-2 py-4 font-extrabold uppercase text-cta-foreground shadow-cta active:scale-[0.98] sm:px-6"
        >
          <span className="relative z-10">Quero garantir meu kit agora</span>
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-warm px-4 py-8 text-center">
      <p className="text-xs text-muted-foreground">
        © 2026 Método Leitura em Blocos™. Todos os direitos reservados.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        <a href="#oferta" className="hover:text-foreground">
          Termos de Uso
        </a>{" "}
        ·{" "}
        <a href="#oferta" className="hover:text-foreground">
          Política de Privacidade
        </a>{" "}
        ·{" "}
        <a href="#oferta" className="hover:text-foreground">
          Contato
        </a>
      </p>
    </footer>
  );
}

export function StickyBar() {
  const [show, setShow] = useState(false);
  const { openBasicOffer } = useCheckoutFlow();

  useEffect(() => {
    let frame: number | null = null;

    const updateVisibility = () => {
      const finalCta = document.getElementById("final-cta");
      const beforeFinalCta = finalCta
        ? finalCta.getBoundingClientRect().top > window.innerHeight
        : true;

      setShow(window.scrollY > 500 && beforeFinalCta);
    };

    const requestVisibilityUpdate = () => {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateVisibility();
      });
    };

    updateVisibility();
    window.addEventListener("scroll", requestVisibilityUpdate, { passive: true });
    window.addEventListener("resize", requestVisibilityUpdate);

    return () => {
      window.removeEventListener("scroll", requestVisibilityUpdate);
      window.removeEventListener("resize", requestVisibilityUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-3 backdrop-blur transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <button
        type="button"
        onClick={openBasicOffer}
        data-checkout-trigger="basico-sticky"
        className="cta-single-line pulse-cta glow-cta mx-auto flex max-w-md items-center justify-center rounded-2xl bg-cta-gradient px-2 py-3.5 font-extrabold uppercase text-cta-foreground shadow-cta sm:px-6"
      >
        Quero garantir meu kit agora
      </button>
    </div>
  );
}
