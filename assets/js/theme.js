document.addEventListener('DOMContentLoaded', function () {

  /* Sticky header */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if (window.scrollY > 40) header.classList.add('is-stuck');
    else header.classList.remove('is-stuck');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* Mobile nav */
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  var overlay = document.querySelector('.nav-overlay');
  var closeBtn = document.querySelector('.mobile-nav-close');
  function openNav(){ mobileNav.classList.add('open'); overlay.classList.add('open'); }
  function closeNav(){ mobileNav.classList.remove('open'); overlay.classList.remove('open'); }
  if (burger) burger.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (overlay) overlay.addEventListener('click', closeNav);

  /* Hero slider */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dots button');
  var current = 0, timer;
  function goTo(i){
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }
  function startAutoplay(){ timer = setInterval(next, 6500); }
  function resetAutoplay(){ clearInterval(timer); startAutoplay(); }
  if (slides.length){
    startAutoplay();
    dots.forEach(function(d, i){ d.addEventListener('click', function(){ goTo(i); resetAutoplay(); }); });
    var nextBtn = document.querySelector('.hero-arrows .next');
    var prevBtn = document.querySelector('.hero-arrows .prev');
    if (nextBtn) nextBtn.addEventListener('click', function(){ next(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', function(){ prev(); resetAutoplay(); });
  }

  /* Testimonial slider: shows as many cards as fit (3 / 2 / 1 per CSS) and
     pages through them; the dots are rebuilt whenever the count changes. */
  var tSlides = document.querySelector('.t-slides');
  var tControls = document.querySelector('.t-controls');
  if (tSlides && tControls){
    var tItems = tSlides.querySelectorAll('.t-slide');
    var tPage = 0, tPages = 1, tTimer;
    function tPerPage(){
      var w = tItems[0].getBoundingClientRect().width;
      return Math.max(1, Math.round(tSlides.getBoundingClientRect().width / w));
    }
    function tRender(){
      tControls.innerHTML = '';
      for (var p = 0; p < tPages; p++){
        var b = document.createElement('button');
        b.setAttribute('aria-label', 'Testimonials page ' + (p + 1));
        if (p === tPage) b.classList.add('active');
        (function(idx){ b.addEventListener('click', function(){ tGoTo(idx); tRestart(); }); })(p);
        tControls.appendChild(b);
      }
    }
    function tGoTo(i){
      tPage = (i + tPages) % tPages;
      tSlides.style.transform = 'translateX(-' + (tPage * 100) + '%)';
      var dots = tControls.querySelectorAll('button');
      dots.forEach(function(d, k){ d.classList.toggle('active', k === tPage); });
    }
    function tLayout(){
      tPages = Math.ceil(tItems.length / tPerPage());
      if (tPage > tPages - 1) tPage = 0;
      tRender();
      tGoTo(tPage);
    }
    function tRestart(){ clearInterval(tTimer); tTimer = setInterval(function(){ tGoTo(tPage + 1); }, 6000); }
    tLayout();
    tRestart();
    var tResize;
    window.addEventListener('resize', function(){ clearTimeout(tResize); tResize = setTimeout(tLayout, 150); });
  }

  /* FAQ accordion: animate <details> open/close instead of snapping. */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var summary = item.querySelector('summary');
    var answer  = item.querySelector('.faq-answer');
    if (!summary || !answer) return;
    var busy = false;
    summary.addEventListener('click', function(e){
      e.preventDefault();
      if (busy) return;
      busy = true;
      if (item.open){
        answer.style.height = answer.scrollHeight + 'px';
        requestAnimationFrame(function(){
          answer.style.height = '0px';
          answer.style.paddingBottom = '0px';
          answer.style.opacity = '0';
        });
        answer.addEventListener('transitionend', function done(ev){
          if (ev.propertyName !== 'height') return;
          answer.removeEventListener('transitionend', done);
          item.open = false;
          answer.style.height = answer.style.paddingBottom = answer.style.opacity = '';
          busy = false;
        });
      } else {
        item.open = true;
        var target = answer.scrollHeight;
        answer.style.height = '0px';
        answer.style.paddingBottom = '0px';
        answer.style.opacity = '0';
        requestAnimationFrame(function(){
          answer.style.height = target + 'px';
          answer.style.paddingBottom = '';
          answer.style.opacity = '1';
        });
        answer.addEventListener('transitionend', function done(ev){
          if (ev.propertyName !== 'height') return;
          answer.removeEventListener('transitionend', done);
          answer.style.height = answer.style.opacity = '';
          busy = false;
        });
      }
    });
  });

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: .15 });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

});

