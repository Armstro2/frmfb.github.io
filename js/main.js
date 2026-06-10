/**
 * First Royal Microfinance Bank
 * Main JavaScript - Animations, Interactions, Scroll Effects
 */

document.addEventListener('DOMContentLoaded', function() {
  // ===== Chat Widget =====
  const chatToggle = document.getElementById('chatToggle');
  const chatPanel = document.getElementById('chatPanel');
  const chatClose = document.getElementById('chatClose');
  const chatSuggestions = document.querySelectorAll('.chat-suggestion-btn');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatBody = document.getElementById('chatBody');

  if (chatToggle && chatPanel) {
    chatToggle.addEventListener('click', () => {
      chatPanel.classList.toggle('open');
      chatToggle.style.display = chatPanel.classList.contains('open') ? 'none' : 'flex';
    });
    if (chatClose) {
      chatClose.addEventListener('click', () => {
        chatPanel.classList.remove('open');
        chatToggle.style.display = 'flex';
      });
    }
    chatSuggestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const msg = btn.textContent.trim();
        addChatMessage(msg, 'user');
        setTimeout(() => {
          addChatBotReply(msg);
        }, 600);
      });
    });
    function addChatMessage(text, sender) {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:flex;gap:10px;align-items:flex-start;' + (sender === 'user' ? 'flex-direction:row-reverse;' : '');
      const avatar = document.createElement('div');
      avatar.style.cssText = 'width:32px;height:32px;border-radius:50%;background:' + (sender === 'user' ? 'var(--black)' : 'var(--gold)') + ';display:flex;align-items:center;justify-content:center;color:' + (sender === 'user' ? 'var(--gold)' : 'var(--black)') + ';font-size:12px;flex-shrink:0;font-weight:600;';
      avatar.textContent = sender === 'user' ? 'You' : 'FR';
      const bubble = document.createElement('div');
      bubble.style.cssText = 'background:' + (sender === 'user' ? 'var(--gold)' : 'var(--light-gray)') + ';padding:10px 14px;border-radius:12px;border-bottom-' + (sender === 'user' ? 'right' : 'left') + '-radius:4px;font-size:13px;color:' + (sender === 'user' ? 'var(--black)' : 'var(--dark-gray)') + ';line-height:1.5;max-width:220px;word-wrap:break-word;';
      bubble.textContent = text;
      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble);
      chatBody.appendChild(wrapper);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
    function addChatBotReply(userMsg) {
      const replies = {
        'default': "Thank you for your message. One of our representatives will assist you shortly. You can also reach us at +234 708 421 3492 or visit our branch at 12 Chalmer Street, Calabar."
      };
      const reply = replies['default'];
      addChatMessage(reply, 'bot');
    }
    if (chatSend && chatInput) {
      chatSend.addEventListener('click', () => {
        const msg = chatInput.value.trim();
        if (msg) { addChatMessage(msg, 'user'); chatInput.value = ''; setTimeout(() => addChatBotReply(msg), 600); }
      });
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { chatSend.click(); }
      });
    }
  }

  // ===== Dark / Light Mode Toggle =====
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ===== Hero Background Carousel =====
  const carouselSlides = document.querySelectorAll('.hero-carousel-slide');
  const carouselDots = document.querySelectorAll('.hero-carousel-dot');
  if (carouselSlides.length > 0) {
    let currentSlide = 0;
    let carouselInterval;
    function showSlide(index) {
      carouselSlides.forEach((s, i) => s.classList.toggle('active', i === index));
      carouselDots.forEach((d, i) => d.classList.toggle('active', i === index));
      currentSlide = index;
    }
    function nextSlide() {
      showSlide((currentSlide + 1) % carouselSlides.length);
    }
    function startCarousel() {
      carouselInterval = setInterval(nextSlide, 5000);
    }
    function stopCarousel() {
      clearInterval(carouselInterval);
    }
    carouselDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        stopCarousel();
        showSlide(i);
        startCarousel();
      });
    });
    showSlide(0);
    startCarousel();
  }

  // ===== Navigation Scroll Effect =====
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // ===== Mega Menu Overlay =====
  const megaItems = document.querySelectorAll('.mega-menu-item');
  const navOverlay = document.querySelector('.nav-overlay');
  let megaHoverTimeout;
  megaItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      clearTimeout(megaHoverTimeout);
      if (navOverlay) navOverlay.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
      megaHoverTimeout = setTimeout(() => {
        if (navOverlay) navOverlay.classList.remove('active');
      }, 200);
    });
  });

  // ===== Mobile Menu =====
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== Scroll Reveal Animations =====
  const revealElements = document.querySelectorAll('.fade-up, .fade-in, .slide-in-left, .slide-in-right');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== Hero Entrance Sequence =====
  const heroElements = document.querySelectorAll('.hero-anim');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = el.classList.contains('hero-anim-up') ? 'translateY(30px)' : 'translateX(-20px)';
    el.style.transition = `opacity 0.8s ease ${0.3 + (i * 0.2)}s, transform 0.8s ease ${0.3 + (i * 0.2)}s`;
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translate(0)';
    }, 100);
  });

  // ===== Statistics Counter Animation =====
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1500;
        const startTime = performance.now();
        
        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = current + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        }
        
        requestAnimationFrame(updateCount);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => countObserver.observe(el));

  // ===== Product Tabs =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.panel === target) {
          panel.classList.add('active');
        }
      });
    });
  });

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== Parallax Effect on Hero =====
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    });
  }

  // ===== Active Nav Link =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===== Form Submission Handler =====
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent!';
      btn.style.background = '#4ade80';
      btn.style.color = '#000';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        this.reset();
      }, 3000);
    });
  }

  // ===== Testimonial Slider =====
  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    let currentSlide = 0;
    let autoAdvance;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentSlide = index;
      
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function startAutoAdvance() {
      autoAdvance = setInterval(() => goToSlide(currentSlide + 1), 6000);
    }

    function stopAutoAdvance() {
      clearInterval(autoAdvance);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoAdvance(); goToSlide(currentSlide - 1); startAutoAdvance(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoAdvance(); goToSlide(currentSlide + 1); startAutoAdvance(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { stopAutoAdvance(); goToSlide(i); startAutoAdvance(); });
    });

    startAutoAdvance();
    slider.addEventListener('mouseenter', stopAutoAdvance);
    slider.addEventListener('mouseleave', startAutoAdvance);
  }
});
