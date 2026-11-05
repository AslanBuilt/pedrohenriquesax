import { Reveal } from "@/components/Reveal";

/**
 * A playlist de gravações em que o Pedro tocou. O player já aparece, em vez de um
 * botão sozinho numa faixa vazia, e `loading="lazy"` faz o Spotify só carregar
 * quando a seção se aproxima da tela.
 */
export function Spotify({ playlistId, title = "Gravações em que toquei" }: { playlistId: string; title?: string }) {
  return (
    <section id="spotify" className="on-dark bg-night py-14 md:py-20">
      <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <Reveal><h2 className="d-l text-white">{title}</h2></Reveal>
        <iframe
          title="Playlist no Spotify: gravações em que Pedro Lucena tocou"
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="rounded-[2px] border-0"
        />
      </div>
    </section>
  );
}
