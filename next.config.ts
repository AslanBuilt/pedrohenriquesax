import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  basePath: process.env.NEXT_BASE_PATH || undefined,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    /* O otimizador reprocessava as fotos a cada visita. Elas mudam quando o
       Pedro troca o ensaio, não a cada request. */
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [
      /* A página de contato virou o formulário "Contratar", que abre em qualquer página. */
      { source: "/contato", destination: "/#contratar", permanent: true },
      /* Um endereço só, para o Google não dividir o site em dois. */
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pedrolucenasax.com" }],
        destination: "https://pedrolucenasax.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // As fotos em public/fotos saíam com `max-age=0`: rebaixadas a cada visita.
        source: "/fotos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=604800" }],
      },
    ];
  },
};
export default nextConfig;
