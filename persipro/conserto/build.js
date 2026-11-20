// Gera conserto/index.html: CSS base da LP principal (../src.html) + ícones FontAwesome + problemas, avaliações e FAQ.
// Uso: node c:/lp/persipro/conserto/build.js
const fs = require('fs');
const D = __dirname.replace(/\\/g, '/');
const P = D + '/..';
const FA = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/svgs/';
const ICONS = {
  whatsapp: 'brands/whatsapp', google: 'brands/google', phone: 'solid/phone', shield: 'solid/shield-halved', users: 'solid/users',
  'user-check': 'solid/user-check', clock: 'solid/clock', video: 'solid/video', calendar: 'solid/calendar-check', wrench: 'solid/screwdriver-wrench',
  scale: 'solid/scale-balanced', headset: 'solid/headset', pin: 'solid/location-dot', chevron: 'solid/chevron-down', check: 'solid/check',
  updown: 'solid/arrows-up-down', 'link-slash': 'solid/link-slash', grip: 'solid/grip-lines-vertical', motor: 'solid/plug-circle-xmark',
  align: 'solid/align-center', tag: 'solid/tag', camera: 'solid/camera', warn: 'solid/triangle-exclamation',
};
const PROBS = [
  { id: 'nao-sobe', ic: 'updown', t: 'Não sobe ou não desce', msg: 'Olá! Minha persiana não sobe / não desce. Podem consertar?' },
  { id: 'cordao', ic: 'link-slash', t: 'Cordão ou corrente arrebentou', msg: 'Olá! O cordão / corrente da minha persiana arrebentou. Podem consertar?' },
  { id: 'travada', ic: 'warn', t: 'Travou no meio do caminho', msg: 'Olá! Minha persiana travou e não mexe mais. Podem consertar?' },
  { id: 'laminas', ic: 'grip', t: 'Lâmina quebrada ou solta', msg: 'Olá! Minha persiana está com lâmina quebrada / solta. Podem consertar?' },
  { id: 'torta', ic: 'align', t: 'Ficou torta ou enrolando errado', msg: 'Olá! Minha persiana está torta / enrolando errado. Podem consertar?' },
  { id: 'motor', ic: 'motor', t: 'Motor ou controle não funciona', msg: 'Olá! A minha persiana motorizada não responde ao controle / motor. Podem consertar?' },
  { id: 'externa', ic: 'wrench', t: 'Persiana externa com defeito', msg: 'Olá! Preciso de conserto de persiana externa. Podem me atender?' },
  { id: 'outro', ic: 'camera', t: 'Outro problema', msg: 'Olá! Minha persiana está com defeito. Vou enviar foto/vídeo para vocês avaliarem.', other: true },
];
const FIRST = ['Carla Bianchi', 'Lilian Rubio', 'Veridiana Demarco', 'Caroline Nicola Sangalli', 'Gustavo Viegas', 'Bruno Dos santos', 'Yuri França', 'Bruno M. B.'];
const FAQ = [
  { q: 'Vocês vão até a minha casa?', a: 'Sim. O conserto é feito em domicílio em Porto Alegre, Canoas, Viamão, Cachoeirinha, Alvorada e Gravataí.' },
  { q: 'Atendem no mesmo dia?', a: 'Atendemos até no mesmo dia. Chame no WhatsApp ou ligue para combinar o horário.' },
  { q: 'Quanto custa o conserto?', a: 'Depende do defeito e do modelo da persiana. Mande foto ou vídeo pelo WhatsApp para receber o orçamento.' },
  { q: 'Consertam persiana motorizada?', a: 'Sim. A PersiPro trabalha com cortinas e persianas motorizadas e elétricas. Mande um vídeo mostrando o defeito.' },
  { q: 'Consertam persiana externa?', a: 'Sim. Mande foto ou vídeo para o técnico avaliar antes da visita.' },
  { q: 'O conserto tem garantia?', a: 'Sim. A PersiPro oferece assistência técnica de 6 meses. Qualquer problema, a gente resolve.' },
  { q: 'E se não tiver conserto?', a: 'O técnico avisa. A PersiPro também mede, fabrica e instala persianas novas sob medida.' },
];
(async () => {
  const ic = {};
  for (const [k, p] of Object.entries(ICONS)) {
    const r = await fetch(FA + p + '.svg');
    if (!r.ok) throw new Error('ícone ' + p + ' HTTP ' + r.status);
    const s = await r.text();
    ic[k] = { v: s.match(/viewBox="([^"]+)"/)[1], p: s.match(/ d="([^"]+)"/)[1] };
  }
  const all = JSON.parse(fs.readFileSync(P + '/_ref/avaliacoes.json', 'utf8')).map(a => ({ nome: a.nome, texto: a.comentario.replace(/[”"]+\s*$/, '').trim() }));
  const av = [...FIRST.map(n => { const a = all.find(x => x.nome === n); if (!a) throw new Error('avaliação ' + n); return a; }), ...all.filter(a => !FIRST.includes(a.nome))];
  const r = await fetch('https://pub-6a1578b9ac894fe3b855d229bfc26dc8.r2.dev/lp/persipro/videos/blackout.mp4', { headers: { Range: 'bytes=0-99' } });
  if (r.status !== 206) throw new Error('vídeo do hero no R2: HTTP ' + r.status);
  const base = fs.readFileSync(P + '/src.html', 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1];
  let s = fs.readFileSync(D + '/src.html', 'utf8');
  const rep = (k, v) => { if (!s.includes(k)) throw new Error('placeholder ' + k); s = s.split(k).join(v); };
  rep('/*BASECSS*/', base);
  rep('/*ICONS*/', 'var ICONS=' + JSON.stringify(ic) + ';');
  rep('/*PROBS*/', JSON.stringify(PROBS));
  rep('/*REVIEWS*/', JSON.stringify(av));
  rep('/*FAQ*/', JSON.stringify(FAQ));
  rep('/*FAQSCHEMA*/', JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }));
  const used = new Set([...s.matchAll(/data-ic="([a-z-]+)"/g)].map(m => m[1]).concat(PROBS.map(p => p.ic)));
  const miss = [...used].filter(k => !ic[k]);
  if (miss.length) throw new Error('ícones sem SVG: ' + miss.join(','));
  [...s.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach(m => new Function(m[1]));
  fs.writeFileSync(D + '/index.html', s);
  console.log('conserto/index.html', s.length, 'B · ícones', Object.keys(ic).length, '· problemas', PROBS.length, '· avaliações', av.length, '· faq', FAQ.length);
})().catch(e => { console.error('ERRO', e.message); process.exit(1); });
