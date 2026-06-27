/* ============================================
   FIRST ROYAL MICROFINANCE BANK - V2
   Interactive Features
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Theme Toggle ---- */
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeIcon(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const isDark = theme === 'dark';
    themeToggle.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* ---- Sticky Nav Background ---- */
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', y > 60);
    }
    // Scroll to top button
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      scrollTop.classList.toggle('visible', y > 600);
    }
    lastScroll = y;
  });

  /* ---- Hero Carousel ---- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  const slideCount = slides.length;
  let slideInterval;

  function goToSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentSlide = index;
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slideCount);
  }

  function startCarousel() {
    slideInterval = setInterval(nextSlide, 6000);
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startCarousel();
  }

  if (slideCount > 0) {
    goToSlide(0);
    startCarousel();
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetTimer();
    });
  });

  /* ---- Mobile Menu ---- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  function openMobileMenu() {
    mobileOverlay?.classList.add('active');
    mobileMenu?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileOverlay?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', openMobileMenu);
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }
  // Close on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---- Chat Widget ---- */
  const chatBtn = document.querySelector('.chat-btn');
  const chatPanel = document.querySelector('.chat-panel');
  const chatClose = document.querySelector('.chat-close');

  if (chatBtn && chatPanel) {
    chatBtn.addEventListener('click', () => {
      chatPanel.classList.toggle('active');
    });
  }
  if (chatClose && chatPanel) {
    chatClose.addEventListener('click', () => {
      chatPanel.classList.remove('active');
    });
  }

  /* ---- Scroll Reveal ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- Stats Counter ---- */
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 2200;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
          const current = Math.round(eased * target);
          el.textContent = prefix + current.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(el => statsObserver.observe(el));

  /* ---- Scroll to Top ---- */
  document.querySelector('.scroll-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Active Nav Link ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Contact Form Handler ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Message Sent!';
      btn.style.background = 'var(--forest)';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = answer.classList.contains('open');
      document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-question.active').forEach(q => q.classList.remove('active'));
      if (!isOpen) {
        answer.classList.add('open');
        btn.classList.add('active');
      }
    });
  });

}); // DOMContentLoaded
