"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowsClockwise, ArrowUUpLeft } from "@phosphor-icons/react";

/**
 * Um grupo da ficha técnica, como a capa de um disco: na frente o título e quantos nomes
 * tem, no verso os nomes, como nos créditos. Vira com clique, toque ou teclado; a face
 * escondida fica `inert`, então o Tab nunca cai num botão de costas. Os nomes estão
 * sempre no HTML, para quem busca e para quem lê com leitor de tela.
 */
export function FichaCartao({ titulo, unidade, nomes, i }: {
  titulo: string; unidade: string; nomes: string[]; i: number;
}) {
  const [virado, setVirado] = useState(false);
  const muitos = nomes.length > 4;

  return (
    <div className={`ficha-cartao ${virado ? "virado" : ""}`} style={{ "--i": i } as React.CSSProperties}>
      <div className="ficha-giro">
        <div className="ficha-face ficha-frente" inert={virado}>
          <Sulcos />
          <p className="ficha-numero">{nomes.length} <span className="ficha-unidade">{unidade}</span></p>
          <h3 className="d-m text-white">{titulo}</h3>
          <button type="button" onClick={() => setVirado(true)} aria-label={`Ver os nomes: ${titulo}`}
            className="ficha-botao">
            <span className="ficha-dica">Ver os nomes <ArrowsClockwise size={16} weight="light" aria-hidden /></span>
          </button>
        </div>

        <div className="ficha-face ficha-verso" inert={!virado}>
          <h3 className="d-s text-paper">{titulo}</h3>
          <ul className={`mt-4 ${muitos ? "ficha-colunas" : "flex flex-col gap-1.5"}`}>
            {nomes.map((n) => <li key={n} className="text-paper">{n}</li>)}
          </ul>
          <button type="button" onClick={() => setVirado(false)} aria-label={`Voltar: ${titulo}`}
            className="ficha-botao">
            <span className="ficha-dica">Voltar <ArrowUUpLeft size={16} weight="light" aria-hidden /></span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* Os sulcos de um disco saindo pelo canto da capa. */
function Sulcos() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="ficha-sulcos" fill="none" stroke="currentColor">
      {[96, 88, 80, 72, 64, 56, 48].map((r) => <circle key={r} cx="100" cy="100" r={r} strokeWidth="0.6" />)}
      <circle cx="100" cy="100" r="30" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * A grade dos cartões. Na primeira vez que ela aparece, os cartões acenam um de cada vez,
 * um quarto de giro e de volta, para mostrar que viram. Uma vez só, e nada sob
 * prefers-reduced-motion.
 */
export function FichaGrade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("acena"); io.disconnect(); }
    }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`ficha-grade ${className}`}>{children}</div>;
}
