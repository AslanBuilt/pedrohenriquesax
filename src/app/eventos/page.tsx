import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { Chrome } from "@/components/Chrome";
import { Events, EventsFaq, PERGUNTAS } from "@/components/home/Events";
import { VideoSection } from "@/components/VideoSection";
import { LiveSax } from "@/components/LiveSax";
import { videosJsonLd } from "@/lib/youtube";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Saxofonista para casamentos e eventos em São Paulo",
  description: "Contrate saxofonista para casamento, evento corporativo, recepção, live sax e show em São Paulo. Do sax solo ao quinteto.",
  alternates: { canonical: "/eventos" },
};

export default async function Eventos() {
  const [s, videos] = await Promise.all([
    getSettings(),
    prisma.mediaItem.findMany({
      where: { kind: "video", context: "eventos" },
      orderBy: { sortOrder: "asc" },
    }),
  ]);
  const site = process.env.SITE_URL || "http://localhost:3000";
  const ld = videosJsonLd(videos, site);
  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: PERGUNTAS.map(([name, text]) => ({
      "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text },
    })),
  };

  return (
    <Chrome>
      <Events text={s.eventsText} />
      {/* Primeiro a prova mais próxima do que a pessoa está imaginando: ele
          tocando num salão. Só depois as gravações de estúdio. */}
      <LiveSax />
      {/* Pop reconhecível, produção grande, nomes que o contratante conhece.
          É a prova que faltava: Tierry e Léo Jaime estavam na parede de
          credenciais como afirmação, e agora estão em vídeo. */}
      <VideoSection
        items={videos}
        className="on-dark bg-night !border-0 !pt-0"
        id="videos"
        title="Gravações"
        verMais
      />
      <EventsFaq />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {ld.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      )}
    </Chrome>
  );
}
