import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Hanken_Grotesk, Outfit } from "next/font/google";
import "./globals.css";

/* Só o subconjunto `latin`: ele já cobre todo o português. */
const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

/* O nome no herói e o menu, como marca (edição do próprio Pedro, 10/11/2026). */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "500"],
  display: "swap",
  variable: "--font-marca",
});

const SITE = process.env.SITE_URL || "http://localhost:3000";

const DESCRICAO =
  "Saxofonista em São Paulo para casamentos, eventos corporativos, shows e gravações. Bacharel pela Souza Lima & Berklee. Peça um orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Saxofonista em São Paulo — Pedro Lucena", template: "%s · Pedro Lucena" },
  description: DESCRICAO,
  /* O link deste site quase sempre chega às pessoas colado numa conversa de
     WhatsApp. A imagem é gerada em `opengraph-image.tsx`.

     Sem `alternates` aqui de propósito: o que é declarado no layout é herdado,
     e um canonical "/" na raiz dizia ao Google que todas as páginas eram cópia
     da home. Cada página pública declara o próprio. */
  openGraph: {
    type: "website", locale: "pt_BR", siteName: "Pedro Lucena",
    title: "Saxofonista em São Paulo — Pedro Lucena",
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: "Saxofonista em São Paulo — Pedro Lucena",
    description: DESCRICAO,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${serif.variable} ${hanken.variable} ${outfit.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
