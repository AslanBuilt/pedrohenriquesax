import { PhotoBand } from "@/components/PhotoBand";

const SEGMENTOS = [
  "Casamentos", "Eventos corporativos", "Recepções",
  "Réveillon particular", "Bodas", "Show autoral",
];
const FORMATOS = [
  "Sax solo",
  "Live sax (sax & DJ)",
  "Sax & piano",
  "Sax & violão",
  "Sax, voz e piano",
  "Sax & quarteto de cordas",
  "Sax & banda",
  "Duo a quinteto de jazz",
];

const lista = (itens: string[]) => itens.join(", ").toLowerCase();

/** Perguntas que quem contrata faria a um buscador ou a uma IA. Vai também em FAQPage. */
export const PERGUNTAS: [string, string][] = [
  [
    "Para quais eventos posso contratar um saxofonista em São Paulo?",
    `Pedro Lucena toca em ${lista(SEGMENTOS)}, entre outros.`,
  ],
  [
    "Quais formatos estão disponíveis?",
    `${FORMATOS.join(", ")}. O formato é montado conforme o tamanho e o clima do evento.`,
  ],
  [
    "O que é live sax?",
    "É o saxofone tocando ao vivo por cima da pista, junto com o DJ ou a banda. Funciona muito bem em recepção e festa, porque entra e sai da música sem parar o som.",
  ],
  [
    "Como peço um orçamento?",
    "Aperte Contratar, preencha o formulário e a mensagem abre pronta no WhatsApp, direto com o Pedro.",
  ],
];

export function Events({ text }: { text: string }) {
  return (
    <>
      <PhotoBand src="/fotos/g03.jpg" alt="Pedro Lucena com o saxofone" pos="50% 8%">
        <h1 className="d-l max-w-[14em] text-white">
          Casamentos e eventos corporativos
          <span className="sr-only">: saxofonista em São Paulo</span>
        </h1>
      </PhotoBand>

      {text && (
        <section id="eventos" className="section">
          <div className="wrap">
            <p className="d-l max-w-[24em] text-paper">{text}</p>
          </div>
        </section>
      )}
    </>
  );
}

export function EventsFaq() {
  return (
    <section aria-labelledby="perguntas" className="section">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-16">
        <h2 id="perguntas" className="d-l text-paper lg:col-span-5">Perguntas frequentes</h2>
        <dl className="lg:col-span-7 border-t border-black/15">
          {PERGUNTAS.map(([q, a]) => (
            <div key={q} className="border-b border-black/15 py-5">
              <dt className="d-s text-paper">{q}</dt>
              <dd className="mt-2 text-muted">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
