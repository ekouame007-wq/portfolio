# Portfolio Professionnel – Kouamé Brou Éric Landry (KBEL)

> Vitrine professionnelle moderne, accessible et performante d'un étudiant en informatique et technicien bureautique à Abidjan (Côte d'Ivoire).

---

## 🎯 Objectif du projet

Ce portfolio a été conçu pour remplacer le traditionnel CV PDF par une vitrine interactive, consultable sur tous les supports (mobiles, tablettes, ordinateurs) et démontrant concrètement :
1. **L'expertise bureautique avancée** : Maîtrise de Microsoft Excel (tableaux de bord, formules matricielles, TCD), Word, PowerPoint, Access et gestion documentaire (GED).
2. **La maintenance et l'administration des systèmes** : Déploiement et sécurisation de parcs informatiques sous Windows 10/11 et Linux Ubuntu.
3. **Les compétences en développement web** : Réalisation d'une application web statique moderne, ultra-rapide, respectant les normes d'accessibilité WCAG AA et les critères Lighthouse (> 90).

---

## 🛠️ Stack Technique (100% Natif)

Conformément au cahier des charges et à la stack technique validée, le projet ne dépend d'aucun framework lourd ni serveur complexe :

- **Structure** : HTML5 sémantique (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Style** : CSS3 moderne modulaire (CSS Variables, CSS Grid, Flexbox, méthodologie BEM, Mobile-First).
- **Comportement** : JavaScript ES6+ sans dépendance, découpé en modules (`IntersectionObserver`, `localStorage`, `matchMedia`, `fetch API`, `Constraint Validation API`).
- **Typographie** : Google Fonts ([Poppins](https://fonts.google.com/specimen/Poppins) pour les titres et [Inter](https://fonts.google.com/specimen/Inter) pour le texte courant).
- **Icônes** : SVG vectoriels en ligne (Lucide Icons).
- **Médias** : Images au format WebP optimisées avec chargement différé (`loading="lazy"`).
- **SEO & Métadonnées** : Balises Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt`, données structurées Schema.org JSON-LD (`Person`).

---

## 📁 Arborescence du Projet

```text
portfolio/
├── index.html                   # Page d'accueil principale (Single Page)
├── 404.html                     # Page d'erreur 404 personnalisée
├── README.md                    # Documentation complète du projet
├── robots.txt                   # Directives pour les robots d'indexation
├── sitemap.xml                  # Plan de site XML pour moteurs de recherche
└── assets/
    ├── css/
    │   ├── variables.css        # Variables et tokens (couleurs, typographie, espacements)
    │   ├── base.css             # Reset, règles de base, accessibilité WCAG AA
    │   ├── layout.css           # Grilles, header fixe, hero, structure des sections
    │   ├── components.css       # Boutons, cartes, timeline, formulaires, jauges
    │   └── responsive.css       # Points de rupture (480px, 768px, 1024px) et menu mobile
    ├── js/
    │   ├── main.js              # Point d'entrée principal
    │   ├── navigation.js        # Menu mobile burger, défilement fluide et scrollspy
    │   ├── theme.js             # Mode clair/sombre avec détection OS et persistance
    │   ├── animations.js        # Révélation au défilement et animation des jauges
    │   ├── projects.js          # Chargement dynamique et filtrage des réalisations
    │   └── contact.js           # Contrôle des champs, antispam honeypot et soumission
    ├── data/
    │   └── projects.json        # Données structurées des projets et réalisations
    ├── img/
    │   ├── profile.webp         # Portrait professionnel officiel
    │   └── projects/            # Captures d'écran et illustrations WebP des projets
    ├── icons/
    │   └── favicon.svg          # Favicon officiel selon la charte KBEL
    └── docs/
        └── CV_Kouame_Brou_Eric_Landry.pdf # CV téléchargeable au format PDF
```

---

## 🎨 Charte Graphique (KBEL)

- **Palette de couleurs (Règle 60-30-10)** :
  - `60%` Fonds clairs : Blanc cassé (`#F8FAFC`), Gris perle (`#EEF1F5`), Bordures (`#D8DEE6`).
  - `30%` Structure & Textes : Bleu nuit (`#1B2A49`), Anthracite (`#1F2937`), Gris ardoise (`#64748B`).
  - `10%` Accents & Actions : Bleu acier (`#3A5A8C`), Filet sable doré (`#B08D57`).
- **Mode Sombre** : Détection automatique des préférences système et sélection manuelle mémorisée dans le navigateur (`#0F172A`, `#172033`, `#8FB0E0`, `#E5E9F0`).
- **Signature** : Signature typographique `KBEL` en Poppins 700 soulignée d'un filet sable doré.

---

## 🚀 Déploiement & Hébergement

Le site étant entièrement statique, il peut être hébergé gratuitement en quelques secondes avec HTTPS automatique :

### Option 1 : GitHub Pages (Recommandé)
1. Créez un dépôt GitHub nommé `portfolio`.
2. Poussez l'ensemble des fichiers sur la branche `main`.
3. Rendez-vous dans **Settings** > **Pages** > sélectionnez la branche `main` et enregistrez.
4. Votre site est immédiatement disponible en ligne sous `https://<votre-pseudo>.github.io/portfolio/`.

### Option 2 : Netlify / Cloudflare Pages
- Glissez-déposez simplement le dossier racine du projet sur l'interface de Netlify Drop, ou connectez votre dépôt Git pour des déploiements continus à chaque mise à jour.

---

## 🔒 Sécurité & Anti-Spam

- Le formulaire de contact intègre un piège anti-spam masqué (*Honeypot*).
- Les liens externes utilisent `rel="noopener noreferrer"`.
- Aucun script externe non vérifié n'est exécuté.

---

## 👤 Auteur & Contact

**Kouamé Brou Éric Landry**  
- **Titre** : Étudiant en informatique · Technicien bureautique & support IT
- **Localisation** : Abidjan, Côte d'Ivoire
- **E-mail** : [contact@kouame-eric.ci](mailto:contact@kouame-eric.ci)
- **WhatsApp direct** : +225 07 00 00 00 00
