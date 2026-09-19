document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initStickyNavbar();
  initMobileMenu();
  initActiveNavLinks();
  initPasswordToggles();
  initForms();
  initGalleryFilter();
  initLightbox();
  initBackToTop();
  initFaqAccordion();
});

/* ==========================================
   THEME TOGGLE
   ========================================== */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const currentTheme = localStorage.getItem('theme') || 'dark'; // Dark is default

  if (currentTheme === 'light') {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }

  updateThemeIcons(currentTheme);

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
        updateThemeIcons('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcons('dark');
      }
    });
  });
}

function updateThemeIcons(theme) {
  const themeIcons = document.querySelectorAll('.theme-toggle-icon');
  themeIcons.forEach(icon => {
    if (theme === 'light') {
      // Show moon for light theme (so user can click to switch to dark)
      icon.className = 'theme-toggle-icon fas fa-moon text-gray-700 hover:text-gold-accent transition-colors';
    } else {
      // Show sun for dark theme (so user can click to switch to light)
      icon.className = 'theme-toggle-icon fas fa-sun text-yellow-400 hover:text-gold-accent transition-colors';
    }
  });
}

/* ==========================================
   RTL TOGGLE
   ========================================== */
function initRTL() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const currentRTL = localStorage.getItem('rtl') === 'true';

  if (currentRTL) {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.classList.remove('rtl');
  }

  updateRtlLabels(currentRTL);

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRTL) {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.classList.remove('rtl');
        localStorage.setItem('rtl', 'false');
        updateRtlLabels(false);
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.classList.add('rtl');
        localStorage.setItem('rtl', 'true');
        updateRtlLabels(true);
      }
    });
  });
}

function updateRtlLabels(isRTL) {
  const rtlBadges = document.querySelectorAll('.rtl-toggle-badge');
  rtlBadges.forEach(badge => {
    badge.textContent = isRTL ? 'LTR' : 'RTL';
  });
}

/* ==========================================
   STICKY NAVBAR
   ========================================== */
function initStickyNavbar() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-xl', 'backdrop-blur-md');
    } else {
      header.classList.remove('shadow-xl', 'backdrop-blur-md');
    }
  });
}

/* ==========================================
   MOBILE MENU
   ========================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
    // If RTL, it should transition from left or right based on CSS dir, but simple translate works nicely
    if (document.documentElement.getAttribute('dir') === 'rtl') {
      mobileMenu.classList.remove('-translate-x-full');
    }
    mobileMenu.classList.add('translate-x-0');
  });

  const closeMenu = () => {
    mobileMenu.classList.remove('translate-x-0');
    if (document.documentElement.getAttribute('dir') === 'rtl') {
      mobileMenu.classList.add('-translate-x-full');
    } else {
      mobileMenu.classList.add('translate-x-full');
    }
  };

  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', closeMenu);
  }

  // Close menu on link click
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* ==========================================
   ACTIVE NAVIGATION LINKS
   ========================================== */
function initActiveNavLinks() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active-nav');
    } else {
      link.classList.remove('active-nav');
    }
  });
}

/* ==========================================
   PASSWORD EYE TOGGLE
   ========================================== */
function initPasswordToggles() {
  const toggles = document.querySelectorAll('.password-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('input');
      const icon = toggle.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
}

/* ==========================================
   FORMS HANDLING (SIMULATED)
   ========================================== */
function initForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic styling for simulated alert
      const alertBox = document.createElement('div');
      let isSuccess = true;
      let borderColorClass = 'border-brand-blue';
      let message = 'Form submitted successfully!';

      if (form.id === 'contact-form') {
        message = 'Thank you! Your enrollment consultation request has been received.';
      } else if (form.id === 'login-form') {
        message = 'Welcome back! You have successfully logged in.';
      } else if (form.id === 'signup-form') {
        const pass = document.getElementById('reg-pass');
        const confirmPass = document.getElementById('reg-pass-confirm');
        if (pass && confirmPass && pass.value !== confirmPass.value) {
          message = 'Passwords do not match. Please verify.';
          isSuccess = false;
          borderColorClass = 'border-red-500';
        } else {
          message = 'Account created successfully! Welcome to the Academy.';
        }
      } else if (form.id === 'newsletter-form') {
        message = 'Thank you for subscribing to our training insights!';
      }

      alertBox.className = `fixed bottom-5 right-5 glass text-white px-6 py-4 rounded-xl shadow-2xl border-l-4 ${borderColorClass} transform translate-y-20 opacity-0 transition-all duration-500 z-50`;
 
      alertBox.innerHTML = `
        <div class="flex items-center space-x-3 gap-2">
          <i class="fas ${isSuccess ? 'fa-check-circle text-brand-blue' : 'fa-exclamation-circle text-red-500'} text-xl"></i>
          <div>
            <p class="font-semibold text-sm">${isSuccess ? 'Success' : 'Error'}</p>
            <p class="text-xs text-gray-400">${message}</p>
          </div>
        </div>
      `;

      document.body.appendChild(alertBox);

      // Trigger animation
      setTimeout(() => {
        alertBox.classList.remove('translate-y-20', 'opacity-0');
      }, 50);

      // Remove after 4 seconds
      setTimeout(() => {
        alertBox.classList.add('translate-y-20', 'opacity-0');
        setTimeout(() => alertBox.remove(), 500);
      }, 4000);

      if (isSuccess) {
        form.reset();
      }
    });
  });
}

