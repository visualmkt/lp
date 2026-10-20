// Gera páginas de teste só com o topo (header + hero + faixa amarela). Rodar depois de _build.js.
const fs = require('fs');
const ROOT = 'd:/andrezao/lp/ultragraf/';
const home = fs.readFileSync(ROOT + 'index.html', 'utf8');
const cutAt = home.indexOf('<section class="obj"');
if (cutAt < 0) throw new Error('seção obj não encontrada');
const top = home.slice(0, cutAt) + '</main>\n';
const tail = home.slice(home.indexOf('<script src="https://cdnjs'), home.indexOf('</body>'));

const OPTS = {
  'hero-a': {
    label: 'OPÇÃO A — logo e menu maiores NA MESMA LINHA (faixa cinza só no lado do logo, menu à direita sobre o preto)',
    css: `
@media(min-width:901px){
  .hdr{display:block;position:relative;z-index:60}
  .hdr-top{min-height:clamp(110px,13vw,170px);padding-block:1rem}
  .hdr-top::before{clip-path:polygon(0 0,52% 0,40% 100%,0 100%)}
  .hdr-top::after{clip-path:polygon(0 0,52% 0,calc(40% - 3px) 100%,0 100%)}
  .hdr .hdr-top .brand img{height:clamp(66px,8.4vw,112px)}
  .hdr .hdr-nav{position:absolute;right:max(20px,calc((100vw - var(--max))/2 + 20px));top:0;height:clamp(110px,13vw,170px);flex-wrap:nowrap;background:transparent;border:0;padding:0;gap:clamp(1.3rem,2.6vw,2.6rem);z-index:70}
  .hdr .hdr-nav>a,.hdr .hdr-nav .dd>a{font-size:clamp(.95rem,1.45vw,1.2rem)}
  .hdr .hdr-nav .dd-m a{font-size:.95rem}
}
@media(max-width:900px){
  .hdr .hdr-top .brand img{height:clamp(46px,12vw,70px)}
  .hdr .hdr-nav>a,.hdr .hdr-nav .dd>a{font-size:clamp(.8rem,3vw,1rem)}
  .hdr .hdr-nav{padding:.8rem 12px}
}`,
  },
  'hero-b': {
    label: 'OPÇÃO B — mesmo desenho empilhado do mockup, mas TUDO escalado junto (logo, menu, frase, botões e faixa)',
    css: `
.hdr-top{min-height:clamp(120px,18vw,220px)}
.hdr .hdr-top .brand img{height:clamp(52px,10vw,124px)}
.hdr .hdr-nav{padding:1.05rem 12px;gap:.5rem clamp(1.2rem,4.5vw,4rem)}
.hdr .hdr-nav>a,.hdr .hdr-nav .dd>a{font-size:clamp(.82rem,1.7vw,1.3rem)}
.hdr .hdr-nav .dd-m a{font-size:.95rem}
.hero{min-height:clamp(440px,60vw,720px)}
.hero .sub{font-size:clamp(1.1rem,2.5vw,1.75rem);max-width:36ch}
.hero .btn{font-size:clamp(.95rem,1.7vw,1.25rem);padding:1.1rem clamp(1.3rem,2.4vw,2.2rem)}
.ti b{font-size:clamp(1rem,2vw,1.7rem)}
.ti small{font-size:clamp(.6rem,1.1vw,.85rem)}
.ti-row .big{font-size:clamp(1.2rem,2.5vw,2.1rem)}
@media(max-width:900px){.hdr .hdr-nav>a,.hdr .hdr-nav .dd>a{font-size:clamp(.78rem,3.2vw,1.05rem)}}`,
  },
};

for (const [name, o] of Object.entries(OPTS)) {
  let html = top.replace('<title>', '<title>[TESTE ' + name.slice(-1).toUpperCase() + '] ')
    .replace('</head>', `<style>${o.css}\n.opt-label{position:fixed;left:0;right:0;bottom:0;z-index:200;background:#c00;color:#fff;font:700 .8rem/1.3 system-ui,sans-serif;padding:.5rem 12px;text-align:center}</style>\n</head>`)
    .replace('</main>', `</main>\n<div class="opt-label">${o.label}</div>`);
  html += tail + '</body>\n</html>\n';
  fs.writeFileSync(ROOT + name + '.html', html);
  console.log(name + '.html', html.length);
}
