import { Eye, Gift } from "lucide-react";

const examples = [
  {
    label: "O Pato de João",
    text: "Texto curto com perguntas de compreensão.",
    image: "/images/o-pato-de-joao-720.webp",
    alt: "Atividade O Pato de João com leitura em blocos e perguntas de compreensão",
  },
  {
    label: "A Horta da Vovó",
    text: "Vocabulário novo e interpretação guiada.",
    image: "/images/a-horta-da-vovo-720.webp",
    alt: "Atividade A Horta da Vovó com vocabulário novo e interpretação guiada",
  },
  {
    label: "O Dia de Chuva",
    text: "Atividade de escrita com as próprias palavras.",
    image: "/images/o-dia-de-chuva-720.webp",
    alt: "Atividade O Dia de Chuva com proposta de escrita usando as próprias palavras",
  },
  {
    label: "A Semente da Bia",
    text: "Sequência de acontecimentos, compreensão e reconto da história.",
    image: "/images/a-semente-da-bia-720.webp",
    alt: "Atividade A Semente da Bia com sequência de acontecimentos, compreensão e reconto",
  },
  {
    label: "O Convite da Júlia",
    text: "Gênero textual convite: leitura, identificação e compreensão.",
    image: "/images/o-convite-da-julia-720.webp",
    alt: "Atividade O Convite da Júlia para leitura, identificação e compreensão do gênero convite",
  },
  {
    label: "O Lanche da Sofia",
    text: "Leitura em blocos, organização de frases e compreensão do texto.",
    image: "/images/o-lanche-da-sofia-720.webp",
    alt: "Atividade O Lanche da Sofia com leitura em blocos, organização de frases e compreensão",
  },
];

export function ActivityExamples() {
  return (
    <section className="bg-surface-blue pb-12 pt-12">
      <div className="mx-auto max-w-md px-4">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-info/20 bg-info/10 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-info">
            <Eye className="h-3.5 w-3.5" />
            Veja por dentro
          </span>
        </div>
        <h2 className="mt-3 text-center text-[1.6rem] leading-[1.15] font-extrabold sm:text-3xl">
          Exemplos de atividades
        </h2>
      </div>

      <div className="activity-marquee-viewport relative mt-5 overflow-hidden px-4 py-2">
        <div className="activity-marquee-track flex w-max">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex === 1 ? true : undefined}
              className={`flex shrink-0 gap-4 pr-4 ${copyIndex === 1 ? "activity-marquee-copy" : ""}`}
            >
              {examples.map((example) => (
                <figure
                  key={`${copyIndex}-${example.label}`}
                  className="w-[78vw] max-w-[300px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:w-[300px]"
                >
                  <img
                    src={example.image}
                    srcSet={`${example.image.replace("-720.webp", "-420.webp")} 420w, ${example.image} 720w`}
                    sizes="(max-width: 420px) 78vw, 300px"
                    alt={copyIndex === 0 ? example.alt : ""}
                    width={720}
                    height={1018}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="aspect-[1055/1491] w-full bg-white object-contain"
                  />
                  <figcaption className="px-4 py-3">
                    <p className="text-sm font-extrabold">{example.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{example.text}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const bonuses = [
  {
    name: "Apostila de Sílabas Simples",
    image: "/images/bonus-silabas-simples-480.webp",
    alt: "Capa da apostila bônus Sílabas Simples com um pintinho e materiais escolares",
  },
  {
    name: "Apostila de Sílabas Complexas",
    image: "/images/bonus-silabas-complexas-480.webp",
    alt: "Capa da apostila bônus Sílabas Complexas com uma raposa e atividades de linguagem",
  },
  {
    name: "Apostila de Gêneros Textuais",
    image: "/images/bonus-generos-textuais-480.webp",
    alt: "Capa da apostila bônus Gêneros Textuais com uma coruja e diferentes tipos de texto",
  },
  {
    name: "Apostila de Alfabetização",
    image: "/images/bonus-alfabetizacao-480.webp",
    alt: "Capa da apostila bônus Alfabetização com um urso lendo um livro",
  },
  {
    name: "Apostila de Ortografia",
    image: "/images/bonus-ortografia-480.webp",
    alt: "Capa da apostila bônus Ortografia com um pinguim e materiais de escrita",
  },
  {
    name: "Apostila de Produção de Textos",
    image: "/images/bonus-producao-textos-480.webp",
    alt: "Capa da apostila bônus Produção de Textos com uma coruja escrevendo",
  },
];

export function Bonuses() {
  return (
    <section className="bg-surface-blue px-4 py-12">
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
          {bonuses.map((bonus) => (
            <article
              key={bonus.name}
              className="card-lift overflow-hidden rounded-2xl border border-dashed border-sun bg-card shadow-card"
            >
              <div className="bg-white">
                <img
                  src={bonus.image}
                  srcSet={`${bonus.image.replace("-480.webp", "-320.webp")} 320w, ${bonus.image} 480w`}
                  sizes="(max-width: 448px) calc((100vw - 44px) / 2), 212px"
                  alt={bonus.alt}
                  width={480}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div className="px-2.5 py-3 text-center">
                <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-primary-gradient px-2.5 py-1 text-[9px] font-extrabold tracking-[0.1em] text-primary-foreground shadow-primary">
                  <Gift className="h-3 w-3" /> BÔNUS
                </span>
                <h3 className="min-h-10 text-[13px] font-extrabold leading-snug">{bonus.name}</h3>
                <p className="mt-1.5 text-xs text-destructive line-through">De R$19,90</p>
                <span className="mt-1 inline-flex rounded-full bg-cta/12 px-3 py-1 text-xs font-extrabold text-cta">
                  GRÁTIS
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="bonus-total-single-line mt-6 rounded-full border border-cta/25 bg-cta/10 px-1 py-4 text-center font-extrabold sm:px-5">
          <span className="text-foreground">Total em bônus:</span>{" "}
          <span className="text-muted-foreground line-through decoration-2">R$119,40</span>{" "}
          <span className="text-cta">R$0,00 para você</span>
        </p>
      </div>
    </section>
  );
}
