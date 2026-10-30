/**
 * Main JS – Point d'entrée principal du portfolio KBEL
 * Orchestre les modules de données dynamiques, d'animations et d'interactions.
 */

import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initSkills } from './skills.js';
import { initExperiences } from './experiences.js';
import { initEducation } from './education.js';
import { initProjects } from './projects.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialisation immédiate du thème clair / sombre
  initTheme();

  // 2. Initialisation de la navigation mobile, scroll fluide et scrollspy
  initNavigation();

  // 3. Chargement asynchrone et modulaire des données depuis les fichiers JSON
  await Promise.allSettled([
    initSkills(),
    initExperiences(),
    initEducation(),
    initProjects()
  ]);

  // 4. Initialisation des animations d'apparition et barres de progression après le rendu
  initAnimations();

  // 5. Initialisation du formulaire de contact et des contrôles anti-spam
  initContact();

  console.log('Portfolio Kouamé Brou Éric Landry (KBEL) initialisé avec succès en architecture modulaire.');
});
