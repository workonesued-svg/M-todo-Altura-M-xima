import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Sparkles, X } from "lucide-react";
import { CheckoutFlowContext } from "@/components/landing/checkout-flow-context";
import { checkoutLinks } from "@/lib/checkout";

const premiumBenefits = [
  "Uma experiência mais completa",
  "Mais materiais e atividades",
  "Conteúdos complementares",
  "Materiais exclusivos da versão Premium",
  "Arquivos digitais para acessar, baixar e imprimir",
];

function PremiumOfferModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primaryCtaRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-foreground/65 p-3 backdrop-blur-sm sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="premium-offer-title"
        aria-describedby="premium-offer-description"
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border-2 border-sun/60 bg-surface-warm shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem]"
      >
        <button
          type="button"
          onClick={onClose}
          data-modal-action="fechar"
          aria-label="Fechar a oferta e voltar à página"
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-card transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-4 sm:top-4"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="bg-hero-dots px-4 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-7">
          <div className="pr-12 text-center sm:pr-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-destructive-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> Antes de continuar...
            </span>
            <h2
              id="premium-offer-title"
              className="mx-auto mt-3 max-w-xl text-2xl font-extrabold leading-tight text-foreground sm:text-4xl"
            >
              Você vai levar só o Básico?
            </h2>
          </div>

          <div className="mt-4 grid items-start gap-4 sm:mt-6 sm:grid-cols-[13rem_1fr] sm:gap-7">
            <div className="mx-auto hidden w-full max-w-[13rem] overflow-hidden rounded-2xl border border-primary/20 bg-card p-2 shadow-card sm:block">
              <img
                src="/images/kit-leitura-em-blocos-premium.png"
                alt="Kit Leitura em Blocos Premium completo"
                width={1254}
                height={1254}
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>

            <div className="text-center sm:text-left">
              <p
                id="premium-offer-description"
                className="text-sm leading-relaxed text-muted-foreground"
              >
                Você já decidiu investir no desenvolvimento da leitura dessa criança. Antes de
                continuar, queremos liberar uma condição especial que pode fazer muito mais sentido
                para você.
              </p>

              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
                Leve o Kit Premium completo
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">
                Tenha mais materiais para trabalhar leitura, compreensão, interpretação e escrita,
                além dos conteúdos extras e exclusivos da versão Premium.
              </p>

              <div className="mt-3 rounded-2xl border border-cta/25 bg-card px-4 py-3 text-center shadow-sm">
                <p className="text-xs text-muted-foreground">
                  De{" "}
                  <span className="line-through decoration-destructive decoration-2">R$37,90</span>
                </p>
                <p className="mt-0.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-cta">
                  Por apenas
                </p>
                <p className="text-5xl font-display leading-none text-cta sm:text-6xl">R$27</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card px-4 pb-5 pt-4 sm:px-7 sm:pb-7 sm:pt-5">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-7">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-foreground">
                Com o Premium você leva:
              </p>
              <ul className="mt-2 space-y-1.5">
                {premiumBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-xs leading-snug text-muted-foreground"
                  >
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-cta/15 text-cta">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-first flex flex-col justify-center sm:order-none">
              <p className="text-center text-sm font-extrabold leading-snug text-foreground">
                Se você já decidiu ajudar essa criança a avançar, por que levar menos quando pode
                ter o material completo por apenas R$27?
              </p>
              <a
                ref={primaryCtaRef}
                href={checkoutLinks.premiumOferta}
                data-checkout="premium-oferta-27"
                className="sheen-cta mt-3 flex min-h-14 w-full items-center justify-center rounded-2xl bg-cta-gradient px-3 py-3 text-center text-sm font-extrabold uppercase leading-tight text-cta-foreground shadow-cta transition-transform hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
              >
                <span className="relative z-10">Sim! Quero o Kit Premium por R$27</span>
              </a>
              <a
                href={checkoutLinks.basico}
                data-checkout="basico-modal-recusar"
                className="mt-3 block min-h-11 px-2 py-2 text-center text-xs font-bold leading-snug text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Não, obrigado. Quero continuar apenas com o Kit Básico.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckoutFlowProvider({ children }: { children: ReactNode }) {
  const [isBasicOfferOpen, setIsBasicOfferOpen] = useState(false);
  const openBasicOffer = useCallback(() => setIsBasicOfferOpen(true), []);
  const closeBasicOffer = useCallback(() => setIsBasicOfferOpen(false), []);
  const checkoutFlowValue = useMemo(() => ({ openBasicOffer }), [openBasicOffer]);

  return (
    <CheckoutFlowContext.Provider value={checkoutFlowValue}>
      {children}
      <PremiumOfferModal open={isBasicOfferOpen} onClose={closeBasicOffer} />
    </CheckoutFlowContext.Provider>
  );
}
