import {
  BookX,
  Frown,
  PuzzleIcon,
  BookOpen,
  Lightbulb,
  Search,
  PenLine,
  Sparkles,
  Trophy,
} from "lucide-react";

const problems = [
  {
    icon: BookX,
    title: "Lê, mas não entende",
    text: "A criança consegue ler as palavras, mas não consegue explicar o que acabou de ler.",
  },
  {
    icon: Frown,
    title: "Perde o interesse rápido",
    text: "Textos longos ou pouco atrativos acabam gerando desânimo e frustração na hora de estudar.",
  },
  {
    icon: PuzzleIcon,
    title: "Dificuldade para interpretar",
    text: "Tem trabalho para responder perguntas simples sobre o texto, mesmo depois de ler com atenção.",
  },
];

export function Problems() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-md">
        <h2 className="text-center text-[1.7rem] leading-[1.15] font-extrabold sm:text-3xl">
          Seu filho ou aluno lê, mas tem dificuldade para entender o que leu?
        </h2>
        <p className="mt-2.5 text-center text-[15px] leading-relaxed text-muted-foreground">
          Isso é mais comum do que parece — e tem solução com o método certo.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {problems.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="card-lift rounded-2xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-extrabold leading-snug">{title}</h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    icon: BookOpen,
    name: "Bloco da Leitura",
    text: "Leitura guiada e tranquila, no ritmo da criança, sem pressa e sem cobrança.",
  },
  {
    icon: Search,
    name: "Bloco do Vocabulário",
    text: "Entendendo palavras novas antes de seguir para o resto do texto.",
  },
  {
    icon: Lightbulb,
    name: "Bloco da Compreensão",
    text: "Perguntas simples e diretas sobre o que acabou de ser lido.",
  },
  {
    icon: PuzzleIcon,
    name: "Bloco da Interpretação",
    text: "Relacionando ideias do texto para ir além do óbvio.",
  },
  {
    icon: PenLine,
    name: "Bloco da Escrita",
    text: "Praticando respostas com as próprias palavras da criança.",
  },
  {
    icon: Trophy,
    name: "Bloco da Revisão",
    text: "Consolidando o aprendizado com atividades rápidas e divertidas.",
  },
];

export function Method() {
  return (
    <section className="bg-surface px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Como funciona
          </span>
        </div>
        <h2 className="mt-3 text-center text-[1.7rem] leading-[1.15] font-extrabold sm:text-3xl">
          O Método Leitura em Blocos™ em 6 etapas
        </h2>
        <p className="mt-2.5 text-center text-[15px] leading-relaxed text-muted-foreground">
          Cada bloco constrói a compreensão de forma leve, até a criança interpretar qualquer texto
          sozinha.
        </p>

        <ol className="mt-7 flex flex-col gap-4">
          {steps.map(({ icon: Icon, name, text }, i) => (
            <li
              key={name}
              className="card-lift flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card"
            >
              <div className="flex shrink-0 flex-col items-center gap-2">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-gradient text-primary-foreground shadow-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-display text-lg leading-none text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-extrabold leading-snug">{name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
