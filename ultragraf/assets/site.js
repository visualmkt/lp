(function () {
  window.dataLayer = window.dataLayer || [];
  var WA = '5493754531596';

  var hdr = document.querySelector('.hdr');
  var onScroll = function () { hdr && hdr.classList.toggle('solid', window.scrollY > 40); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="wa.me"]');
    if (!a) return;
    window.dataLayer.push({ event: 'whatsapp_click', location: a.dataset.loc || 'indefinido', service: a.dataset.svc || '' });
  });

  var mapBtn = document.querySelector('[data-map-load]');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var box = mapBtn.closest('.map');
      var f = document.createElement('iframe');
      f.src = 'https://maps.google.com/maps?q=Av.+Roque+Gonz%C3%A1lez+43,+San+Javier,+Misiones,+Argentina&z=16&output=embed';
      f.title = 'Mapa: UltraGraf, Av. Roque González 43, San Javier, Misiones';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      box.appendChild(f);
    });
  }

  document.querySelectorAll('form[data-wa-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var lines = [form.dataset.waForm];
      d.forEach(function (v, k) { if (String(v).trim()) lines.push(k + ': ' + String(v).trim()); });
      window.dataLayer.push({ event: 'lead_form', form: form.id || 'form' });
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bgv = document.getElementById('bgVideo');
  var fb = document.querySelector('.cine-fallback');
  var hasVideo = false;

  if (bgv) {
    var land = window.innerWidth > window.innerHeight;
    var src = land ? bgv.dataset.srcD : bgv.dataset.srcM;
    bgv.addEventListener('loadedmetadata', function () { hasVideo = true; bgv.classList.add('on'); });
    bgv.addEventListener('error', function () { hasVideo = false; bgv.classList.remove('on'); });
    if (src) bgv.src = src;
  }

  if (reduce || !window.gsap || !window.ScrollTrigger) {
    document.querySelectorAll('.rv-up').forEach(function (el) { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  var k = window.matchMedia('(max-width: 767px)').matches ? 0.5 : 1;

  if (bgv) {
    var END = function () { return Math.max(0, bgv.duration - 0.05); };
    var startScrub = function () {
      if (!bgv.duration || isNaN(bgv.duration) || bgv.dataset.ready) return;
      bgv.dataset.ready = '1';
      bgv.pause();
      gsap.to(bgv, {
        currentTime: END(), ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true }
      });
    };
    bgv.addEventListener('loadedmetadata', startScrub);
    bgv.preload = 'auto';
    if (bgv.getAttribute('src')) bgv.load();
    if (bgv.readyState >= 1) startScrub();
  }

  // foto provisória: zoom suave preso à rolagem enquanto não há vídeo
  if (fb) {
    gsap.fromTo(fb, { scale: 1, yPercent: 0 }, {
      scale: 1.18, yPercent: -3, ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true }
    });
  }

  document.querySelectorAll('[data-parallax]').forEach(function (el) {
    var amt = parseFloat(el.dataset.parallax) * k;
    gsap.fromTo(el, { yPercent: -amt }, {
      yPercent: amt, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      gsap.to(en.target, { opacity: 1, y: 0, duration: .8, ease: 'power3.out' });
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.rv-up').forEach(function (el) { io.observe(el); });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
