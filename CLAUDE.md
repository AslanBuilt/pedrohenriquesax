# pedrolucenasax — contexto para o Claude Code

Site do saxofonista **Pedro Lucena** (Pedro Henrique da Silva Lucena), São Paulo.
Site público + loja de produto digital com Pix + conta de cliente + painel.

## No ar

https://pedrolucenasax.com (e www) — deploy automático a cada push para 
(webhook do GitHub → Coolify). O  roda  antes do
, então uma migração nova entra sozinha junto com o código.

Saiu de `renatodap.me/pedro-lucena` em 03/09/2026: o `basePath` acabou, as
variáveis `NEXT_BASE_PATH` e `NEXT_PUBLIC_BASE_PATH` foram removidas do Coolify
e `SITE_URL` virou `https://pedrolucenasax.com`. DNS na Cloudflare, registros A
para 168.119.159.112 **sem proxy** (nuvem cinza) — com a nuvem laranja o
desafio HTTP-01 não passa e o certificado nunca é emitido. Cuidado ao mudar de
domínio: o Coolify reaproveita a build em cache, e o `basePath` fica embutido
no bundle; foi preciso um deploy com `force=true` para o site responder na raiz.

Infra: app  no , banco  no Postgres
compartilhado, bucket MinIO  com usuário restrito ao próprio bucket.
Gerenciado pelo CLI em ../infra: `infra logs pedro-lucena`, `infra deploy`,
`infra db psql`.

## Comandos

```
npm run dev              # desenvolvimento
npm run build            # prisma generate + next build
npm run db:push          # aplica o schema
npm run db:seed          # dados reais do Pedro + admin
npm run verify [URL]     # 48 verificações end-to-end (padrão localhost:3100)
npm run audit:contrast [URL]   # WCAG AA em 13 rotas
node scripts/routes-audit.mjs [URL]  # h1, overflow e navegação em 390 e 1440px
```

Acesso local do painel: `pedro@pedrolucenasax.com` / `pedro2026` (trocar em produção).

## O que não pode ser quebrado

1. **Sessão do cliente e do admin são separadas.** `src/lib/customer/session.ts` (cookie
   `pl_customer`) nunca toca `src/lib/admin/session.ts` (cookie `pl_admin`). São dois
   sistemas independentes, como no bydap.

2. **Arquivo de produto nunca tem URL pública.** Fica em `.storage/private/`, servido só por
   `/conta/download/[token]`, que exige token assinado válido + pedido pago + dono logado.
   Três checagens, todas obrigatórias.

3. **O Pix é gerado no servidor**, sem API externa. `src/lib/pix.ts` monta o payload EMV a
   partir da chave que o Pedro cadastra no painel. O CRC16 é CCITT-FALSE — o vetor
   `crc16("123456789") === "29B1"` é o teste de sanidade.

4. **A confirmação de pagamento é manual e isso é intencional.** Chave Pix estática não
   notifica o site. Toda tela que fala de pagamento precisa dizer isso ao cliente.

5. **Primeira tela preta, resto claro, um acento só.** Raio 2px em tudo, menos botões (pílula). Tokens no topo de
   `src/app/globals.css`. Decidido na reunião de 05/11/2026; antes era branco com azul-bebê.

   O acento é o ouro do saxofone, em duas funções: `--color-brass` (`#D2AE5C`) sobre o preto e
   em faixas, `--color-accent` (`#7A5816`) só para texto sobre o claro. Botão primário é tinta
   sobre o claro e branco sobre o preto (`.on-dark`). Medir com `npm run audit:contrast`.

6. **A navegação é uma linha só**, e abaixo de `lg` vira gaveta. No celular o botão de contratar
   é a barra fixa no pé da tela, fora das rotas de compra.

7. **Nunca eyebrow.** Nada de rótulo pequeno acima de título, nem caixas em volta de texto. O
   título se sustenta sozinho; credibilidade vem de nomes, foto e som, não de frases.

8. **Pedidos de contratação não passam pelo servidor.** O botão Contratar abre um `<dialog>`
   (`HireDialog`, montado no `SiteHeader`) e `src/lib/whatsapp.ts` monta a mensagem que abre no
   WhatsApp do Pedro. `/contato` redireciona para `/#contratar`. `/admin/mensagens` guarda só os
   pedidos antigos. `npm test` cobre a montagem da mensagem.

9. **Um botão de contratar visível por vez.** No topo da home, o do herói; depois de rolar e nas
   outras páginas, o do cabeçalho; no celular, a barra fixa. Em `/mentoria` ele abre em aula.

10. **Sem produto ativo, a loja some inteira:** Loja, carrinho e os links de conta só aparecem com
    produto ou com cliente logado. O e-mail de pagamento confirmado nunca foi testado em produção:
    testar com a primeira compra real.

## Design

Referências do Pedro em 05/11/2026: ameliasaz.com (simplicidade, grade de fotos) e livesax.com.br
(movimento, faixas claras e escuras).

- Tipografia: **DM Serif Display** nos títulos, **Hanken Grotesk** no corpo. Sem letra cursiva:
  testada no nome e rejeitada em 05/11/2026. Bodoni também: difícil de ler sobre o preto.
- **Herói:** `hero-v3.jpg`, retrato de perto com o sax (DSC08365 do ensaio), com o fundo cinza original caindo para o preto em volta dele. Pedido do Pedro em 05/11/2026, que achou a capa anterior simples demais e mandou uma referência.
  No computador fica à direita, com o nome à esquerda (sobrenome em ouro itálico); no celular, em tela cheia. O cabeçalho esconde o nome sobre o herói, para não repetir. "Saxofonista em São Paulo" só para leitor de tela e busca.
- **Solo:** o disco no herói (`home/SoloDisc.tsx`) toca `public/audio/solo-bigband.m4a`, recortado de
  `public/video/solo-bigband.mp4`.
- **Seções:** fundos alternados entre preto e claro, nunca dois iguais em seguida, e nada de
  faixas baixas soltas. O rodapé é preto, então a última seção de cada página é clara.
- **Ficha técnica e apoios:** só na home, numa seção só, sem repetir em `/sobre`. Mostra os nomes;
  a observação e o período cadastrados no painel não aparecem.
- **Apoios** (`src/components/home/Apoios.tsx`): Tokai, Souza Lima e La Musica, em tinta única.
  Estão no código, não no painel.
- **Movimento:** scroll-driven em CSS (`animation-timeline`). Sem suporte, fica parado.

## Conteúdo

Bio, credenciais e dados vêm de `docs/requisitos/2026-09-01-requisitos-pedro-lucena.md`,
preenchido pelo próprio cliente. As 31 credenciais estão no `prisma/seed.mjs`.

<!-- deploy automático verificado em 03/09/2026 -->
