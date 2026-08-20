import { ArrowDown, Check, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useCheckoutFlow } from "@/components/landing/checkout-flow-context";
import { checkoutLinks } from "@/lib/checkout";

const basicItems = [
  "Textos organizados em blocos progressivos",
  "Método Leitura em Blocos™ completo em 6 etapas",
  "6 apostilas bônus exclusivas",
  "Material pronto para imprimir",
  "Acesso imediato e vitalício",
];

const premiumItems = [
  "Tudo o que está incluído no Kit Básico",
  "Apostila de classes gramaticais para os anos iniciais",
  "Apostila de caligrafia com atividades e ilustrações para colorir",
  "Trilha completa de alfabetização e ortografia",
  "Atividades de gêneros textuais e produção de texto",
  "Materiais organizados por nível de dificuldade",
];

function BenefitList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2 rounded-full bg-info/8 px-3 py-2 text-left text-[12px] leading-snug text-foreground"
        >
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-info/15 text-info">
            <Check className="h-2.5 w-2.5 stroke-[3]" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PurchaseTrust() {
  return (
    <div className="offer-trust-single-line mt-3 flex items-center justify-center gap-1.5 text-center font-bold text-muted-foreground sm:gap-2.5">
      <span className="inline-flex items-center justify-center gap-1">
        <Zap className="h-2.5 w-2.5 shrink-0 text-sun" /> Acesso imediato
      </span>
      <span className="inline-flex items-center justify-center gap-1">
        <ShieldCheck className="h-2.5 w-2.5 shrink-0 text-info" /> Pagamento seguro
      </span>
      <span className="inline-flex items-center justify-center gap-1">
        <ShieldCheck className="h-2.5 w-2.5 shrink-0 text-cta" /> Garantia de 7 dias
      </span>
    </div>
  );
}

export function Offer() {
  const { openBasicOffer } = useCheckoutFlow();

  return (
    <section id="oferta" className="bg-surface-warm px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-info/10 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-info">
            <Sparkles className="h-3.5 w-3.5" />
            Escolha seu kit
          </span>
        </div>
        <h2 className="mt-3 text-center text-[1.7rem] leading-[1.15] font-extrabold sm:text-3xl">
          Qual opção é ideal para você?
        </h2>

        <div className="mt-7 flex flex-col gap-6">
          <article
            id="plan-basico"
            className="card-lift overflow-hidden rounded-3xl border-2 border-info/30 bg-card p-4 text-center shadow-card sm:p-6"
          >
            <span className="inline-flex rounded-full bg-info/10 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-info">
              Kit básico
            </span>
            <h3 className="mx-auto mt-3 max-w-xs text-2xl font-extrabold leading-tight text-foreground">
              Kit Leitura em Blocos™ Básico
              <span className="mt-1 block text-base text-info">+ 6 bônus exclusivos</span>
            </h3>

            <div className="mx-auto mt-4 max-w-[17rem] overflow-hidden rounded-2xl border border-info/15 bg-surface-blue p-2 shadow-card">
              <img
                src="/images/metodo-leitura-em-blocos-kit.png"
                alt="Kit Método Leitura em Blocos com seis apostilas e materiais complementares"
                width={1254}
                height={1254}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              O essencial para desenvolver a leitura e a compreensão da criança com atividades leves
              e progressivas.
            </p>

            <BenefitList items={basicItems} />

            <div className="mt-5 rounded-2xl border border-cta/25 bg-cta/8 px-4 py-4">
              <p className="text-xs text-muted-foreground">
                De{" "}
                <span className="line-through decoration-destructive/70 decoration-2">R$67,90</span>
              </p>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.08em] text-cta">
                Por apenas
              </p>
              <p className="text-4xl font-display leading-none text-cta">R$17,90</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Pagamento único e sem mensalidades
              </p>
            </div>

            <button
              type="button"
              onClick={openBasicOffer}
              data-checkout-trigger="basico-oferta"
              className="cta-single-line glow-cta mt-4 flex w-full items-center justify-center rounded-2xl bg-cta-gradient px-2 py-4 text-center font-extrabold uppercase text-cta-foreground shadow-cta active:scale-[0.98] sm:px-6"
            >
              Quero adquirir agora
            </button>
            <PurchaseTrust />

            <a
              href="#plan-premium"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/35 bg-destructive/8 px-3 py-2.5 text-center text-[10px] leading-snug font-bold text-destructive transition-colors hover:bg-destructive/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30"
            >
              <span>Atenção, temos uma oferta mais vantajosa para você. Confira abaixo.</span>
              <ArrowDown className="h-3.5 w-3.5 shrink-0" />
            </a>
          </article>

          <article
            id="plan-premium"
            className="card-lift scroll-mt-4 overflow-hidden rounded-3xl border-2 border-primary bg-card p-4 text-center shadow-primary sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex rounded-full bg-primary-gradient px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary-foreground shadow-primary">
                Kit premium
              </span>
              <span className="inline-flex rounded-full bg-sun-gradient px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-sun-foreground shadow-sun">
                Mais escolhido
              </span>
            </div>

            <h3 className="mx-auto mt-3 max-w-sm text-2xl font-extrabold leading-tight text-primary-gradient">
              Kit Leitura em Blocos™ Premium
            </h3>

            <div className="mx-auto mt-4 max-w-[17rem] overflow-hidden rounded-2xl border border-primary/20 bg-primary/8 p-2 shadow-card">
              <img
                src="/images/kit-leitura-em-blocos-premium.png"
                alt="Kit Leitura em Blocos Premium com seis apostilas principais, seis bônus e cinco materiais premium"
                width={1254}
                height={1254}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A opção mais completa para avançar na leitura, interpretação, escrita e alfabetização.
            </p>

            <BenefitList items={premiumItems} />

            <div className="mt-5 rounded-2xl border border-cta/25 bg-cta/8 px-4 py-4">
              <p className="text-xs text-muted-foreground">
                De{" "}
                <span className="line-through decoration-destructive/70 decoration-2">R$87,90</span>
              </p>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.08em] text-cta">
                Por apenas
              </p>
              <p className="text-4xl font-display leading-none text-cta">R$37,90</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Pagamento único e sem mensalidades
              </p>
            </div>

            <a
              href={checkoutLinks.premium}
              data-checkout="premium-oferta"
              className="cta-single-line sheen-cta mt-4 flex w-full items-center justify-center rounded-2xl bg-cta-gradient px-2 py-4 text-center font-extrabold uppercase text-cta-foreground shadow-cta active:scale-[0.98] sm:px-6"
            >
              <span className="relative z-10">Quero o kit premium completo</span>
            </a>
            <PurchaseTrust />
          </article>
        </div>
      </div>
    </section>
  );
}
