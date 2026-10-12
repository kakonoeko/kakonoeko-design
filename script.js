'use strict';
const config = window.KAKONOEKO_CONFIG;
// Mantener el destino de los enlaces antiguos a la sección de contacto.
if (window.location?.hash === '#contacto' && !document.getElementById('contacto')) {
  window.location.replace('contacto.html');
}
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  navigation.classList.remove('open');
  navigation.inert = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('.sr-only').textContent = 'Abrir menú';
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  navigation.inert = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.querySelector('.home-link')?.addEventListener('click', closeMenu);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});

function gmailCompose(subject = '', body = '') {
  const parameters = new URLSearchParams({ view: 'cm', fs: '1', to: config.email });
  if (subject) parameters.set('su', subject);
  if (body) parameters.set('body', body);
  return `https://mail.google.com/mail/?${parameters}`;
}
document.querySelectorAll('[data-gmail-link]').forEach(link => {
  link.href = gmailCompose(link.dataset.gmailSubject || '');
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
document.querySelectorAll('[data-instagram-link]').forEach(link => link.href = config.instagram);
document.querySelectorAll('[data-tiktok-link]').forEach(link => link.href = config.tiktok);
document.querySelectorAll('[data-email-link]').forEach(link => {
  link.href = gmailCompose();
  link.querySelector('[data-email-address]').textContent = config.email;
});
const whatsappNumber = config.whatsappNumber.trim();
const phoneNumber = (config.phoneNumber || whatsappNumber).trim();
function displayPhone(number) {
  return /^34\d{9}$/.test(number) ? `+34 ${number.slice(2, 5)} ${number.slice(5, 8)} ${number.slice(8)}` : `+${number}`;
}
document.querySelectorAll('[data-phone-link]').forEach(link => {
  link.href = `tel:+${phoneNumber}`;
  link.querySelector('[data-phone-display]').textContent = displayPhone(phoneNumber);
});
const whatsappReady = /^[1-9]\d{7,14}$/.test(whatsappNumber);
const whatsappWidget = document.querySelector('[data-whatsapp-widget]');
if (whatsappWidget && whatsappReady) {
  const control = whatsappWidget.querySelector('.floating-whatsapp-button');
  const link = control.tagName === 'A' ? control : document.createElement('a');
  link.className = control.className;
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', 'Contactar por WhatsApp');
  link.title = 'Hablemos por WhatsApp';
  if (control !== link) {
    link.append(...control.childNodes);
    control.replaceWith(link);
  }
  whatsappWidget.querySelector('.floating-whatsapp-note').textContent = 'WhatsApp';
} else if (whatsappWidget) {
  const control = whatsappWidget.querySelector('.floating-whatsapp-button');
  const button = document.createElement('button');
  button.className = control.className;
  button.type = 'button';
  button.disabled = true;
  button.setAttribute('aria-label', 'WhatsApp, próximamente');
  button.append(...control.childNodes);
  control.replaceWith(button);
  whatsappWidget.querySelector('.floating-whatsapp-note').textContent = 'Próximamente';
}
document.querySelectorAll('[data-whatsapp-link]').forEach(link => {
  if (whatsappReady) {
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.querySelector('[data-whatsapp-status]').textContent = `${displayPhone(whatsappNumber)} · Escríbeme`;
    link.querySelector('[data-whatsapp-badge]').textContent = '↗';
    link.querySelector('[data-whatsapp-badge]').classList.remove('soon');
  } else {
    link.addEventListener('click', event => {
      event.preventDefault();
      document.getElementById('whatsapp-dialog').showModal();
    });
  }
});

const briefForm = document.getElementById('brief-form');
const serviceLabels = Object.freeze({ web: 'Diseño Web', redes: 'Gestión de Redes', ambos: 'Diseño Web y Gestión de Redes' });
if (briefForm) {
  const requestedService = new URLSearchParams(window.location?.search || '').get('servicio');
  if (Object.prototype.hasOwnProperty.call(serviceLabels, requestedService)) {
    document.getElementById('service-selector').value = requestedService;
  }
}
if (briefForm) briefForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(briefForm);
  const name = String(data.get('name') || '').trim();
  const business = String(data.get('business') || '').trim();
  const message = String(data.get('message') || '').trim();
  const service = String(data.get('service') || '');
  if (!Object.prototype.hasOwnProperty.call(serviceLabels, service)) {
    document.getElementById('form-status').textContent = 'Selecciona el servicio que te interesa.';
    return;
  }
  if (!name || !message) {
    document.getElementById('form-status').textContent = 'Escribe tu nombre y una breve descripción de tu idea.';
    return;
  }
  const body = `Hola, Kakonoeko Design:\n\nSoy ${name}.\nNegocio: ${business || 'Por definir'}\nServicio: ${serviceLabels[service]}\n\n${message}\n\nMe gustaría recibir más información sobre este servicio.\nGracias.`;
  if (!whatsappReady) {
    document.getElementById('form-status').textContent = 'WhatsApp no está disponible. Puedes utilizar el correo de contacto.';
    return;
  }
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`;
  document.getElementById('form-status').textContent = 'Tu consulta está preparada para WhatsApp. Revisa el mensaje allí y decide si enviarlo. ';
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});
document.getElementById('year').textContent = new Date().getFullYear();
