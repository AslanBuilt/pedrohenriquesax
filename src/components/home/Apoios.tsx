import Image from "next/image";

/* Em tinta única, para três marcas de cores diferentes formarem uma faixa só. */
const APOIOS = [
  { nome: "Tokai", src: "/marca/apoio-tokai.png", w: 269, h: 47, cls: "h-7 md:h-8" },
  { nome: "Faculdade de Música Souza Lima", src: "/marca/apoio-souza-lima.png", w: 263, h: 133, cls: "h-12 md:h-14" },
  { nome: "La Musica", src: "/marca/apoio-la-musica.png", w: 494, h: 415, cls: "h-14 md:h-16" },
];

/** Fecha a ficha técnica nas mesmas cinco colunas: cada logo começa onde começa uma coluna. */
export function Apoios() {
  return (
    <div className="mt-12 grid grid-cols-2 items-center gap-x-6 gap-y-8 border-t border-paper pt-8 lg:grid-cols-5">
      <h3 className="d-m col-span-2 text-paper">Apoio</h3>
      {APOIOS.map((a) => (
        <Image key={a.nome} src={a.src} alt={a.nome} width={a.w} height={a.h} className={`w-auto justify-self-start ${a.cls}`} />
      ))}
    </div>
  );
}