/* ==========================================================================
   Motion layer: GSAP + ScrollTrigger + SplitText + Lenis
   Everything below is additive. If GSAP is missing (CDN blocked, old
   browser) or the visitor prefers reduced motion, nothing here runs and the
   CSS-only behaviour above stays in charge.
   ========================================================================== */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var fine = window.matchMedia('(pointer: fine)').matches;

  /* Preloader must always get out of the way, motion or not. */
  var pre = document.querySelector('.preloader');
  function dropPreloader(fast){
    if (!pre || !pre.parentNode) return;
    if (hasGsap && !reduce && !fast){
      gsap.timeline({ onComplete: function(){ pre.remove(); } })
        .to('.preloader-bar i', { scaleX: 1, duration: .45, ease: 'power2.inOut' })
        .to('.preloader-inner', { y: -24, opacity: 0, duration: .35, ease: 'power2.in' }, '-=.05')
        .to(pre, { yPercent: -100, duration: .7, ease: 'power4.inOut' }, '-=.15');
    } else {
      pre.remove();
    }
  }
  var seen = false;
  try { seen = sessionStorage.getItem('hvac-seen') === '1'; sessionStorage.setItem('hvac-seen', '1'); } catch (e) {}
  if (document.readyState === 'complete') dropPreloader(seen); else window.addEventListener('load', function(){ dropPreloader(seen); });
  setTimeout(function(){ if (pre && pre.parentNode) pre.remove(); }, 3500);

  if (!hasGsap || reduce) return;
  document.documentElement.classList.add('has-motion');
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);

  /* ---------- Smooth scroll (Lenis) ---------- */
  var lenis = null;
  if (window.Lenis){
    lenis = new Lenis({ lerp: .09, wheelMultiplier: 1, anchors: { offset: -90 } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Header: slips away on scroll down, returns on scroll up ---------- */
  var header = document.querySelector('.site-header');
  if (header){
    var hidden = false;
    ScrollTrigger.create({
      start: 220, end: 'max',
      onUpdate: function (self) {
        var down = self.direction === 1;
        if (down && !hidden){ hidden = true; gsap.to(header, { yPercent: -100, duration: .45, ease: 'power3.out' }); }
        else if (!down && hidden){ hidden = false; gsap.to(header, { yPercent: 0, duration: .45, ease: 'power3.out' }); }
      },
      onLeaveBack: function(){ hidden = false; gsap.to(header, { yPercent: 0, duration: .3 }); }
    });
  }

  /* ---------- Helpers ---------- */
  function split(el, type){
    if (!window.SplitText || !el) return null;
    try { return SplitText.create(el, { type: type || 'lines,words', mask: 'lines', linesClass: 'sl', wordsClass: 'sw' }); } catch (e) { return null; }
  }
  var introDelay = (pre && !seen) ? 1.25 : .15;

  /* ---------- Hero choreography ---------- */
  var hero = document.querySelector('.hero');
  if (hero){
    var h1 = hero.querySelector('h1');
    var s = split(h1);
    var tl = gsap.timeline({ delay: introDelay, defaults: { ease: 'power4.out' } });
    tl.from('.hero-tag', { y: 24, opacity: 0, duration: .7 });
    if (s) tl.from(s.words, { yPercent: 110, rotateX: -40, opacity: 0, duration: 1, stagger: .045 }, '-=.35');
    else tl.from(h1, { y: 40, opacity: 0, duration: .9 }, '-=.35');
    tl.from(hero.querySelector('.hero-content p'), { y: 26, opacity: 0, duration: .8 }, '-=.55')
      .from('.hero-actions .btn', { y: 22, opacity: 0, duration: .7, stagger: .12 }, '-=.5')
      .from('.hero-pill', { x: 60, opacity: 0, duration: .8, stagger: .12, ease: 'back.out(1.6)' }, '-=.6')
      .from('.hero-nav', { opacity: 0, duration: .6 }, '-=.4');
    /* Pills breathe. */
    gsap.utils.toArray('.hero-pill').forEach(function (p, i) {
      gsap.to(p, { y: i % 2 ? 7 : -7, duration: 2.6 + i * .3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
    });
    /* Background parallax + copy drifting away as you leave the hero. */
    gsap.to('.hero-slide', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-content', { yPercent: -14, opacity: .25, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------- Inner page banners ---------- */
  var ph = document.querySelector('.page-hero');
  if (ph){
    var pt = gsap.timeline({ delay: introDelay, defaults: { ease: 'power4.out' } });
    var h1b = ph.querySelector('h1');
    var sb = split(h1b, 'words');
    var eb = ph.querySelector('.eyebrow'); if (eb) pt.from(eb, { y: 16, opacity: 0, duration: .6 });
    if (sb) pt.from(sb.words, { yPercent: 110, opacity: 0, duration: .9, stagger: .06 }, '-=.3');
    else if (h1b) pt.from(h1b, { y: 30, opacity: 0, duration: .8 }, '-=.3');
    var bc = ph.querySelector('.breadcrumb'); if (bc) pt.from(bc, { y: 14, opacity: 0, duration: .6 }, '-=.5');
  }

  /* ---------- Section headings: eyebrow, masked line reveal, lead ---------- */
  gsap.utils.toArray('.section-head').forEach(function (head) {
    var h2 = head.querySelector('h2');
    var sp = split(h2);
    var tl2 = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 85%', once: true }, defaults: { ease: 'power4.out' } });
    var ey = head.querySelector('.eyebrow'); if (ey) tl2.from(ey, { y: 14, opacity: 0, duration: .5 });
    if (sp) tl2.from(sp.lines, { yPercent: 105, duration: .9, stagger: .1 }, '-=.25');
    else if (h2) tl2.from(h2, { y: 30, opacity: 0, duration: .8 }, '-=.25');
    var p = head.querySelector('p'); if (p) tl2.from(p, { y: 18, opacity: 0, duration: .7 }, '-=.5');
  });

  /* ---------- Cards and grid items: staggered lift-in ---------- */
  var cardSel = '.services-grid > *, .why-grid > *, .tile-grid > *, .blog-grid > *, .jump-grid > *, .feature-rows > *, .duo > *, .strip-item, .process-step, .client-logo, .promo-feature, .faq-item, .footer-top > *, .t-slide';
  var cards = gsap.utils.toArray(cardSel);
  if (cards.length){
    gsap.set(cards, { y: 44, opacity: 0, scale: .97 });
    ScrollTrigger.batch(cards, {
      start: 'top 90%', once: true,
      onEnter: function (batch) { gsap.to(batch, { y: 0, opacity: 1, scale: 1, duration: .9, stagger: .09, ease: 'power3.out', overwrite: true }); }
    });
  }

  /* ---------- Big photos: clip-wipe in, then parallax against the copy ---------- */
  gsap.utils.toArray('.about-media img, .promo-media img, .post-media img').forEach(function (img) {
    var wrap = img.parentElement;
    gsap.from(img, { clipPath: 'inset(12% 12% 12% 12% round 14px)', scale: 1.12, duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: wrap, start: 'top 82%', once: true } });
    gsap.to(img, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.utils.toArray('.about-content, .promo-content').forEach(function (copy) {
    gsap.from(copy.children, { y: 30, opacity: 0, duration: .8, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: copy, start: 'top 82%', once: true } });
  });

  /* ---------- Enquiry panel and CTA bands ---------- */
  gsap.utils.toArray('.contact-wrap').forEach(function (w) {
    gsap.from(w, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: w, start: 'top 85%', once: true } });
    var bits = w.querySelectorAll('.contact-info li, .wpcf7-form p, .wpcf7-form label');
    if (bits.length) gsap.from(bits, { y: 18, opacity: 0, duration: .6, stagger: .05, ease: 'power2.out', scrollTrigger: { trigger: w, start: 'top 75%', once: true } });
  });
  gsap.utils.toArray('.cta-dark-inner').forEach(function (c) {
    gsap.from(c.children, { y: 36, opacity: 0, duration: .9, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 85%', once: true } });
  });

  /* ---------- Process rail draws itself, numbers pop in sequence ---------- */
  var grid = document.querySelector('.process-grid');
  if (grid){
    var rail = document.createElement('span'); rail.className = 'process-rail';
    grid.appendChild(rail);
    gsap.from(rail, { scaleX: 0, transformOrigin: 'left center', ease: 'none', scrollTrigger: { trigger: grid, start: 'top 75%', end: 'top 35%', scrub: .6 } });
    gsap.from('.process-num', { scale: .4, opacity: 0, duration: .6, stagger: .18, ease: 'back.out(2.2)', scrollTrigger: { trigger: grid, start: 'top 72%', once: true } });
  }

  /* ---------- Desktop pointer effects: 3D tilt and magnetic buttons ---------- */
  if (fine){
    gsap.utils.toArray('.service-card, .tile, .why-card, .blog-card, .duo-card, .jump-card').forEach(function (card) {
      var rx = gsap.quickTo(card, 'rotateX', { duration: .5, ease: 'power3.out' });
      var ry = gsap.quickTo(card, 'rotateY', { duration: .5, ease: 'power3.out' });
      card.classList.add('tilt');
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        rx(-py * 8); ry(px * 10);
      });
      card.addEventListener('mouseleave', function () { rx(0); ry(0); });
    });
    gsap.utils.toArray('.hero-actions .btn, .cta-dark-actions .btn, .header-actions .btn, .contact-form .wpcf7-submit, .about-content .btn, .promo-content .btn').forEach(function (btn) {
      var mx = gsap.quickTo(btn, 'x', { duration: .4, ease: 'power3.out' });
      var my = gsap.quickTo(btn, 'y', { duration: .4, ease: 'power3.out' });
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        mx((e.clientX - (r.left + r.width / 2)) * .28); my((e.clientY - (r.top + r.height / 2)) * .28);
      });
      btn.addEventListener('mouseleave', function () { gsap.to(btn, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.45)' }); });
    });
  }

  /* Layout shifts (fonts, lazy images) change trigger positions; refresh once settled. */
  window.addEventListener('load', function(){ setTimeout(function(){ ScrollTrigger.refresh(); }, 300); });
})();
