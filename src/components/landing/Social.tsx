import { useEffect, useRef } from "react";
import { CheckCheck, ChevronLeft, ChevronRight, ShieldCheck, Star, UserRound } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  time: string;
  rating: number;
  avatar?: string;
  profileNote?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Camila R.",
    role: "Mãe de aluno",
    avatar: "/images/professora-perfil-1-96.webp",
    time: "10:42",
    rating: 5,
    quote:
      "Meu filho lia mas não entendia nada do texto. Com o método em blocos, em poucas semanas ele já consegue explicar o que leu com as próprias palavras.",
  },
  {
    name: "Marcos T.",
    role: "Professor",
    avatar: "/images/professor-perfil-2-96.webp",
    time: "14:18",
    rating: 5,
    quote:
      "Uso as atividades com meus alunos e a diferença na compreensão de texto foi visível já nas primeiras aulas. Recomendo para qualquer professor.",
  },
  {
    name: "Juliana P.",
    role: "Mãe de aluna",
    avatar: "/images/professora-perfil-3-96.webp",
    time: "19:26",
    rating: 5,
    quote:
      "As apostilas bônus valem muito a pena. Minha filha se divertiu tanto que nem parecia estar estudando interpretação de texto.",
  },
  {
    name: "Ana P.",
    role: "Professora dos anos iniciais",
    time: "09:35",
    rating: 5,
    profileNote: "Perfil sem foto: a pessoa não autorizou o uso da imagem.",
    quote:
      "Sou professora dos anos iniciais e gostei muito da proposta do Método Leitura em Blocos. As atividades são bem organizadas, visuais e ajudam a criança a avançar na leitura de forma mais leve e gradual.",
  },
  {
    name: "Camila S.",
    role: "Professora",
    time: "11:12",
    rating: 5,
    profileNote: "Perfil sem foto: a pessoa não autorizou o uso da imagem.",
    quote:
      "Como professora, achei o material muito completo. Consigo trabalhar leitura, compreensão, interpretação e escrita de maneiras diferentes, sem deixar as atividades repetitivas. É um ótimo apoio para a sala de aula.",
  },
  {
    name: "Rafael M.",
    role: "Pai",
    time: "16:48",
    rating: 4,
    profileNote: "Perfil sem foto: a pessoa não autorizou o uso da imagem.",
    quote:
      "Sou pai e estava procurando alguma coisa para ajudar meu filho a praticar leitura em casa sem transformar o momento em uma obrigação. Ele gostou bastante das atividades e conseguiu acompanhar com mais facilidade.",
  },
  {
    name: "Juliana C.",
    role: "Mãe",
    time: "18:20",
    rating: 5,
    profileNote: "Perfil sem foto: a pessoa não autorizou o uso da imagem.",
    quote:
      "Como mãe, gostei porque consigo usar o material com minha filha mesmo sem ter formação em pedagogia. As atividades são claras, bonitas e ela se envolve muito mais na hora de estudar.",
  },
  {
    name: "Márcia A.",
    role: "Avó",
    time: "20:03",
    rating: 5,
    profileNote: "Perfil sem foto: a pessoa não autorizou o uso da imagem.",
    quote:
      "Sou avó e acompanho minha neta nas atividades depois da escola. O Método Leitura em Blocos facilitou muito esse momento para nós duas. Ela gosta das histórias, das ilustrações e fica toda feliz quando consegue fazer sozinha.",
  },
];

const loopingTestimonials = [
  testimonials[testimonials.length - 1],
  ...testimonials,
  testimonials[0],
];

function jumpCarouselWithoutAnimation(carousel: HTMLDivElement, left: number) {
  const previousScrollBehavior = carousel.style.scrollBehavior;
  carousel.style.scrollBehavior = "auto";
  carousel.scrollLeft = left;
  carousel.style.scrollBehavior = previousScrollBehavior;
}

