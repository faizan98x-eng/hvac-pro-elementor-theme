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
