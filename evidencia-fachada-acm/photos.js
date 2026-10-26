// Converte as fotos reais do cliente em WebP leve, sem EXIF/GPS, para /trabalhos/.
// Origens: Drive "Serviços/Grafica Evidencia" (22/10) e pasta de entrega de 23/10 (baixada em c:/dev/ebg-build/evnovas).
// Uso: node photos.js
const fs = require('fs');
const sharp = require('c:/dev/node_modules/sharp');
const SRC = 'I:/Meu Drive/Serviços/Grafica Evidencia';
const NOVAS = 'c:/dev/ebg-build/evnovas';
const OUT = __dirname.replace(/\\/g, '/') + '/trabalhos';
const P = n => `${SRC}/WhatsApp Image 2026-10-22 at ${n}.jpeg`;
const N = n => `${NOVAS}/IMG-20261023-${n}.jpg`;
// [arquivo origem, nome final, recorte opcional {left,top,width,height}]
const ITEMS = [
  [N('WA0201'), 'fachada-loja-painel-preto-laranja-dia'],
  [N('WA0185'), 'fachada-loja-painel-verde-noite'],
  [N('WA0198'), 'fachada-painel-preto-faixas-laranja-noite'],
  [P('18.04.59 (1)'), 'fachada-loja-fitness-noite'],
  [P('18.04.58'), 'fachada-loja-painel-curvo', { left: 0, top: 150, width: 1200, height: 900 }], // recorte tira a pessoa na porta
  [P('18.05.01 (1)'), 'fachada-salao-letreiro-dourado'],
  [P('18.05.00'), 'fachada-loja-letreiro-relevo'],
  [P('18.05.00 (1)'), 'fachada-letreiro-iluminado-noite'],
  [P('18.05.00 (2)'), 'painel-verde-logotipo-relevo'],
  [N('WA0191'), 'fachada-loja-painel-branco-noite', { left: 0, top: 100, width: 1260, height: 945 }], // recorte tira cartaz com rosto
  [P('18.04.59'), 'painel-laranja-logotipo-relevo'],
  [P('18.05.01'), 'fachada-salao-letreiro-iluminado-noite', { left: 0, top: 380, width: 1000, height: 750 }], // recorte tira a placa com telefone de terceiros
];
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [f, name, crop] of ITEMS) {
    let p = sharp(f).rotate();
    if (crop) p = p.extract(crop);
    const r = await p.resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 76 }).toBuffer({ resolveWithObject: true });
    fs.writeFileSync(`${OUT}/${name}.webp`, r.data);
    const exif = (await sharp(r.data).metadata()).exif ? 'TEM EXIF' : 'sem EXIF';
    console.log(name, r.info.width + 'x' + r.info.height, Math.round(r.data.length / 1024) + 'KB', exif);
  }
})().catch(e => { console.error('ERRO', e.message); process.exit(1); });
