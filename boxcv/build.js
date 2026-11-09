// Build da LP BoxCV /letreiro/ — gera index.html (bloco único para wp:html) e as imagens WebP em out/img.
// Uso: node build.js [--urls]   (--urls usa media-urls.json com as URLs já enviadas ao WordPress)
const fs = require('fs');
const path = require('path');
const sharp = require('c:/dev/node_modules/sharp');
const D = __dirname.replace(/\\/g, '/');
const SRC = 'c:/dev/ebg-build/boxnovas';
const OUT = `${D}/out`;
const PHONE = '5511944312877', PHONE_FMT = '(11) 94431-2877';
const URL_PAGE = 'https://boxcv.com.br/letreiro/';
const LOGO = 'https://boxcv.com.br/wp-content/uploads/2025/07/logo-box.webp';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Rua Lituânia 570, Vila Curuça, Santo André, SP');
const MSG = 'Olá! Sou da empresa ____ e quero letreiro / letra caixa.';
const wa = (t = MSG) => `https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(t)}`;

// [número da foto, nome do arquivo, largura, recorte opcional, alt]
const IMG = {
  hero: [17, 'letra-caixa-iluminada-led-recepcao', 1200, null, 'Letra caixa iluminada com LED azul sobre balcão de recepção'],
  c1: [14, 'letra-caixa-led-neon-sala-espera', 900, null, 'Letra caixa com LED azul em sala de espera corporativa'],
  c2: [20, 'letra-caixa-3d-relevo-clinica', 900, null, 'Letra caixa 3D em relevo na parede de uma clínica'],
  c3: [31, 'letra-espelhada-dourada-planos-de-saude', 900, null, 'Letras douradas espelhadas na parede de uma empresa'],
  c4: [27, 'letreiro-luminoso-amarelo-seguros', 900, null, 'Letreiro luminoso amarelo com logotipo em relevo'],
  c5: [7, 'logotipo-relevo-parede-escritorio', 900, null, 'Logotipo em relevo na parede de um escritório'],
  c6: [35, 'letreiro-acrilico-parede-podologia', 900, null, 'Letreiro em placa de acrílico sobre parede texturizada'],
  g1: [8, 'letra-caixa-3d-led-recepcao-madeira', 800, null, 'Letra caixa 3D com iluminação traseira sobre painel de madeira'],
  g2: [16, 'letreiro-led-grafico-sala-espera', 800, null, 'Letreiro em LED azul com gráfico na parede da recepção'],
  g3: [54, 'letreiro-halo-led-imobiliaria', 800, null, 'Letreiro com iluminação halo em parede de concreto'],
  g4: [28, 'letras-douradas-espelhadas-gk', 800, null, 'Letras douradas espelhadas em parede cinza'],
  g5: [11, 'logotipo-circular-led-dourado', 800, null, 'Logotipo circular dourado com LED na parede de uma loja'],
  g6: [34, 'logotipo-relevo-preto-grupo-ativa', 800, null, 'Logotipo preto em relevo sobre parede de concreto'],
  g7: [19, 'letra-caixa-3d-colorida-terapia', 800, null, 'Letra caixa 3D colorida na parede de uma clínica de terapia'],
  g8: [15, 'letreiro-cinza-recepcao-clinica', 800, null, 'Letreiro cinza na parede de madeira de uma clínica'],
  g9: [40, 'letras-douradas-nails-parede-listrada', 800, null, 'Letras douradas em parede listrada'],
  g10: [45, 'letreiro-dourado-iluminado-oficina', 800, null, 'Letreiro dourado iluminado sobre painel ripado'],
  g11: [50, 'logotipo-azul-relevo-concreto', 800, null, 'Logotipo azul em relevo sobre parede de concreto'],
  g12: [30, 'letreiro-oval-acrilico-valvoline', 800, null, 'Letreiro oval em acrílico com logotipo impresso'],
};

const FA = ['whatsapp', 'location-dot', 'clock', 'check', 'chevron-down', 'envelope'];
async function icons() {
  const f = `${D}/icons.json`;
  if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, 'utf8'));
  const o = {};
  for (const n of FA) {
    const kind = n === 'whatsapp' ? 'brands' : 'solid';
    const r = await fetch(`https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/svgs/${kind}/${n}.svg`);
    if (!r.ok) throw new Error('ícone ' + n + ' ' + r.status);
    const s = await r.text();
    o[n] = { vb: s.match(/viewBox="([^"]+)"/)[1], p: [...s.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map(m => m[1]) };
  }
  fs.writeFileSync(f, JSON.stringify(o));
  return o;
}

