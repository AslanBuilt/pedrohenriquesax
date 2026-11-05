import type { Settings } from "@/lib/settings";
import { Chapter } from "@/components/Chapter";
import { PhotoQuote } from "@/components/PhotoQuote";
import { mediaUrl } from "@/lib/media-url";
import { semViuva } from "@/lib/text";

/* Da formação ao palco de hoje: a foto acompanha o momento da história. */
const FOTOS: [string, string][] = [
  ["/fotos/g10.jpg", "50% 15%"],
  ["/fotos/g02.jpg", "50% 20%"],
  ["/video/solo-bigband.jpg", "60% 28%"],
  ["/fotos/g13.jpg", "50% 30%"],
  ["/fotos/live-sax-palco.jpg", "50% 50%"],
];

/** A primeira frase vira o título do capítulo; o resto do parágrafo, o texto. */
function separar(paragrafo: string): [string, string] {
  const m = paragrafo.match(/^(.+?[.!?])\s+(?=[A-ZÀ-Ú"])(.+)$/s);
  return m ? [m[1], m[2]] : [paragrafo, ""];
}

/**
 * A bio do painel, um capítulo por parágrafo, alternando claro e preto. O rodapé é
 * preto, então o último capítulo precisa ser claro: com número par de parágrafos, os
 * dois primeiros viram um capítulo só.
 */
export function About({ settings: s }: { settings: Settings }) {
  const paras = (s.bioLong || s.bioMedium || "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (paras.length % 2 === 0 && paras.length > 1) paras.splice(0, 2, `${paras[0]} ${paras[1]}`);

  return (
    <>
      <PhotoQuote src="/fotos/credenciais.jpg" title="Do evento de alto padrão ao estúdio" />

      {paras.map((p, i) => {
        const [titulo, texto] = separar(p);
        const [foto, pos] = FOTOS[i % FOTOS.length];
        return (
          <Chapter key={i} foto={foto} pos={pos} escuro={i % 2 === 1} titulo={titulo}>
            {texto && <p className="mt-5 text-lg leading-relaxed text-muted">{semViuva(texto, 4)}</p>}
            {i === paras.length - 1 && s.resumeUrl && (
              <a href={mediaUrl(s.resumeUrl)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-8">
                Baixar currículo
              </a>
            )}
          </Chapter>
        );
      })}
    </>
  );
}
