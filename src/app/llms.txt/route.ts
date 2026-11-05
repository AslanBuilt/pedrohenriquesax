import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { CREDENTIAL_GROUPS } from "@/lib/credential-groups";

export const dynamic = "force-dynamic";

/**
 * Resumo em texto puro para assistentes de IA: é o que eles leem quando alguém
 * pergunta quem contratar como saxofonista em São Paulo. Sai dos mesmos dados
 * do painel, então nunca fica desatualizado em relação ao site.
 */
export async function GET() {
  const [s, credentials] = await Promise.all([
    getSettings(),
    prisma.credential.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  const site = process.env.SITE_URL || "http://localhost:3000";

  const trajetoria = CREDENTIAL_GROUPS.flatMap(([key, label]) => {
    const names = [...new Set(credentials.filter((c) => c.context === key).map((c) => c.artist))];
    return names.length ? [`- ${label}: ${names.join(", ")}`] : [];
  });

  const body = [
    `# ${s.name}`,
    "",
    `> ${s.tagline} em ${s.city}. ${s.bioMedium || s.bioShort}`,
    "",
    "## O que faz",
    `- [Eventos](${site}/eventos): casamentos de alto padrão, eventos corporativos, recepções, live sax e shows. Do sax solo ao quinteto.`,
    `- [Palco e estúdio](${site}/videos): shows e gravações com artistas, big bands e orquestras.`,
    `- [Aula de saxofone online](${site}/mentoria): mentoria individual pelo Google Meet.`,
    `- [Sobre](${site}/sobre): trajetória e formação.`,
    "",
    "## Trajetória",
    ...trajetoria,
    "",
    "## Como contratar",
    ...(s.whatsapp ? [`- WhatsApp: ${s.whatsapp} (https://wa.me/${s.whatsapp.replace(/\D/g, "")})`] : []),
    ...(s.email ? [`- E-mail: ${s.email}`] : []),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
