'use strict';
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
