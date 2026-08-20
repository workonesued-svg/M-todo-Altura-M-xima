import { LockKeyhole, ShieldCheck, Star, Zap } from "lucide-react";
import { useCheckoutFlow } from "@/components/landing/checkout-flow-context";

const trustProfiles = [
  "/images/professora-perfil-1.png",
  "/images/professor-perfil-2.png",
  "/images/professora-perfil-3.png",
  "/images/professora-perfil-4.png",
];

export function Hero() {
  const { openBasicOffer } = useCheckoutFlow();

  return (
    <header className="bg-hero-dots px-4 pb-8 pt-6">
      <div className="mx-auto max-w-md">
        <h1 className="mt-2 text-center text-[1.9rem] leading-[1.12] font-extrabold text-foreground sm:text-4xl">
          Ajude seu filho ou aluno a ler, entender e{" "}
          <span className="text-info-gradient">interpretar textos</span> com leveza
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-center text-base leading-relaxed text-muted-foreground">
          Do jeito que toda criança merece aprender: leve, divertido e sem frustração.
        </p>

        <div className="relative mx-auto mt-5 w-full max-w-sm overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-card">
          <img
            src="/images/metodo-leitura-em-blocos-kit.png"
            alt="Kit Método Leitura em Blocos com seis apostilas e seis materiais complementares"
            width={1254}
            height={1254}
            fetchPriority="high"
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            De <span className="line-through decoration-destructive/70 decoration-2">R$67,90</span>{" "}
            por apenas
          </p>
          <p className="text-5xl font-display leading-none text-primary-gradient">R$17,90</p>
          <p className="mt-1 text-xs text-muted-foreground">Pagamento único · acesso imediato</p>
        </div>

        <button
          type="button"
          onClick={openBasicOffer}
          data-checkout-trigger="basico-hero"
          className="cta-single-line pulse-cta glow-cta mt-5 flex w-full items-center justify-center rounded-2xl bg-cta-gradient px-2 py-4 font-extrabold uppercase text-cta-foreground shadow-cta active:scale-[0.98] sm:px-6"
        >
          Quero garantir meu kit agora
        </button>

        <div className="mx-auto mt-6 max-w-sm px-1 py-3">
          <div className="grid grid-cols-3 items-center gap-1 text-center text-[10px] font-bold text-muted-foreground sm:text-xs">
            <span className="inline-flex items-center justify-center gap-1">
              <Zap className="h-3.5 w-3.5 shrink-0 fill-current text-sun" />
              Acesso imediato
            </span>
            <span className="inline-flex items-center justify-center gap-1">
              <LockKeyhole className="h-3.5 w-3.5 shrink-0 text-info" />
              Pagamento seguro
            </span>
            <span className="inline-flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-cta" />
              Garantia de 7 dias
            </span>
          </div>

          <div className="mx-auto mt-4 max-w-sm rounded-[2rem] border border-info/15 bg-card/95 px-6 py-5 text-center shadow-card">
            <div
              role="img"
              aria-label="Cinco de cinco estrelas"
              className="flex justify-center gap-0.5 text-sun"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mx-auto mt-2 max-w-[17rem] text-sm font-extrabold leading-snug text-foreground">
              Mais de 1.500 professores e pais já adquiriram e recomendam esse material
            </p>
            <div
              role="img"
              aria-label="Fotos de professores que recomendam o material"
              className="mt-3 flex justify-center -space-x-2"
            >
              {trustProfiles.map((profile) => (
                <img
                  key={profile}
                  src={profile}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  className="h-9 w-9 rounded-full border-2 border-card bg-surface-warm object-cover shadow-sm"
                />
              ))}
            </div>
          </div>

          <h2 className="mx-auto mt-5 max-w-xs text-center text-lg leading-tight font-extrabold sm:text-xl">
            Nosso kit de textos em blocos foi desenvolvido por psicopedagogos.
          </h2>
        </div>
      </div>
    </header>
  );
}
