import { Check, ShieldCheck, Sparkles, Zap } from "lucide-react";

const basicItems = [
  "Kit de Textos Fatiados + 2.000 atividades",
  "Método Leitura em Blocos™ completo — 6 etapas",
  "6 apostilas bônus exclusivas",
  "Material pronto para imprimir",
  "Acesso imediato",
];

const premiumItems = [
  "Tudo do Kit Leitura em Blocos +",
  "+1.000 atividades pedagógicas extras",
  "Trilha completa de alfabetização e ortografia",
  "Atividades de gêneros textuais e produção de texto",
  "Materiais organizados por nível de dificuldade",
];

export function Offer() {
  return (
    <section id="oferta" className="bg-hero-gradient px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Escolha sua opção
          </span>
        </div>
        <h2 className="mt-3 text-center text-[1.7rem] leading-[1.15] font-extrabold sm:text-3xl">
          Qual opção é ideal para você?
        </h2>

        <div className="mt-7 flex flex-col gap-5">
          <article
            id="plan-basico"
            className="card-lift rounded-2xl border-2 border-primary/30 bg-card p-5 shadow-card"
          >
            <span className="w-fit rounded-full bg-primary/12 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary">
              Kit essencial
            </span>
            <h3 className="mt-3 text-2xl font-extrabold leading-snug">
              Kit Leitura em Blocos™ + 6 Bônus
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              O essencial para desenvolver a compreensão leitora da criança em 6 etapas simples.
            </p>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                De{" "}
                <span className="line-through decoration-destructive/70 decoration-2">R$97,90</span>
              </p>
              <p className="mt-0.5 text-4xl font-display leading-none">R$34,35</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                Pagamento único · sem mensalidades
              </p>
            </div>

            <ul className="mt-5 space-y-2.5">
              {basicItems.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-snug">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {i}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="glow-cta mt-6 flex w-full items-center justify-center rounded-2xl bg-cta-gradient px-6 py-4 text-center text-base font-extrabold uppercase tracking-wide text-cta-foreground shadow-cta active:scale-[0.98]"
            >
              Quero começar agora
            </a>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <Zap className="h-3.5 w-3.5" /> Acesso imediato após a compra
            </p>
          </article>

          <article
            id="plan-premium"
            className="card-lift relative rounded-2xl border-2 border-primary bg-card p-5 shadow-primary"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun-gradient px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-sun-foreground shadow-sun">
              Mais escolhido
            </span>
            <h3 className="mt-3 text-2xl font-extrabold leading-snug text-primary-gradient">
              Kit +1.000 Atividades Pedagógicas Premium
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Para quem quer a trilha mais completa de leitura, interpretação e escrita.
            </p>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                De{" "}
                <span className="line-through decoration-destructive/70 decoration-2">R$79,90</span>
              </p>
              <p className="mt-0.5 text-4xl font-display leading-none text-primary-gradient">
                R$43,90
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                Pagamento único · sem mensalidades
              </p>
            </div>

            <ul className="mt-5 space-y-2.5">
              {premiumItems.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-snug">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {i}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="sheen-cta mt-6 flex w-full items-center justify-center rounded-2xl bg-cta-gradient px-6 py-4 text-center text-base font-extrabold uppercase tracking-wide text-cta-foreground shadow-cta active:scale-[0.98]"
            >
              <span className="relative z-10">Quero o kit premium completo</span>
            </a>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> 7 dias de garantia
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