/* ==========================================
   GALLERY FILTER SYSTEM
   ========================================== */
function initGalleryFilter() {
  const filters = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  if (filters.length === 0 || items.length === 0) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update active button classes
      filters.forEach(f => f.classList.remove('bg-brand-blue', 'text-black', 'active'));
      btn.classList.add('bg-brand-blue', 'text-black', 'active');

      items.forEach(item => {
        const itemCats = item.getAttribute('data-categories').split(' ');
        if (category === 'all' || itemCats.includes(category)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================
   LIGHTBOX MODAL FOR GALLERY
   ========================================== */
let lightboxIndex = 0;
let currentLightboxImages = [];

function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  // Gather images for navigation
  galleryItems.forEach((img, index) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      // Find all currently visible images in the gallery
      currentLightboxImages = Array.from(document.querySelectorAll('.gallery-item'))
        .filter(item => item.style.display !== 'none')
        .map(item => item.querySelector('img'));

      lightboxIndex = currentLightboxImages.indexOf(img);
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Stop scrolling
    showImage();
  }

  function closeLightbox() {
    lightbox.classList.remove('flex');
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Resume scrolling
  }

  function showImage() {
    if (lightboxIndex < 0) lightboxIndex = currentLightboxImages.length - 1;
    if (lightboxIndex >= currentLightboxImages.length) lightboxIndex = 0;
    
    const targetImg = currentLightboxImages[lightboxIndex];
    if (targetImg) {
      lightboxImg.src = targetImg.src;
      lightboxCaption.textContent = targetImg.getAttribute('alt') || 'Fencing Academy Training';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      lightboxIndex--;
      showImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      lightboxIndex++;
      showImage();
    });
  }

  // Close on backdrop click (outside image)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
      closeLightbox();
    }
  });

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      lightboxIndex--;
      showImage();
    }
    if (e.key === 'ArrowRight') {
      lightboxIndex++;
      showImage();
    }
  });
}

/* ==========================================
   BACK TO TOP BUTTON
   ========================================== */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  // Positioned fixed, hides below screen via translate-y-10 and opacity-0, transitions smoothly
  btn.className = 'fixed bottom-6 right-6 z-50 bg-gold-accent hover:bg-gold-accent-hover text-black p-3.5 rounded-full shadow-2xl transition-all duration-300 opacity-0 translate-y-10 pointer-events-none hover:scale-110 flex items-center justify-center';
  btn.innerHTML = '<i class="fas fa-chevron-up text-sm"></i>';
  btn.setAttribute('title', 'Back to Top');
  btn.setAttribute('aria-label', 'Back to Top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
      btn.classList.add('opacity-100', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
      btn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================
   INTERACTIVE FAQ ACCORDION & SEARCH
   ========================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  const tabBtns = document.querySelectorAll('.faq-tab-btn');
  const searchInput = document.getElementById('faq-search-input');
  const noResultsMsg = document.getElementById('faq-no-results');

  if (!faqItems.length) return;

  // Toggle Accordion Open/Close
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other accordion items for clean focus
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // Filter FAQs by Category and Live Search
  let activeCategory = 'all';

  function filterFaqs() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    faqItems.forEach(item => {
      const itemCat = item.getAttribute('data-category') || 'all';
      const questionText = item.querySelector('.faq-question-text')?.textContent.toLowerCase() || '';
      const answerText = item.querySelector('.faq-accordion-content')?.textContent.toLowerCase() || '';

      const matchesCategory = activeCategory === 'all' || itemCat === activeCategory;
      const matchesSearch = !query || questionText.includes(query) || answerText.includes(query);

      if (matchesCategory && matchesSearch) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
        item.classList.remove('active');
      }
    });

    if (noResultsMsg) {
      if (visibleCount === 0) {
        noResultsMsg.classList.remove('hidden');
      } else {
        noResultsMsg.classList.add('hidden');
      }
    }
  }

  // Category Tab Button Click Handlers
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-faq-category') || 'all';
      filterFaqs();
    });
  });

  // Live Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', filterFaqs);
  }
}

