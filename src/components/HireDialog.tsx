"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WhatsappLogo, X } from "@phosphor-icons/react";
import { Field } from "@/components/Field";
import { HIRE_EVENT } from "@/components/HireButton";
import { DETALHES, TIPOS, hireMessage, isTipo, whatsappUrl, type Tipo } from "@/lib/whatsapp";

/**
 * "Contratar": primeiro a pergunta, com as opções à vista, para ficar claro para o
 * que se contrata o Pedro. O formulário só aparece depois da escolha, com os campos
 * daquele assunto. Ao enviar, o WhatsApp abre com a mensagem já escrita.
 *
 * Usa o <dialog> nativo: foco preso, Esc e fundo inerte vêm de graça.
 */
export function HireDialog({ whatsapp, email }: { whatsapp: string; email: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [enviado, setEnviado] = useState("");

  const abrir = useCallback((t: Tipo | null = null) => {
    setTipo(t);
    setEnviado("");
    if (!ref.current?.open) ref.current?.showModal();
  }, []);

  useEffect(() => {
    const porEvento = (e: Event) => {
      const t = (e as CustomEvent).detail;
      abrir(isTipo(t) ? t : null);
    };
    const porHash = () => { if (location.hash === "#contratar") abrir(); };
    porHash();
    window.addEventListener(HIRE_EVENT, porEvento);
    window.addEventListener("hashchange", porHash);
    return () => {
      window.removeEventListener(HIRE_EVENT, porEvento);
      window.removeEventListener("hashchange", porHash);
    };
  }, [abrir]);

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!tipo) return;
    const dados = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const texto = hireMessage(tipo, dados.name, dados.message ?? "", dados);
    /* Sem WhatsApp cadastrado o pedido não pode se perder: cai no e-mail. */
    const url = whatsapp.replace(/\D/g, "")
      ? whatsappUrl(whatsapp, texto)
      : `mailto:${email}?subject=${encodeURIComponent("Contato pelo site")}&body=${encodeURIComponent(texto)}`;
    setEnviado(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const fechar = (
    <button type="button" onClick={() => ref.current?.close()} aria-label="Fechar" className="btn btn-ghost -mr-3 -mt-2 px-3">
      <X size={20} aria-hidden />
    </button>
  );

  return (
    <dialog
      ref={ref}
      aria-labelledby="hire-title"
      className="hire"
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
      onClose={() => { if (location.hash === "#contratar") history.replaceState(null, "", location.pathname + location.search); }}
    >
      {enviado ? (
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="hire-title" className="d-m text-paper">Falta só apertar enviar</h2>
            {fechar}
          </div>
          <p className="mt-4 text-muted">
            Abrimos a conversa com a sua mensagem já escrita. Confira e envie por lá: é assim que ela chega até ele.
          </p>
          <a href={enviado} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
            <WhatsappLogo size={18} weight="fill" aria-hidden /> Não abriu? Abrir de novo
          </a>
        </div>
      ) : (
        <form onSubmit={enviar}>
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 id="hire-title" className="d-m text-paper">Como posso ajudar?</h2>
              {fechar}
            </div>

            <div role="group" aria-labelledby="hire-title" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(Object.keys(TIPOS) as Tipo[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={tipo === t}
                  onClick={() => setTipo(t)}
                  className={`min-h-[60px] cursor-pointer rounded-[2px] border px-2 text-base font-semibold leading-tight transition-colors ${
                    tipo === t ? "border-paper bg-paper text-white" : "border-black/25 text-paper hover:border-paper"
                  }`}
                >
                  {TIPOS[t]}
                </button>
              ))}
            </div>

            {/* A chave recria os campos ao trocar de assunto: um valor digitado
                para evento não vai parar na mensagem de aula. */}
            {tipo && (
              <div key={tipo} className="mt-5 grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Field scope="hire" label="Seu nome" name="name" required autoComplete="name" />
                </div>
                {DETALHES[tipo].map((d) => (
                  <Field key={d.name} scope="hire" label={d.label} name={d.name} placeholder={d.placeholder} />
                ))}
                <div className="col-span-2">
                  <Field scope="hire" label="Mensagem" name="message" textarea placeholder="Conte em poucas palavras." />
                </div>
              </div>
            )}
          </div>

          {tipo && (
            <div className="sticky bottom-0 flex justify-end border-t border-black/10 bg-surface px-5 py-3 md:px-6">
              <button type="submit" className="btn btn-primary">
                <WhatsappLogo size={18} weight="fill" aria-hidden /> Enviar pelo WhatsApp
              </button>
            </div>
          )}
        </form>
      )}
    </dialog>
  );
}
