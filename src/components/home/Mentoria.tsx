import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { HireButton } from "@/components/HireButton";
import { PhotoBand } from "@/components/PhotoBand";

/**
 * Conteúdo do próprio Pedro. Os preços não estão aqui porque ele mandou os planos
 * sem valores — falta combinar se cada plano mostra o seu.
 *
 * Cada formato é um cartão inteiro clicável, que abre o pedido já em aula. Sem foto:
 * nada aqui tem foto que ilustre o texto de verdade.
 */
const FORMATOS: [string, string][] = [
  ["Mensal", "Uma aula por semana"],
  ["Quinzenal", "Uma aula a cada 15 dias"],
  ["Avulsa", "Uma aula, quando precisar"],
  ["Consultoria", ""],
];
const INCLUI: [string, string][] = [
  ["50 minutos a 1h15", "por aula, 100% online, pelo Google Meet."],
  ["Pasta individual", "no Google Drive, com o material e um cronograma de estudos personalizado."],
  ["Vídeos complementares", "para tirar dúvidas fora do horário de aula."],
  ["Teoria musical", "incluída, para quem ainda não tem essa base."],
];

export function Mentoria() {
  return (
    <>
      <PhotoBand src="/fotos/g04.jpg" alt="Pedro Lucena sorrindo, com o saxofone" pos="50% 8%">
        <h1 className="d-l max-w-[14em] text-white">Aula de saxofone online</h1>
      </PhotoBand>

      <section id="mentoria" className="section">
        <div className="wrap">
          <h2 className="d-l text-paper">Formatos</h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {FORMATOS.map(([nome, desc]) => (
              <li key={nome}>
                <HireButton
                  tipo="aula"
                  className="formato group flex h-full items-center justify-between gap-2 rounded-[2px] border border-black/15 bg-surface p-4 transition-colors hover:bg-night md:p-5"
                >
                  <span>
                    <span className="d-m block text-paper transition-colors group-hover:text-white">{nome}</span>
                    {desc && <span className="mt-1 block text-sm text-muted transition-colors group-hover:text-white/80">{desc}</span>}
                  </span>
                  <ArrowRight size={20} aria-hidden className="shrink-0 text-paper transition-colors group-hover:text-white" />
                </HireButton>
              </li>
            ))}
          </ul>

          <h2 className="d-l mt-16 text-paper lg:mt-20">Toda aula inclui</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 border-t border-paper pt-6 lg:grid-cols-4 lg:gap-x-4">
            {INCLUI.map(([t, d]) => (
              <li key={t} className="pr-4 lg:pr-6">
                <p className="d-s text-paper">{t}</p>
                <p className="mt-1 text-muted [text-wrap:pretty]">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
