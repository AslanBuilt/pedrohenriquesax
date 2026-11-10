import Image from "next/image";
import type { Settings } from "@/lib/settings";
import { HireButton } from "@/components/HireButton";

/**
 * Uma faixa preta com ele de costas no centro e o nome como marca: o primeiro nome de um
 * lado, o sobrenome do outro, numa cor só. Logo abaixo já começa a página clara. Sem o disco
 * do solo: o Pedro pediu para tirar, em 09/11/2026.
 * É a versão 85, escolhida pelo Pedro em 09/11/2026. "Saxofonista em São Paulo" fica só
 * para leitores de tela e buscadores.
 *
 * Fixa no código porque o texto branco depende do fundo preto dela.
 */
export function Hero({ settings: s }: { settings: Settings }) {
  const [nome, ...resto] = s.name.split(" ");
  const sobrenome = resto.join(" ");

  return (
    <section id="heroi" className="on-dark relative isolate flex h-[max(520px,70svh)] flex-col justify-end overflow-hidden bg-night lg:h-[clamp(560px,64dvh,700px)]">
      <div className="hero-faixa absolute -z-10">
        <Image
          src="/fotos/credenciais.jpg"
          alt={`${s.name} de costas, com o saxofone, diante da plateia`}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 90vw"
          className="foto-abre object-cover"
        />
      </div>

      <div className="wrap pb-10 lg:pb-11">
        <h1 className="sobe marca flex flex-col text-white lg:flex-row lg:justify-between">
          <span>{nome}</span>{" "}
          <span className="self-end lg:self-auto">{sobrenome}</span>
          <span className="sr-only">, {s.tagline.toLowerCase()} em {s.city}</span>
        </h1>
        <span className="sobe mt-10 hidden lg:flex" style={{ animationDelay: "220ms" }}>
          <HireButton className="btn btn-primary btn-xl" />
        </span>
      </div>
    </section>
  );
}
