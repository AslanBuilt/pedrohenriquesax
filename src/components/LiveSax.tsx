import { Reveal } from "@/components/Reveal";
import { VideoEmbed } from "@/components/VideoEmbed";

/**
 * O único registro de evento de verdade que existe: o Pedro tocando live sax num
 * salão, com PA, luz e gente. Hospedado aqui porque é vertical e curto: com
 * `preload="none"`, os 4,4 MB só são baixados quando alguém dá play. Com controles e
 * sem autoplay: ninguém deve levar um susto de saxofone ao abrir a página.
 */
export function LiveSax({ src = "/video/live-sax.mp4", poster = "/video/live-sax-capa.jpg" }: { src?: string; poster?: string }) {
  return (
    <section id="live-sax" className="on-dark section bg-night">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="d-xl text-white">Live sax</h2>
        </Reveal>
        <Reveal delay={90}>
          <VideoEmbed url={src} poster={poster} title="Live sax em evento" aspect="782/1280"
            className="mx-auto max-w-[360px] rounded-[2px] lg:mr-0" />
        </Reveal>
      </div>
    </section>
  );
}
