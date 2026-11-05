import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email("E-mail inválido");
export const nameSchema = z.string().trim().min(2, "Informe seu nome").max(120);
export const phoneSchema = z.string().trim().max(32).optional().default("");
export const passwordSchema = z.string().min(8, "A senha precisa de pelo menos 8 caracteres").max(200);

export const checkoutSchema = z.object({
  name: nameSchema, email: emailSchema,
  phone: z.string().trim().max(32).optional().default(""),
  cpf: z.string().trim().max(20).optional().default(""),
  terms: z.union([z.literal("on"), z.literal("true"), z.boolean()]),
});
