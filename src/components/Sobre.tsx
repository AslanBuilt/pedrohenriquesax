import Image from "next/image";
import type { Settings } from "@/lib/settings";
import { Chapter } from "@/components/Chapter";
import { Reveal } from "@/components/Reveal";
import { mediaUrl } from "@/lib/media-url";
import { semViuva } from "@/lib/text";

/*
 * A página Sobre como o Pedro escreveu em 16/11/2026 (documento "Site Pedro Lucena / Guias"):
 * faixa de foto com SOBRE por cima, a frase do David Sanborn, a abertura e dois capítulos.
 * O texto é dele, palavra por palavra; fica no código, não no painel.
 * Fundos: preto, claro, preto, claro. O rodapé é preto.
 */

function Fala({ children }: { children: string }) {
  return (
    <blockquote className="sobre-fala d-s mt-8 text-paper">
      <p>“{semViuva(children)}”</p>
    </blockquote>
  );
}

function P({ children }: { children: string }) {
  return <p className="mt-5 text-lg leading-relaxed text-muted">{semViuva(children, 4)}</p>;
}

export function Sobre({ settings: s }: { settings: Settings }) {
  return (
    <>
      <section className="sobre-faixa on-dark relative isolate flex items-center justify-center overflow-hidden bg-night">
        <Image src="/fotos/g06.jpg" alt="" fill priority sizes="100vw" className="foto-abre -z-10 object-cover" />
        <h1 className="sobe marca text-white">Sobre</h1>
      </section>

      <section className="section">
        <div className="wrap-narrow">
          <Reveal>
            <figure className="text-center">
              <blockquote className="d-m text-paper">
                <p className="italic">“Tudo se resume a encontrar a nota certa no lugar certo e saber quando não mexer no que já está bom.”</p>
              </blockquote>
              <figcaption className="mt-4 text-faint">— David Sanborn</figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <p className="mt-14 text-lg leading-relaxed text-muted sm:text-xl">
              {semViuva("Em um mesmo ano, Pedro Lucena pode dividir o palco com Danilo Pérez em uma big band internacional e tocar em um casamento ou em um evento corporativo. Para o saxofonista e compositor paulistano, o tamanho do palco muda, mas o compromisso, não.", 4)}
            </p>
            <Fala>Eu me preparo para um casamento do mesmo jeito que me preparo para uma big band. Para quem está ouvindo, aquele momento é único.</Fala>
          </Reveal>
        </div>
      </section>

      <Chapter foto="/fotos/g10.jpg" pos="50% 15%" escuro titulo="De onde vem esse som">
        <P>Tudo começou aos 13 anos, num projeto de música da igreja, por incentivo da mãe. Depois veio um projeto social e, logo em seguida, um desafio que parecia grande demais: a prova para estudar saxofone na Escola Municipal de Música de São Paulo.</P>
        <Fala>Pedi ao meu professor para gravar o exercício da prova, para eu tentar decorar de ouvido. Meu nível ainda era muito baixo, e a chance de passar era pequena. Mas consegui.</Fala>
        <P>Esse esforço abriu caminho. Em 2018, como aluno destaque, Pedro ganhou bolsa integral na Faculdade Souza Lima & Berklee, onde estudou com Sizão Machado, Realcino Lima “Nenê” e outros grandes mestres, e dividiu o palco da big band da faculdade com Jeff Coffin e Anat Cohen.</P>
        <P>De 2021 a 2025, integrou a Orquestra Jovem Tom Jobim, dedicada exclusivamente à música brasileira, sob direção de Nelson Ayres e Tiago Costa. Foram quatro anos ao lado de nomes como Guinga, Mônica Salmaso, Ayrton Montarroyos, Livia Nestrovski, Vanessa Moreno, Nailor de Azevedo “Proveta”, Lula Galvão e o saxofonista inglês John Surman.</P>
        <Fala>Foi um dos lugares onde mais aprendi sobre a cultura, os estilos e a história da música brasileira. Foram lições de música e de vida.</Fala>
        <P>Em 2026, foi selecionado como sax alto lead (líder do naipe de saxofones) da Big Band do Berklee Global Jazz Institute em seu projeto no Brasil. O instituto foi fundado pelo pianista Danilo Pérez, que dirigiu o projeto.</P>
      </Chapter>

      <Chapter foto="/fotos/sobre-hoje.jpg" pos="50% 25%" titulo="Onde ele toca hoje">
        <P>O jazz deu a Pedro sua linguagem, e foi com ela que ele aprendeu a conversar com outros estilos. Hoje ele transita entre gravações de diferentes gêneros, big bands, turnês com artistas e eventos sociais e corporativos, de casamentos a eventos de grande porte, sempre adaptando o som ao que cada momento pede. Em paralelo, lidera seu quinteto de música instrumental autoral, onde desenvolve seu trabalho como compositor e arranjador.</P>
        <Fala>Seja no estúdio, num grande palco ou num pocket show, cada trabalho merece o melhor de mim. No fim, é a música que precisa falar.</Fala>
        {s.resumeUrl && (
          <a href={mediaUrl(s.resumeUrl)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-10">
            Baixar currículo
          </a>
        )}
      </Chapter>
    </>
  );
}
