import Image from "next/image";

/* Em tinta única, para três marcas de cores diferentes formarem uma faixa só. */
export const APOIOS = [
  { nome: "Tokai", src: "/marca/apoio-tokai.png", w: 269, h: 47, cls: "h-[22px] sm:h-7 md:h-8" },
  { nome: "Faculdade de Música Souza Lima", src: "/marca/apoio-souza-lima.png", w: 263, h: 133, cls: "h-9 sm:h-12 md:h-14" },
  { nome: "La Musica", src: "/marca/apoio-la-musica.png", w: 494, h: 415, cls: "h-11 sm:h-14 md:h-16" },
];

/** Fecha a ficha técnica. Um vão só entre os logos, qualquer que seja a largura de cada um. */
export function Apoios() {
  return (
    <div className="mt-12 flex flex-col gap-6 border-t border-paper pt-8 md:flex-row md:items-center md:justify-between">
      <h3 className="d-m text-paper">Apoio</h3>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-6 sm:gap-x-10 md:gap-x-16">
        {APOIOS.map((a) => (
          <li key={a.nome}>
            <Image src={a.src} alt={a.nome} width={a.w} height={a.h} className={`w-auto ${a.cls}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
