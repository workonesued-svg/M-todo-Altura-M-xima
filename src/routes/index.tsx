import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { Problems, Method } from "@/components/landing/Pillars";
import { ActivityExamples, Bonuses } from "@/components/landing/Extras";
import { Offer } from "@/components/landing/Offer";
import { Testimonials, Guarantee, Faq } from "@/components/landing/Social";
import { FinalCta, Footer, StickyBar } from "@/components/landing/FinalCta";
import { CheckoutFlowProvider } from "@/components/landing/CheckoutFlow";

const title = "Método Leitura em Blocos™: Kit de Textos em Blocos para Crianças";
const description =
  "Ajude seu filho ou aluno a ler, compreender e interpretar textos com leveza. Método em 6 etapas, apostilas bônus e acesso imediato, 100% digital.";

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
    <CheckoutFlowProvider>
      <main className="overflow-x-hidden pb-20">
        <Hero />
        <ActivityExamples />
        <Problems />
        <Method />
        <Bonuses />
        <Offer />
        <Testimonials />
        <Guarantee />
        <Faq />
        <FinalCta />
        <Footer />
        <StickyBar />
      </main>
    </CheckoutFlowProvider>
  );
}
