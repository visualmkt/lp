const fs = require('fs');
const OUT = 'd:/andrezao/lp/ultragraf/';
const WA1 = '5493754531596', WA2 = '5493754469388';
const wa = (t, n = WA1) => `https://wa.me/${n}?text=${encodeURIComponent(t)}`;
const SZ = { pf: '(max-width:760px) 46vw, 380px', ab: '(max-width:900px) 92vw, 480px', sv: '(max-width:600px) 92vw, 380px' };
const pic = (f, alt, sz) => `<img src="assets/img/${f}-480.webp" srcset="assets/img/${f}-480.webp 480w, assets/img/${f}-900.webp 900w" sizes="${sz}" alt="${alt}" loading="lazy" decoding="async">`;
const img = (f, alt, cap, cls = '', sz = SZ.pf) => `<figure class="ph ${cls}">${pic(f, alt, sz)}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
const IWA = '<svg><use href="#i-wa"/></svg>';

const services = [
  ['optica-centro-fachada-acm-3d', 'Fachada de Óptica Centro en ACM 3D con letras corpóreas', 'Fachadas premium en ACM y ACM 3D', 'Revestimientos en aluminio compuesto con relieves, cortes y luz integrada. Diseñamos, fabricamos y colocamos la fachada completa.', 'Cotizar fachada', 'Hola UltraGraf, quiero un presupuesto de fachada en ACM.', 'fachada-acm', 'fachadas-acm.html'],
  ['klein-letra-corporea-roja', 'Letra corpórea de Klein, empresa constructora', 'Letras corpóreas', 'En chapa, impresión 3D, polyfan, acrílico, PVC y acero inoxidable. Con o sin iluminación.', 'Cotizar letras', 'Hola UltraGraf, quiero un presupuesto de letras corpóreas.', 'letras-corporeas', 'letras-corporeas.html'],
  ['neon-que-bueno-es-verte', 'Cartel de neón LED con la frase Que bueno es verte', 'Carteles neón LED y back light', 'Neón LED para interiores y vidrieras, y carteles back light con luz pareja para exterior.', 'Cotizar neón / back light', 'Hola UltraGraf, quiero un presupuesto de cartel neón LED o back light.', 'neon-backlight', 'letras-corporeas.html#iluminacion'],
  ['link-totem-estacion', 'Tótem de Link Combustibles en estación de servicio', 'Tótems en ACM', 'Tótems de identificación para estaciones, comercios y empresas, con base y estructura propia.', 'Cotizar tótem', 'Hola UltraGraf, quiero un presupuesto de tótem en ACM.', 'totem', 'totems-acm.html'],
  ['axion-cartel-ruta', 'Cartel de ruta de Axion en Concepción de la Sierra', 'Carteles de ruta y pórticos', 'Carteles de ruta y pórticos personalizados en ACM, con estructura y colocación con camión grúa.', 'Cotizar cartel de ruta', 'Hola UltraGraf, quiero un presupuesto de cartel de ruta o pórtico.', 'ruta-portico', 'totems-acm.html#portico'],
  ['ploteo-auto-rally', 'Ploteo vehicular completo en auto de rally', 'Ploteo vehicular', 'Gráfica autoadhesiva para vehículos: de la idea al ploteo terminado.', 'Cotizar ploteo', 'Hola UltraGraf, quiero un presupuesto de ploteo vehicular.', 'ploteo', 'ploteo-vehicular.html'],
  ['velona-motos-pared-3d', 'Pared 3D roja con logo de Velona Motos', 'Puertas y revestimientos en ACM', 'Puertas de alto nivel y paredes de marca en ACM, con diseño a medida del local.', 'Cotizar ACM interior', 'Hola UltraGraf, quiero un presupuesto de puertas o revestimientos en ACM.', 'acm-interior', 'puertas-revestimientos-acm.html'],
  ['placa-reconocimiento-acrilico', 'Placa de reconocimiento en acrílico con base de madera', 'Trofeos, grabado láser e impresión 3D', 'Trofeos y premiaciones, grabados láser, calcos troquelados e impresiones 3D.', 'Cotizar trofeos / grabado', 'Hola UltraGraf, quiero un presupuesto de trofeos, grabado láser o impresión 3D.', 'laser-3d'],
];

const works = [
  ['trabajo-e0632e', "Stand de UltraGraf armado en una exposición, de noche", "UltraGraf · stand en exposición"],
  ['trabajo-747792', "Armado del stand de UltraGraf con escalera", "UltraGraf · armado del stand"],
  ['trabajo-5b62ce', "Stand de UltraGraf al atardecer", "UltraGraf · nuestro stand"],
  ['trabajo-d6c2d5', "Fachada de Maderera Ruff iluminada de noche", "Maderera Ruff"],
  ['trabajo-7d5017', "Letras de Potschka iluminadas de noche", "Potschka · letras iluminadas"],
  ['trabajo-aef1bd', "Letras corpóreas de Potschka sobre fachada azul", "Potschka · letras corpóreas"],
  ['trabajo-597285', "Colocación de las letras de Potschka", "Potschka · colocación"],
  ['trabajo-ec0fce', "Fachada de Potschka de noche", "Potschka · de noche"],
  ['trabajo-4db1f7', "Letras corpóreas de Austral II Supermercados", "Austral II"],
  ['trabajo-e14868', "Letras corpóreas rojas de Austral", "Austral · letras corpóreas"],
  ['trabajo-4c8e72', "Tótem de Link Combustibles", "Link Combustibles · tótem"],
  ['trabajo-31c166', "Colocación del tótem de Link Combustibles con camión grúa", "Link Combustibles · colocación"],
  ['trabajo-219dcb', "Fachada de Vértice Automotores de noche", "Vértice Automotores"],
  ['trabajo-32baaf', "Letras luminosas de Jireh Automotores", "Jireh Automotores"],
  ['trabajo-e84dc9', "Fachada de Garavano", "Garavano"],
  ['trabajo-97b422', "Colocación de un cartel en altura", "Colocación en altura"],
  ['trabajo-006ac0', "Colocación de letras en la fachada de Industrial Marcos", "Industrial Marcos · colocación"],
  ['trabajo-1114c3', "Fachada de Industrial Marcos", "Industrial Marcos"],
  ['trabajo-9eea21', "Colocación de letras corpóreas en fachada industrial", "Letras corpóreas · colocación"],
  ['trabajo-d5e6b2', "Equipo de UltraGraf en obra, con arneses", "Equipo UltraGraf en obra"],
  ['trabajo-4c0199', "Equipo de UltraGraf junto al camión", "Equipo UltraGraf"],
  ['trabajo-b2ebc2', "Camión de UltraGraf con conductor", "Camión UltraGraf"],
  ['trabajo-e57c39', "Colocación con canasto elevador de UltraGraf", "Colocación con canasto"],
  ['trabajo-d42989', "Fachada de El Rincón de los Regalos", "El Rincón de los Regalos"],
  ['trabajo-add726', "Equipo de UltraGraf frente a El Rincón de los Regalos", "El Rincón de los Regalos · equipo"],
  ['trabajo-f677a0', "Fachada de Max's El 24 de noche con luces lineales", "Max's El 24"],
  ['trabajo-2e6d27', "Colocación del cartel de Reich Motos con camión grúa", "Reich Motos"],
  ['trabajo-e9ed20', "Fachada de Farmacia Miyoko con camión grúa", "Farmacia Miyoko"],
  ['trabajo-d80bd9', "Interior comercial con revestimiento", "Interior comercial"],
  ['trabajo-8526de', "Cartel luminoso de Spike sobre pared de ladrillo", "Spike"],
  ['trabajo-a7b06d', "Fachada de Supermercados Don Gustavo con camiones", "Don Gustavo"],
  ['trabajo-1a458a', "Letras de Supermercados Don Gustavo de noche", "Don Gustavo · de noche"],
  ['trabajo-b3b81a', "Colocación de un cartel azul en fachada", "Colocación de cartel"],
  ['trabajo-f7f0ca', "Letras luminosas de Multipack Descartables de noche", "Multipack"],
  ['trabajo-296e7f', "Fachada de Óptica Centro en ACM 3D", "Óptica Centro · ACM 3D"],
  ['trabajo-a789c4', "Equipo de UltraGraf frente a una fachada de Imagen", "Imagen · equipo"],
  ['trabajo-3221b0', "Colocación de letras CAME", "Colocación · CAME"],
  ['trabajo-002fbc', "Letras corpóreas CAME en colocación", "Letras CAME"],
  ['trabajo-314889', "Fachada de La Ganchera con camión grúa", "La Ganchera"],
  ['trabajo-5a629a', "Letras rojas de La Ganchera", "La Ganchera · letras"],
];
const cols = [[], [], []]; works.forEach((w, i) => cols[i % 3].push(img(w[0], w[1], w[2], 'pf-it' + (i % 2 ? ' wide' : ''))));

const html = `<!DOCTYPE html>
<html lang="es-AR" class="no-js cine">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>UltraGraf | Fachadas en ACM, Letras Corpóreas y Cartelería en San Javier, Misiones</title>
<meta name="description" content="UltraGraf, industria publicitaria de San Javier (Misiones): fachadas premium en ACM y ACM 3D, letras corpóreas, carteles back light y neón LED, tótems y ploteo vehicular. Colocación en todo el NEA. Presupuestos sin cargo.">
<meta name="theme-color" content="#010101">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<meta property="og:title" content="UltraGraf — Materializamos tus ideas">
<meta property="og:description" content="Fachadas en ACM, letras corpóreas y cartelería. Fabricación propia y colocación en todo el NEA.">
<meta property="og:type" content="website">
<meta property="og:image" content="assets/img/optica-centro-fachada-acm-3d-900.webp">
<link rel="preload" href="assets/fonts/ethnocentric.otf" as="font" type="font/otf" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed:ital,wght@0,400;0,500;0,600;0,800;1,800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/site.css?v=22">
<script>document.documentElement.classList.remove('no-js')</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "UltraGraf",
      "alternateName": "UltraGraf Industria Publicitaria",
      "slogan": "Materializamos tus ideas",
      "description": "Industria publicitaria de San Javier, Misiones: fachadas premium en ACM y ACM 3D, letras corpóreas, carteles back light y neón LED, tótems, carteles de ruta, ploteo vehicular, grabado láser e impresión 3D.",
      "foundingDate": "2016",
      "telephone": ["+54 3754 531596", "+54 3754 469388"],
      "email": "ultragraf.carteles24@gmail.com",
      "address": { "@type": "PostalAddress", "streetAddress": "Roque González 430", "addressLocality": "San Javier", "postalCode": "3357", "addressRegion": "Misiones", "addressCountry": "AR" },
      "areaServed": ["NEA", "Argentina"],
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "12:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "15:00", "closes": "19:00" }
      ],
      "sameAs": ["https://www.instagram.com/ultragraf_carteles/", "https://www.facebook.com/p/UltraGraf-100033686870263/"]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "¿Dónde está UltraGraf?", "acceptedAnswer": { "@type": "Answer", "text": "En Roque González 430, San Javier, Misiones, Argentina. Hacemos transporte y colocación en todo el NEA." } },
        { "@type": "Question", "name": "¿El presupuesto tiene costo?", "acceptedAnswer": { "@type": "Answer", "text": "No. Los presupuestos son sin cargo y podemos hacer visitas con atención personalizada." } },
        { "@type": "Question", "name": "¿Qué materiales usan para las letras corpóreas?", "acceptedAnswer": { "@type": "Answer", "text": "Chapa, impresión 3D, polyfan, acrílico, PVC y acero inoxidable, con o sin iluminación." } },
        { "@type": "Question", "name": "¿Se encargan de la colocación?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. UltraGraf fabrica en su planta de más de 700 m², hace transporte y colocación con camión grúa en todo el NEA e instala en todo el país." } },
        { "@type": "Question", "name": "¿Cómo pido un presupuesto?", "acceptedAnswer": { "@type": "Answer", "text": "Por WhatsApp al +54 3754 531596 o al +54 3754 469388. Enviá fotos del lugar y una idea de lo que necesitás." } }
      ]
    }
  ]
}
</script>
</head>
<body>

