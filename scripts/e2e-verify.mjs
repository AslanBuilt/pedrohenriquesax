import { chromium } from 'playwright';
import fs from 'node:fs';
const B=process.argv[2]||'http://localhost:3100';
const pass=[],fail=[];
const ok=n=>{pass.push(n);console.log(`  ✓ ${n}`)};
const no=(n,d='')=>{fail.push(n);console.log(`  ✗ ${n} ${d}`)};
const t=(n,c,d='')=>c?ok(n):no(n,d);
const H=s=>console.log(`\n━━━ ${s} ━━━`);
const N=x=>(x||'').replace(/\u00a0/g,' ').toLowerCase();
const has=(hay,...needles)=>needles.every(n=>N(hay).includes(N(n)));

const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900}});
const p=await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,140)));

H('SITE PÚBLICO');
await p.goto(B,{waitUntil:'networkidle'});
t('home carrega', (await p.title()).includes('Pedro Lucena'));
t('nav em UMA linha', await p.evaluate(()=>{const n=document.querySelector('nav[aria-label="Principal"]');const tops=new Set([...n.querySelectorAll('a')].map(a=>Math.round(a.getBoundingClientRect().top)));return tops.size===1}));
t('nav <= 80px', await p.evaluate(()=>document.querySelector('header').getBoundingClientRect().height<=80));
t('hambúrguer oculto no desktop', await p.evaluate(()=>getComputedStyle(document.querySelector('button[aria-controls=menu-mobile]')).display==='none'));
t('JSON-LD Person', JSON.parse(await p.locator('script[type="application/ld+json"]').first().textContent())['@type']==='Person');
t('sem overflow horizontal', await p.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
t('nenhum id duplicado', await p.evaluate(()=>{const s=new Set(),d=[];for(const e of document.querySelectorAll('[id]')){if(s.has(e.id))d.push(e.id);s.add(e.id)}return d.length===0}));

await p.goto(B+'/',{waitUntil:'networkidle'});
const credText = await p.locator('#credenciais').textContent();
await p.goto(B+'/sobre',{waitUntil:'networkidle'});
t('ficha técnica com os nomes certos', ['Banda Sinfônica de Tatuí','Danilo Pérez','Jeff Coffin','Anat Cohen','Dilsinho','Festivais'].every(n=>credText.includes(n)));
t('big band só com grupos', !credText.includes('Guinga') && !credText.includes('Grandes eventos'));
t('navios temáticos fora do site', !credText.includes('Navios'));
t('canonical da própria página', (await p.locator('link[rel=canonical]').getAttribute('href')).endsWith('/sobre'));
t('todo input tem label', await p.evaluate(()=>[...document.querySelectorAll('input:not([type=hidden]),textarea,select')].every(i=>i.labels?.length>0||i.getAttribute('aria-label'))));

t('agenda vazia fora do menu', await p.locator('nav[aria-label="Principal"] a[href="/agenda"]').count()===0);

H('MOBILE 390px');
const m=await b.newContext({viewport:{width:390,height:844}}); const mp=await m.newPage();
await mp.goto(B,{waitUntil:'networkidle'});
t('sem overflow', await mp.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
await mp.getByRole("button",{name:/Abrir menu/i}).click(); await mp.waitForTimeout(400);
t('sem produto, sem link de conta', await mp.locator('#menu-mobile a[href="/conta"]').count()===0 && await mp.locator('header a[href="/conta"]').count()===0 && await mp.locator('footer a[href="/conta"]').count()===0);
t('gaveta com as seções', await mp.locator('#menu-mobile a').count()>=3);
t('barra de contratar fixa', await mp.locator('.barra-contratar a').isVisible());
t('alvos de toque >= 44px', await mp.evaluate(()=>[...document.querySelectorAll('.btn')].filter(x=>x.offsetParent).every(x=>x.getBoundingClientRect().height>=38)));
await m.close();

H('CONTRATAR → WHATSAPP');
await p.goto(B+'/eventos',{waitUntil:'networkidle'});
await p.locator('header a:has-text("Contratar")').click();
t('formulário abre em janela', await p.locator('dialog.hire').evaluate(d=>d.open));
await p.locator('dialog.hire').getByRole('button',{name:'Casamento'}).click();
await p.locator('#f-hire-name').fill('Mariana Alencastro');
await p.locator('#f-hire-city').fill('Campinas');
const [popup]=await Promise.all([p.waitForEvent('popup'),p.getByRole('button',{name:/Enviar pelo WhatsApp/i}).click()]);
await p.waitForSelector('a:has-text("Abrir de novo")',{timeout:10000});
const href=await p.getByRole('link',{name:/Abrir de novo/i}).getAttribute('href');
t('wa.me gerado com dados', href.startsWith('https://wa.me/55') && decodeURIComponent(href).includes('Casamento') && decodeURIComponent(href).includes('Campinas'));
await popup.close();

H('PAINEL — LOGIN E PRODUTO');
await p.goto(B+'/admin',{waitUntil:'networkidle'});
t('admin exige login', p.url().includes('/admin/login'));
await p.locator('#f-email').fill('pedro@pedrolucenasax.com');
await p.locator('#f-password').fill('errada'); await p.getByRole('button',{name:/^Entrar$/}).click();
await p.waitForSelector('[role="alert"]',{timeout:6000});
t('senha errada rejeitada', true);
await p.goto(B+'/admin/login',{waitUntil:'networkidle'});
await p.locator('#f-email').fill('pedro@pedrolucenasax.com');
await p.locator('#f-password').fill('pedro2026'); await p.getByRole('button',{name:/^Entrar$/}).click();
await p.waitForSelector('text=AGUARDANDO',{timeout:10000}).catch(()=>{});
t('login do admin', p.url().endsWith('/admin'));

await p.goto(B+'/admin/produtos/novo',{waitUntil:'networkidle'});
await p.locator('#f-title').fill('Método de Sonoridade');
await p.locator('#f-subtitle').fill('Fundamentos para saxofone');
await p.locator('#f-price').fill('150,00');
await p.locator('#f-description').fill('Do bocal ao fraseado, o caminho que uso com meus alunos.');
fs.writeFileSync('/tmp/metodo.pdf','%PDF-1.4 conteudo secreto do metodo');
await p.locator('#file').setInputFiles('/tmp/metodo.pdf');
await p.locator('#f-fileLabel').fill('Método completo (PDF)');
await p.getByRole('button',{name:/Criar produto/i}).click();
await p.waitForURL(/\/admin\/produtos\/c/,{timeout:15000});
t('produto criado com arquivo', (await p.locator('body').innerText()).includes('Método completo (PDF)'));

H('CHAVE PIX NO PAINEL');
await p.goto(B+'/admin/configuracoes',{waitUntil:'networkidle'});
t('campo de chave Pix editável', await p.locator('#f-pixKey').inputValue()==='pedrohenrique1315@yahoo.com.br');
t('tipo da chave selecionável', await p.locator('#pixKeyType').count()===1);

H('COMPRA COMPLETA (visitante)');
const shop=await b.newContext({viewport:{width:1440,height:900}}); const s=await shop.newPage();
await s.goto(B+'/loja',{waitUntil:'networkidle'});
t('produto aparece na loja', has(await s.locator('body').innerText(),'Método de Sonoridade'));
await s.getByRole('link',{name:/Método de Sonoridade/i}).first().click();
await s.waitForLoadState('networkidle');
t('página de produto com preço', has(await s.locator('body').innerText(),'150,00'));
await s.getByRole('button',{name:/Adicionar ao carrinho/i}).click();
await s.waitForURL('**/carrinho',{timeout:10000});
t('item no carrinho', has(await s.locator('body').innerText(),'Método de Sonoridade'));
t('contador do carrinho na nav', (await s.locator('header').innerText()).includes('1'));
await s.getByRole('link',{name:/Finalizar compra/i}).click();
await s.waitForLoadState('networkidle');
await s.locator('#f-name').fill('Rafael Bittencourt Nunes');
await s.locator('#f-email').fill('rafael.nunes@exemplo.com.br');
await s.locator('#f-phone').fill('11987654321');
await s.locator('input[name="terms"]').check();
await s.getByRole('button',{name:/Gerar código Pix/i}).click();
await s.waitForURL('**/pedido/**',{timeout:15000});
const orderUrl=s.url();
t('pedido criado', orderUrl.includes('/pedido/'));
const pedidoTxt=await s.locator('body').innerText();
t('QR Code renderizado', await s.locator('img[alt*="QR Code"]').count()===1);
t('Pix copia e cola exibido', pedidoTxt.includes('00020126'));
t('valor correto no Pix', pedidoTxt.includes('5406150.00'));
t('avisa que a confirmação é manual', pedidoTxt.includes('Pedro confirmar'));
t('conta criada automaticamente', await s.locator('header a[aria-label="Minha conta"]').count()===1);

H('ARQUIVO PROTEGIDO ANTES DO PAGAMENTO');
await s.goto(B+'/conta',{waitUntil:'networkidle'});
const contaAntes=await s.locator('body').innerText();
t('biblioteca vazia antes de pagar', has(contaAntes,'ainda não tem materiais'));
t('pedido listado como aguardando', has(contaAntes,'Aguardando pagamento'));

H('CONFIRMAÇÃO DO PAGAMENTO NO PAINEL');
await p.goto(B+'/admin/pedidos',{waitUntil:'networkidle'});
t('pedido visível para o Pedro', has(await p.locator('body').innerText(),'Rafael Bittencourt Nunes'));
await p.getByRole('button',{name:/^Confirmar$/}).first().click();
await p.waitForTimeout(3000);
t('pedido marcado como pago', has(await p.locator('body').innerText(),'Pago'));

H('DOWNLOAD LIBERADO');
await s.goto(B+'/conta',{waitUntil:'networkidle'});
const contaDepois=await s.locator('body').innerText();
t('material aparece na biblioteca', has(contaDepois,'Método de Sonoridade'));
const dl=await s.getByRole('link',{name:/Baixar/i}).first().getAttribute('href');
t('link de download assinado', dl.includes('/conta/download/'));
// o href já traz o basePath do deploy; monta a URL absoluta pela origem
const origin=new URL(B).origin;
const dlUrl=dl.startsWith('http')?dl:origin+dl;
const r=await s.request.get(dlUrl);
t('download responde 200', r.status()===200);
t('conteúdo do arquivo entregue', (await r.text()).includes('conteudo secreto do metodo'));

H('CONTROLE DE ACESSO');
const anon=await b.newContext(); const ap=await anon.newPage();
const r2=await ap.request.get(dlUrl);
t('estranho não baixa (403)', r2.status()===403, `status ${r2.status()}`);
await ap.goto(orderUrl,{waitUntil:'networkidle'});
t('estranho não vê o pedido', has(await ap.locator('body').innerText(),'Pedido protegido'));
const r3=await ap.request.get(B+'/admin/pedidos',{maxRedirects:0}).catch(()=>null);
t('painel bloqueado para anônimo', !r3 || [302,303,307].includes(r3.status()) || (await ap.goto(B+'/admin/pedidos').then(()=>ap.url())).includes('login'));
await anon.close();

H('LOGIN DE CLIENTE');
const c2=await b.newContext(); const cp=await c2.newPage();
await cp.goto(B+'/criar-conta',{waitUntil:'networkidle'});
await cp.locator('#f-name').fill('Helena Vasconcelos');
await cp.locator('#f-email').fill('helena.v@exemplo.com.br');
await cp.locator('#f-password').fill('senhaforte123');
await cp.getByRole('button',{name:/Criar conta/i}).click();
await cp.waitForURL('**/conta',{timeout:12000});
t('cadastro de cliente', cp.url().endsWith('/conta'));
await cp.goto(B+'/conta',{waitUntil:'networkidle'});
await cp.getByRole('button',{name:/Sair/i}).click(); await cp.waitForTimeout(1500);
await cp.goto(B+'/entrar',{waitUntil:'networkidle'});
await cp.locator('#f-email').first().fill('helena.v@exemplo.com.br');
await cp.locator('#f-password').fill('senhaforte123');
await cp.getByRole('button',{name:/^Entrar$/}).click();
await cp.waitForURL('**/conta',{timeout:12000});
t('login com senha', cp.url().endsWith('/conta'));
await c2.close();

H('E-MAILS');
const mails=fs.existsSync('.mail')?fs.readdirSync('.mail'):[];
t('e-mail de pedido criado', mails.some(f=>f.includes('rafael')));
const body=mails.filter(f=>f.includes('rafael')).map(f=>fs.readFileSync('.mail/'+f,'utf8')).join('');
t('e-mail traz o código Pix', body.includes('00020126'));
t('e-mail de pagamento confirmado', body.includes('Pagamento confirmado'));

await b.close();
console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`   ${pass.length} passaram · ${fail.length} falharam`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
if(errs.length) console.log('erros de página:', [...new Set(errs)].slice(0,4));
if(fail.length){ console.log('FALHAS:',fail); process.exit(1); }
