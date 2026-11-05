import Link from "next/link";
import {
  EnvelopeSimple, InstagramLogo, LinkedinLogo, SpotifyLogo, TiktokLogo, WhatsappLogo, YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { Settings } from "@/lib/settings";
import { Seal } from "@/components/Seal";

const SITE: [string, string][] = [
  ["/sobre", "Sobre"], ["/eventos", "Eventos"], ["/mentoria", "Mentoria"], ["/videos", "Vídeos"],
];
const CONTA: [string, string][] = [
  ["/conta", "Minha conta"], ["/privacidade", "Privacidade"], ["/termos", "Termos"],
];

const LINK = "inline-flex min-h-[40px] items-center text-white/85 transition-colors hover:text-brass";

/** "instagram.com/pedrolucenasax" vira "@pedrolucenasax". */
const arroba = (url: string) => `@${url.replace(/\/+$/, "").split("/").pop()?.replace(/^@/, "")}`;

/**
 * Toda página termina no preto, como a primeira começa. Sem botão de contratar:
 * o do cabeçalho está sempre à vista. Os contatos são uma lista só, com ícones de traço fino: todos no mesmo
 * peso, sem misturar glifo cheio com traço.
 */
export function SiteFooter({ settings: s, mostrarConta = false }: { settings: Settings; mostrarConta?: boolean }) {
  const wa = s.whatsapp.replace(/\D/g, "");
  const contatos = ([
    [WhatsappLogo, s.whatsapp, wa && `https://wa.me/${wa}?text=${encodeURIComponent("Olá, Pedro! Vim pelo site.")}`],
    [EnvelopeSimple, s.email, s.email && `mailto:${s.email}`],
    [InstagramLogo, s.instagramUrl && arroba(s.instagramUrl), s.instagramUrl],
    [TiktokLogo, s.tiktokUrl && arroba(s.tiktokUrl), s.tiktokUrl],
    [YoutubeLogo, s.youtubeUrl && "YouTube", s.youtubeUrl],
    [SpotifyLogo, s.spotifyUrl && "Spotify", s.spotifyUrl],
    [LinkedinLogo, s.linkedinUrl && "LinkedIn", s.linkedinUrl],
  ] as const).filter(([, texto, href]) => texto && href);

  return (
    <footer className="on-dark bg-night text-white">
      <div className="wrap py-14 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.6fr_0.8fr_0.8fr_auto]">
          <ul className="col-span-2 flex flex-col items-start lg:col-span-1">
            {contatos.map(([Icon, texto, href]) => (
              <li key={href}>
                <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className={`${LINK} gap-3`}>
                  <Icon size={21} weight="light" aria-hidden className="shrink-0 text-brass" />
                  <span className="break-all">{texto}</span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col items-start">
            {SITE.map(([href, label]) => <li key={href}><Link href={href} className={LINK}>{label}</Link></li>)}
          </ul>
          <ul className="flex flex-col items-start">
            {CONTA.filter(([href]) => href !== "/conta" || mostrarConta).map(([href, label]) => <li key={href}><Link href={href} className={LINK}>{label}</Link></li>)}
          </ul>

          <div className="relative hidden h-36 w-36 text-brass lg:block">
            <Seal className="h-full w-full" />
            <span className="d-s absolute inset-0 flex flex-col items-center justify-center text-center !leading-[1.1] text-white">
              {s.name.split(" ").map((w) => <span key={w} className="block">{w}</span>)}
            </span>
          </div>
        </div>

        <p className="mono mt-10 text-sm text-white/70">© {new Date().getFullYear()} {s.name}</p>
      </div>
    </footer>
  );
}
