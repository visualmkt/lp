const fs = require('fs');
const D = __dirname;
const media = JSON.parse(fs.readFileSync(`${D}/media-urls.json`, 'utf8'));
const phone = '5565999799695';
const wa = (t) => `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(t)}`;
const map = {
  LOGO: media.logo, HERO: media.hero, TROFEUS: media.trofeus, PLACA: media.placa, G1: media.g1, G2: media.g2, G3: media.g3,
  WA_GERAL: wa('Olá, vim pelo site e gostaria de um orçamento de troféu ou placa de homenagem'),
  WA_TROFEU: wa('Olá, vim pelo site e gostaria de um orçamento de troféu personalizado'),
  WA_PLACA: wa('Olá, vim pelo site e gostaria de um orçamento de placa de homenagem'),
};
let html = fs.readFileSync(`${D}/template.html`, 'utf8');
html = html.replace(/\{\{icon:([a-z-]+)\}\}/g, (_, n) => {
  const s = fs.readFileSync(`${D}/icons/${n}.svg`, 'utf8');
  const vb = s.match(/viewBox="([^"]+)"/)[1];
  const paths = s.match(/<path[^>]*\/>/g).join('');
  return `<svg viewBox="${vb}" aria-hidden="true">${paths}</svg>`;
});
html = html.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, k) => { if (!(k in map)) throw new Error('placeholder sem valor: ' + k); return map[k]; });
if (/\{\{/.test(html)) throw new Error('placeholder restante');
fs.writeFileSync(`${D}/index.html`, html);
console.log('index.html', html.length, 'bytes');
