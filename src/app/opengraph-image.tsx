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

const NIGHT = "#070506";
const BRASS = "#D2AE5C";

export default async function OpengraphImage() {
  let photo = "";
  try {
    /* Caminho relativo estático (não `process.cwd()` + join): assim o tracing
       do Turbopack enxerga exatamente este arquivo, em vez de concluir que a
       rota lê o projeto inteiro. */
    const buf = await readFile(new URL("../../public/fotos/hero.jpg", import.meta.url));
    photo = `data:image/jpeg;base64,${Buffer.from(buf).toString("base64")}`;
  } catch {
    // Sem a foto o cartão ainda sai: fundo do tema, tipografia igual.
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: NIGHT, position: "relative" }}>
        {photo ? (
          <img
            src={photo}
            width={size.width * 0.6}
            height={size.height}
            style={{ position: "absolute", top: 0, right: 0, width: size.width * 0.6, height: size.height, objectFit: "cover", objectPosition: "50% 14%" }}
          />
        ) : null}

        <div
          style={{
            position: "absolute", top: 0, left: 0, width: size.width, height: size.height,
            background: `linear-gradient(90deg, ${NIGHT} 42%, rgba(7,5,6,0.75) 56%, rgba(7,5,6,0) 74%)`,
          }}
        />

        <div
          style={{
            position: "relative", display: "flex", flexDirection: "column", justifyContent: "center",
            width: 780, height: "100%", padding: "0 76px",
          }}
        >
          <div style={{ display: "flex", color: BRASS, fontSize: 30 }}>
            Saxofonista em São Paulo
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
            <div style={{ display: "flex", fontSize: 108, fontWeight: 800, color: "#FFFFFF", lineHeight: 1, letterSpacing: -3 }}>
              Pedro
            </div>
            <div style={{ display: "flex", fontSize: 108, fontWeight: 800, color: "#FFFFFF", lineHeight: 1, letterSpacing: -3 }}>
              Lucena
            </div>
          </div>

          <div style={{ display: "flex", marginTop: 30, fontSize: 27, color: "rgba(255,255,255,0.8)", lineHeight: 1.35 }}>
            Souza Lima &amp; Berklee · big bands, jazz e eventos
          </div>

          <div style={{ display: "flex", marginTop: 26, width: 64, height: 4, background: BRASS }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
