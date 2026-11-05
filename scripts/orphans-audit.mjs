// Procura parágrafos cuja última linha ficou curta demais, em várias larguras.
import { chromium } from 'playwright';
const B = process.argv[2] || 'http://localhost:3100';
const ROTAS = ['/', '/sobre', '/eventos', '/mentoria', '/videos', '/loja'];
const b = await chromium.launch();
const achados = new Map();
for (const w of [1920, 1440, 1366, 1024, 768, 430, 390, 320]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  for (const r of ROTAS) {
    await p.goto(B + r, { waitUntil: 'networkidle' });
    await p.waitForTimeout(150);
    const lista = await p.evaluate(() => {
      const out = [];
      for (const e of document.querySelectorAll('main p, main li, main dd, main dt, main h1, main h2, main h3, footer p, figcaption')) {
        if (!e.offsetParent || e.querySelector('p, li, ul, a.btn, img, .sr-only')) continue;
        const range = document.createRange(); range.selectNodeContents(e);
        const linhas = new Map();
        for (const c of range.getClientRects()) {
          if (!c.width) continue;
          const k = Math.round(c.bottom / 6);
          const l = linhas.get(k) || { a: c.left, z: c.right };
          l.a = Math.min(l.a, c.left); l.z = Math.max(l.z, c.right); linhas.set(k, l);
        }
        const ws = [...linhas.values()].map((l) => l.z - l.a);
        if (ws.length < 2) continue;
        const razao = ws[ws.length - 1] / Math.max(...ws);
        if (razao < 0.3) out.push({ t: e.textContent.trim().slice(0, 60), razao: +razao.toFixed(2), linhas: ws.length });
      }
      return out;
    });
    for (const x of lista) achados.set(`${r} ${w}px ${x.t}`, x);
  }
  await p.close();
}
await b.close();
for (const [k, x] of achados) console.log(`${x.razao} (${x.linhas} linhas) ${k}`);
console.log(achados.size ? `\n✗ ${achados.size} última(s) linha(s) curta(s)` : '✓ nenhuma última linha curta');
process.exit(achados.size ? 1 : 0);
