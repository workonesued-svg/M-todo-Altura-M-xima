import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { Pillars, WhyMethod } from "@/components/landing/Pillars";
import { Gallery } from "@/components/landing/Extras";
import { Offer } from "@/components/landing/Offer";
import { Testimonials, Guarantee, Faq } from "@/components/landing/Social";
import { FinalCta, Footer, StickyBar } from "@/components/landing/FinalCta";

const title = "Método Altura Máxima — Rutina, postura y desarrollo físico";
const description =
  "Método práctico para trabajar hábitos, postura, descanso, nutrición y rutina. Plan Essential US$7 y Plan PRO US$17. Acceso inmediato, 100% digital.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="pb-20">
      <Hero />
      <Pillars />
      <WhyMethod />
      <Gallery />
      <Offer />
      <Testimonials />
      <Guarantee />
      <Faq />
      <FinalCta />
      <Footer />
      <StickyBar />
    </main>
  );
}
