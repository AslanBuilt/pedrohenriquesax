import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { cartCount } from "@/lib/cart";
import { getCustomer } from "@/lib/customer/session";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { Credentials } from "@/components/home/Credentials";
import { VideoSection } from "@/components/VideoSection";
import { Agenda } from "@/components/home/Agenda";
import { Spotify } from "@/components/Spotify";
import { Reveal } from "@/components/Reveal";
import { videosJsonLd } from "@/lib/youtube";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { alternates: { canonical: "/" } };

/* Três enquadramentos do ensaio, para os cartões não repetirem. As fotos de celular
   saíram daqui: o Pedro as achou informais para capa. */
const CAMINHOS = [
  { href: "/eventos", title: "Eventos", foto: "/fotos/card-eventos.jpg", pos: "50% 25%" },
  { href: "/videos", title: "Palco e estúdio", foto: "/fotos/card-palco.jpg", pos: "50% 20%" },
  { href: "/mentoria", title: "Mentoria", foto: "/fotos/g11.jpg", pos: "50% 100%" },
];

const SERVICOS = [
  "Saxofonista para casamentos", "Saxofonista para eventos corporativos", "Live sax",
  "Saxofonista para shows e gravações em estúdio", "Aula de saxofone online",
];

export default async function Home() {
  const [settings, videos, shows, count, customer, produtosAtivos, showsFuturos, credentials] = await Promise.all([
    getSettings(),
    /* Quem escolhe o que aparece na home é o Pedro, pela caixa "destaque" no
       painel — não uma regra de ordenação escondida aqui. */
    prisma.mediaItem.findMany({
      where: { kind: "video", featured: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.show.findMany({ where: { date: { gte: new Date() } }, orderBy: { date: "asc" }, take: 4 }),
    cartCount(),
    getCustomer(),
    prisma.product.count({ where: { active: true } }),
    prisma.show.count({ where: { date: { gte: new Date() } } }),
    prisma.credential.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const site = process.env.SITE_URL || "http://localhost:3000";
  const areaServed = { "@type": "City", name: settings.city };
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Person",
    name: settings.name, jobTitle: "Saxofonista",
    description: settings.bioMedium || settings.bioShort, url: site,
    image: `${site}/fotos/hero-v2.jpg`,
    ...(settings.whatsapp && { telephone: settings.whatsapp }),
    ...(settings.email && { email: settings.email }),
    address: { "@type": "PostalAddress", addressLocality: settings.city, addressCountry: "BR" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Faculdade Souza Lima & Berklee College of Music" },
      { "@type": "EducationalOrganization", name: "Escola de Música do Estado de São Paulo (EMESP)" },
    ],
    knowsAbout: ["Saxofone", "Jazz", "Big Band", "Música brasileira", "Improvisação"],
    areaServed,
    makesOffer: SERVICOS.map((name) => ({
      "@type": "Offer", itemOffered: { "@type": "Service", name, areaServed },
    })),
    sameAs: [settings.instagramUrl, settings.youtubeUrl, settings.spotifyUrl, settings.tiktokUrl, settings.linkedinUrl].filter(Boolean),
  };

  const videoLd = videosJsonLd(videos, site);

  return (
    <>
      <SiteHeader cartCount={count} loggedIn={!!customer} whatsapp={settings.whatsapp} email={settings.email} hasProducts={produtosAtivos > 0} hasShows={showsFuturos > 0} />
      <main id="conteudo">
        <Hero settings={settings} />

        <section aria-label="O que eu faço" className="section">
          <div className="wrap grid gap-y-7 sm:grid-cols-3 sm:gap-x-4 lg:gap-x-6">
            {CAMINHOS.map((c, i) => (
              <Reveal key={c.href} delay={(i % 3) * 70}>
                <Link href={c.href} className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-[2px] sm:aspect-[4/5]">
                    <Image src={c.foto} alt="" fill sizes="(max-width:640px) 100vw, 33vw"
                      className="foto-entra zoom-img object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0" style={{ objectPosition: c.pos }} />
                  </span>
                  <span className="legenda block border-b border-black/15 py-3 text-paper transition-colors group-hover:text-accent">
                    {c.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Preto e claro sempre alternados. O rodapé é preto, então termina em claro. */}
        <VideoSection items={videos} id="midia" title="Assista" verMais className="on-dark bg-night !border-0" />
        <Spotify url={settings.spotifyUrl} />
        <Credentials items={credentials} />
        <Agenda shows={shows} className="bg-raised" />

      </main>
      <SiteFooter settings={settings} mostrarConta={produtosAtivos > 0 || !!customer} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {videoLd.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }} />
      )}
    </>
  );
}
