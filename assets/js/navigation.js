/**
 * Module Navigation – Menu burger mobile, défilement fluide et Scrollspy
 * Gère les interactions de navigation et l'accessibilité au clavier (WCAG AA).
 */

export function initNavigation() {
  const burgerBtn = document.getElementById('burger-btn');
  const navDrawer = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const backToTopBtn = document.getElementById('back-to-top');

  // --- 1. Gestion du Menu Burger Mobile ---
  if (burgerBtn && navDrawer) {
    const toggleMenu = () => {
      const isOpen = navDrawer.classList.toggle('is-open');
      burgerBtn.classList.toggle('is-active', isOpen);
      burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    burgerBtn.addEventListener('click', toggleMenu);

    // Fermeture automatique lors du clic sur un lien de navigation
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navDrawer.classList.contains('is-open')) {
          toggleMenu();
        }
      });
    });

    // Fermeture via la touche Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) {
        toggleMenu();
        burgerBtn.focus();
      }
    });
  }

  // --- 2. ScrollSpy : Détection de la section active via IntersectionObserver ---
  const sections = document.querySelectorAll('section[id], header[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -65% 0px', // Zone centrale de l'écran pour activer le lien
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('is-active');
              link.setAttribute('aria-current', 'page');
            } else {
              link.classList.remove('is-active');
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --- 3. Bouton Retour en haut de page (Back to top) ---
  if (backToTopBtn) {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
