import { useId } from "react";

/**
 * O selo: um rótulo de disco com o texto correndo pela borda. Substitui o
 * monograma como marca. No herói ele é o disco que toca; no rodapé, leva o nome.
 */
const TEXTO = "SAXOFONISTA · SÃO PAULO · PALCO · ESTÚDIO · EVENTOS · AULAS · ";

export function Seal({ className = "" }: { className?: string }) {
  /* Há dois selos na home: o id do caminho do texto não pode se repetir. */
  const id = `seal-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className} fill="none" stroke="currentColor">
      <circle cx="100" cy="100" r="98" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="93" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="66" strokeWidth="0.5" />
      <defs>
        <path id={id} d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
      </defs>
      <text fill="currentColor" stroke="none" fontSize="12.5" fontWeight="600" style={{ fontFamily: "var(--font-sans)" }}>
        <textPath href={`#${id}`} textLength="462" lengthAdjust="spacing">{TEXTO}</textPath>
      </text>
    </svg>
  );
}
