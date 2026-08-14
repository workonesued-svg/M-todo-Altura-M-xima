import heroMan from "@/assets/hero-man.jpg";


export function Hero() {
  return (
    <header className="relative overflow-hidden bg-hero-gradient px-5 pb-10 pt-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-center">
          <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Método Altura Máxima
          </span>
        </div>

        <h1 className="mt-4 text-center text-[1.9rem] leading-[1.08] font-normal sm:text-5xl">
          ¿Sientes que aún no estás aprovechando todo tu
          <span className="text-gold-gradient"> potencial de altura</span>?
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
          Descubre un método claro para trabajar hábitos, postura, descanso y nutrición de forma
          organizada.
        </p>

        <div className="relative mt-6 flex justify-center sm:mx-auto sm:max-w-md">
          <img
            src={heroMan}
            alt="Hombre joven de pie con postura firme junto a una regla de altura"
            width={1024}
            height={1280}
            className="h-72 w-full rounded-2xl object-cover object-top shadow-card sm:h-96"
          />
        </div>

        <a
          href="#planes"
          className="glow-blue mt-6 flex w-full items-center justify-center rounded-xl bg-blue-gradient px-6 py-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground shadow-blue transition-transform active:scale-[0.98] sm:mx-auto sm:max-w-md"
        >
          Quiero descubrir el método
        </a>

        <p className="mt-3 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Acceso inmediato · 100% digital
        </p>

      </div>
    </header>
  );
}
