// Gera as páginas de serviço a partir de index.html (já gerado por _build.js). Rodar depois dele.
const fs = require('fs');
const OUT = 'd:/andrezao/lp/ultragraf/';
const home = fs.readFileSync(OUT + 'index.html', 'utf8');
const WA1 = '5493754531596';
const wa = t => `https://wa.me/${WA1}?text=${encodeURIComponent(t)}`;
const IWA = '<svg><use href="#i-wa"/></svg>';
const slice = (re) => { const m = home.match(re); if (!m) throw new Error('não achou ' + re); return m[0]; };
const sprite = slice(/<svg width="0" height="0"[\s\S]*?<\/svg>\n/);
const cine = slice(/<div class="cine-wrap"[\s\S]*?<div class="cine-ov"[^>]*><\/div>/);
let header = slice(/<header class="hdr">[\s\S]*?<\/header>/).replace(/href="#/g, 'href="./#');
let footer = slice(/<footer class="ftr">[\s\S]*?<\/footer>/).replace(/href="#/g, 'href="./#');
const fab = slice(/<a class="wa-fab"[\s\S]*?<\/a>/);
const scripts = slice(/<script src="https:\/\/cdnjs[\s\S]*?<\/body>/).replace('</body>', '');
const head1 = slice(/<link rel="preload"[\s\S]*?<link rel="stylesheet"[^>]*>/);

const pic = (f, alt, sz) => `<img src="assets/img/${f}-480.webp" srcset="assets/img/${f}-480.webp 480w, assets/img/${f}-900.webp 900w" sizes="${sz}" alt="${alt}" loading="lazy" decoding="async">`;
const SZ = '(max-width:600px) 92vw, 300px';
const fig = (g, i) => `<figure class="ph rv-up${i % 3 === 1 ? ' wide' : ''}">${pic(g[0], g[1], SZ)}<figcaption>${g[2]}</figcaption></figure>`;

const ALL = [['fachadas-acm.html', 'Fachadas en ACM'], ['letras-corporeas.html', 'Letras corpóreas'], ['totems-acm.html', 'Tótems y carteles de ruta'], ['ploteo-vehicular.html', 'Ploteo vehicular'], ['puertas-revestimientos-acm.html', 'Puertas y revestimientos en ACM']];

const pages = [
  {
    file: 'fachadas-acm.html', name: 'Fachadas en ACM y ACM 3D', short: 'Fachadas', hero: 'optica-centro-fachada-acm-3d',
    title: 'Fachadas en ACM y ACM 3D en Misiones | UltraGraf',
    desc: 'Fachadas premium en ACM (aluminio compuesto) y ACM 3D. UltraGraf diseña, fabrica en San Javier, Misiones, y coloca en todo el NEA. Presupuesto sin cargo.',
    h1: 'Fachadas premium en ACM', sub: 'Aluminio compuesto liso o con relieve 3D, con letras y luz integradas. Fabricamos en nuestra planta de San Javier y colocamos con camión grúa en todo el NEA.',
    msg: 'Hola UltraGraf, quiero un presupuesto de fachada en ACM.', sel: 'Fachada en ACM',
    geo: 'UltraGraf fabrica <strong>fachadas premium en ACM</strong> (aluminio compuesto) y <strong>ACM 3D</strong> en San Javier, Misiones, y las coloca en todo el <strong>NEA</strong>. Cada proyecto incluye diseño, fabricación en planta propia de más de 700&nbsp;m² y colocación con camión grúa. Las fachadas se integran con letras corpóreas, carteles back light y cartelería para exterior e interior.',
    feats: [['ACM liso y ACM 3D', 'Paneles de aluminio compuesto, lisos o con relieve geométrico, para fachadas con identidad propia.'], ['Letras y luz integradas', 'Letras corpóreas, back light y líneas de luz incorporadas al diseño de la fachada.'], ['Diseño y presupuesto sin cargo', 'Diseñamos el proyecto y el presupuesto no tiene costo.'], ['Colocación incluida', 'Transporte y colocación con camión grúa propio en todo el NEA.']],
    gal: [['optica-centro-fachada-acm-3d', 'Fachada de Óptica Centro en ACM 3D', 'Óptica Centro · ACM 3D'], ['potschka-fachada-noche', 'Fachada de Potschka de noche', 'Potschka'], ['maderera-ruff-fachada-noche', 'Fachada de Maderera Ruff', 'Maderera Ruff'], ['agroazul-fachada-noche', 'Fachada de AgroAzul', 'AgroAzul'], ['truck-center-fachada-noche', 'Fachada de Truck Center', 'Truck Center'], ['rincon-regalos-fachada', 'Fachada de El Rincón de los Regalos', 'El Rincón de los Regalos'], ['garavano-fachada-acm', 'Fachada de Garavano', 'Garavano'], ['farmacia-fachada-led', 'Fachada de farmacia con LED', 'Farmacia · LED'], ['potschka-fachada-instalacion', 'Instalación de la fachada de Potschka', 'Potschka · colocación']],
    faq: [['¿Qué es el ACM 3D?', 'Es aluminio compuesto con relieve geométrico. Se usa en fachadas como las de Óptica Centro y Velona Motos.'], ['¿Hacen la colocación de la fachada?', 'Sí. Fabricamos en planta propia y colocamos con camión grúa en todo el NEA.'], ['¿Cómo pido un presupuesto?', 'Por WhatsApp al +54 9 3754 53-1596. Enviá fotos del frente y las medidas aproximadas.']],
  },
  {
    file: 'letras-corporeas.html', name: 'Letras corpóreas', short: 'Letras', hero: 'klein-letra-corporea-roja',
    title: 'Letras corpóreas en chapa, acrílico, PVC e inox | UltraGraf Misiones',
    desc: 'Letras corpóreas en chapa, impresión 3D, polyfan, acrílico, PVC y acero inoxidable, con o sin luz. UltraGraf, San Javier, Misiones. Colocación en el NEA.',
    h1: 'Letras corpóreas para tu marca', sub: 'En chapa, impresión 3D, polyfan, acrílico, PVC o acero inoxidable. Con o sin iluminación, fabricadas en San Javier y colocadas en todo el NEA.',
    msg: 'Hola UltraGraf, quiero un presupuesto de letras corpóreas.', sel: 'Letras corpóreas',
    geo: 'UltraGraf fabrica <strong>letras corpóreas</strong> en <strong>chapa, impresión 3D, polyfan, acrílico, PVC y acero inoxidable</strong> en San Javier, Misiones. Hace también <strong>carteles back light y neón LED</strong> y coloca con camión grúa en todo el <strong>NEA</strong>. Los presupuestos son sin cargo.',
    feats: [['Seis materiales', 'Chapa, impresión 3D, polyfan, acrílico, PVC y acero inoxidable.'], ['Con o sin iluminación', 'Letras iluminadas o sin luz, según el lugar y el diseño de la marca.'], ['Back light y neón LED', 'Carteles back light para exterior y neón LED para interiores y vidrieras.'], ['Colocación incluida', 'Transporte y colocación con camión grúa propio en todo el NEA.']],
    gal: [['klein-letra-corporea-roja', 'Letra corpórea de Klein', 'Klein'], ['la-reina-letra-corporea', 'Letra corpórea La Reina', 'La Reina'], ['mabel-letra-luminosa', 'Letra luminosa Mabel', 'Mabel'], ['legado-joyas-letras-doradas', 'Letras doradas de Legado Joyas', 'Legado Joyas'], ['lgh-transporte-letras-backlight', 'Letras back light de LGH Transporte', 'LGH Transporte'], ['bloome-estetica-letras-piedra', 'Letras de Bloomé Estética', 'Bloomé Estética'], ['nasua-letras-acero', 'Letras de acero de Nasua', 'Nasua · acero'], ['befit-letras-backlight', 'Letras back light de Befit', 'Befit'], ['link-combustibles-letra-3d', 'Letra 3D de Link Combustibles', 'Link Combustibles'], ['energym-letras-led', 'Letras LED de Energym', 'Energym'], ['multipack-letras-noche', 'Letras de Multipack', 'Multipack'], ['velona-letras-3d', 'Letras 3D de Velona Motos', 'Velona Motos']],
    extra: { id: 'iluminacion', h: 'Back light y neón LED', p: 'Para exterior, carteles back light con luz pareja. Para interiores y vidrieras, neón LED.', gal: [['neon-que-bueno-es-verte', 'Neón LED con la frase Que bueno es verte', 'Neón LED'], ['fitbox-store-letras', 'Cartel de Fitbox Store', 'Fitbox Store'], ['euphoria-letras-backlight', 'Letras back light de Euphoria', 'Euphoria']] },
    faq: [['¿Qué materiales usan?', 'Chapa, impresión 3D, polyfan, acrílico, PVC y acero inoxidable.'], ['¿Las letras pueden tener luz?', 'Sí, hacemos letras con y sin iluminación, además de carteles back light y neón LED.'], ['¿Hacen la colocación?', 'Sí, con camión grúa propio en todo el NEA.']],
  },
  {
    file: 'totems-acm.html', name: 'Tótems en ACM, pórticos y carteles de ruta', short: 'Tótems', hero: 'link-totem-estacion',
    title: 'Tótems en ACM, pórticos y carteles de ruta | UltraGraf Misiones',
    desc: 'Tótems en ACM, pórticos personalizados y carteles de ruta. UltraGraf fabrica en San Javier, Misiones, y coloca con camión grúa en todo el NEA.',
    h1: 'Tótems, pórticos y carteles de ruta', sub: 'Identificación a la vista para estaciones, comercios y empresas. Fabricación en ACM y colocación con camión grúa propio en todo el NEA.',
    msg: 'Hola UltraGraf, quiero un presupuesto de tótem o cartel de ruta.', sel: 'Tótems en ACM',
    geo: 'UltraGraf fabrica <strong>tótems en ACM</strong>, <strong>pórticos personalizados</strong> y <strong>carteles de ruta</strong> en San Javier, Misiones, y los coloca con camión grúa en todo el <strong>NEA</strong>. Presupuestos sin cargo.',
    feats: [['Tótems en ACM', 'Tótems de identificación para estaciones de servicio, farmacias, ópticas y comercios.'], ['Pórticos personalizados', 'Pórticos en ACM con el diseño de la marca.'], ['Carteles de ruta', 'Carteles de gran tamaño para rutas y accesos.'], ['Colocación con camión grúa', 'Transporte y colocación propios en todo el NEA.']],
    gal: [['link-totem-estacion', 'Tótem de Link Combustibles', 'Link Combustibles'], ['farmacia-central-totem', 'Tótem de Farmacia Central', 'Farmacia Central'], ['lop-optica-totem', 'Tótem de LOP Óptica', 'LOP Óptica'], ['wichmann-wellness-totem', 'Tótem de Wichmann Wellness', 'Wichmann Wellness']],
    extra: { id: 'portico', h: 'Carteles de ruta y pórticos', p: 'Estructuras grandes que se ven desde lejos, colocadas con camión grúa.', gal: [['axion-cartel-ruta', 'Cartel de ruta de Axion', 'Axion · cartel de ruta'], ['andersson-cartel-ruta', 'Cartel de ruta de Andersson', 'Andersson · cartel de ruta'], ['concepcion-letras-gigantes', 'Letras gigantes de Concepción', 'Concepción · letras gigantes'], ['garruchos-letras-gigantes', 'Letras gigantes de Garruchos', 'Garruchos · letras gigantes']] },
    faq: [['¿De qué material son los tótems?', 'Fabricamos tótems en ACM (aluminio compuesto).'], ['¿Hacen carteles de ruta?', 'Sí, carteles de ruta y pórticos personalizados, con colocación incluida.'], ['¿Cómo pido un presupuesto?', 'Por WhatsApp al +54 9 3754 53-1596, con fotos del lugar.']],
  },
  {
    file: 'ploteo-vehicular.html', name: 'Ploteo vehicular', short: 'Ploteo', hero: 'ploteo-auto-rally',
    title: 'Ploteo vehicular y gráfica autoadhesiva en Misiones | UltraGraf',
    desc: 'Ploteo vehicular, gráfica autoadhesiva y calcos troquelados. UltraGraf, San Javier, Misiones. Presupuestos sin cargo.',
    h1: 'Ploteo vehicular', sub: 'Gráfica autoadhesiva para vehículos, de la idea al ploteo terminado, producida en San Javier, Misiones.',
    msg: 'Hola UltraGraf, quiero un presupuesto de ploteo vehicular.', sel: 'Ploteo vehicular',
    geo: 'UltraGraf realiza <strong>ploteo vehicular</strong>, <strong>ploteados con gráfica autoadhesiva</strong> y <strong>calcos troquelados</strong> en San Javier, Misiones. También hace impresiones en gran formato. Presupuestos sin cargo por WhatsApp.',
    feats: [['Ploteo vehicular', 'Gráfica autoadhesiva aplicada sobre el vehículo.'], ['Calcos troquelados', 'Calcos con forma, cortados a medida del diseño.'], ['Impresión en gran formato', 'Gráficas grandes para vehículos, locales y carteles.'], ['Presupuesto sin cargo', 'Enviá fotos y medidas por WhatsApp.']],
    gal: [['ploteo-auto-rally', 'Ploteo vehicular completo en auto de rally', 'Auto de rally'], ['ploteo-autos-rally-taller', 'Autos de rally ploteados en el taller', 'Autos de rally · taller'], ['camion-ultragraf', 'Camión de UltraGraf', 'Camión UltraGraf']],
    faq: [['¿Qué incluye el ploteo vehicular?', 'Diseño y gráfica autoadhesiva aplicada sobre el vehículo.'], ['¿Hacen calcos troquelados?', 'Sí, calcos troquelados a medida.'], ['¿Cómo pido un presupuesto?', 'Por WhatsApp al +54 9 3754 53-1596, con fotos del vehículo.']],
  },
  {
    file: 'puertas-revestimientos-acm.html', name: 'Puertas y revestimientos en ACM', short: 'Puertas ACM', hero: 'velona-motos-pared-3d',
    title: 'Puertas y revestimientos en ACM 3D | UltraGraf Misiones',
    desc: 'Puertas de alto nivel y revestimientos de pared en ACM y ACM 3D. UltraGraf diseña, fabrica y coloca en San Javier y todo el NEA.',
    h1: 'Puertas y revestimientos en ACM', sub: 'Puertas de alto nivel y paredes de marca en ACM y ACM 3D, con diseño a medida del local.',
    msg: 'Hola UltraGraf, quiero un presupuesto de puertas o revestimientos en ACM.', sel: 'Puertas y revestimientos en ACM',
    geo: 'UltraGraf fabrica <strong>puertas de alto nivel en ACM</strong> y <strong>revestimientos de pared en ACM y ACM 3D</strong> en San Javier, Misiones, y los coloca en todo el <strong>NEA</strong>. Presupuestos sin cargo.',
    feats: [['Puertas de alto nivel', 'Puertas en ACM con acabado de fachada premium.'], ['Paredes en ACM 3D', 'Relieves geométricos para paredes de marca y frentes de local.'], ['Diseño a medida', 'Adaptamos el diseño al local y a la identidad de la marca.'], ['Colocación incluida', 'Transporte y colocación propios en todo el NEA.']],
    gal: [['velona-motos-pared-3d', 'Pared 3D roja de Velona Motos', 'Velona Motos · pared 3D'], ['velona-letras-3d', 'Letras 3D sobre ACM de Velona Motos', 'Velona Motos · letras'], ['zielke-logistica-acm-listones', 'Revestimiento ACM de Zielke Logística', 'Zielke Logística'], ['optica-centro-fachada-acm-3d', 'ACM 3D de Óptica Centro', 'Óptica Centro · ACM 3D']],
    faq: [['¿Qué es un revestimiento en ACM 3D?', 'Es aluminio compuesto con relieve geométrico aplicado sobre paredes o frentes.'], ['¿Hacen puertas en ACM?', 'Sí, puertas de alto nivel en ACM.'], ['¿Cómo pido un presupuesto?', 'Por WhatsApp al +54 9 3754 53-1596, con fotos y medidas.']],
  },
];

for (const p of pages) {
  const ld = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Service', name: p.name, provider: { '@type': 'LocalBusiness', name: 'UltraGraf', telephone: '+54 9 3754 53-1596', address: { '@type': 'PostalAddress', streetAddress: '25 de Mayo 488', addressLocality: 'San Javier', addressRegion: 'Misiones', postalCode: '3357', addressCountry: 'AR' } }, areaServed: 'NEA, Argentina', description: p.desc },
      { '@type': 'FAQPage', mainEntity: p.faq.map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } })) },
    ],
  };
  const others = ALL.filter(a => a[0] !== p.file).map(a => `<a href="${a[0]}">${a[1]}</a>`).join('');
  const extra = p.extra ? `
<section class="sec" id="${p.extra.id}" style="padding-top:0">
  <div class="wrap">
    <h2 class="rv-up" style="font-size:clamp(1.2rem,3vw,2rem)">${p.extra.h}</h2>
    <p class="lead rv-up">${p.extra.p}</p>
    <div class="gal-pg">${p.extra.gal.map(fig).join('')}</div>
  </div>
</section>` : '';
  const html = `<!DOCTYPE html>
<html lang="es-AR" class="no-js cine">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<meta name="theme-color" content="#010101">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<meta property="og:title" content="${p.title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:type" content="website">
<meta property="og:image" content="assets/img/${p.hero}-900.webp">
${head1}
<script>document.documentElement.classList.remove('no-js')</script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>

${sprite}
${cine}

${header}

<main>

<section class="hero sm" aria-label="Presentación">
  <div class="wrap hero-in">
    <div class="crumbs"><a href="./">UltraGraf</a> / <a href="./#servicios">Servicios</a> / ${p.short}</div>
    <span class="chip"><i></i>San Javier, Misiones · NEA</span>
    <h1>${p.h1}</h1>
    <p class="sub">${p.sub}</p>
    <div class="hero-ctas">
      <a class="btn btn-acc" href="${wa(p.msg)}" target="_blank" rel="noopener" data-loc="hero" data-svc="${p.file.replace('.html', '')}">${IWA}Pedí tu presupuesto sin cargo</a>
      <a class="btn btn-line" href="#trabajos">Ver trabajos ↓</a>
    </div>
  </div>
</section>

<section class="sec" id="detalle">
  <div class="wrap">
    <div class="sec-num rv-up"><b>01</b>Qué incluye</div>
    <h2 class="rv-up">${p.name}</h2>
    <div class="feat-grid">${p.feats.map(f => `<div class="feat rv-up"><h3>${f[0]}</h3><p>${f[1]}</p></div>`).join('')}</div>
  </div>
</section>

<section class="sec" id="trabajos" style="padding-top:0">
  <div class="wrap">
    <div class="sec-num rv-up"><b>02</b>Trabajos</div>
    <h2 class="rv-up">Hechos por UltraGraf</h2>
    <div class="gal-pg">${p.gal.map(fig).join('')}</div>
  </div>
</section>
${extra}

<section class="sec" id="faq" style="padding-top:0">
  <div class="wrap">
    <div class="sec-num rv-up"><b>03</b>Preguntas frecuentes</div>
    <h2 class="rv-up">Antes de escribirnos.</h2>
    <div class="faq">${p.faq.map(q => `<details><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('')}</div>
  </div>
