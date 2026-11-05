"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { readCartIds, writeCartIds } from "@/lib/cart";

/* ── Carrinho ── */
export async function addToCart(productId: string) {
  const ids = await readCartIds();
  if (!ids.includes(productId)) await writeCartIds([...ids, productId]);
  revalidatePath("/carrinho");
  redirect("/carrinho");
}

export async function removeFromCart(productId: string) {
  await writeCartIds((await readCartIds()).filter((i) => i !== productId));
  revalidatePath("/carrinho");
}
