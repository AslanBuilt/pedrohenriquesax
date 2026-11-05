import { ImageResponse } from "next/og";

/** Ícone de quando alguém salva o site na tela inicial do celular. */
export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", background: "#070506",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#D2AE5C", letterSpacing: -5 }}>PL</div>
        <div style={{ display: "flex", marginTop: 14, width: 52, height: 4, background: "#D2AE5C" }} />
      </div>
    ),
    { ...size },
  );
}
