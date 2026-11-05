import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Chrome } from "@/components/Chrome";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Loja",
  alternates: { canonical: "/loja" },
  description: "E-books, métodos e materiais de estudo de saxofone por Pedro Lucena.",
};

export default async function Loja() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });

  /* Loja sem produto não existe: some do menu (ver SiteHeader) e responde 404
     com saída, em vez de convidar ao clique só para pedir desculpas. As
     condições de pagamento saíram daqui — vivem na página do produto e nos
     termos, que é onde alguém prestes a pagar realmente lê. */
  if (!products.length) notFound();

  return (
    <Chrome>
      <div className="wrap section section-first">
        <h1 className="d-l text-paper">Loja</h1>

        <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </Chrome>
  );
}
