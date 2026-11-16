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

  /* Testimonial slider */
  var tSlides = document.querySelector('.t-slides');
  var tDots = document.querySelectorAll('.t-controls button');
  var tCurrent = 0;
  function tGoTo(i){
    tCurrent = (i + tDots.length) % tDots.length;
    tSlides.style.transform = 'translateX(-' + (tCurrent * 100) + '%)';
    tDots.forEach(function(d){ d.classList.remove('active'); });
    tDots[tCurrent].classList.add('active');
  }
  if (tSlides && tDots.length){
    tDots.forEach(function(d,i){ d.addEventListener('click', function(){ tGoTo(i); }); });
    setInterval(function(){ tGoTo(tCurrent + 1); }, 5500);
  }

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

  /* Enquiry form (prototype — replace with real handler when wired into WordPress) */
  var form = document.querySelector('.contact-form form');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Preview mode — connect this form in WordPress';
      setTimeout(function(){ btn.textContent = original; }, 2600);
    });
  }

});
