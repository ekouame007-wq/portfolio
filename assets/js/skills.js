/**
 * Module Skills – Rendu dynamique des catégories de compétences et jauges
 * Charge les données depuis assets/data/skills.json.
 */

const ICONS = {
  'file-text': `<svg xmlns="http://www.w3.org/2000/svg" class="skill-category__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="8" x2="16" y1="13" y2="13"/><line x1="8" x2="16" y1="17" y2="17"/></svg>`,
  'monitor': `<svg xmlns="http://www.w3.org/2000/svg" class="skill-category__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
  'code': `<svg xmlns="http://www.w3.org/2000/svg" class="skill-category__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'archive': `<svg xmlns="http://www.w3.org/2000/svg" class="skill-category__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`
};

export async function initSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  try {
    const res = await fetch('assets/data/skills.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const categories = await res.json();

    container.innerHTML = categories.map((cat) => {
      const iconSvg = ICONS[cat.icon] || ICONS['file-text'];
      const skillsHtml = cat.skills.map((s) => `
        <div class="skill-item">
          <div class="skill-item__meta">
            <span class="skill-item__name">${s.name}</span>
            <span class="skill-item__level">${s.level}% &middot; ${s.label}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" data-level="${s.level}%"></div>
          </div>
        </div>
      `).join('');

      return `
        <div class="skill-category reveal">
          <div class="skill-category__header">
            ${iconSvg}
            <h3 class="skill-category__title">${cat.category}</h3>
          </div>
          ${skillsHtml}
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error('Erreur chargement des compétences :', err);
    container.innerHTML = `<p class="lead" style="color:var(--color-muted);">Compétences disponibles sur le CV téléchargeable.</p>`;
  }
}
