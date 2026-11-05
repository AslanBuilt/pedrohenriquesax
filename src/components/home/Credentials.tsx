import type { Credential } from "@prisma/client";
import { Reveal } from "@/components/Reveal";
import { Apoios } from "@/components/home/Apoios";
import { CREDENTIAL_GROUPS } from "@/lib/credential-groups";

/**
 * A ficha técnica, como nos créditos de um disco: um nome por linha, por grupo.
 * Mora só na home, com os apoios no fim. O Pedro cadastra uma linha por artista no
 * painel; um nome repetido no mesmo grupo aparece uma vez.
 */
export function Credentials({ items }: { items: Credential[] }) {
  const groups = CREDENTIAL_GROUPS
    .map(([key, label]) => ({
      key, label,
      names: [...new Set(items.filter((i) => i.context === key).map((i) => i.artist))],
    }))
    .filter((g) => g.names.length);
  if (!groups.length) return null;

  return (
    <section id="credenciais" aria-labelledby="ficha" className="section bg-surface">
      <div className="wrap">
        <Reveal><h2 id="ficha" className="d-l text-paper">Ficha técnica</h2></Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5">
          {groups.map((g) => (
            <Reveal key={g.key}>
              <div className="border-t border-paper pt-3">
                <h3 className="label text-muted">{g.label}</h3>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {g.names.map((n) => <li key={n} className="d-s text-paper">{n}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Apoios />
      </div>
    </section>
  );
}
