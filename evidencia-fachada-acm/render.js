// Renderizador da LP (roda no navegador e no build, para pré-renderizar o HTML estático).
function renderAll(c, ICONS) {
  function icon(name, cls) {
    var d = ICONS[name];
    if (!d) return '';
    var paths = d.paths.map(function (p) { return '<path fill="currentColor" d="' + p + '"></path>'; }).join('');
    return '<svg class="inline-svg ' + (cls || '') + '" viewBox="' + d.viewBox + '" style="display:inline-block;width:1em;height:1em;vertical-align:-0.125em" aria-hidden="true">' + paths + '</svg>';
  }
  var num = c.contact.whatsapp;
  var msg = c.contact.whatsappMsgDefault;
  function wa(m) { return 'https://api.whatsapp.com/send?phone=' + num + '&text=' + encodeURIComponent(m || msg); }
  function waBtn(label, loc, cls) {
    return '<a href="' + wa() + '" target="_blank" rel="noopener noreferrer" data-action="whatsapp" data-location="' + loc + '" class="' + cls + '">' + icon('whatsapp', 'mr-2 text-lg') + label + '</a>';
  }

  var h = c.hero;
  var header = '\n  <header class="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b-2 border-brand shadow-sm">\n' +
    '    <div class="max-w-6xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">\n' +
    '      <a href="#" class="flex items-center min-w-0"><img src="' + c.brand.logo + '" alt="' + c.brand.logoAlt + '" width="600" height="209" class="h-10 md:h-12 w-auto"></a>\n' +
    '      <div class="flex items-center gap-2 md:gap-4 shrink-0">\n' +
    '        <a href="tel:' + c.contact.phoneTel + '" class="hidden md:flex items-center gap-2 text-slate-500 hover:text-brand transition-colors text-sm font-semibold font-body">' + icon('phone', 'text-brand text-xs') + c.contact.phoneDisplay + '</a>\n' +
    '        ' + waBtn('Orçamento', 'header', 'flex items-center bg-brand hover:bg-red-700 text-white font-body font-semibold text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all shadow-lg') + '\n' +
    '      </div>\n    </div>\n  </header>';

  var hero = '\n  <section class="relative flex items-center text-white pt-20 overflow-hidden bg-dark" style="min-height:92vh">\n' +
    '    <div class="absolute inset-0 bg-dark"></div>\n    <div class="hero-glow absolute inset-0"></div>\n' +
    '    <div class="relative max-w-5xl mx-auto px-4 py-14 md:py-24 text-center">\n' +
    '      <div class="inline-flex items-center gap-2 border border-brand/60 bg-brand/15 text-gold px-4 py-2 rounded-full text-sm font-body font-semibold mb-8">' + icon('ruler-combined', 'text-gold text-xs') + h.badge + '</div>\n' +
    '      <h1 class="font-title font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6">' + h.h1Pre + '<br><span class="text-brand">' + h.h1Highlight + '</span></h1>\n' +
    '      <p class="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-body leading-relaxed">' + h.subtitle + '</p>\n' +
    '      <div class="flex flex-wrap items-center justify-center gap-4 mb-10 text-white/80 text-sm font-body">\n' +
    '        <span class="inline-flex items-center gap-1.5">' + icon('whatsapp', 'text-gold text-xs') + 'Orçamento pelo WhatsApp</span>\n' +
    '        <span class="inline-flex items-center gap-1.5">' + icon('layer-group', 'text-gold text-xs') + 'Fachada, painel e placa em ACM</span>\n' +
    '        <span class="inline-flex items-center gap-1.5">' + icon('location-dot', 'text-gold text-xs') + 'Ipixuna do Pará e região</span>\n' +
    '      </div>\n' +
    '      <div class="flex justify-center">' + waBtn(h.ctaPrimary, 'hero', 'flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-body font-semibold text-lg px-8 md:px-10 py-4 md:py-5 rounded-2xl shadow-2xl transition-all hover:scale-105 wha-pulse') + '</div>\n' +
    '    </div>\n  </section>';

  var trust = '\n  <section class="py-10 bg-white border-b border-slate-100">\n    <div class="max-w-5xl mx-auto px-4">\n      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">' +
    c.trust.map(function (t) {
      return '\n        <div class="flex flex-col items-center text-center p-4">\n          <div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-3 bg-brand/10">' + icon(t.icon, 'text-xl md:text-2xl text-brand') + '</div>\n' +
        '          <p class="font-title font-semibold text-sm md:text-base tracking-tight leading-tight text-dark">' + t.title + '</p>\n          <p class="text-slate-500 text-xs mt-0.5 font-body">' + t.subtitle + '</p>\n        </div>';
    }).join('') + '\n      </div>\n    </div>\n  </section>';

  var s = c.services;
  var services = '\n  <section id="servicos" class="py-20 md:py-28 bg-slate-50">\n    <div class="max-w-6xl mx-auto px-4">\n' +
    '      <div class="text-center mb-12">\n        <span class="text-brand font-title font-semibold text-xs uppercase tracking-[.15em]">' + s.kicker + '</span>\n' +
    '        <h2 class="font-title font-semibold text-3xl md:text-4xl leading-snug tracking-tight text-dark mt-2">' + s.title + '</h2>\n      </div>\n' +
    '      <div class="grid md:grid-cols-3 gap-6">' +
    s.items.map(function (it) {
      return '\n        <article class="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col">\n' +
        '          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-brand/10">' + icon(it.icon, 'text-2xl text-brand') + '</div>\n' +
        '          <h3 class="font-title font-semibold text-xl text-dark mb-3">' + it.title + '</h3>\n' +
        '          <p class="text-slate-600 font-body leading-relaxed mb-5">' + it.desc + '</p>\n' +
        '          <ul class="space-y-2 mt-auto">' + it.bullets.map(function (b) { return '\n            <li class="flex items-start gap-2 text-sm text-slate-600 font-body">' + icon('check', 'text-brand mt-0.5 shrink-0') + '<span>' + b + '</span></li>'; }).join('') + '\n          </ul>\n        </article>';
    }).join('') + '\n      </div>\n' +
    '      <p class="text-center text-slate-600 font-body mt-10">' + s.letraNote + ' <a href="' + s.letraHref + '" class="text-brand font-semibold underline underline-offset-4 hover:text-red-700">' + s.letraLink + '</a></p>\n    </div>\n  </section>';

  var g = c.gallery;
  var gallery = '\n  <section class="py-20 md:py-28 bg-dark text-white">\n    <div class="max-w-6xl mx-auto px-4">\n      <div class="grid md:grid-cols-2 gap-12 items-center">\n' +
    '        <div>\n          <span class="text-gold font-title font-semibold text-xs uppercase tracking-[.15em]">' + g.kicker + '</span>\n' +
    '          <h2 class="font-title font-semibold text-3xl md:text-4xl leading-snug tracking-tight mt-3 mb-5">' + g.title + '</h2>\n' +
    '          <p class="text-slate-300 font-body leading-relaxed mb-4">' + g.text + '</p>\n          <p class="text-slate-400 text-sm font-body">' + g.caption + '</p>\n        </div>\n' +
    '        <div class="rounded-3xl overflow-hidden shadow-2xl"><img src="' + g.image + '" alt="' + g.imageAlt + '" width="1200" height="900" class="w-full h-auto object-cover" loading="lazy" decoding="async"></div>\n' +
    '      </div>\n    </div>\n  </section>';

  var st = c.steps;
  var steps = '\n  <section class="py-20 md:py-28 bg-white">\n    <div class="max-w-5xl mx-auto px-4">\n      <h2 class="font-title font-semibold text-3xl md:text-4xl leading-snug tracking-tight text-dark text-center mb-12">' + st.title + '</h2>\n      <div class="grid md:grid-cols-3 gap-6">' +
    st.items.map(function (it, i) {
      return '\n        <div class="rounded-3xl p-8 border border-slate-200 bg-slate-50">\n          <span class="font-title font-bold text-5xl text-brand">0' + (i + 1) + '</span>\n          <h3 class="font-title font-semibold text-xl text-dark mt-3 mb-2">' + it.title + '</h3>\n          <p class="text-slate-600 font-body text-sm leading-relaxed">' + it.desc + '</p>\n        </div>';
    }).join('') + '\n      </div>\n    </div>\n  </section>';

  var r = c.region;
  var region = '\n  <section id="regiao" class="py-20 md:py-24 bg-slate-50">\n    <div class="max-w-4xl mx-auto px-4 text-center">\n' +
    '      <span class="text-brand font-title font-semibold text-xs uppercase tracking-[.15em]">' + r.kicker + '</span>\n' +
    '      <h2 class="font-title font-semibold text-3xl md:text-4xl leading-snug tracking-tight text-dark mt-2 mb-4">' + r.title + '</h2>\n' +
    '      <p class="text-slate-600 font-body max-w-2xl mx-auto mb-8">' + r.text + '</p>\n' +
    '      <div class="flex flex-wrap justify-center gap-3">' + r.cities.map(function (x) { return '<span class="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-2 text-sm font-semibold text-dark font-body">' + icon('location-dot', 'text-brand') + x + '</span>'; }).join('') + '</div>\n    </div>\n  </section>';

  var ct = c.ctaFinal;
  var cta = '\n  <section class="py-20 md:py-28 bg-brand text-white text-center">\n    <div class="max-w-3xl mx-auto px-4">\n' +
    '      <h2 class="font-title font-semibold text-3xl md:text-5xl leading-snug tracking-tight mb-4">' + ct.title + '</h2>\n' +
    '      <p class="text-white/90 font-body text-lg mb-10 max-w-xl mx-auto leading-relaxed">' + ct.subtitle + '</p>\n' +
    '      <div class="flex justify-center">' + waBtn(ct.cta, 'cta-final', 'inline-flex items-center justify-center bg-white text-brand hover:bg-slate-50 font-body font-semibold text-lg px-8 md:px-10 py-4 md:py-5 rounded-2xl shadow-2xl transition-all hover:scale-105') + '</div>\n    </div>\n  </section>';

  var f = c.footer;
  var footer = '\n  <footer class="bg-dark text-white py-16">\n    <div class="max-w-4xl mx-auto px-4 text-center">\n' +
    '      <p class="font-title font-semibold text-2xl tracking-tight mb-1">' + f.name + '</p>\n' +
    '      <p class="text-slate-400 text-sm font-body mb-1">' + f.address + '</p>\n' +
    '      <p class="text-slate-400 text-sm font-body mb-1">' + f.hours + '</p>\n' +
    '      <p class="text-slate-400 text-sm font-body mb-6">' + f.tagline + '</p>\n' +
    '      <div class="flex items-center justify-center gap-4 mb-8">\n' +
    '        <a href="tel:' + c.contact.phoneTel + '" class="flex items-center gap-1.5 text-slate-400 hover:text-gold transition text-sm font-body">' + icon('phone', 'text-xs') + c.contact.phoneDisplay + '</a>\n' +
    '        <span class="text-slate-700">|</span>\n' +
    '        <a href="' + wa() + '" target="_blank" rel="noopener noreferrer" data-action="whatsapp" data-location="footer" class="flex items-center gap-1.5 text-slate-400 hover:text-green-400 transition text-sm font-body">' + icon('whatsapp', 'text-sm') + 'WhatsApp</a>\n      </div>\n' +
    '      <div class="dashline text-slate-700 mb-6"></div>\n      <p class="text-slate-600 text-xs font-body">' + f.copyright + '</p>\n' +
    '      <p class="text-slate-700 text-xs mt-1 font-body">Desenvolvido por <a href="https://visualmkt.com.br" class="hover:text-gold transition" target="_blank" rel="noopener">VisualMKT</a></p>\n    </div>\n  </footer>';

  var floating = '\n  <a href="' + wa() + '" target="_blank" rel="noopener noreferrer" data-action="whatsapp" data-location="flutuante" aria-label="Pedir orçamento pelo WhatsApp" class="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-body font-semibold py-3 px-4 sm:px-5 rounded-full shadow-2xl wha-pulse transition-all hover:scale-105">' + icon('whatsapp', 'text-2xl') + '<span class="hidden sm:inline text-sm">Orçamento pelo WhatsApp</span></a>';

  return header + hero + trust + services + gallery + steps + region + cta + footer + floating;
}
