import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ShieldCheck, Sparkles, X } from "lucide-react";
import { CheckoutFlowContext } from "@/components/landing/checkout-flow-context";
import { checkoutLinks } from "@/lib/checkout";

const premiumBenefits = [
  "Tudo do Kit Básico",
  "6 bônus exclusivos",
  "Classes gramaticais",
  "Caligrafia para pintar",
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
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#07152f]/70 p-2 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="premium-offer-title"
        aria-describedby="premium-offer-description"
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[calc(100dvh-1rem)] w-full max-w-md overflow-hidden rounded-[1.5rem] border border-white/80 bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-[1.75rem]"
      >
        <button
          type="button"
          onClick={onClose}
          data-modal-action="fechar"
          aria-label="Fechar a oferta e voltar à página"
          className="absolute right-2.5 top-2.5 z-10 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-3 sm:top-3"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-4 pb-4 pt-4 text-center sm:px-6 sm:pb-5 sm:pt-5">
          <div className="pr-10 sm:pr-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.13em] text-primary">
              <Sparkles className="h-3 w-3" /> Oferta exclusiva desta etapa
            </span>
          </div>

          <h2
            id="premium-offer-title"
            className="mx-auto mt-2.5 max-w-sm text-[1.35rem] font-black leading-[1.08] tracking-[-0.025em] text-slate-950 sm:text-[1.75rem]"
          >
            Espere. Por só <span className="text-cta">R$9,10 a mais</span>, leve o Kit Premium
            completo.
          </h2>

          <p
            id="premium-offer-description"
            className="mx-auto mt-2 max-w-sm text-[11px] font-medium leading-snug text-slate-600 sm:text-xs"
          >
            Você já escolheu o Básico por R$17,90. Aproveite agora e libere também os materiais
            Premium por apenas R$27.
          </p>

          <ul className="mt-3 grid grid-cols-2 gap-1.5 text-left">
            {premiumBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex min-h-9 items-center gap-1.5 rounded-xl bg-slate-50 px-2 py-1.5 text-[10px] font-bold leading-tight text-slate-800 sm:text-[11px]"
              >
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-cta/15 text-cta">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center justify-between rounded-2xl border border-cta/20 bg-cta/8 px-3 py-2.5 text-left">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500">
                Kit Premium completo
              </p>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-500">
                De <span className="line-through decoration-destructive">R$37,90</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-cta">
                Só agora
              </p>
              <p className="text-3xl font-black leading-none tracking-tight text-cta">R$27</p>
            </div>
          </div>

          <a
            ref={primaryCtaRef}
            href={checkoutLinks.premiumOferta}
            data-checkout="premium-oferta-27"
            className="sheen-cta mt-3 flex min-h-12 w-full items-center justify-center rounded-xl bg-cta-gradient px-3 py-2.5 text-center text-[12px] font-extrabold uppercase leading-tight text-cta-foreground shadow-cta transition-transform hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 sm:text-sm"
          >
            <span className="relative z-10">Sim, quero o Premium completo por R$27</span>
          </a>

          <p className="mt-2 flex items-center justify-center gap-1 text-[9px] font-semibold text-slate-500 sm:text-[10px]">
            <ShieldCheck className="h-3 w-3 text-cta" /> Pagamento seguro e garantia de 7 dias
          </p>

          <a
            href={checkoutLinks.basico}
            data-checkout="basico-modal-recusar"
            className="mt-1.5 block py-1 text-center text-[10px] font-semibold leading-snug text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Não, quero continuar somente com o Kit Básico por R$17,90.
          </a>
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