const FAQ = [
  ['A Box faz letreiro e letra caixa para empresas?', 'Sim. A Box Comunicação Visual produz letreiros e letras caixa para empresas, em vários formatos e acabamentos: iluminados com LED, em relevo 3D, em acrílico e em dourado espelhado. Fale pelo WhatsApp e conte o que a sua empresa precisa.'],
  ['Quais são as variações de letra caixa?', 'As mais pedidas são a letra caixa iluminada com LED, a letra 3D em relevo, as letras douradas espelhadas, o letreiro luminoso e o logotipo em relevo na parede da recepção.'],
  ['Como funciona o orçamento?', 'Chame no WhatsApp, diga o nome da empresa e envie o logotipo, o tamanho aproximado e uma foto do local. A equipe responde com a proposta pelo próprio WhatsApp.'],
  ['Preciso enviar o logotipo em algum formato específico?', 'O ideal é o logotipo em arquivo vetorial (CDR, AI ou PDF). Se você tiver só uma imagem, envie assim mesmo, que a equipe avalia como seguir.'],
  ['A Box atende empresas de quais regiões?', 'A Box fica em Santo André (SP), no ABC Paulista, e atende empresas de toda a região metropolitana de São Paulo.'],
  ['Qual o endereço e o horário da Box?', 'Rua Lituânia, 570, Vila Curuça, Santo André (SP). Atendimento de segunda a sexta, das 9h às 18h.'],
];
const CARDS = [
  ['c1', 'Letra caixa iluminada (LED)', 'Iluminação em LED que destaca a marca da empresa na recepção e na fachada, de dia e à noite.'],
  ['c2', 'Letra caixa 3D em relevo', 'Letras com profundidade, que dão presença ao nome da empresa na parede.'],
  ['c3', 'Letras douradas espelhadas', 'Acabamento dourado espelhado para marcas que pedem sofisticação.'],
  ['c4', 'Letreiro luminoso', 'Letreiro iluminado para chamar a atenção em lojas, cafés e pontos de venda.'],
  ['c5', 'Logotipo em relevo na parede', 'O logotipo da empresa em destaque na recepção, no escritório ou na clínica.'],
  ['c6', 'Letreiro em acrílico', 'Placa de acrílico com a marca, para paredes internas e áreas de atendimento.'],
];

