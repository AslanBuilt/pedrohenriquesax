import { Fragment } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Chrome } from "@/components/Chrome";
import { HireButton } from "@/components/HireButton";
import { PhotoBand } from "@/components/PhotoBand";
import { VideoSection } from "@/components/VideoSection";
import { Empty } from "@/components/Alert";
import { videosJsonLd } from "@/lib/youtube";
import { Spotify } from "@/components/Spotify";

/**
 * O acervo. Um lugar só com tudo.
 *
 * As outras páginas continuam mostrando o recorte que serve a elas — eventos
 * na página de contratação, transcrições na da mentoria —, mas o cadastro é
 * único e vive aqui. Antes /sobre e /eventos repetiam vídeo sem que ninguém
 * soubesse qual era a lista de verdade.
 */
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Vídeos",
  alternates: { canonical: "/videos" },
  description: "Gravações de Pedro Lucena em evento, em estúdio e com big band.",
};

/* O rótulo à direita mostra a contagem, não um sinônimo do título: "Transcrições
   de estudo" ao lado de "Transcrições" era a mesma palavra duas vezes. */
const GRUPOS = [
  { key: "eventos" as const, title: "Em evento e em estúdio" },
  { key: "jazz" as const, title: "Big band e jazz" },
];

export default async function Videos() {
  const items = await prisma.mediaItem.findMany({
    where: { kind: "video" },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
  });

  const site = process.env.SITE_URL || "http://localhost:3000";
  const ld = videosJsonLd(items, site);

  return (
    <Chrome>
      <PhotoBand src="/fotos/g13.jpg" alt="Pedro Lucena atrás do saxofone" pos="50% 30%">
        <h1 className="d-l max-w-[14em] text-white">Palco e estúdio</h1>
      </PhotoBand>

      {items.length ? (
        GRUPOS.map((g, i) => {
          const doGrupo = items.filter((m) => m.context === g.key);
          if (!doGrupo.length) return null;
          return (
            <Fragment key={g.key}>
              <VideoSection items={doGrupo} id={g.key} title={g.title} sub />
              {/* A playlist separa os dois grupos: fundo igual em seguida, não. */}
              {i === 0 && <Spotify playlistId="2DoalDFTdg45JYx1t4V9eP" />}
            </Fragment>
          );
        })
      ) : (
        <div className="wrap section section-first">
          <Empty
            title="Ainda não há vídeos publicados."
            action={<HireButton>Falar comigo</HireButton>}
          />
        </div>
      )}


      {ld.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      )}
    </Chrome>
  );
}
