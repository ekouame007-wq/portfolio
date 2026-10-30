/**
 * Module Education – Rendu dynamique du parcours académique et diplômes
 * Charge les données depuis assets/data/education.json.
 */

export async function initEducation() {
  const container = document.getElementById('education-container');
  if (!container) return;

  try {
    const res = await fetch('assets/data/education.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const degrees = await res.json();

    container.innerHTML = degrees.map((d) => `
      <div class="education-card reveal">
        <div class="education-card__year">${d.year}</div>
        <h3 class="education-card__degree">${d.degree}</h3>
        <p class="education-card__school">${d.school}</p>
        <p style="font-size: 0.88rem; color: var(--color-muted); margin-top: 8px;">
          ${d.description}
        </p>
      </div>
    `).join('');

  } catch (err) {
    console.error('Erreur chargement des formations :', err);
    container.innerHTML = `<p class="lead" style="color:var(--color-muted);">Formation académique disponible sur le CV téléchargeable.</p>`;
  }
}
