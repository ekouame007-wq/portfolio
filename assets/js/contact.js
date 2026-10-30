/**
 * Module Contact – Validation du formulaire, sécurité anti-spam et soumission asynchrone
 * Assure une validation robuste côté client et un retour utilisateur clair.
 */

export function initContact() {
  const form = document.getElementById('contact-form');
  const feedbackEl = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  const fields = {
    name: document.getElementById('contact-name'),
    email: document.getElementById('contact-email'),
    subject: document.getElementById('contact-subject'),
    message: document.getElementById('contact-message'),
    honeypot: document.getElementById('contact-honeypot')
  };

  /**
   * Valide un champ individuel et affiche le message d'erreur approprié
   * @param {HTMLElement} input
   * @returns {boolean}
   */
  function validateField(input) {
    if (!input) return true;

    const errorEl = document.getElementById(`${input.id}-error`);
    let errorMessage = '';

    const value = input.value.trim();

    if (input.required && !value) {
      errorMessage = 'Ce champ est obligatoire.';
    } else if (input.id === 'contact-email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Veuillez saisir une adresse e-mail valide (ex: nom@domaine.com).';
      }
    } else if (input.id === 'contact-name' && value.length < 2) {
      errorMessage = 'Le nom doit comporter au moins 2 caractères.';
    } else if (input.id === 'contact-subject' && value.length < 3) {
      errorMessage = 'L\'objet doit comporter au moins 3 caractères.';
    } else if (input.id === 'contact-message' && value.length < 10) {
      errorMessage = 'Votre message doit comporter au moins 10 caractères pour être exploitable.';
    }

    if (errorMessage) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = errorMessage;
      return false;
    } else {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  }

  // Écoute de validation en direct lors de la sortie d'un champ (blur)
  Object.values(fields).forEach((field) => {
    if (field && field !== fields.honeypot) {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.classList.contains('is-invalid')) {
          validateField(field);
        }
      });
    }
  });

  // Soumission du formulaire
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Détection anti-spam (Honeypot) : si rempli par un robot, on annule silencieusement
    if (fields.honeypot && fields.honeypot.value.trim() !== '') {
      console.warn('Tentative de spam automatisée détectée et neutralisée.');
      form.reset();
      return;
    }

    // 2. Validation de l'ensemble des champs
    let isFormValid = true;
    for (const key of ['name', 'email', 'subject', 'message']) {
      const isValid = validateField(fields[key]);
      if (!isValid) isFormValid = false;
    }

    if (!isFormValid) {
      if (feedbackEl) {
        feedbackEl.className = 'form-feedback is-error';
        feedbackEl.textContent = 'Veuillez corriger les champs signalés en rouge avant d\'envoyer votre message.';
        feedbackEl.style.display = 'block';
      }
      return;
    }

    // 3. Préparation de la requête asynchrone
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Envoyer';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin" style="animation: spin 1s linear infinite;" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
        Envoi en cours...
      `;
    }

    const formData = new FormData(form);

    try {
      // Endpoint Formspree ou simulation locale si le service externe n'est pas encore configuré
      const endpoint = form.getAttribute('action') || 'https://formspree.io/f/xbjnqkyv';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        if (feedbackEl) {
          feedbackEl.className = 'form-feedback is-success';
          feedbackEl.innerHTML = `
            <strong>Message envoyé avec succès !</strong><br>
            Merci pour votre prise de contact. Kouamé Brou Éric Landry vous répondra dans les plus brefs délais.
          `;
          feedbackEl.style.display = 'block';
        }
        form.reset();
      } else {
        throw new Error('Une erreur s\'est produite lors de la transmission du message.');
      }
    } catch (err) {
      console.error('Erreur formulaire :', err);
      if (feedbackEl) {
        feedbackEl.className = 'form-feedback is-error';
        feedbackEl.innerHTML = `
          <strong>Échec de l'envoi direct.</strong><br>
          Vous pouvez joindre Éric Landry directement par e-mail à : 
          <a href="mailto:ekouame07@gmail.com" style="font-weight:600; text-decoration:underline;">ekouame07@gmail.com</a>
          ou via WhatsApp.
        `;
        feedbackEl.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}
