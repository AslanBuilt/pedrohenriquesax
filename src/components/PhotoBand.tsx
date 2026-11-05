import Image from "next/image";

/**
 * Abertura das páginas internas: faixa preta em tela cheia, com a foto se
 * dissolvendo no fundo e o texto ao lado. A largura da foto é limitada pela altura
 * da faixa: numa janela larga ela não amplia até cortar o rosto.
 */
export function PhotoBand({ src, alt, pos = "50% 20%", children }: {
  src: string; alt: string; pos?: string; children: React.ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-night">
      <div className="band-foto relative aspect-[4/5] sm:aspect-square lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[min(58%,80vh)]">
        <Image src={src} alt={alt} fill priority sizes="(max-width:1023px) 100vw, 60vw"
          className="foto-abre origin-top object-cover" style={{ objectPosition: pos }} />
      </div>
      <div className="wrap relative z-10 -mt-16 pb-12 lg:mt-0 lg:flex lg:min-h-[78vh] lg:items-center lg:py-16">
        <div className="lg:max-w-[50%]">{children}</div>
      </div>
    </section>
  );
}
