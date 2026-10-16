const sharp = require('sharp'), fs = require('fs');
const D = 'd:/andrezao/lp/ultragraf/_drive/', FD = D + 'FOTOS ULTRAGRAF/', O = 'd:/andrezao/lp/ultragraf/assets/img/';
const files = fs.readdirSync(FD).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
const map = { 18:'optica-centro-fachada-acm-3d',61:'zielke-logistica-acm-listones',93:'velona-motos-pared-3d',13:'potschka-fachada-instalacion',147:'potschka-fachada-noche',130:'maderera-ruff-fachada-noche',56:'agroazul-fachada-noche',123:'truck-center-fachada-noche',85:'rincon-regalos-fachada',44:'farmacia-fachada-led',142:'garavano-fachada-acm',3:'klein-letra-corporea-roja',5:'la-reina-letra-corporea',4:'mabel-letra-luminosa',94:'legado-joyas-letras-doradas',150:'lgh-transporte-letras-backlight',117:'bloome-estetica-letras-piedra',145:'nasua-letras-acero',105:'befit-letras-backlight',107:'link-combustibles-letra-3d',47:'energym-letras-led',154:'multipack-letras-noche',138:'velona-letras-3d',115:'neon-que-bueno-es-verte',87:'fitbox-store-letras',116:'euphoria-letras-backlight',49:'link-totem-estacion',113:'farmacia-central-totem',137:'lop-optica-totem',74:'wichmann-wellness-totem',59:'axion-cartel-ruta',120:'andersson-cartel-ruta',124:'concepcion-letras-gigantes',95:'garruchos-letras-gigantes',21:'ploteo-auto-rally',39:'ploteo-autos-rally-taller',45:'placa-reconocimiento-acrilico',23:'display-qr-acrilico',10:'equipo-ultragraf',63:'camion-con-grua-colocacion',109:'camion-ultragraf',24:'befit-colocacion-panel',128:'equipo-trabajo-en-altura',99:'equipo-colocacion-imagen' };
(async () => {
  for (const f of fs.readdirSync(O)) fs.unlinkSync(O + f);
  let tot = 0;
  for (const [i, name] of Object.entries(map)) {
    for (const [w, q] of [[480, 58], [900, 62]]) {
      const out = `${O}${name}-${w}.webp`;
      await sharp(FD + files[i]).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: q, effort: 6, smartSubsample: true }).toFile(out);
      tot += fs.statSync(out).size;
    }
  }
  // fundo provisório (celular/desktop): 1 arquivo leve
  await sharp(FD + files[130]).rotate().resize({ width: 900 }).webp({ quality: 50, effort: 6 }).toFile(O + 'fondo.webp');
  await sharp(D + 'ULTRAGRAF LOGO PNG (1).png').trim().resize({ width: 420 }).webp({ quality: 80, effort: 6, alphaQuality: 90 }).toFile(O + 'logo-blanco.webp');
  const kb = f => Math.round(fs.statSync(O + f).size / 1024);
  console.log('fotos total KB:', Math.round(tot / 1024), '| fondo', kb('fondo.webp'), 'KB | logo', kb('logo-blanco.webp'), 'KB');
  const sizes = fs.readdirSync(O).map(f => [f, fs.statSync(O + f).size]).sort((a, b) => b[1] - a[1]).slice(0, 3);
  console.log('maiores:', sizes.map(s => s[0] + ' ' + Math.round(s[1] / 1024) + 'KB').join(' | '));
})();