<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41z"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></symbol>
  <symbol id="i-ig" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></symbol>
  <symbol id="i-fb" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>
  <symbol id="i-truck" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17V6h11v11M13 9h4l4 4v4h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></symbol>
</svg>

<div class="cine-wrap" aria-hidden="true">
  <picture><source media="(min-width:900px)" srcset="assets/img/fondo-pagina-desk.webp"><img class="cine-fallback" src="assets/img/fondo-pagina.webp" alt="" fetchpriority="high" decoding="async"></picture>
  <video id="bgVideo" muted playsinline preload="metadata" tabindex="-1" data-src-m="assets/video/fundo-scrub-inv.mp4" data-src-d="assets/video/fundo-desk-inv.mp4"></video>
</div>
<div class="cine-ov" aria-hidden="true"></div>

<header class="hdr">
  <div class="hdr-top"><a href="./" class="brand" aria-label="UltraGraf — inicio"><img src="assets/img/logo-blanco.webp" alt="UltraGraf Industria Publicitaria" width="420" height="95"></a></div>
  <nav class="nav hdr-nav" id="nav" aria-label="Principal">
    <div class="dd">
      <a href="#servicios" aria-haspopup="true">Servicios</a>
      <div class="dd-m">
        <a href="fachadas-acm.html">Fachadas en ACM</a>
        <a href="letras-corporeas.html">Letras corpóreas</a>
        <a href="totems-acm.html">Tótems y carteles de ruta</a>
        <a href="ploteo-vehicular.html">Ploteo vehicular</a>
        <a href="puertas-revestimientos-acm.html">Puertas y revestimientos en ACM</a>
      </div>
    </div>
    <a href="#trabajos">Trabajos</a>
    <a href="#nosotros">Nosotros</a>
    <a href="#contacto">Contacto</a>
  </nav>
