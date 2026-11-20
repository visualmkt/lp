// Gera index.html a partir de src.html: ícones SVG (FontAwesome real), modelos, avaliações e FAQ.
// Uso: node c:/lp/persipro/build.js
const fs = require('fs');
const D = __dirname.replace(/\\/g, '/');
const FA = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/svgs/';
const ICONS = {
  whatsapp: 'brands/whatsapp', google: 'brands/google', phone: 'solid/phone', 'arrow-down': 'solid/arrow-down',
  'arrow-left': 'solid/arrow-left', 'arrow-right': 'solid/arrow-right', star: 'solid/star', shield: 'solid/shield-halved',
  users: 'solid/users', bolt: 'solid/bolt', 'user-check': 'solid/user-check', camera: 'solid/camera', wand: 'solid/wand-magic-sparkles',
  'eye-slash': 'solid/eye-slash', moon: 'solid/moon', temp: 'solid/temperature-half', house: 'solid/house', mobile: 'solid/mobile-screen-button',
  wrench: 'solid/screwdriver-wrench', headset: 'solid/headset', pin: 'solid/location-dot', chevron: 'solid/chevron-down',
};
const MODELS = [
  { id: 'blackout', nome: 'Persiana Blackout', desc: 'Bloqueia a luz por completo. Indicada para quartos e home theater.' },
  { id: 'blackout-rolo', nome: 'Blackout Rolo', desc: 'Rolo com tecido blackout: escurece o ambiente com visual limpo.' },
  { id: 'rolo', nome: 'Persiana Rolo', desc: 'Tecido que enrola no topo. Prática e discreta, para qualquer cômodo.' },
  { id: 'vertical', nome: 'Persiana Vertical', desc: 'Lâminas verticais que giram para regular a entrada de luz. Boa para vãos largos.' },
  { id: 'romana', nome: 'Persiana Romana', desc: 'Recolhe em gomos de tecido. Visual aconchegante para salas e quartos.' },
  { id: 'double-vision', nome: 'Double Vision', desc: 'Faixas alternadas de tela e tecido: dosa a luz e a privacidade.' },
  { id: 'wave', nome: 'Cortina Wave', desc: 'Ondas uniformes do teto ao chão. Acabamento elegante para a sala.' },
  { id: 'wave-before-after', nome: 'Wave (antes e depois)', desc: 'Veja a diferença que a cortina wave faz no mesmo ambiente.' },
  { id: 'persiana-eletrica', nome: 'Persiana Automatizada', desc: 'Motorizada, com controle remoto, celular, Alexa ou Google Home.' },
];
const FAQ = [
  { q: 'Vocês fazem a medição no local?', a: 'Sim. A PersiPro mede no local, fabrica sob medida e instala. Chame no WhatsApp para combinar.' },
  { q: 'Quais cidades vocês atendem?', a: 'Porto Alegre, Canoas, Viamão, Cachoeirinha, Alvorada e Gravataí.' },
  { q: 'Quanto tempo leva para virem até aqui?', a: 'Atendemos até no mesmo dia. Combine o horário pelo WhatsApp ou por ligação.' },
  { q: 'Qual é a garantia?', a: 'Garantia total de 6 meses, cobrindo materiais e instalação, e assistência técnica de 6 meses.' },
  { q: 'Vocês consertam persiana que eu já tenho?', a: 'Sim. Além de fabricar e instalar, a PersiPro conserta e dá manutenção em cortinas e persianas.' },
  { q: 'Fazem persiana motorizada?', a: 'Sim. Cortinas e persianas automatizadas, com Alexa, Google Home, celular e controle remoto.' },
  { q: 'Como peço o orçamento?', a: 'Pelo WhatsApp ou ligação no (51) 99499-5610. Se quiser, mande uma foto da janela para receber a indicação do modelo.' },
];
(async () => {
  const ic = {};
  for (const [k, p] of Object.entries(ICONS)) {
    const r = await fetch(FA + p + '.svg');
    if (!r.ok) throw new Error('ícone ' + p + ' HTTP ' + r.status);
    const s = await r.text();
    ic[k] = { v: s.match(/viewBox="([^"]+)"/)[1], p: s.match(/ d="([^"]+)"/)[1] };
  }
  const av = JSON.parse(fs.readFileSync(D + '/_ref/avaliacoes.json', 'utf8'))
    .map(a => ({ nome: a.nome, texto: a.comentario.replace(/[”"]+\s*$/, '').trim() }));
  const VID = s0 => s0.match(/var VID = '([^']+)'/)[1];
  const vbase = VID(fs.readFileSync(D + '/src.html', 'utf8'));
  for (const m of MODELS) { const r = await fetch(vbase + m.id + '.mp4', { headers: { Range: 'bytes=0-99' } }); if (r.status !== 206) throw new Error('vídeo ' + m.id + ' no R2: HTTP ' + r.status); }
  for (const m of MODELS) if (!fs.existsSync(`${D}/videos/${m.id}.mp4`) || !fs.existsSync(`${D}/imagens/poster-${m.id}.webp`)) throw new Error('falta mídia ' + m.id);
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  let s = fs.readFileSync(D + '/src.html', 'utf8');
  const rep = (k, v) => { if (!s.includes(k)) throw new Error('placeholder ' + k); s = s.split(k).join(v); };
  rep('/*ICONS*/', 'var ICONS=' + JSON.stringify(ic) + ';');
  rep('/*MODELS*/', JSON.stringify(MODELS));
  rep('/*REVIEWS*/', JSON.stringify(av));
  rep('/*FAQ*/', JSON.stringify(FAQ));
  rep('/*FAQSCHEMA*/', JSON.stringify(faqSchema));
  const used = [...s.matchAll(/data-ic="([^"]+)"|<i data-ic=\\"([^\\]+)/g)].map(m => m[1] || m[2]);
  const miss = [...new Set(used)].filter(k => !ic[k]);
  if (miss.length) throw new Error('ícones sem SVG: ' + miss.join(','));
  [...s.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach((m, i) => new Function(m[1]));
  fs.writeFileSync(D + '/index.html', s);
  console.log('index.html', s.length, 'B · ícones', Object.keys(ic).length, '· avaliações', av.length, '· modelos', MODELS.length, '· faq', FAQ.length);
})().catch(e => { console.error('ERRO', e.message); process.exit(1); });
