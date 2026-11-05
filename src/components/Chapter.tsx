import Image from "next/image";
import { Reveal } from "@/components/Reveal";

/**
 * Uma foto, uma ideia. As seções alternam claro e preto, e no preto a foto muda de
 * lado. Quem usa cuida da ordem: o rodapé é preto, então o último capítulo é claro.
 */
export function Chapter({ foto, pos = "50% 20%", escuro = false, titulo, children }: {
  foto: string; pos?: string; escuro?: boolean; titulo: string; children?: React.ReactNode;
}) {
  return (
    <section className={`section ${escuro ? "on-dark bg-night" : ""}`}>
      <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={`relative aspect-[4/3] overflow-hidden rounded-[2px] lg:aspect-[5/6] ${escuro ? "lg:order-2" : ""}`}>
          <Image src={foto} alt="" fill sizes="(max-width:1023px) 100vw, 50vw"
            className="foto-entra object-cover grayscale" style={{ objectPosition: pos }} />
        </div>
        <Reveal>
          <h2 className={`${titulo.length > 60 ? "d-m" : "d-l"} text-paper`}>{titulo}</h2>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