</header>

<main>

<section class="hero" aria-label="Presentación">
  <h1 class="sr-only">UltraGraf — Materializamos tus ideas</h1>
  <div class="wrap hero-in">
    <p class="sub">Transformamos ideas en identidad visual: soluciones integrales en comunicación visual y diseño arquitectónico comercial.</p>
    <div class="hero-ctas">
      <a class="btn btn-acc" href="${wa('Hola UltraGraf, quiero pedir un presupuesto sin cargo.')}" target="_blank" rel="noopener" data-loc="hero">${IWA}Pedí tu presupuesto sin cargo</a>
      <a class="btn btn-line" href="#trabajos">Ver trabajos ↓</a>
    </div>
  </div>
</section>

<div class="trust">
  <div class="wrap trust-in">
    <div class="ti"><b>Desde 2016</b></div>
    <div class="ti ti-row"><b class="big">+1000 M²</b><small>de planta<br>de producción</small></div>
    <div class="ti ti-s"><small>Transporte e instalación</small><b>en todo el NEA</b></div>
    <div class="ti ti-s"><small>Envíos a</small><b>todo el país</b></div>
    <div class="ti ti-s"><small>Presupuestos</small><b>sin cargo</b></div>
  </div>
</div>

<section class="obj" aria-label="Nuestro objetivo">
    <h2 class="obj-t rv-up">Un objetivo: hacer que tu empresa se destaque</h2>
