import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

/**
 * A imagem que aparece quando alguém cola o link do site no WhatsApp.
 *
 * É o formato em que este site mais vai ser visto: o botão principal do herói
 * abre uma conversa, então o caminho normal até aqui é alguém mandando o
 * endereço para outra pessoa. Sem esta imagem o link chega como texto cinza.
 *
 * Desenhada a partir do retrato que já está no repositório, com a mesma
 * vinheta do herói — nada a preencher depois. Quando o Pedro mandar uma foto
 * feita para 1200×630, basta trocar o arquivo em `public/fotos/`.
 */
export const runtime = "nodejs";
export const alt = "Pedro Lucena — saxofonista em São Paulo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NIGHT = "#0A0A0A";

export default async function OpengraphImage() {
  let photo = "";
  try {
    /* Caminho relativo estático (não `process.cwd()` + join): assim o tracing
       do Turbopack enxerga exatamente este arquivo, em vez de concluir que a
       rota lê o projeto inteiro. */
    const buf = await readFile(new URL("../../public/fotos/credenciais.jpg", import.meta.url));
    photo = `data:image/jpeg;base64,${Buffer.from(buf).toString("base64")}`;
  } catch {
    // Sem a foto o cartão ainda sai: fundo do tema, tipografia igual.
  }

  /* O mesmo herói da home: ele de costas, o nome inteiro numa linha e a frase embaixo. */
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: NIGHT, position: "relative" }}>
        {photo ? (
          <img
            src={photo}
            width={1146}
            height={630}
            style={{ position: "absolute", top: 0, left: -160, width: 1146, height: 630, opacity: 0.74 }}
          />
        ) : null}
        {/* A foto some no preto à direita, como no herói. */}
        <div style={{ position: "absolute", top: 0, left: 0, width: size.width, height: size.height, background: `linear-gradient(90deg, rgba(10,10,10,0) 60%, ${NIGHT} 82%)` }} />

        <div style={{ position: "absolute", left: 64, right: 64, bottom: 64, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>PEDRO LUCENA</div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 26, color: "rgba(255,255,255,0.78)", letterSpacing: 2 }}>
            Do palco ao estúdio, do jazz ao pop. Música com identidade, em cada nota.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
