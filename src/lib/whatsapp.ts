/**
 * O pedido de contratação vira uma mensagem pronta no WhatsApp do Pedro.
 *
 * Nada passa pelo servidor nem fica no banco: ele decidiu em 05/11/2026 que os
 * pedidos chegam direto na conversa, porque é o WhatsApp que ele olha. Um lead
 * de evento ficou uma semana parado no painel sem ele ver.
 */
export const TIPOS = {
  casamento: "Casamento",
  corporativo: "Evento corporativo",
  show: "Show",
  estudio: "Gravação em estúdio",
  aula: "Aula de saxofone",
  outro: "Outro",
} as const;
export type Tipo = keyof typeof TIPOS;

export const isTipo = (v: unknown): v is Tipo => typeof v === "string" && v in TIPOS;

type Campo = { name: string; label: string; placeholder: string };
const DATA: Campo = { name: "date", label: "Data", placeholder: "12/10/2027" };
const CIDADE: Campo = { name: "city", label: "Cidade", placeholder: "São Paulo" };

/** Campos opcionais de cada assunto, na ordem em que aparecem na mensagem. */
export const DETALHES: Record<Tipo, Campo[]> = {
  casamento: [DATA, CIDADE],
  corporativo: [DATA, CIDADE],
  show: [DATA, CIDADE],
  estudio: [DATA, { ...CIDADE, label: "Cidade ou remoto", placeholder: "Remoto" }],
  aula: [
    { name: "level", label: "Há quanto tempo toca", placeholder: "2 anos" },
    { name: "availability", label: "Disponibilidade", placeholder: "Terças à noite" },
  ],
  outro: [DATA, CIDADE],
};

export function hireMessage(tipo: Tipo, name: string, message: string, fields: Record<string, string>) {
  const detalhes = DETALHES[tipo]
    .map((d) => [d.label, (fields[d.name] ?? "").trim()] as const)
    .filter(([, v]) => v)
    .map(([label, v]) => `${label}: ${v}`);
  const texto = message.trim();
  return [
    "Olá, Pedro! Vim pelo site.",
    "",
    `Assunto: ${TIPOS[tipo]}`,
    `Nome: ${name.trim()}`,
    ...detalhes,
    ...(texto ? ["", texto] : []),
  ].join("\n");
}

export const whatsappUrl = (whatsapp: string, text: string) =>
  `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
