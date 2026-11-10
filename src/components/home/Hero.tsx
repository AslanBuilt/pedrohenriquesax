import Image from "next/image";
import type { Settings } from "@/lib/settings";
import { HireButton } from "@/components/HireButton";
import { SoloDisc } from "@/components/home/SoloDisc";

/**
 * Uma faixa preta com ele de costas no centro e o nome como marca: o primeiro nome de um
 * lado, o sobrenome do outro, numa cor só. Logo abaixo já começa a página clara.
 * É a versão 85, escolhida pelo Pedro em 09/11/2026. "Saxofonista em São Paulo" fica só
 * para leitores de tela e buscadores.
 *
 * Fixa no código porque o texto branco depende do fundo preto dela.
 */
export function Hero({ settings: s }: { settings: Settings }) {
  const [nome, ...resto] = s.name.split(" ");
  const sobrenome = resto.join(" ");

  return (
    <section id="heroi" className="on-dark relative isolate flex h-[max(520px,70svh)] flex-col justify-end overflow-hidden bg-night lg:h-[max(600px,64dvh)]">
      <div className="hero-faixa absolute inset-0 -z-10">
        <Image
          src="/fotos/credenciais.jpg"
          alt={`${s.name} de costas, com o saxofone, diante da plateia`}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 90vw"
          className="foto-abre object-cover"
        />
      </div>

      <div className="wrap pb-6 lg:pb-11">
        <h1 className="sobe marca flex flex-col text-white lg:flex-row lg:justify-between">
          <span>{nome}</span>{" "}
          <span className="self-end lg:self-auto">{sobrenome}</span>
          <span className="sr-only">, {s.tagline.toLowerCase()} em {s.city}</span>
        </h1>
        <span className="sobe mt-5 flex items-center gap-5 lg:mt-10" style={{ animationDelay: "220ms" }}>
          <HireButton className="btn btn-primary btn-xl hidden lg:inline-flex" />
          <SoloDisc />
        </span>
      </div>
    </section>
  );
}
