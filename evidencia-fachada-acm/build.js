// Build da LP Gráfica Evidência /fachada-acm/: pré-renderiza o HTML (SEO/curl) a partir do config.json,
// compila o CSS (Tailwind, sem CDN) e valida classes e copy proibida.
// Uso: node build.js
const fs = require('fs');
const { execFileSync } = require('child_process');
const sharp = require('c:/dev/node_modules/sharp');
const D = __dirname.replace(/\\/g, '/');
const TW = 'c:/dev/ebg-build/node_modules/tailwindcss/lib/cli.js';

(async () => {
  const c = JSON.parse(fs.readFileSync(`${D}/config.json`, 'utf8'));
  const ICONS = JSON.parse(fs.readFileSync(`${D}/icons.json`, 'utf8'));
  const renderJs = fs.readFileSync(`${D}/render.js`, 'utf8');
  const renderAll = new Function('ICONS', 'c', renderJs + '\nreturn renderAll(c, ICONS);');
  const staticHtml = renderAll(ICONS, c);

  // foto real da fachada (única foto real de fachada disponível), otimizada
  if (!fs.existsSync(`${D}/${c.gallery.image}`)) {
    await sharp('c:/lp/evidencia-letreiro/empresa-producao.webp').resize({ width: 1200 }).webp({ quality: 78 }).toFile(`${D}/${c.gallery.image}`);
  }

  const schema = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness', name: c.footer.name, url: 'https://graficaevidencia.com/fachada-acm/',
    telephone: c.contact.phoneTel, image: c.brand.logo, description: c.meta.description,
    address: { '@type': 'PostalAddress', streetAddress: c.address.street, addressLocality: c.address.city, addressRegion: c.address.state, addressCountry: 'BR' },
    openingHours: c.address.schemaHours, areaServed: c.address.areaServed,
  };
  const noscript = `${c.footer.name} — ${c.footer.address} — ${c.footer.hours} — WhatsApp: ${c.contact.phoneDisplay}`;
  const rep = { TITLE: c.meta.title, DESC: c.meta.description, LOGO: c.brand.logo, SCHEMA: JSON.stringify(schema), STATIC: staticHtml, NOSCRIPT: noscript, ICONS: JSON.stringify(ICONS), CONFIG: JSON.stringify(c), RENDER: renderJs };
  let html = fs.readFileSync(`${D}/index.src.html`, 'utf8');
  for (const [k, v] of Object.entries(rep)) html = html.split(`{{${k}}}`).join('\u0000' + k + '\u0000');
  for (const [k, v] of Object.entries(rep)) html = html.split('\u0000' + k + '\u0000').join(v);
  if (/\{\{[A-Z]+\}\}/.test(html)) throw new Error('placeholder sobrando');

  // CSS: classes reais do DOM (HTML pré-renderizado + shell)
  const classes = new Set();
  for (const m of (staticHtml + html.replace(/<script[\s\S]*?<\/script>/g, '')).matchAll(/\bclass="([^"]*)"/g)) m[1].split(/\s+/).filter(Boolean).forEach(x => classes.add(x));
  const tmp = 'c:/dev/ebg-build/tmp-evidencia';
  fs.mkdirSync(tmp, { recursive: true });
  fs.writeFileSync(`${tmp}/classes.html`, [...classes].map(x => `<div class="${x}"></div>`).join('\n'));
  fs.writeFileSync(`${tmp}/input.css`, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
  fs.writeFileSync(`${tmp}/tailwind.config.js`, 'module.exports = ' + JSON.stringify({
    content: [`${tmp}/classes.html`],
    theme: { extend: { colors: { brand: '#EA0A0A', dark: '#111111', gold: '#FFA800' }, fontFamily: { title: ['Poppins', 'sans-serif'], body: ['Barlow', 'sans-serif'] } } },
  }) + ';');
  execFileSync('node', [TW, '-c', `${tmp}/tailwind.config.js`, '-i', `${tmp}/input.css`, '-o', `${D}/style.css`, '--minify'], { stdio: 'pipe' });
  const css = fs.readFileSync(`${D}/style.css`, 'utf8');
  const have = new Set();
  for (const m of css.matchAll(/\.((?:\\[0-9a-fA-F]{1,6} ?|\\.|[A-Za-z0-9_-])+)/g)) have.add(m[1].replace(/\\([0-9a-fA-F]{1,6}) ?/g, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/\\(.)/g, '$1'));
  const inline = (html.match(/<style[\s\S]*?<\/style>/) || [''])[0];
  const missing = [...classes].filter(x => x !== 'inline-svg' && !have.has(x) && !new RegExp('\\.' + x.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '(?![\\w-])').test(inline));

  // copy proibida (texto visível + config + meta)
  const visible = (staticHtml + ' ' + JSON.stringify(c)).replace(/<[^>]*>/g, ' ');
  const bad = [...visible.matchAll(/pre[cç]o|valor|a partir de|garantia|prazo|\b24 ?h|resposta em|projet|arte inclu|instala|gratuit|entrega r[aá]pida|anos de experi|r[aá]pid[oa]|sem compromisso|mensal|R\$/gi)].map(m => m[0]);

  fs.writeFileSync(`${D}/index.html`, html);
  const h1 = (staticHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`index.html=${html.length}B style.css=${css.length}B classes=${classes.size} faltando=${missing.length}${missing.length ? ' → ' + missing.join(' ') : ''}`);
  console.log(`H1="${h1}" | wa links=${(staticHtml.match(/api\.whatsapp\.com/g) || []).length} | copy proibida: ${bad.length ? bad.join(', ') : 'nenhuma'} | meta.description=${c.meta.description.length} chars | title=${c.meta.title.length} chars`);
  if (bad.length || missing.length) process.exit(2);
})().catch(e => { console.error('ERRO', e.stack || e.message); process.exit(1); });
