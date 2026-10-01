/* =============================================
   NEONEX — Minimal Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAV SCROLL =====
  const nav = document.querySelector('.nav');
  const backTop = document.querySelector('.back-top');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 60);
    if (backTop) backTop.classList.toggle('visible', y > 500);
  });

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== MOBILE NAV =====
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal, .reveal-line');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // Immediate entrance cascade for Hero elements
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 80);

  // ===== COUNTERS =====
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = '1';
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => countObserver.observe(c));

  // Trigger hero telemetry counters immediately on page load
  setTimeout(() => {
    document.querySelectorAll('.hero [data-count]').forEach(c => {
      if (!c.dataset.done) {
        c.dataset.done = '1';
        animateCount(c);
      }
    });
  }, 400);

  function animateCount(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    }
    requestAnimationFrame(tick);
  }

  // ===== TESTIMONIAL SLIDER =====
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let current = 0;

  function showSlide(i) {
    slides.forEach((s, idx) => {
      s.style.opacity = idx === i ? '1' : '0';
      s.style.position = idx === i ? 'relative' : 'absolute';
      s.style.visibility = idx === i ? 'visible' : 'hidden';
    });
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    current = i;
  }

  dots.forEach((d, i) => d.addEventListener('click', () => showSlide(i)));

  if (slides.length > 1) {
    showSlide(0);
    setInterval(() => showSlide((current + 1) % slides.length), 6000);
  }

  // ===== ACTIVE NAV =====
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ===== CONTACT FORM =====
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      btn.textContent = 'SENT SUCCESSFULLY';
      btn.style.background = 'var(--accent)';
      btn.style.borderColor = 'var(--accent)';
      setTimeout(() => {
        btn.textContent = 'SEND MESSAGE →';
        btn.style.background = '';
        btn.style.borderColor = '';
        form.reset();
      }, 3000);
    });
  }

  // ===== SMOOTH ANCHORS =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
