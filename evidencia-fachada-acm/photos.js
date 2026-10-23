// Converte as fotos reais do cliente (Drive) em WebP leve, sem EXIF/GPS, para /trabalhos/.
// Uso: node photos.js
const fs = require('fs');
const sharp = require('c:/dev/node_modules/sharp');
const SRC = 'I:/Meu Drive/Serviços/Grafica Evidencia';
const OUT = __dirname.replace(/\\/g, '/') + '/trabalhos';
const P = n => `${SRC}/WhatsApp Image 2026-10-22 at ${n}.jpeg`;
// [arquivo origem, nome final, recorte opcional {left,top,width,height}]
const ITEMS = [
  [P('18.04.59 (1)'), 'fachada-loja-fitness-noite'],
  [P('18.04.58'), 'fachada-loja-painel-curvo', { left: 0, top: 150, width: 1200, height: 900 }], // recorte tira a pessoa na porta
  [P('18.05.01 (1)'), 'fachada-salao-letreiro-dourado'],
  [P('18.05.00'), 'fachada-loja-letreiro-relevo'],
  [P('18.05.00 (1)'), 'fachada-letreiro-iluminado-noite'],
  [P('18.05.00 (2)'), 'painel-verde-logotipo-relevo'],
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
