import { Star, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sustituir por reseñas reales antes de publicar.
const testimonials = [
  {
    name: "Camila R.",
    initials: "CR",
    quote:
      "Meu filho lia mas não entendia nada do texto. Com o método em blocos, em poucas semanas ele já consegue explicar o que leu com as próprias palavras.",
  },
  {
    name: "Marcos T.",
    initials: "MT",
    quote:
      "Uso as atividades com meus alunos e a diferença na compreensão de texto foi visível já nas primeiras aulas. Recomendo para qualquer professor.",
  },
  {
    name: "Juliana P.",
    initials: "JP",
    quote:
      "As apostilas bônus valem muito a pena. Minha filha se divertiu tanto que nem parecia estar estudando interpretação de texto.",
  },
];

const faqs = [
  {
    q: "Como vou receber o Kit Leitura em Blocos™?",
    a: "Assim que a compra for aprovada, você recebe o material em PDF por e-mail, pronto para abrir no celular, tablet ou computador — ou imprimir se preferir.",
  },
  {
    q: "O que é o Método Leitura em Blocos™?",
    a: "É um passo a passo em 6 etapas que leva a criança da leitura simples até a interpretação de texto, trabalhando vocabulário, compreensão e escrita de forma gradual.",
  },
  {
    q: "Preciso imprimir tudo de uma vez?",
    a: "Não. Você pode imprimir apenas as atividades que for usar ou fazer direto na tela — o material funciona das duas formas.",
  },
  {
    q: "Serve para qualquer idade?",
    a: "O material foi pensado para crianças em fase de alfabetização e nos primeiros anos do ensino fundamental, mas pode ser adaptado por pais e professores para outras idades.",
  },
  {
    q: "Qual é a forma de pagamento?",
    a: "Cartão de crédito, Pix ou boleto, com liberação do acesso assim que o pagamento for confirmado.",
  },
];

export function Testimonials() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-md">
        <h2 className="text-center text-[1.6rem] leading-[1.15] font-extrabold sm:text-3xl">
          Veja o que outros pais e professores estão dizendo
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Famílias que decidiram transformar a leitura em algo leve e divertido.
        </p>

        <div className="mt-6 flex flex-col gap-3.5">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="card-lift rounded-2xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex gap-0.5 text-sun">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-gradient text-sm font-bold text-primary-foreground">
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">Cliente Leitura em Blocos™</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Guarantee() {
  return (
    <section className="px-4 pb-12">
      <div className="mx-auto max-w-md rounded-2xl border-2 border-primary/25 bg-card p-6 text-center shadow-card">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/12 text-primary">
          <ShieldCheck className="h-7 w-7" />
        </span>
        <h2 className="mt-4 text-2xl font-extrabold">Você tem 7 dias de garantia</h2>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          Experimente o Método Leitura em Blocos™ com tranquilidade. Se dentro do prazo de garantia
          você achar que não é para você, devolvemos 100% do seu investimento.
        </p>
        <p className="mt-4 text-lg font-display text-primary-gradient">
          Sua compra está protegida.
        </p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="bg-surface px-4 py-12">
      <div className="mx-auto max-w-md">
        <h2 className="text-center text-[1.6rem] leading-[1.15] font-extrabold sm:text-3xl">
          Perguntas frequentes
        </h2>
        <Accordion type="single" collapsible className="mt-5">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="py-4 text-left text-[15px] font-bold leading-snug [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