<img src="assets/img/maxs-el-24-fachada-noche-1400.webp" srcset="assets/img/maxs-el-24-fachada-noche-900.webp 900w, assets/img/maxs-el-24-fachada-noche-1400.webp 1400w" sizes="100vw" alt="Fachada de Max's El 24 iluminada de noche, hecha por UltraGraf" loading="lazy" decoding="async" width="1400" height="1050">
  <div class="obj-band"><span>+10 años evolucionando</span><span>+1000 proyectos realizados</span><span>+1000 marcas impulsadas</span></div>
</section>

<section class="sec" id="servicios">
  <div class="wrap">
    <div class="sec-num rv-up"><b>01</b>Qué hacemos</div>
    <h2 class="rv-up">De la fachada completa<br>al detalle grabado.</h2>
    <p class="lead rv-up">Todo se fabrica en nuestra planta y lo coloca nuestro equipo. Elegí el servicio y escribinos con fotos del lugar.</p>
    <div class="svc-grid">
${services.map(s => `      <article class="svc rv-up">
        <div class="svc-img">${pic(s[0], s[1], SZ.sv)}</div>
        <div class="svc-body"><h3>${s[2]}</h3><p>${s[3]}</p>
        <a class="btn btn-acc" href="${wa(s[5])}" target="_blank" rel="noopener" data-loc="servicios" data-svc="${s[6]}">${IWA}${s[4]}</a>${s[7] ? `<a class="more-link" href="${s[7]}">Ver detalles →</a>` : ''}</div>
      </article>`).join('\n')}
    </div>
    <div class="more rv-up">
      <h3>Y además</h3>
      <div class="chips"><span>Cartelería para exterior e interior</span><span>Carteles en lona front</span><span>Impresiones en gran formato</span><span>Gráfica autoadhesiva</span><span>Ploteados</span><span>Calcos troquelados</span><span>Grabados láser</span><span>Impresiones 3D</span></div>
    </div>
  </div>
