import { GraduationCap, ShieldCheck, Star, Zap, BookOpenText } from "lucide-react";
import { Placeholder } from "@/components/landing/Placeholder";

export function Hero() {
  return (
    <header className="bg-hero-gradient px-4 pb-8 pt-6">
      <div className="mx-auto max-w-md">
        <div className="flex justify-center px-1">
          <span className="inline-flex max-w-full items-center gap-1 whitespace-nowrap rounded-xl border border-primary/30 bg-primary/10 px-2 py-1.5 text-[9.5px] font-extrabold text-primary">
            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
            Da Educação Infantil ao 5º ano, alinhado à BNCC
          </span>
        </div>

        <h1 className="mt-4 text-center text-[1.9rem] leading-[1.12] font-extrabold text-foreground sm:text-4xl">
          Ajude seu filho ou aluno a ler, entender e{" "}
          <span className="text-info-gradient">interpretar textos</span> com leveza
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-center text-base leading-relaxed text-muted-foreground">
          Do jeito que toda criança merece aprender: leve, divertido e sem frustração.
        </p>

        <div className="relative mx-auto mt-5 w-full max-w-[280px]">
          <Placeholder
            icon={BookOpenText}
            label="Kit Leitura em Blocos™"
            variant="primary"
            aspect="aspect-[4/5]"
            className="shadow-card"
            iconClassName="h-14 w-14"
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            De <span className="line-through decoration-destructive/70 decoration-2">R$97,90</span>{" "}
            por apenas
          </p>
          <p className="text-5xl font-display leading-none text-primary-gradient">R$34,35</p>
          <p className="mt-1 text-xs text-muted-foreground">Pagamento único · acesso imediato</p>
        </div>

        <a
          href="#oferta"
          className="pulse-cta glow-cta mt-5 flex w-full items-center justify-center rounded-2xl bg-cta-gradient px-6 py-4 text-base font-extrabold uppercase tracking-wide text-cta-foreground shadow-cta active:scale-[0.98]"
        >
          Quero começar agora
        </a>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-semibold text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" /> Acesso imediato
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Pagamento seguro
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-current text-sun" /> 4.9/5 de avaliação
          </span>
        </div>
      </div>
    </header>
  );
}
