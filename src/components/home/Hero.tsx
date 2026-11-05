import Image from "next/image";
import type { Settings } from "@/lib/settings";
import { HireButton } from "@/components/HireButton";
import { SoloDisc } from "@/components/home/SoloDisc";

/**
 * A foto dele com o saxofone em tela cheia, o nome, o disco que toca o solo e um botão grande. O sax já diz
 * o que ele faz: "saxofonista em São Paulo" fica só para leitores de tela e buscadores.
 *
 * Fixa no código porque o texto branco depende do fundo preto dela.
 */
export function Hero({ settings: s }: { settings: Settings }) {
  return (
    <section id="heroi" className="on-dark relative isolate flex min-h-[calc(100dvh-76px)] flex-col justify-end overflow-hidden bg-night lg:min-h-[max(640px,100dvh)]">
      <div className="hero-foto absolute -z-10 max-lg:inset-0">
        <Image
          src="/fotos/hero-v2.jpg"
          alt={`${s.name} com o saxofone tenor`}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, min(100vw, 167dvh)"
          className="foto-abre origin-top object-cover object-top"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="wrap flex items-end justify-between gap-8 pb-8 lg:pb-14">
        <h1>
          <span className="sobe d-xl block text-white">
            {s.name.split(" ").map((w) => <span key={w} className="block">{w}</span>)}
          </span>
          <span className="sr-only">, {s.tagline.toLowerCase()} em {s.city}</span>
        </h1>
        <span className="sobe flex items-center gap-5" style={{ animationDelay: "220ms" }}>
          <SoloDisc />
          <HireButton className="btn btn-primary btn-xl hidden lg:inline-flex" />
        </span>
      </div>
    </section>
  );
}