(async () => {
  const useUrls = process.argv.includes('--urls');
  const urls = useUrls ? JSON.parse(fs.readFileSync(`${D}/media-urls.json`, 'utf8')) : {};
  if (!useUrls) {
    fs.mkdirSync(`${OUT}/img`, { recursive: true });
    for (const [k, [n, name, w, crop]] of Object.entries(IMG)) {
      const f = ['.jpeg', '.jpg', '.png'].map(e => `${SRC}/${String(n).padStart(2, '0')}${e}`).find(fs.existsSync);
      let p = sharp(f).rotate();
      if (crop) p = p.extract(crop);
      const r = await p.resize({ width: w, withoutEnlargement: true }).webp({ quality: 76 }).toBuffer({ resolveWithObject: true });
      fs.writeFileSync(`${OUT}/img/${name}.webp`, r.data);
      console.log(k, name, r.info.width + 'x' + r.info.height, Math.round(r.data.length / 1024) + 'KB');
    }
  }
  const ic = await icons();
  const svg = (n, cls = '') => `<svg class="bx-i ${cls}" viewBox="${ic[n].vb}" aria-hidden="true">${ic[n].p.map(d => `<path fill="currentColor" d="${d}"/>`).join('')}</svg>`;
  const src = k => useUrls ? urls[k] : `img/${IMG[k][1]}.webp`;
  const im = (k, extra = '') => `<img src="${src(k)}" alt="${IMG[k][4]}" width="${IMG[k][2]}" height="${Math.round(IMG[k][2] * 0.75)}" ${extra}>`;
  const btn = (loc, label, cls = '') => `<a class="bx-btn ${cls}" href="${wa()}" target="_blank" rel="noopener noreferrer" data-action="whatsapp" data-location="${loc}">${svg('whatsapp')}${label}</a>`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'LocalBusiness', '@id': 'https://boxcv.com.br/#empresa', name: 'Box Comunicação Visual', url: 'https://boxcv.com.br/', telephone: '+' + PHONE, email: 'comercial@boxcv.com.br', image: LOGO, logo: LOGO,
        address: { '@type': 'PostalAddress', streetAddress: 'Rua Lituânia, 570 - Vila Curuça', addressLocality: 'Santo André', addressRegion: 'SP', addressCountry: 'BR' },
        openingHours: 'Mo-Fr 09:00-18:00', hasMap: MAPS, sameAs: ['https://www.instagram.com/_boxcomunicacao/'],
        hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Letreiro e letra caixa', itemListElement: CARDS.map(c => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: c[1], description: c[2], provider: { '@id': 'https://boxcv.com.br/#empresa' } } })) } },
      { '@type': 'WebPage', '@id': URL_PAGE + '#pagina', url: URL_PAGE, name: 'Letreiro e Letra Caixa para Empresas | Box Comunicação Visual', inLanguage: 'pt-BR', about: { '@id': 'https://boxcv.com.br/#empresa' } },
      { '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
  const css = `
.bx{--p:#711DD5;--pd:#5a14ad;--o:#FE9611;--g:#25D366;--ink:#1c1c28;--mut:#5c5c70;--bg:#f5f5f5;font-family:Poppins,system-ui,sans-serif;color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased}
.bx *{box-sizing:border-box}.bx img{max-width:100%;height:auto;display:block}.bx a{text-decoration:none;color:inherit}
.bx-i{width:1em;height:1em;display:inline-block;vertical-align:-.125em;flex:0 0 auto}
.bx-w{max-width:1120px;margin:0 auto;padding:0 20px}
.bx-hd{position:sticky;top:0;z-index:50;background:#2b0a63;border-bottom:3px solid var(--o);box-shadow:0 2px 10px rgba(0,0,0,.06)}
.bx-hd .bx-w{display:flex;align-items:center;justify-content:space-between;height:68px;gap:12px}
.bx-hd img{height:38px;width:auto}
.bx-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--g);color:#fff!important;font-weight:600;font-size:1rem;padding:15px 28px;border-radius:12px;box-shadow:0 8px 22px rgba(37,211,102,.35);transition:transform .15s,background .15s;border:0;cursor:pointer}
.bx-btn:hover{background:#1ebe5a;transform:translateY(-2px)}.bx-btn .bx-i{font-size:1.3em}
.bx-btn.sm{padding:10px 18px;font-size:.9rem;border-radius:999px;box-shadow:none}
.bx-hero{background:linear-gradient(135deg,var(--p) 0%,#4a0fa0 100%);color:#fff;padding:56px 0 72px;position:relative;overflow:hidden}
.bx-hero:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:46px;background:#fff;border-radius:50% 50% 0 0/100% 100% 0 0}
.bx-hero .bx-w{display:grid;gap:36px;align-items:center}
.bx-kick{color:var(--o);font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-size:.8rem;margin:0 0 12px}
.bx-hero h1{font-size:clamp(2rem,6.2vw,3.2rem);line-height:1.12;margin:0 0 18px;text-transform:uppercase;font-weight:800}
.bx-hero h1 span{color:var(--o)}
.bx-hero p.sub{font-size:1.08rem;opacity:.95;margin:0 0 14px;max-width:34em}
.bx-for{font-size:.92rem;opacity:.85;margin:0 0 26px}
.bx-hero figure{margin:0;border-radius:22px;overflow:hidden;box-shadow:0 22px 50px rgba(0,0,0,.35);border:4px solid rgba(255,255,255,.18)}
.bx-hero figure img{width:100%;aspect-ratio:4/3;object-fit:cover}
.bx-ans{padding:46px 0 10px;text-align:center}.bx-ans p{max-width:46em;margin:0 auto;font-size:1.12rem;color:var(--ink)}
.bx-sec{padding:64px 0}.bx-alt{background:var(--bg)}
.bx-h2{font-size:clamp(1.55rem,4.4vw,2.2rem);text-transform:uppercase;font-weight:800;line-height:1.18;margin:0 0 12px}
.bx-h2 span{color:var(--p)}.bx-lead{color:var(--mut);max-width:42em;margin:0 0 34px}
.bx-ctr{text-align:center}.bx-ctr .bx-lead{margin-left:auto;margin-right:auto}
.bx-grid{display:grid;gap:22px}
.bx-card{background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 26px rgba(40,10,90,.1);display:flex;flex-direction:column;border-bottom:4px solid var(--o)}
.bx-card img{width:100%;aspect-ratio:4/3;object-fit:cover}
.bx-card div{padding:20px 22px 24px;display:flex;flex-direction:column;gap:8px;flex:1}
.bx-card h3{margin:0;font-size:1.12rem;color:var(--p);font-weight:700}.bx-card p{margin:0;color:var(--mut);font-size:.95rem}
.bx-card .bx-btn{margin-top:auto;align-self:flex-start;padding:11px 20px;font-size:.9rem}
.bx-gal{display:grid;gap:10px;grid-template-columns:repeat(2,1fr)}
.bx-gal button{padding:0;border:0;background:#ddd;border-radius:14px;overflow:hidden;cursor:zoom-in;display:block}
.bx-gal img{width:100%;aspect-ratio:1/1;object-fit:cover;transition:transform .3s}.bx-gal button:hover img{transform:scale(1.05)}
.bx-why{display:grid;gap:14px;grid-template-columns:1fr}
.bx-why div{background:#fff;border-radius:14px;padding:18px 20px;box-shadow:0 4px 16px rgba(0,0,0,.07);display:flex;gap:12px;align-items:flex-start}
.bx-why .bx-i{color:var(--o);font-size:1.2rem;margin-top:5px}.bx-why b{display:block;color:var(--p)}.bx-why span{color:var(--mut);font-size:.93rem}
.bx-stats{background:var(--p);color:#fff;padding:44px 0;text-align:center}.bx-stats .bx-w{display:grid;gap:18px}
.bx-stats strong{display:block;font-size:2.4rem;color:var(--o);font-weight:800}.bx-stats span{font-size:.95rem;opacity:.92}
.bx-steps{display:grid;gap:16px}.bx-steps div{background:#fff;border-radius:16px;padding:24px;box-shadow:0 6px 20px rgba(0,0,0,.08)}
.bx-steps em{font-style:normal;font-weight:800;font-size:2.4rem;color:var(--o);line-height:1}.bx-steps h3{margin:6px 0;color:var(--p);font-size:1.1rem}.bx-steps p{margin:0;color:var(--mut);font-size:.95rem}
.bx-faq details{background:#fff;border:1px solid #e3e0ee;border-radius:14px;margin-bottom:10px}
.bx-faq summary{list-style:none;cursor:pointer;padding:18px 20px;display:flex;justify-content:space-between;gap:12px;align-items:center}
.bx-faq summary::-webkit-details-marker{display:none}.bx-faq summary h3{margin:0;font-size:1rem;font-weight:600}
.bx-faq details[open] .bx-i{transform:rotate(180deg)}.bx-faq .bx-i{color:var(--p);transition:transform .2s}
.bx-faq details p{margin:0;padding:0 20px 18px;color:var(--mut);font-size:.96rem}
.bx-end{background:var(--p);color:#fff;text-align:center;padding:64px 0}.bx-end h2{margin:0 0 10px;font-size:clamp(1.6rem,5vw,2.3rem);text-transform:uppercase;font-weight:800}
.bx-end p{margin:0 0 26px;opacity:.95}
.bx-ft{background:#222;color:#cfcfda;padding:44px 0;text-align:center;font-size:.92rem}.bx-ft img{height:46px;width:auto;margin:0 auto 14px}
.bx-ft p{margin:4px 0}.bx-ft a{color:var(--o)}
.bx-fl{position:fixed;right:16px;bottom:16px;z-index:60;width:58px;height:58px;border-radius:50%;background:var(--g);color:#fff!important;display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 8px 24px rgba(0,0,0,.35)}
#bx-lb{display:none;position:fixed;inset:0;z-index:99;background:rgba(0,0,0,.9);align-items:center;justify-content:center;padding:16px}#bx-lb.on{display:flex}
#bx-lb img{max-height:90vh;max-width:92vw;border-radius:12px;object-fit:contain}#bx-lb b{position:absolute;top:10px;right:18px;color:#fff;font-size:44px;cursor:pointer;line-height:1}
@media(min-width:760px){.bx-hero .bx-w{grid-template-columns:1.05fr .95fr}.bx-grid.c3{grid-template-columns:repeat(3,1fr)}.bx-gal{grid-template-columns:repeat(4,1fr)}.bx-why{grid-template-columns:repeat(2,1fr)}.bx-stats .bx-w{grid-template-columns:repeat(3,1fr)}.bx-steps{grid-template-columns:repeat(3,1fr)}.bx-hd img{height:44px}.bx-hero{padding:76px 0 96px}}
@media(max-width:420px){.bx-hd .bx-btn.sm span{display:none}}
`;
  const html = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-57NKMW7T" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><style>${css}</style>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<div class="bx" id="bx-topo">
<header class="bx-hd"><div class="bx-w"><a href="#bx-topo" aria-label="Box Comunicação Visual"><img src="${LOGO}" alt="Box Comunicação Visual" width="200" height="60"></a>${btn('header', '<span>Orçamento</span>', 'sm')}</div></header>
<main>
<section class="bx-hero"><div class="bx-w"><div>
<p class="bx-kick">Comunicação visual profissional</p>
<h1>Letreiro e letra caixa para a sua <span>empresa</span></h1>
<p class="sub">Letra caixa iluminada, em relevo 3D, dourada espelhada e letreiros luminosos, feitos sob medida pela Box em Santo André (SP).</p>
<p class="bx-for">Atendemos clínicas, escritórios, lojas, indústrias e franquias.</p>
${btn('hero', 'Pedir orçamento pelo WhatsApp')}
</div><figure>${im('hero', 'fetchpriority="high" decoding="async"')}</figure></div></section>
<section class="bx-ans"><div class="bx-w"><p>A Box Comunicação Visual é uma empresa de comunicação visual de Santo André (SP) especializada em letreiro e letra caixa para empresas, com letras iluminadas, em relevo, douradas e letreiros luminosos feitos sob medida.</p></div></section>
<section class="bx-sec" id="variacoes"><div class="bx-w">
<div class="bx-ctr"><h2 class="bx-h2">Variações de <span>letra caixa e letreiro</span></h2><p class="bx-lead">Escolha o estilo que combina com a marca da sua empresa. Cada trabalho é feito sob medida.</p></div>
<div class="bx-grid c3">${CARDS.map(([k, t, d]) => `<article class="bx-card">${im(k, 'loading="lazy" decoding="async"')}<div><h3>${t}</h3><p>${d}</p>${btn('card-' + k, 'Pedir orçamento')}</div></article>`).join('')}</div>
</div></section>
<section class="bx-sec bx-alt" id="trabalhos"><div class="bx-w">
<div class="bx-ctr"><h2 class="bx-h2">Trabalhos <span>entregues</span></h2><p class="bx-lead">Letreiros e letras caixa feitos pela Box para empresas. Toque na foto para ampliar.</p></div>
<div class="bx-gal">${['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10', 'g11', 'g12'].map(k => `<button type="button" data-lb="${src(k)}" aria-label="Ampliar: ${IMG[k][4]}">${im(k, 'loading="lazy" decoding="async"')}</button>`).join('')}</div>
</div></section>
<section class="bx-stats"><div class="bx-w"><div><strong>+430</strong><span>empresas atendidas</span></div><div><strong>+15 anos</strong><span>de experiência em instalação</span></div><div><strong>100%</strong><span>de garantia na mão de obra</span></div></div></section>
<section class="bx-sec" id="diferenciais"><div class="bx-w">
<h2 class="bx-h2">Por que a <span>Box</span> cuida da sua comunicação visual</h2><p class="bx-lead">Atendimento personalizado do primeiro contato até o pós-venda.</p>
<div class="bx-why">${[['Equipe experiente', 'Profissionais que sabem o que fazem, com mais de 15 anos de experiência em instalação.'], ['Agilidade com qualidade', 'Entregamos com rapidez, sem abrir mão da excelência.'], ['Atendimento personalizado', 'Cada cliente é único e atendido com atenção verdadeira.'], ['Materiais premium', 'Qualidade desde o material até o acabamento especializado.'], ['Maquinário de alta qualidade', 'Equipamentos modernos para resultados perfeitos em cada trabalho.'], ['Pós-venda presente', 'Seguimos junto com a sua empresa depois da entrega.']].map(([t, d]) => `<div>${svg('check')}<p style="margin:0"><b>${t}</b><span>${d}</span></p></div>`).join('')}</div>
</div></section>
<section class="bx-sec bx-alt" id="como-pedir"><div class="bx-w"><h2 class="bx-h2 bx-ctr">Como pedir o <span>orçamento</span></h2>
<div class="bx-steps" style="margin-top:28px"><div><em>01</em><h3>Chame no WhatsApp</h3><p>Toque no botão: a mensagem já vai pronta. É só completar o nome da sua empresa.</p></div><div><em>02</em><h3>Conte o que a empresa precisa</h3><p>Envie o logotipo, o tamanho aproximado e uma foto do local.</p></div><div><em>03</em><h3>Receba a proposta</h3><p>A equipe da Box envia a proposta pelo WhatsApp para você avaliar.</p></div></div>
<p class="bx-ctr" style="margin-top:30px">${btn('passos', 'Pedir orçamento pelo WhatsApp')}</p></div></section>
<section class="bx-sec bx-faq" id="perguntas"><div class="bx-w" style="max-width:820px"><h2 class="bx-h2 bx-ctr">Perguntas sobre <span>letreiro e letra caixa</span></h2><div style="margin-top:26px">${FAQ.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary><h3>${q}</h3>${svg('chevron-down')}</summary><p>${a}</p></details>`).join('')}</div></div></section>
<section class="bx-end"><div class="bx-w"><h2>Seu letreiro e sua letra caixa, sob medida.</h2><p>Chame a Box no WhatsApp e peça o orçamento para a sua empresa.</p>${btn('final', 'Pedir orçamento pelo WhatsApp')}</div></section>
</main>
<footer class="bx-ft"><div class="bx-w"><img src="${LOGO}" alt="Box Comunicação Visual" width="200" height="60" loading="lazy"><p><b>Box Comunicação Visual</b></p><p>${svg('location-dot')} Rua Lituânia, 570 — Vila Curuça — Santo André/SP · <a href="${MAPS}" target="_blank" rel="noopener noreferrer">Ver no Google Maps</a></p><p>${svg('clock')} Segunda a sexta, das 9h às 18h</p><p>${svg('whatsapp')} <a href="${wa()}" target="_blank" rel="noopener noreferrer" data-action="whatsapp" data-location="rodape">${PHONE_FMT}</a> · ${svg('envelope')} comercial@boxcv.com.br</p><p style="opacity:.6;margin-top:14px">© 2026 Box Comunicação Visual</p></div></footer>
<a class="bx-fl" href="${wa()}" target="_blank" rel="noopener noreferrer" data-action="whatsapp" data-location="flutuante" aria-label="Pedir orçamento pelo WhatsApp">${svg('whatsapp')}</a>
<div id="bx-lb" role="dialog" aria-label="Foto ampliada"><b aria-label="Fechar">&times;</b><img alt="" src=""></div>
</div>
<script>
(function(){
document.addEventListener('click',function(e){
 var a=e.target.closest&&e.target.closest('[data-action="whatsapp"]');
 if(a){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'whatsapp_click',location:a.getAttribute('data-location')||'unknown'});}
 var lb=document.getElementById('bx-lb');var t=e.target.closest&&e.target.closest('[data-lb]');
 if(t){var im=lb.querySelector('img');im.src=t.getAttribute('data-lb');lb.classList.add('on');return;}
 if(e.target===lb||(e.target.tagName==='B'&&lb.contains(e.target)))lb.classList.remove('on');
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')document.getElementById('bx-lb').classList.remove('on');});
})();
</script>`;
  const GTM = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-57NKMW7T');</script>`;
  const head = GTM + `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">`;
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(`${OUT}/${useUrls ? 'page' : 'preview'}.html`, `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Letreiro e Letra Caixa para Empresas | Box Comunicação Visual</title>${head}</head><body style="margin:0">${html}</body></html>`);
  fs.writeFileSync(`${OUT}/fragment.html`, head + html);
  console.log('ok', Math.round(html.length / 1024) + 'KB');
})().catch(e => { console.error('ERRO', e.stack || e.message); process.exit(1); });
