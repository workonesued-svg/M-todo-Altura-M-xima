import { Activity, Moon, Apple, PersonStanding, Bone, Check, Compass } from "lucide-react";

const pillars = [
  {
    icon: Activity,
    title: "Rutina",
    text: "Movilidad, movimientos y acciones prácticas para incorporar a tu día.",
  },
  {
    icon: PersonStanding,
    title: "Postura",
    text: "Aprende a cuidar tu alineación y a proyectar mejor tu cuerpo.",
  },
  {
    icon: Moon,
    title: "Descanso",
    text: "Comprende por qué una buena rutina nocturna forma parte de tu desarrollo físico.",
  },
  {
    icon: Apple,
    title: "Nutrición",
    text: "Organiza mejor los hábitos alimenticios que acompañan tu objetivo.",
  },
  {
    icon: Bone,
    title: "Placas de crecimiento",
    text: "Entiende mejor uno de los aspectos más importantes relacionados con el crecimiento.",
  },
];

const benefits = [
  "Saber por dónde empezar.",
  "Construir una rutina más organizada.",
  "Identificar hábitos que pueden estar jugando en tu contra.",
  "Trabajar postura, movilidad y presencia corporal.",
  "Entender mejor tu desarrollo físico.",
  "Mantener la constancia sin complicar tu día.",
];

export function Pillars() {
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl leading-tight sm:text-4xl">
          Todo lo que necesitas, organizado en un solo método.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          En lugar de perder tiempo buscando información diferente cada día, tendrás una estructura
          clara para entender qué observar, qué mejorar y qué incorporar a tu rutina.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="card-lift rounded-2xl border border-border/70 bg-card p-5 shadow-card"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="truncate text-xl uppercase">{title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}

          <article className="card-lift rounded-2xl border-2 border-[var(--gold)] bg-[var(--navy)] p-5 shadow-gold">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-gradient text-gold-foreground">
                <Compass className="h-5 w-5" />
              </span>
              <h3 className="truncate text-xl uppercase text-gold-gradient">El método</h3>
            </div>
            <p className="mt-3 text-sm font-semibold leading-relaxed">
              Lo que necesitas es un método claro para saber exactamente qué hacer con tu rutina,
              tus hábitos y tu desarrollo.
            </p>
          </article>
        </div>

      </div>
    </section>
  );
}

export function WhyMethod() {
  return (
    <section className="bg-[var(--surface)] px-5 py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl leading-tight sm:text-4xl">
          Porque no se trata de probar cosas al azar.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Muchos hombres quieren mejorar su estatura, pero terminan saltando entre ejercicios,
          consejos, vídeos y rutinas diferentes sin ninguna estructura.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Método Altura Máxima reúne los principales pilares en un sistema claro y fácil de seguir.
        </p>

        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {benefits.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-card px-4 py-3"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm leading-snug">{b}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-[15px] leading-relaxed text-muted-foreground">
          Cuando entiendes qué trabajar y cómo hacerlo, todo se vuelve más simple.
        </p>

        <p className="mt-3 text-center text-xl uppercase text-gold-gradient font-display">

          Menos improvisación. Más claridad. Más constancia.
        </p>
      </div>
    </section>
  );
}
