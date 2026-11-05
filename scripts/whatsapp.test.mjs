import test from "node:test";
import assert from "node:assert/strict";
import { hireMessage, whatsappUrl } from "../src/lib/whatsapp.ts";

test("mensagem de casamento leva só o que foi preenchido, na ordem", () => {
  const m = hireMessage("casamento", " Mariana ", "Festa ao ar livre", { city: "Campinas", date: " ", junk: "x" });
  assert.equal(m, "Olá, Pedro! Vim pelo site.\n\nAssunto: Casamento\nNome: Mariana\nCidade: Campinas\n\nFesta ao ar livre");
});

test("detalhes de outro assunto não vazam para a mensagem", () => {
  const m = hireMessage("aula", "João", "", { city: "Campinas", level: "2 anos" });
  assert.ok(m.includes("Assunto: Aula de saxofone"));
  assert.ok(m.includes("Há quanto tempo toca: 2 anos"));
  assert.ok(!m.includes("Campinas"));
  assert.ok(m.endsWith("2 anos"), "sem linha em branco sobrando quando não há texto");
});

test("o link usa só os dígitos e codifica acento e quebra de linha", () => {
  assert.equal(whatsappUrl("+55 11 96121-6535", "Olá\nsim"), "https://wa.me/5511961216535?text=Ol%C3%A1%0Asim");
});
