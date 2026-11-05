import Image from "next/image";
import type { Settings } from "@/lib/settings";
import { HireButton } from "@/components/HireButton";
import { SoloDisc } from "@/components/home/SoloDisc";

/**
 * O retrato dele de perto, o nome, o botão e o disco que toca o solo. O sax já diz o que ele faz:
 * "saxofonista em São Paulo" fica só para leitores de tela e buscadores.
 *
 * Fixa no código porque o texto branco depende do fundo preto dela.
 */
export function Hero({ settings: s }: { settings: Settings }) {
  const [nome, ...resto] = s.name.split(" ");
  const sobrenome = resto.join(" ");

  return (
    <section id="heroi" className="on-dark relative isolate flex min-h-[calc(100dvh-76px)] flex-col justify-end overflow-hidden bg-night lg:min-h-[max(640px,100dvh)]">
      <div className="hero-foto absolute -z-10 max-lg:inset-0">
        <Image
          src="/fotos/hero-v3.jpg"
          alt={`${s.name} com o saxofone tenor`}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, min(52vw, 84dvh)"
          className="foto-abre origin-top object-cover object-top"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/85 to-transparent lg:h-1/3 lg:from-black/60" />

      <div className="wrap pb-8 lg:pb-14">
        <h1 className="sobe d-hero text-white">
          <span className="block">{nome}</span>
          <span className="block italic text-brass">{sobrenome}</span>
          <span className="sr-only">, {s.tagline.toLowerCase()} em {s.city}</span>
        </h1>
        <span className="sobe mt-8 flex items-center gap-5 lg:mt-10" style={{ animationDelay: "220ms" }}>
          <HireButton className="btn btn-primary btn-xl hidden lg:inline-flex" />
          <SoloDisc />
        </span>
      </div>
    </section>
  );
}
