/**
 * Module Animations – Effets d'apparition discrète au défilement et jauges dynamiques
 * Conforme aux exigences de la charte (fondu 400-600ms, déplacement 20px, exécuté une seule fois).
 * Respecte strictement la préférence d'accessibilité prefers-reduced-motion.
 */

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 1. Révélation au défilement (Scroll Reveal) ---
  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    // Si l'utilisateur préfère réduire les mouvements, on affiche directement tous les éléments
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  } else if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target); // Animation jouée une seule fois
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Secours pour les navigateurs anciens sans IntersectionObserver
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  // --- 2. Animation fluide des jauges de compétences et langues ---
  const progressBars = document.querySelectorAll('.progress-fill');

  if (progressBars.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      progressBars.forEach((bar) => {
        const level = bar.getAttribute('data-level') || '0%';
        bar.style.width = level;
      });
    } else {
      const skillsObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const bars = entry.target.querySelectorAll('.progress-fill');
              bars.forEach((bar) => {
                const level = bar.getAttribute('data-level') || '0%';
                bar.style.width = level;
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      const skillSections = document.querySelectorAll('#competences, #apropos');
      skillSections.forEach((sec) => skillsObserver.observe(sec));
    }
  }
}
