/**
 * Module Experiences – Rendu dynamique de la chronologie professionnelle (Timeline)
 * Charge les données depuis assets/data/experiences.json.
 */

export async function initExperiences() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  try {
    const res = await fetch('assets/data/experiences.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const experiences = await res.json();

    container.innerHTML = experiences.map((exp) => {
      const tagsHtml = exp.tags.map((t) => `<span class="timeline__tag">${t}</span>`).join('');
      
      return `
        <article class="timeline__item reveal">
          <span class="timeline__marker" aria-hidden="true"></span>
          <div class="timeline__content">
            <div class="timeline__header">
              <div>
                <h3 class="timeline__role">${exp.role}</h3>
                <div class="timeline__location">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  ${exp.location}
                </div>
              </div>
              <span class="timeline__period">${exp.period}</span>
            </div>
            <p class="timeline__desc">${exp.description}</p>
            <div class="timeline__tags" aria-label="Compétences mobilisées">
              ${tagsHtml}
            </div>
          </div>
        </article>
      `;
    }).join('');

  } catch (err) {
    console.error('Erreur chargement des expériences :', err);
    container.innerHTML = `<p class="lead" style="color:var(--color-muted);">Expériences consultables en détail sur le CV PDF.</p>`;
  }
}
