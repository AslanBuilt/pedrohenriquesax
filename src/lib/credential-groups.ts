import type { CredentialGroup } from "@prisma/client";

/**
 * Grupos das credenciais, na ordem da página. Fonte única para o site e para o
 * painel: o painel tinha a própria lista, sem "formacao" e "temporada", e o que
 * estava nesses grupos aparecia no site sem que o Pedro conseguisse remover.
 * O `Record` faz um grupo novo no schema não compilar até ganhar rótulo aqui.
 */
const LABELS: Record<CredentialGroup, string> = {
  formacao: "Formação",
  big_band: "Big bands e orquestras",
  temporada: "Temporada",
  jazz_internacional: "Jazz internacional",
  pop_nacional: "Pop nacional",
  festival: "Grandes eventos e festivais",
};

export const CREDENTIAL_GROUPS = Object.entries(LABELS) as [CredentialGroup, string][];