</section>

<section class="geo"><div class="wrap"><p>${p.geo}</p></div></section>

<section class="sec" id="presupuesto">
  <div class="wrap cta-grid">
    <div>
      <div class="sec-num rv-up"><b>04</b>Presupuesto</div>
      <h2 class="rv-up">Contanos tu idea.</h2>
      <p class="lead rv-up">Completá los datos y la conversación se abre en WhatsApp con todo escrito. Presupuesto sin cargo.</p>
      <div class="others rv-up">${others}</div>
    </div>
    <form class="form rv-up" id="form-${p.file.replace('.html', '')}" data-wa-form="${p.msg}">
      <label>Tu nombre<input name="Nombre" required autocomplete="name"></label>
      <label>WhatsApp<input name="WhatsApp" type="tel" required autocomplete="tel" placeholder="+54 9 3754 000000"></label>
      <label>Ciudad<input name="Ciudad" autocomplete="address-level2" placeholder="San Javier"></label>
      <input type="hidden" name="Servicio" value="${p.sel}">
      <button class="btn btn-acc" type="submit">${IWA}Enviar por WhatsApp</button>
      <small>Tus datos van solo en el mensaje de WhatsApp.</small>
    </form>
  </div>
</section>

</main>

${footer}

${fab}

${scripts}
</body>
</html>
`;
  fs.writeFileSync(OUT + p.file, html);
  console.log(p.file, html.length);
}
