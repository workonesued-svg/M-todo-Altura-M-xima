import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Clock3, Flame, ShieldCheck, ShoppingCart, X } from "lucide-react";
import { CheckoutFlowContext } from "@/components/landing/checkout-flow-context";
import { checkoutLinks } from "@/lib/checkout";
import { trackInitiateCheckout } from "@/lib/tracking";

const OFFER_DURATION_SECONDS = 8 * 60 + 30;

function PremiumOfferModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(OFFER_DURATION_SECONDS);

  useEffect(() => {
    if (!open) return;

    setSecondsRemaining(OFFER_DURATION_SECONDS);
    const timer = window.setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [open]);

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

  const minutes = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsRemaining % 60).toString().padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#07152f]/80 p-1.5 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="premium-offer-title"
        aria-describedby="premium-offer-description"
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[calc(100dvh-0.75rem)] w-full max-w-[31rem] overflow-hidden rounded-[1.6rem] border-[4px] border-[#082a5b] bg-[#fffaf0] shadow-[0_28px_80px_-20px_rgba(1,19,50,0.75)] sm:max-h-[calc(100dvh-2rem)] sm:rounded-[2rem] sm:border-[5px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(255,190,0,0.23),transparent_46%)]"
        />

        <button
          type="button"
          onClick={onClose}
          data-modal-action="fechar"
          aria-label="Fechar a oferta e voltar à página"
          className="absolute right-2.5 top-2.5 z-20 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-[#082a5b] shadow-md transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb400] sm:right-3.5 sm:top-3.5 sm:h-10 sm:w-10"
        >
          <X className="h-5 w-5 stroke-[2.5]" />
        </button>

        <div className="relative flex min-h-0 flex-col items-center px-3 pb-3 pt-3 text-center sm:px-6 sm:pb-5 sm:pt-4">
          <div className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#ffe395] bg-gradient-to-b from-[#ffd968] to-[#ffb90b] px-5 py-1.5 text-sm font-black uppercase tracking-[0.02em] text-[#082a5b] shadow-[0_6px_16px_-8px_rgba(180,110,0,0.9)] sm:text-lg">
            <Flame className="h-5 w-5 fill-[#082a5b]" /> Oferta especial
          </div>

          <div className="mt-2 flex items-center gap-2.5 rounded-2xl border border-white/20 bg-gradient-to-b from-[#173d72] to-[#061f49] px-4 py-2 text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_8px_20px_-12px_rgba(0,24,64,0.9)] sm:px-5">
            <Clock3 className="h-8 w-8 shrink-0 text-[#ffbd16] sm:h-10 sm:w-10" />
            <div className="text-left">
              <p className="text-[9px] font-extrabold uppercase leading-none tracking-[0.05em] sm:text-[10px]">
                Esta oferta expira em
              </p>
              <time
                dateTime={`PT${minutes}M${seconds}S`}
                aria-label={`Restam ${minutes} minutos e ${seconds} segundos`}
                className="mt-0.5 block font-mono text-[1.9rem] font-black leading-none tracking-[-0.05em] tabular-nums sm:text-[2.25rem]"
              >
                {minutes}:{seconds}
              </time>
            </div>
          </div>

          <h2
            id="premium-offer-title"
            className="mx-auto mt-2 max-w-md text-[clamp(1.4rem,6vw,2.35rem)] font-black uppercase leading-[0.98] tracking-[-0.035em] text-[#082a5b]"
          >
            Esta é a sua <span className="block text-[#f5a900]">melhor oportunidade!</span>
          </h2>

          <p
            id="premium-offer-description"
            className="mx-auto mt-1.5 max-w-sm text-[10px] font-bold leading-snug text-[#445269] sm:text-xs"
          >
            Você já garantiu o Básico. Por apenas R$9,10 a mais, desbloqueie agora o Kit Premium
            completo.
          </p>

          <div className="mt-2 flex w-full max-w-sm items-stretch justify-center gap-1.5 sm:gap-2">
            <div className="flex min-w-0 flex-1 flex-col justify-center rounded-xl border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
              <p className="text-[9px] font-extrabold uppercase text-slate-500">De</p>
              <p className="text-base font-black leading-none text-slate-500 line-through decoration-2 decoration-red-500 sm:text-lg">
                R$37,90
              </p>
            </div>
            <div className="grid shrink-0 place-items-center rounded-full bg-[#082a5b] px-2 text-[9px] font-black uppercase leading-tight text-white sm:px-3 sm:text-[10px]">
              Por
              <br />
              apenas
            </div>
            <div className="flex min-w-0 flex-[1.35] items-center justify-center rounded-xl border border-[#ffbd16] bg-gradient-to-b from-[#ffe17b] to-[#ffb70e] px-2 py-1.5 text-[#082a5b] shadow-[0_7px_16px_-10px_rgba(170,105,0,0.9)]">
              <span className="mr-1 text-sm font-black sm:text-base">R$</span>
              <span className="text-[2rem] font-black leading-none tracking-[-0.055em] sm:text-[2.45rem]">
                27
              </span>
            </div>
          </div>

          <div className="relative mt-1.5 w-full">
            <span className="absolute left-0 top-1 z-10 rounded-full bg-[#082a5b] px-2 py-1 text-[8px] font-black uppercase tracking-[0.04em] text-white shadow-sm sm:left-2 sm:text-[9px]">
              Kit Premium completo
            </span>
            <img
              src="/images/kit-leitura-em-blocos-premium.png"
              alt="Kit Premium Método Leitura em Blocos com seis apostilas, bônus e materiais complementares"
              className="mx-auto h-[clamp(5.5rem,22dvh,12rem)] w-full object-contain drop-shadow-[0_12px_14px_rgba(20,37,64,0.2)]"
            />
          </div>

          <p className="mt-0.5 flex items-center justify-center gap-1.5 text-[9px] font-bold text-[#17365f] sm:text-xs">
            <ShieldCheck className="h-3.5 w-3.5" /> Pagamento seguro e garantia de 7 dias
          </p>

          <a
            ref={primaryCtaRef}
            href={checkoutLinks.premiumOferta}
            onClick={trackInitiateCheckout}
            suppressHydrationWarning
            data-checkout="premium-oferta-27"
            className="premium-offer-cta sheen-cta mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#ffad00] bg-gradient-to-b from-[#ffdc67] via-[#ffc42c] to-[#ffb10a] px-3 py-2 text-center text-[11px] font-black uppercase leading-tight text-[#082a5b] shadow-[0_12px_24px_-12px_rgba(190,115,0,0.95)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb400] focus-visible:ring-offset-2 sm:min-h-14 sm:text-sm"
          >
            <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#082a5b] text-white sm:h-9 sm:w-9">
              <ShoppingCart className="h-4 w-4 fill-white/20" />
            </span>
            <span className="relative z-10">Sim! Quero o Kit Premium completo por R$27</span>
          </a>

          <a
            href={checkoutLinks.basico}
            onClick={trackInitiateCheckout}
            suppressHydrationWarning
            data-checkout="basico-modal-recusar"
            className="mt-1.5 flex min-h-10 w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-gradient-to-b from-white to-slate-100 px-3 py-1.5 text-center text-[9px] font-extrabold uppercase leading-tight text-[#17365f] shadow-sm hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#082a5b] sm:text-[11px]"
          >
            <span>Não, quero continuar somente com o Kit Básico</span>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-500 text-white">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
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
