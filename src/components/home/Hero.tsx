import Image from "next/image";
import type { Settings } from "@/lib/settings";

/**
 * A edição que o próprio Pedro montou em 10/11/2026: ele sentado com o sax ao lado, em preto e
 * branco, "PEDRO LUCENA" de margem a margem sobre o peito e uma frase espaçada embaixo. Sem
 * botão aqui: o Contratar do cabeçalho fica visível sobre o herói (no celular, a barra fixa).
 * "Saxofonista em São Paulo" fica só para leitores de tela e buscadores.
 *
 * Fixa no código porque o texto branco depende do fundo escuro dela.
 */
export function Hero({ settings: s }: { settings: Settings }) {
  const [nome, ...resto] = s.name.split(" ");
  const sobrenome = resto.join(" ");

  return (
    <section id="heroi" className="heroi on-dark relative isolate overflow-hidden bg-night">
      <div className="hero-faixa absolute -z-10">
        <Image
          src="/fotos/g06.jpg"
          alt={`${s.name} sentado, com o saxofone tenor no suporte ao lado`}
          fill
          priority
          sizes="(max-width: 1023px) 175vw, 1330px"
          className="foto-abre object-cover"
        />
      </div>

      <div className="hero-texto wrap">
        <h1 className="sobe marca text-white">
          <span className="block lg:inline">{nome}</span>{" "}
          <span className="block lg:inline">{sobrenome}</span>
          <span className="sr-only">, {s.tagline.toLowerCase()} em {s.city}</span>
        </h1>
        <p className="sobe frase text-white/80" style={{ animationDelay: "220ms" }}>
          Do palco ao estúdio, do jazz ao pop. Música com identidade, em cada nota.
        </p>
      </div>
    </section>
  );
}