const faqs = [
  {
    q: "Como vou receber o Kit Leitura em Blocos™?",
    a: "Assim que a compra for aprovada, você recebe o material em PDF por e-mail, pronto para abrir no celular, tablet ou computador. Você também pode imprimir se preferir.",
  },
  {
    q: "O que é o Método Leitura em Blocos™?",
    a: "É um passo a passo em 6 etapas que leva a criança da leitura simples até a interpretação de texto, trabalhando vocabulário, compreensão e escrita de forma gradual.",
  },
  {
    q: "Preciso imprimir tudo de uma vez?",
    a: "Não. Você pode imprimir apenas as atividades que for usar ou fazer direto na tela. O material funciona das duas formas.",
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const carousel = carouselRef.current;
      const card = carousel?.querySelector<HTMLElement>("[data-testimonial-card]");

      if (!carousel || !card) return;
      jumpCarouselWithoutAnimation(carousel, card.offsetWidth + 12);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  const normalizeLoopPosition = () => {
    if (scrollEndTimerRef.current !== null) {
      window.clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = window.setTimeout(() => {
      const carousel = carouselRef.current;
      const card = carousel?.querySelector<HTMLElement>("[data-testimonial-card]");

      if (!carousel || !card) return;

      const step = card.offsetWidth + 12;
      const currentIndex = Math.round(carousel.scrollLeft / step);

      if (currentIndex <= 0) {
        jumpCarouselWithoutAnimation(carousel, testimonials.length * step);
      } else if (currentIndex >= testimonials.length + 1) {
        jumpCarouselWithoutAnimation(carousel, step);
      }

      scrollEndTimerRef.current = null;
    }, 140);
  };

  const scrollTestimonials = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector<HTMLElement>("[data-testimonial-card]");

    if (!carousel || !card) return;

    carousel.scrollBy({
      left: direction * (card.offsetWidth + 12),
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-surface-blue py-12">
      <div className="mx-auto max-w-md px-4">
        <h2 className="text-center text-[1.6rem] leading-[1.15] font-extrabold sm:text-3xl">
          Veja o que outros pais e professores estão dizendo
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Famílias que decidiram transformar a leitura em algo leve e divertido.
        </p>
      </div>

      <div className="relative mx-auto mt-6 max-w-md overflow-hidden">
        <button
          type="button"
          onClick={() => scrollTestimonials(-1)}
          aria-label="Ver comentário anterior"
          className="absolute top-1/2 left-1 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[#075e54]/20 bg-card/95 text-[#075e54] shadow-card backdrop-blur transition-transform active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollTestimonials(1)}
          aria-label="Ver próximo comentário"
          className="absolute top-1/2 right-1 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#25d366] text-white shadow-cta transition-transform active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={carouselRef}
          role="region"
          aria-label="Comentários de pais e professores"
          tabIndex={0}
          onScroll={normalizeLoopPosition}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-3 pr-14"
        >
          {loopingTestimonials.map((t, index) => {
            const isLoopClone = index === 0 || index === loopingTestimonials.length - 1;

            return (
              <article
                key={`${t.name}-${index}`}
                aria-hidden={isLoopClone ? true : undefined}
                data-testimonial-card
                className="flex w-[82%] max-w-[21rem] shrink-0 snap-start flex-col overflow-hidden rounded-[1.4rem] border border-[#b8d2c1] bg-[#e8f1ea] shadow-card"
              >
                <div className="flex min-h-[5.25rem] items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={`Foto de perfil de ${t.name}`}
                      width={42}
                      height={42}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="h-10 w-10 shrink-0 rounded-full border-2 border-white/70 object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-white/70 bg-white/15"
                    >
                      <UserRound className="h-5 w-5" />
                    </span>
                  )}
                  <div className="min-w-0 text-left">
                    <p className="truncate text-sm font-extrabold">{t.name}</p>
                    <p className="text-[10px] text-white/80">{t.role}</p>
                    {t.profileNote ? (
                      <p className="mt-0.5 max-w-[14rem] text-[8px] leading-tight text-white/65">
                        {t.profileNote}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="chat-conversation-bg min-h-[13rem] flex-1 p-4">
                  <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-left shadow-sm">
                    <div
                      role="img"
                      aria-label={`${t.rating} de 5 estrelas`}
                      className="mb-2 flex gap-0.5"
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-3.5 w-3.5 ${
                            index < t.rating ? "fill-[#f7b500] text-[#f7b500]" : "text-[#c7d0cb]"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-[#26332d]">{t.quote}</p>
                    <div className="mt-1.5 flex items-center justify-end gap-1 text-[9px] text-[#718078]">
                      <span>{t.time}</span>
                      <CheckCheck className="h-3.5 w-3.5 text-[#34b7f1]" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Guarantee() {
  return (
    <section className="bg-surface-warm px-4 py-12">
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
    <section className="bg-surface-blue px-4 py-12">
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
