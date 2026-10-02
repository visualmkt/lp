(function () {
  var WA = '5555997067778';
  window.dataLayer = window.dataLayer || [];

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
      f.src = 'https://maps.google.com/maps?q=-27.4637521,-53.9232249&z=16&output=embed';
      f.title = 'Mapa: Zoonn Comunicação Visual, Av. Ijuí, 667, Três Passos – RS';
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
  if (reduce || !window.gsap || !window.ScrollTrigger) {
    document.querySelectorAll('.rv-up').forEach(function (el) { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  var k = window.matchMedia('(max-width: 767px)').matches ? 0.5 : 1;

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
