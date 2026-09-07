// Chaque section du portfolio vit dans son propre fichier HTML (dossier /partials).
// On les charge tous, on restaure la position de scroll, puis on affiche la page.

history.scrollRestoration = 'manual';

const sections = [
  { slot: 'nav-slot',         file: 'partials/nav.html' },
  { slot: 'intro-slot',       file: 'partials/intro.html' },
  { slot: 'profil-slot',      file: 'partials/profil.html' },
  { slot: 'projects-slot',    file: 'partials/projects.html' },
  { slot: 'skills-slot',      file: 'partials/skills.html' },
  { slot: 'parcours-slot',    file: 'partials/parcours.html' },
  { slot: 'contact-slot',     file: 'partials/contact.html' },
];

async function chargerSection({ slot, file }) {
  const reponse = await fetch(file);
  const html = await reponse.text();
  document.getElementById(slot).innerHTML = html;
}

async function chargerLeSite() {
  await Promise.all(sections.map(chargerSection));

  const scrollSauvegarde = sessionStorage.getItem('scrollPosition');
  if (scrollSauvegarde) {
    window.scrollTo(0, parseInt(scrollSauvegarde, 10));
  }

  document.body.classList.add('pret');
}

window.addEventListener('scroll', () => {
  sessionStorage.setItem('scrollPosition', window.scrollY);
});

document.addEventListener('DOMContentLoaded', chargerLeSite);