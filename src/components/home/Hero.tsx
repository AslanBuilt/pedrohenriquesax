import Image from "next/image";
import type { Settings } from "@/lib/settings";
import { HireButton } from "@/components/HireButton";

/**
 * Faixa preta com ele de costas, o nome inteiro numa linha por cima dos ombros e uma frase
 * embaixo. É a edição que o próprio Pedro montou em 10/11/2026 a partir da 85, que ele achou
 * "meio vazia". "Saxofonista em São Paulo" fica só para leitores de tela e buscadores.
 *
 * Fixa no código porque o texto branco depende do fundo preto dela.
 */
export function Hero({ settings: s }: { settings: Settings }) {
  const [nome, ...resto] = s.name.split(" ");
  const sobrenome = resto.join(" ");

  return (
    <section id="heroi" className="heroi on-dark relative isolate flex flex-col justify-end overflow-hidden bg-night">
      <div className="hero-faixa absolute -z-10">
        <Image
          src="/fotos/credenciais.jpg"
          alt={`${s.name} de costas, com o saxofone`}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 1400px"
          className="foto-abre object-cover"
        />
      </div>

      <div className="wrap pb-10 lg:pb-12">
        <h1 className="sobe marca text-white">
          <span className="block lg:inline">{nome}</span>{" "}
          <span className="block lg:inline">{sobrenome}</span>
          <span className="sr-only">, {s.tagline.toLowerCase()} em {s.city}</span>
        </h1>
        <div className="sobe mt-5 flex items-center justify-between gap-8 lg:mt-7" style={{ animationDelay: "220ms" }}>
          <p className="frase text-white/75">Do palco ao estúdio, do jazz ao pop. Música com identidade, em cada nota.</p>
          <HireButton className="btn btn-primary btn-lg hidden shrink-0 lg:inline-flex" />
        </div>
      </div>
    </section>
  );
}
