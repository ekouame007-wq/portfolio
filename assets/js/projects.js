/**
 * Module Projects – Chargement asynchrone des réalisations et système de filtrage
 * Récupère les données depuis projects.json et génère les cartes accessibles.
 */

let allProjects = [];

/**
 * Génère le code HTML d'une carte de projet
 * @param {Object} project
 * @returns {string}
 */
function createProjectCardHtml(project) {
  const tagsHtml = project.technologies
    .map((tech) => `<span class="project-card__tag">${tech}</span>`)
    .join('');

  const githubBtn = project.githubUrl
    ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--sm" aria-label="Code source GitHub pour ${project.title}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        Code source
       </a>`
    : '';

  return `
    <article class="project-card reveal is-revealed" data-category="${project.category}">
      <div class="project-card__media">
        <img 
          src="${project.image}" 
          alt="Aperçu du projet : ${project.title}" 
          class="project-card__img" 
          loading="lazy" 
          width="600" 
          height="338"
        >
        <span class="project-card__badge">${project.categoryLabel}</span>
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__desc">${project.description}</p>
        
        <div class="project-card__metrics" title="Résultat ou impact mesurable">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>${project.metrics}</span>
        </div>

        <div class="project-card__tags" aria-label="Compétences mobilisées">
          ${tagsHtml}
        </div>

        <div class="project-card__actions">
          <a href="${project.demoUrl}" class="btn btn--primary btn--sm">
            Voir le détail
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          ${githubBtn}
        </div>
      </div>
    </article>
  `;
}

/**
 * Affiche les projets filtrés dans la grille
 * @param {string} category
 */
function renderProjects(category = 'tous') {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const filtered = category === 'tous'
    ? allProjects
    : allProjects.filter((p) => p.category === category);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 48px 20px;">
        <p class="lead">Aucun projet trouvé dans cette catégorie pour le moment.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((project) => createProjectCardHtml(project)).join('');
}

/**
 * Initialise le module des projets et écoute les filtres
 */
export async function initProjects() {
  const container = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (!container) return;

  try {
    const response = await fetch('assets/data/projects.json');
    if (!response.ok) {
      throw new Error(`Erreur HTTP lors du chargement des données (${response.status})`);
    }
    allProjects = await response.json();
    renderProjects('tous');
  } catch (error) {
    console.error('Erreur lors du chargement des projets :', error);
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
        <p style="color: var(--color-error); font-weight: 500;">Impossible de charger les réalisations pour le moment.</p>
        <p style="font-size: 0.9rem; color: var(--color-muted);">Veuillez vérifier votre connexion ou consulter le CV téléchargeable.</p>
      </div>
    `;
  }

  // Écoute des boutons de filtrage
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const selectedCategory = btn.getAttribute('data-filter') || 'tous';
      renderProjects(selectedCategory);
    });
  });
}
