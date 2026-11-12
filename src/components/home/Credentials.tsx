import type { Credential, CredentialGroup } from "@prisma/client";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Apoios, APOIOS } from "@/components/home/Apoios";
import { CREDENTIAL_GROUPS } from "@/lib/credential-groups";
import { FichaCartao, FichaGrade } from "@/components/home/FichaCartao";

/* Os logos no cartão do apoio, numa linha só: Tokai, Souza Lima, La Musica. */
const NO_CARTAO = ["h-5 xl:h-6", "h-9 xl:h-11", "h-11 xl:h-14"];

/* A ordem dos cartões na página: os maiores grupos primeiro, formação perto do apoio. */
const ORDEM: CredentialGroup[] = ["pop_nacional", "jazz_internacional", "big_band", "festival", "temporada", "formacao"];

const CONTAGEM: Record<CredentialGroup, [string, string]> = {
  pop_nacional: ["artista", "artistas"],
  jazz_internacional: ["artista", "artistas"],
  big_band: ["grupo", "grupos"],
  festival: ["festival", "festivais"],
  temporada: ["temporada", "temporadas"],
  formacao: ["escola", "escolas"],
};

/**
 * A ficha técnica, em cartões que viram (pedido do Renato em 11/11/2026): na frente o grupo,
 * no verso os nomes. Nunca quatro numa linha: com cinco grupos o apoio vira o sexto cartão
 * e a grade fecha em 3 por 2; com quatro, 2 por 2; com outro número, o apoio volta a ser a
 * faixa embaixo. O Pedro cadastra uma linha por artista no painel; um nome repetido no
 * mesmo grupo aparece uma vez.
 */
export function Credentials({ items }: { items: Credential[] }) {
  const rotulo = Object.fromEntries(CREDENTIAL_GROUPS) as Record<CredentialGroup, string>;
  const groups = ORDEM
    .map((key) => ({ key, label: rotulo[key], names: [...new Set(items.filter((i) => i.context === key).map((i) => i.artist))] }))
    .filter((g) => g.names.length);
  if (!groups.length) return null;

  const apoioNaGrade = groups.length % 3 === 2;
  const total = groups.length + (apoioNaGrade ? 1 : 0);
  const colunas = total === 4 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="credenciais" aria-labelledby="ficha" className="section bg-surface">
      <div className="wrap">
        <Reveal><h2 id="ficha" className="d-l text-paper">Ficha técnica</h2></Reveal>
        <FichaGrade className={`mt-8 grid gap-4 lg:gap-5 ${colunas}`}>
          {groups.map((g, i) => {
            const [um, varios] = CONTAGEM[g.key];
            return (
              <FichaCartao key={g.key} i={i} titulo={g.label} nomes={g.names}
                unidade={g.names.length === 1 ? um : varios} />
            );
          })}
          {apoioNaGrade && (
            <div className="ficha-apoio">
              <h3 className="d-m text-paper">Apoio</h3>
              <ul className="mt-6 flex items-center justify-between gap-4">
                {APOIOS.map((a, i) => (
                  <li key={a.nome}>
                    <Image src={a.src} alt={a.nome} width={a.w} height={a.h} className={`w-auto ${NO_CARTAO[i]}`} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </FichaGrade>
        {!apoioNaGrade && <Apoios />}
      </div>
    </section>
  );
}
