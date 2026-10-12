# Kakonoeko Design

Rediseño de la web de Kakonoeko Design: diseño adaptable, llamadas a la acción, portfolio de Repariko con cuatro capturas ampliables y contacto por correo, Instagram y TikTok.

## Ver la web

Publicación prevista en https://kakonoeko.github.io/kakonoeko-design/.
También se puede abrir `index.html` directamente, sin instalación ni compilación.

## Activar WhatsApp cuando llegue el número

1. Abre `config.js`.
2. Sustituye `whatsappNumber: ''` por el número completo entre comillas, con prefijo internacional y solo dígitos (sin `+`, espacios ni guiones).
3. Guarda el cambio en GitHub. El botón cambia automáticamente de «Próximamente» a «Cuéntame tu proyecto» y abre WhatsApp con un mensaje preparado.

El número está vacío a propósito. No se publica un teléfono provisional ni se utiliza el teléfono que aparece dentro de las capturas de Repariko.

## Publicar con GitHub Pages

En el repositorio: **Settings → Pages → Deploy from a branch → main → / (root) → Save**.
El archivo `.nojekyll` permite publicar los archivos estáticos directamente.

## Archivos

- `index.html`: contenido y estructura.
- `styles.css`: diseño y adaptación a pantallas.
- `script.js`: menú móvil, portfolio, ampliación de capturas y preparación de consultas.
- `config.js`: correo, perfiles sociales y futuro número de WhatsApp.
- `assets/`: logos originales y las cuatro capturas facilitadas por el propietario.

## Contacto y privacidad

Todos los enlaces de correo abren Gmail. El formulario prepara un mensaje en Gmail, con destinatario, asunto y texto completados. No envía mensajes automáticamente, no guarda datos y no tiene un servidor de recogida de consultas. El enlace alternativo de Gmail incorpora la consulta cuando se prepara. Los perfiles sociales se abren con enlaces normales; no se incorporan widgets, analítica ni cookies de seguimiento.

Las capturas del portfolio muestran el diseño de Repariko tal como se facilitó; sus datos internos pertenecen a esa demostración y no son datos de contacto de Kakonoeko.

## Validación

Revisar la navegación, los cuatro estados del portfolio, apertura y cierre con Escape de las capturas, el menú en móvil y la preparación de un mensaje. Comprobar que la opción WhatsApp muestra su aviso mientras no haya número y que se activa al configurarlo.

© Kakonoeko Design. Los recursos de marca y portfolio se conservan para este proyecto; no se añade una licencia de reutilización por terceros.
