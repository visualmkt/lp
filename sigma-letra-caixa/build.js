const fs = require('fs');
const D = __dirname;
const media = JSON.parse(fs.readFileSync(`${D}/media-urls.json`, 'utf8'));
const phone = '555130324009';
const wa = (t) => `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(t)}`;
const map = {
  LOGO: media.logo, HERO: media.hero, P1: media.p1, P2: media.p2, P3: media.p3, G1: media.g1, G2: media.g2, G3: media.g3, G4: media.g4, G5: media.g5, G6: media.g6, G7: media.g7, G8: media.g8, G9: media.g9, G10: media.g10, G11: media.g11, G12: media.g12,
  WA_GERAL: wa('Olá, vim pelo site e gostaria de um orçamento de letra caixa em impressão 3D'),
  WA_ILUM: wa('Olá, vim pelo site e gostaria de um orçamento de letra caixa impressa em 3D'),
  WA_FACHADA: wa('Olá, vim pelo site e gostaria de um orçamento de letra caixa 3D para recepção'),
  WA_RECEPCAO: wa('Olá, vim pelo site e gostaria de um orçamento de letra caixa 3D para a minha marca'),
};
let html = fs.readFileSync(`${D}/template.html`, 'utf8');
html = html.replace(/\{\{icon:([a-z-]+)\}\}/g, (_, n) => {
  const s = fs.readFileSync(`${D}/icons/${n}.svg`, 'utf8');
  const vb = s.match(/viewBox="([^"]+)"/)[1];
  return `<svg viewBox="${vb}" aria-hidden="true">${s.match(/<path[^>]*\/>/g).join('')}</svg>`;
});
html = html.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, k) => { if (!(k in map)) throw new Error('placeholder sem valor: ' + k); return map[k]; });
if (/\{\{/.test(html)) throw new Error('placeholder restante');
fs.writeFileSync(`${D}/index.html`, html);
console.log('index.html', html.length, 'bytes');
