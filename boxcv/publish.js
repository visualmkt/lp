// Sobe as imagens (FormData), reconstrói a página com as URLs do WP e cria/atualiza a página /letreiro/ (elementor_canvas, wp:html).
// Uso: node publish.js [draft|publish]
require('c:/dev/node_modules/dotenv').config({ path: 'c:/dev/.env' });
const fs = require('fs');
const { execFileSync } = require('child_process');
const D = __dirname.replace(/\\/g, '/');
const base = new URL(process.env.BOXCV_WP_URL).origin;
const auth = 'Basic ' + Buffer.from(process.env.BOXCV_WP_USER + ':' + process.env.BOXCV_WP_APP_PASSWORD).toString('base64');
const status = process.argv[2] || 'draft';
(async () => {
  const src = fs.readFileSync(`${D}/build.js`, 'utf8');
  const keys = [...src.matchAll(/^\s{2}(\w+): \[(\d+), '([\w-]+)', /gm)].map(m => ({ k: m[1], name: m[3] }));
  const f = `${D}/media-urls.json`;
  const urls = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
  for (const { k, name } of keys) {
    if (urls[k]) continue;
    const buf = fs.readFileSync(`${D}/out/img/${name}.webp`);
    const fd = new FormData();
    fd.append('file', new Blob([buf], { type: 'image/webp' }), name + '.webp');
    fd.append('alt_text', name.replace(/-/g, ' '));
    const r = await fetch(base + '/wp-json/wp/v2/media', { method: 'POST', headers: { Authorization: auth }, body: fd });
    const j = await r.json();
    if (!r.ok) throw new Error(`upload ${name}: ${r.status} ${JSON.stringify(j).slice(0, 200)}`);
    urls[k] = j.source_url; fs.writeFileSync(f, JSON.stringify(urls, null, 2));
    console.log('upload', k, j.id, j.source_url.split('/').slice(-1)[0]);
  }
  execFileSync('node', [`${D}/build.js`, '--urls'], { stdio: 'inherit' });
  const frag = fs.readFileSync(`${D}/out/fragment.html`, 'utf8');
  const body = {
    title: 'Letreiro e Letra Caixa para Empresas', slug: 'letreiro', status, template: 'elementor_canvas',
    content: '<!-- wp:html -->\n' + frag + '\n<!-- /wp:html -->',
    excerpt: 'Letreiro e letra caixa sob medida para empresas: iluminada com LED, 3D em relevo, dourada espelhada e letreiros luminosos. Box Comunicação Visual, Santo André (SP).',
  };
  const idF = `${D}/page-id.txt`;
  const id = fs.existsSync(idF) ? fs.readFileSync(idF, 'utf8').trim() : null;
  const r = await fetch(base + '/wp-json/wp/v2/pages' + (id ? '/' + id : ''), { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json();
  if (!r.ok) throw new Error('page: ' + r.status + ' ' + JSON.stringify(j).slice(0, 300));
  fs.writeFileSync(idF, String(j.id));
  console.log('PÁGINA', j.id, j.status, j.template, j.link);
})().catch(e => { console.error('ERRO', e.message); process.exit(1); });