</section>

<div class="slashes" aria-hidden="true"><div class="slash"><span>Fachadas de alto nivel</span></div><div class="slash"><span>Detalles únicos</span></div><div class="slash"><span>Proyección e innovación</span></div><div class="slash"><span>Fabricación propia</span></div></div>

<section class="sec" id="trabajos">
  <div class="wrap">
    <div class="sec-num rv-up"><b>02</b>Trabajos</div>
    <h2 class="rv-up">Hechos en Misiones,<br>colocados en el NEA.</h2>
    <div class="pf-grid">
${cols.map((c, i) => `      <div class="pf-col" data-parallax="${[6, -6, 4][i]}">\n        ${c.join('\n        ')}\n      </div>`).join('\n')}
    </div>
    <div class="pf-foot"><a class="btn btn-line" href="https://www.instagram.com/ultragraf_carteles/" target="_blank" rel="noopener"><svg><use href="#i-ig"/></svg>Ver más en Instagram</a></div>
  </div>
</section>

<section class="sec" id="nosotros">
  <div class="wrap about">
    <div>
      <div class="sec-num rv-up"><b>03</b>Quiénes somos</div>
      <h2 class="rv-up">Una fábrica joven<br>con equipo propio.</h2>
      <p class="lead rv-up">En ULTRAGRAF somos una empresa joven y dinámica, fundada en 2016, dedicada a ofrecer soluciones integrales en comunicación visual y diseño arquitectónico comercial.</p>
    </div>
    <div class="about-img">
      ${img('equipo-ultragraf', 'Equipo de UltraGraf en la planta de producción', '', 'rv-up', SZ.ab)}
    </div>
  </div>
</section>

<section class="sec" id="mvv" style="padding-top:0">
  <div class="wrap">
    <div class="mvv">
      <div class="mvv-it rv-up">
        <div class="mvv-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg></div>
        <h2>Misión</h2>
        <p>Desarrollar proyectos que encanten a los clientes en cada detalle, superando expectativas con creatividad y precisión. La calidad de nuestro trabajo y la satisfacción del cliente son nuestros mayores diferenciales, impulsando recomendaciones y consolidando nuestra reputación en el mercado.</p>
      </div>
      <div class="mvv-it rv-up">
        <div class="mvv-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg></div>
        <h2>Visión</h2>
        <p>Conquistar la plena confianza de nuestros clientes, ofreciendo la certeza de una empresa comprometida con la excelencia. Contamos con un equipo altamente calificado, dedicado a atender con precisión y eficiencia las necesidades de cada proyecto, reforzando nuestro compromiso con resultados de alto nivel.</p>
      </div>
      <div class="mvv-it rv-up">
        <div class="mvv-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3h4v3a2 2 0 1 0 0 4v3h-3a2 2 0 1 1-4 0H4V9h3a2 2 0 1 0 3-3z"/><path d="M14 13h3a2 2 0 1 1 0 4h-3z"/></svg></div>
        <h2>Valores</h2>
        <p>Nuestro compromiso con la calidad, responsabilidad en cada etapa del proceso y modernidad en las soluciones que ofrecemos. Cultivamos la confianza mutua con nuestros clientes y socios, basando nuestras acciones en el respeto, que guía todas nuestras relaciones y decisiones.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="nea" style="padding-top:0;padding-bottom:clamp(2rem,4vw,3rem)">
  <div class="wrap">
    <div class="nea rv-up">${'<svg><use href="#i-truck"/></svg>'}<div><b>Transporte y colocación en todo el NEA. Envíos a todo el país.</b><span>Escribinos desde dónde sos y vemos cómo llegar con tu proyecto.</span></div></div>
  </div>
