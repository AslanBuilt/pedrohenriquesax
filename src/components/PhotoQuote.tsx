import Image from "next/image";
import { Reveal } from "@/components/Reveal";

/** Abertura de página: uma foto em preto e branco de ponta a ponta e uma frase. */
export function PhotoQuote({ src, title, pos = "70% 30%" }: { src: string; title: string; pos?: string }) {
  return (
    <section className="on-dark relative isolate flex min-h-[78vh] items-center overflow-hidden bg-night">
      <Image src={src} alt="" fill sizes="100vw" className="foto-abre -z-10 object-cover grayscale" style={{ objectPosition: pos }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 to-transparent" />
      <div className="wrap">
        <Reveal>
          <h1 className="d-l max-w-[14em] text-white">{title}</h1>
        </Reveal>
      </div>
    </section>
  );
}
