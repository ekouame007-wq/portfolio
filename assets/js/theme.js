/**
 * Module Theme – Gestion du mode clair / sombre (Dark Mode)
 * Mémorise la préférence utilisateur dans le localStorage et respecte prefers-color-scheme.
 */

const THEME_STORAGE_KEY = 'kbel-theme-preference';

/**
 * Détermine le thème actif initial (sauvegarde utilisateur ou préférence système)
 * @returns {'dark' | 'light'}
 */
export function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  // Détection automatique selon les préférences de l'OS du visiteur
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Applique le thème au document HTML et met à jour l'icône du bouton
 * @param {'dark' | 'light'} theme
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleBtn = document.getElementById('theme-toggle');
  
  if (toggleBtn) {
    const isDark = theme === 'dark';
    toggleBtn.setAttribute('aria-label', isDark ? 'Basculer vers le mode clair' : 'Basculer vers le mode sombre');
    toggleBtn.setAttribute('title', isDark ? 'Activer le mode clair' : 'Activer le mode sombre');
    
    // Remplacement dynamique de l'icône SVG (Soleil ou Lune)
    toggleBtn.innerHTML = isDark
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

/**
 * Initialise le contrôleur de thème et attache les écouteurs d'événements
 */
export function initTheme() {
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      applyTheme(newTheme);
    });
  }

  // Écoute des changements de préférence du système d'exploitation en temps réel
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}