</section>

<section class="sec" id="faq" style="padding-top:0">
  <div class="wrap">
    <div class="sec-num rv-up"><b>04</b>Preguntas frecuentes</div>
    <h2 class="rv-up">Antes de escribirnos.</h2>
    <div class="faq">
      <details><summary>¿El presupuesto tiene costo?</summary><p>No. Los presupuestos son sin cargo, y hacemos visitas con atención personalizada.</p></details>
      <details><summary>¿Qué materiales usan para las letras corpóreas?</summary><p>Chapa, impresión 3D, polyfan, acrílico, PVC y acero inoxidable, con o sin iluminación.</p></details>
      <details><summary>¿Se encargan de la colocación?</summary><p>Sí. Fabricamos en nuestra planta, colocamos con camión grúa propio en todo el NEA e instalamos en todo el país.</p></details>
      <details><summary>¿Hacen ploteo de vehículos?</summary><p>Sí: ploteo vehicular completo o parcial y gráfica autoadhesiva.</p></details>
      <details><summary>¿Cómo pido un presupuesto?</summary><p>Por WhatsApp al +54 3754 531596 o al +54 3754 469388. Enviá fotos del lugar y una idea de lo que necesitás.</p></details>
    </div>
  </div>
</section>

<section class="geo">
  <div class="wrap">
    <p><strong>UltraGraf</strong> es una industria publicitaria de <strong>San Javier, Misiones (Argentina)</strong>, fundada en 2016, con planta de producción de más de 700&nbsp;m² en Roque González 430. Fabrica <strong>fachadas premium en ACM y ACM 3D</strong>, <strong>letras corpóreas</strong> en chapa, impresión 3D, polyfan, acrílico, PVC y acero inoxidable, <strong>carteles back light y neón LED</strong>, <strong>tótems en ACM</strong>, <strong>carteles de ruta y pórticos</strong>, <strong>ploteo vehicular</strong>, gráfica autoadhesiva, impresiones en gran formato, grabados láser, impresiones 3D y trofeos. Realiza transporte y colocación con camión grúa en todo el <strong>NEA</strong> e instala en <strong>todo el país</strong>. Presupuestos sin cargo por WhatsApp al +54 3754 531596.</p>
  </div>
</section>

