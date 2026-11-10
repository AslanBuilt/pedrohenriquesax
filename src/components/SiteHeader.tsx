"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HireButton } from "@/components/HireButton";
import { HireDialog } from "@/components/HireDialog";
import { ShoppingBagOpen, List, X, UserCircle } from "@phosphor-icons/react";

/**
 * Uma linha, sempre. 68px e branca, exceto sobre o herói da home: ali é
 * transparente e não repete o nome nem o botão, que o herói já mostra em grande.
 * Abaixo de 1024px vira gaveta em tela cheia; o botão de contratar e o carrinho
 * continuam visíveis na barra.
 *
 * Esse é o defeito visível do site do Braxton Cook (nav quebrando em duas
 * linhas a 1440px) e ele não se repete aqui.
 */
const LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: "/eventos", label: "Eventos" },
  { href: "/mentoria", label: "Mentoria" },
  { href: "/loja", label: "Loja" },
  { href: "/agenda", label: "Agenda" },
];

export function SiteHeader({ cartCount = 0, loggedIn = false, whatsapp = "", email = "", hasProducts = true, hasShows = true }: {
  cartCount?: number; loggedIn?: boolean; whatsapp?: string; email?: string; hasProducts?: boolean; hasShows?: boolean;
}) {
  /* Loja sem produto e agenda sem data não entram no menu: um link que só leva
     a um pedido de desculpas custa mais do que a ausência dele. */
  const links = LINKS.filter((l) =>
    (l.href !== "/loja" || hasProducts) && (l.href !== "/agenda" || hasShows));
  const pathname = usePathname();
  /* Sem produto não há o que comprar nem o que baixar: conta não serve para nada. */
  const mostrarConta = hasProducts || loggedIn;
  const [open, setOpen] = useState(false);
  const [sobreHeroi, setSobreHeroi] = useState(pathname === "/");

  useEffect(() => {
    const heroi = document.getElementById("heroi");
    if (!heroi) { setSobreHeroi(false); return; }
    const io = new IntersectionObserver(([e]) => setSobreHeroi(e.isIntersecting), { rootMargin: "-68px 0px 0px 0px" });
    io.observe(heroi);
    return () => io.disconnect();
  }, [pathname]);

  const transparente = sobreHeroi && !open;
  /* Um botão de contratar só, em todo o site. Em Mentoria ele já abre em aula. */
  const tipoDaPagina = pathname.startsWith("/mentoria") ? "aula" as const : undefined;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        transparente ? "on-dark border-transparent bg-transparent" : "border-black/10 bg-white"
      }`}>
        <div className="wrap flex h-[68px] items-center justify-between gap-4">
          <Link href="/" className={`d-m flex min-h-[44px] shrink-0 items-center whitespace-nowrap text-paper transition-opacity duration-300 ${transparente ? "invisible opacity-0" : "opacity-100"}`}>
            Pedro Lucena
          </Link>

          <div className="flex items-center gap-8">
          <nav aria-label="Principal" className="hidden lg:flex items-center gap-6">
            {links.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[0.9375rem] font-medium transition-colors ${transparente ? "text-white/85 hover:text-white" : active ? "text-accent" : "text-muted hover:text-paper"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <HireButton tipo={tipoDaPagina} className={`btn btn-primary mr-1 hidden transition-opacity duration-300 lg:inline-flex ${transparente ? "invisible opacity-0" : "opacity-100"}`} />
            {mostrarConta && <Link href="/conta" aria-label={loggedIn ? "Minha conta" : "Entrar"} title={loggedIn ? "Minha conta" : "Entrar"} className="btn btn-ghost hidden px-2 sm:inline-flex sm:px-3">
              <UserCircle size={22} weight="regular" aria-hidden />
            </Link>}
            {hasProducts && <Link href="/carrinho" aria-label={`Carrinho, ${cartCount} ${cartCount === 1 ? "item" : "itens"}`} title="Carrinho" className="btn btn-ghost relative px-2 sm:px-3 gap-1.5">
              <ShoppingBagOpen size={22} weight="regular" aria-hidden />
              {cartCount > 0 && (
                <span aria-live="polite" className={`absolute right-0 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[0.6875rem] font-semibold leading-none ${transparente ? "bg-white text-night" : "bg-paper text-white"}`}>
                  {cartCount}
                </span>
              )}
            </Link>}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"} title={open ? "Fechar" : "Menu"}
              className="btn btn-ghost lg:hidden px-2 sm:px-3"
            >
              {open ? <X size={22} aria-hidden /> : <List size={22} aria-hidden />}
            </button>
          </div>
          </div>
        </div>
      </header>

      {open && (
        <div id="menu-mobile" className="fixed inset-0 z-40 bg-ink pt-[68px] lg:hidden">
          <nav aria-label="Principal (celular)" className="wrap flex flex-col py-6">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="d-m text-paper hover:text-accent transition-colors border-b border-black/10 py-4"
                style={{ animation: `rise .5s cubic-bezier(.16,1,.3,1) ${i * 35}ms both` }}
              >
                {l.label}
              </Link>
            ))}
            {mostrarConta && (
            <Link
              href="/conta"
              onClick={() => setOpen(false)}
              className="d-m text-accent hover:text-paper transition-colors border-b border-black/10 py-4"
              style={{ animation: `rise .5s cubic-bezier(.16,1,.3,1) ${links.length * 35}ms both` }}
            >
              {loggedIn ? "Minha conta" : "Entrar"}
            </Link>
            )}
          </nav>
        </div>
      )}

      {/* Fora da compra: ali ele só atrapalharia quem já está pagando. */}
      {!/^\/(carrinho|checkout|pedido|conta|entrar|criar-conta)/.test(pathname) && (
        <div className="barra-contratar on-dark fixed inset-x-0 bottom-0 z-30 bg-night p-2.5 lg:hidden">
          <HireButton tipo={tipoDaPagina} className="btn btn-primary min-h-[56px] w-full !text-[1.375rem]" />
        </div>
      )}

      <HireDialog whatsapp={whatsapp} email={email} />
    </>
  );
}
