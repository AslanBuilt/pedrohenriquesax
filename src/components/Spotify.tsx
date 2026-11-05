import { Reveal } from "@/components/Reveal";

/**
 * As gravações em que o Pedro tocou. O link vem do painel (Configurações) e a seção
 * só aparece quando ele aponta para algo que o Spotify consegue tocar: um link de
 * perfil ou inválido não vira uma caixa de erro no site.
 */
export function Spotify({ url, title = "Gravações em que toquei" }: { url: string; title?: string }) {
  const m = url.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(playlist|album|artist|track)\/([A-Za-z0-9]+)/);
  if (!m) return null;
  return (
    <section id="spotify" className="on-dark bg-night py-14 md:py-20">
      <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <Reveal><h2 className="d-l text-white">{title}</h2></Reveal>
        <iframe
          title="Spotify: gravações em que Pedro Lucena tocou"
          src={`https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0`}
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