<section class="sec" id="contacto">
  <div class="wrap">
    <div class="sec-num rv-up"><b>05</b>Contacto</div>
    <h2 class="rv-up">Escribinos<br>o pasá por la planta.</h2>
    <div class="ct-grid">
      <ul class="ct-list rv-up">
        <li><svg><use href="#i-pin"/></svg><div><b>Dirección</b><span>Roque González 430<br>San Javier, Misiones, Argentina</span></div></li>
        <li><svg><use href="#i-clock"/></svg><div><b>Horario</b><span>Lunes a viernes: 8 a 12 h y 15 a 19 h<br>Sábado y domingo: cerrado</span></div></li>
        <li><svg><use href="#i-phone"/></svg><div><b>WhatsApp</b><a href="${wa('Hola UltraGraf, quiero pedir un presupuesto.')}" target="_blank" rel="noopener" data-loc="contacto">+54 3754 531596</a><br><a href="${wa('Hola UltraGraf, quiero pedir un presupuesto.', WA2)}" target="_blank" rel="noopener" data-loc="contacto-2">+54 3754 469388</a></div></li>
        <li><svg><use href="#i-mail"/></svg><div><b>Correo</b><a href="mailto:ultragraf.carteles24@gmail.com">ultragraf.carteles24@gmail.com</a></div></li>
        <li><svg><use href="#i-ig"/></svg><div><b>Instagram</b><a href="https://www.instagram.com/ultragraf_carteles/" target="_blank" rel="noopener">@ultragraf_carteles</a></div></li>
        <li><svg><use href="#i-fb"/></svg><div><b>Facebook</b><a href="https://www.facebook.com/p/UltraGraf-100033686870263/" target="_blank" rel="noopener">UltraGraf</a></div></li>
        <li><a class="btn btn-acc" href="https://www.google.com/maps/dir/?api=1&amp;destination=Roque+Gonz%C3%A1lez+430,+San+Javier,+Misiones,+Argentina" target="_blank" rel="noopener">Cómo llegar</a></li>
      </ul>
      <div class="map rv-up">
        <svg class="map-pin"><use href="#i-pin"/></svg>
        <p>Roque González 430, San Javier, Misiones</p>
        <button class="btn btn-line" type="button" data-map-load>Abrir mapa</button>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="presupuesto">
  <div class="wrap cta-grid">
    <div>
      <div class="sec-num rv-up"><b>06</b>Presupuesto</div>
      <h2 class="rv-up">Contanos tu idea.</h2>
      <p class="lead rv-up">Completá los datos y la conversación se abre en WhatsApp con todo escrito. Si preferís, mandanos directo fotos y medidas.</p>
      <a class="btn btn-acc" style="margin-top:1.6rem" href="${wa('Hola UltraGraf, quiero pedir un presupuesto sin cargo.')}" target="_blank" rel="noopener" data-loc="cta-final">${IWA}Hablar con UltraGraf</a>
    </div>
    <form class="form rv-up" id="form-presupuesto" data-wa-form="Hola UltraGraf, quiero pedir un presupuesto.">
      <label>Tu nombre<input name="Nombre" required autocomplete="name"></label>
      <label>WhatsApp<input name="WhatsApp" type="tel" required autocomplete="tel" placeholder="+54 9 3754 000000"></label>
      <label>Servicio
        <select name="Servicio" required>
          <option value="">Elegí…</option>
          ${services.map(s => `<option>${s[2]}</option>`).join('')}<option>Otro</option>
        </select>
      </label>
      <label>Ciudad<input name="Ciudad" autocomplete="address-level2" placeholder="San Javier"></label>
      <button class="btn btn-acc" type="submit">${IWA}Enviar por WhatsApp</button>
      <small>Tus datos van solo en el mensaje de WhatsApp.</small>
    </form>
  </div>
</section>

</main>

<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div>
        <a href="./" class="brand" aria-label="UltraGraf — inicio"><img src="assets/img/logo-blanco.webp" alt="UltraGraf Industria Publicitaria" width="420" height="95" loading="lazy"></a>
        <p style="margin-top:1rem">UltraGraf · Industria Publicitaria<br>Roque González 430<br>San Javier, Misiones, Argentina</p>
      </div>
      <div><h4>Servicios</h4><ul><li><a href="fachadas-acm.html">Fachadas en ACM</a></li><li><a href="letras-corporeas.html">Letras corpóreas</a></li><li><a href="totems-acm.html">Tótems y carteles de ruta</a></li><li><a href="ploteo-vehicular.html">Ploteo vehicular</a></li><li><a href="puertas-revestimientos-acm.html">Puertas y revestimientos en ACM</a></li></ul></div>
      <div><h4>Contacto</h4><ul><li><a href="${wa('Hola UltraGraf')}" target="_blank" rel="noopener" data-loc="footer">+54 3754 531596</a></li><li><a href="${wa('Hola UltraGraf', WA2)}" target="_blank" rel="noopener" data-loc="footer-2">+54 3754 469388</a></li><li><a href="mailto:ultragraf.carteles24@gmail.com">ultragraf.carteles24@gmail.com</a></li><li>Lun–Vie · 8–12 h · 15–19 h</li></ul></div>
    </div>
    <div class="ftr-bot">© 2026 UltraGraf · Materializamos tus ideas</div>
  </div>
</footer>

<a class="wa-fab" href="${wa('Hola UltraGraf, quiero pedir un presupuesto.')}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp" data-loc="flotante"><svg><use href="#i-wa"/></svg></a>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="assets/site.js?v=2" defer></script>
</body>
</html>
`;
fs.writeFileSync(OUT + 'index.html', html);
console.log('index.html', html.length);
