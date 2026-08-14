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
    name: "Andrés M.",
    initials: "AM",
    quote:
      "Antes saltaba entre videos, ejercicios y consejos diferentes. Con el método entendí mejor cómo organizar mi rutina y me siento mucho más enfocado.",
  },
  {
    name: "Luis F.",
    initials: "LF",
    quote:
      "Lo que más me ayudó fue tener una estructura clara. Ahora sé qué trabajar y no siento que estoy improvisando todo el tiempo.",
  },
  {
    name: "Diego R.",
    initials: "DR",
    quote:
      "Por el precio esperaba algo básico, pero trae mucho más de lo que imaginaba. El tracker y el plan de acción ayudan bastante a mantener la constancia.",
  },
];

const faqs = [
  {
    q: "¿Puedo empezar si ya tengo 18 años?",
    a: "Sí. Puedes trabajar aspectos como postura, movilidad, hábitos, descanso y desarrollo físico. El potencial de crecimiento óseo depende de factores individuales, edad y estado de desarrollo.",
  },
  {
    q: "¿Necesito gimnasio?",
    a: "No. Muchas de las orientaciones pueden incorporarse a una rutina normal y realizarse desde casa.",
  },
  {
    q: "¿Cuándo recibo mi acceso?",
    a: "Inmediatamente después de la aprobación del pago.",
  },
  {
    q: "¿Cuál es la diferencia entre Essential y PRO?",
    a: "Essential contiene los fundamentos para empezar. PRO incluye todo lo del Essential y añade herramientas de planificación, seguimiento y contenidos adicionales.",
  },
  {
    q: "¿Cuánto tiempo necesito al día?",
    a: "Depende de tu rutina, pero el método está pensado para que puedas aplicarlo de forma práctica, sin complicar tu día.",
  },
  {
    q: "¿Cuál plan recomiendan?",
    a: "Si quieres comenzar con lo fundamental, elige Essential. Si quieres una estructura más completa y organizada, recomendamos Plan PRO.",
  },
];

export function Testimonials() {
  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl sm:text-4xl">Mira lo que otros alumnos están diciendo</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Personas que decidieron dejar de improvisar y empezar a trabajar su desarrollo de forma
          más organizada.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="card-lift rounded-2xl border border-border/70 bg-card p-5 shadow-card"
            >
              <div className="flex gap-0.5 text-[var(--gold)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed">“{t.quote}”</p>
              <div className="mt-4 flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-gradient text-sm font-bold text-primary-foreground">
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">Cliente de Método Altura Máxima</p>
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
    <section className="px-5 pb-14">
      <div className="mx-auto max-w-3xl rounded-2xl border border-primary/40 bg-card p-6 text-center shadow-card">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary">
          <ShieldCheck className="h-7 w-7" />
        </span>
        <h2 className="mt-4 text-3xl">Tienes 7 días para probarlo</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Accede al contenido con tranquilidad y descubre si Método Altura Máxima es para ti. Si
          dentro del plazo de garantía decides que no es para ti, podrás solicitar el reembolso de
          acuerdo con las condiciones de la plataforma.
        </p>
        <p className="mt-4 text-lg uppercase text-gold-gradient font-display">
          Tu compra está protegida.
        </p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="bg-[var(--surface)] px-5 py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl sm:text-4xl">Preguntas frecuentes</h2>
        <Accordion type="single" collapsible className="mt-5">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border/70">
              <AccordionTrigger className="text-left text-[15px] font-semibold">
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
