'use strict';
const config = window.KAKONOEKO_CONFIG;
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('.sr-only').textContent = 'Abrir menú';
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});

const projects = [
  { name: 'Inicio', title: 'Una primera impresión clara.', copy: 'Una presentación directa del negocio, sus especialidades y dos llamadas a la acción para explorar los servicios o contactar.' },
  { name: 'Servicios', title: 'Cada servicio, en su lugar.', copy: 'Dos especialidades bien diferenciadas, con información fácil de recorrer y botones que invitan a solicitar un presupuesto.' },
  { name: 'Nosotros', title: 'La personalidad del negocio.', copy: 'Un espacio para contar la historia de Repariko y presentar su especialización, manteniendo la misma identidad visual del resto de la web.' },
  { name: 'Contacto', title: 'El siguiente paso, más fácil.', copy: 'Una página que reúne las vías de contacto y un formulario para explicar qué necesita el cliente antes de iniciar la conversación.' }
];
let activeProject = 1;
const tabs = [...document.querySelectorAll('[data-project]')];
function selectProject(number, moveFocus = false) {
  const project = projects[number - 1];
  activeProject = number;
  tabs.forEach(tab => {
    const selected = Number(tab.dataset.project) === number;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) tab.focus();
  });
  document.getElementById('project-panel').setAttribute('aria-labelledby', `tab-${number}`);
  document.getElementById('project-image').src = `assets/repariko-${number}-limpia.jpg`;
  document.getElementById('project-image').alt = `Página de ${project.name.toLowerCase()} de Repariko`;
  document.querySelector('#project-panel .project-image-button').setAttribute('aria-label', `Ampliar captura: ${project.name} de Repariko`);
  document.getElementById('project-number').textContent = `0${number} / ${project.name.toUpperCase()}`;
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-copy').textContent = project.copy;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectProject(index + 1));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectProject(next + 1, true);
    }
  });
});
const captureDialog = document.getElementById('capture-dialog');
function showCapture(number) {
  const project = projects[number - 1];
  document.getElementById('capture-dialog-title').textContent = `Repariko · ${project.name}`;
  const image = document.getElementById('capture-dialog-image');
  image.src = `assets/repariko-${number}-limpia.jpg`;
  image.alt = `Captura completa de la página de ${project.name.toLowerCase()} de Repariko`;
  captureDialog.showModal();
}
document.querySelector('#project-panel .project-image-button').addEventListener('click', () => showCapture(activeProject));
document.querySelectorAll('[data-capture]').forEach(button => button.addEventListener('click', () => showCapture(Number(button.dataset.capture))));
document.querySelectorAll('[data-gallery-image]').forEach(button => button.addEventListener('click', () => {
  document.getElementById('capture-dialog-title').textContent = button.dataset.galleryTitle;
  const image = document.getElementById('capture-dialog-image');
  image.src = button.dataset.galleryImage;
  image.alt = `Captura de la web de ${button.dataset.galleryTitle}`;
  captureDialog.showModal();
}));
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
document.querySelector('.gmail-fallback').href = gmailCompose();
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
briefForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(briefForm);
  const name = String(data.get('name') || '').trim();
  const business = String(data.get('business') || '').trim();
  const message = String(data.get('message') || '').trim();
  if (!name || !message) {
    document.getElementById('form-status').textContent = 'Escribe tu nombre y una breve descripción de tu idea.';
    return;
  }
  const subject = `Mi primera web · ${business || name}`;
  const body = `Hola, Kakonoeko Design:\n\nSoy ${name}.\nNegocio: ${business || 'Por definir'}\n\n${message}\n\nMe gustaría hablar sobre mi proyecto web.\nGracias.`;
  const gmailUrl = gmailCompose(subject, body);
  document.querySelector('.gmail-fallback').href = gmailUrl;
  document.getElementById('form-status').textContent = 'Tu consulta está preparada. Revisa y envía el mensaje en Gmail. Si no se abre, utiliza el enlace de abajo.';
  window.open(gmailUrl, '_blank', 'noopener,noreferrer');
});
document.getElementById('year').textContent = new Date().getFullYear();
