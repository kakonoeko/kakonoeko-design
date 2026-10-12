# Kakonoeko Design

Rediseño de la web de Kakonoeko Design: diseño adaptable, llamadas a la acción, portfolio de propuestas de Invicto, web de artista y Repariko con capturas ampliables y contacto por correo, Instagram y TikTok.

## Ver la web

Web publicada en https://kakonoeko.github.io/kakonoeko-design/.
También se puede abrir `index.html` directamente, sin instalación ni compilación.

## Teléfono y WhatsApp

Contacto activo: **+34 624 751 521**. La web ofrece llamadas para consultas y enlaces directos a WhatsApp, incluido el botón flotante.

Para cambiarlo, actualiza `phoneNumber` y `whatsappNumber` en `config.js`, con prefijo internacional y solo dígitos. Los enlaces iniciales en `index.html` también incluyen el número para funcionar sin JavaScript. Si se deja vacío `whatsappNumber`, el botón flotante vuelve a estar desactivado.

## Publicar con GitHub Pages

En el repositorio: **Settings → Pages → Deploy from a branch → main → / (root) → Save**.
El archivo `.nojekyll` permite publicar los archivos estáticos directamente.

## Archivos

- `index.html`: contenido y estructura.
- `styles.css`: diseño y adaptación a pantallas.
- `script.js`: menú móvil, portfolio, ampliación de capturas y preparación de consultas.
- `config.js`: correo, perfiles sociales y números de teléfono y WhatsApp.
- `assets/`: logos originales y las cuatro capturas facilitadas por el propietario.

## Contacto y privacidad

Todos los enlaces de correo abren Gmail. El formulario prepara un mensaje en Gmail, con destinatario, asunto y texto completados. No envía mensajes automáticamente, no guarda datos y no tiene un servidor de recogida de consultas. El enlace alternativo de Gmail incorpora la consulta cuando se prepara. Los perfiles sociales se abren con enlaces normales; no se incorporan widgets, analítica ni cookies de seguimiento.

El portfolio contiene propuestas de diseño que no se presentan como webs oficiales en uso. Las capturas de Repariko se muestran sin barra de administración; sus datos internos pertenecen a esa demostración y no son datos de contacto de Kakonoeko. La propuesta de artista conserva la identidad pixelada.

## Validación

Revisar la navegación, los cuatro estados de Repariko y las galerías de Invicto y artista, apertura y cierre con Escape de las capturas, el menú en móvil y la preparación de un mensaje. Comprobar los enlaces activos de WhatsApp y teléfono, el orden del portfolio antes de Instagram y la presentación de Gabriel Lojo.

© Kakonoeko Design. Los recursos de marca y portfolio se conservan para este proyecto; no se añade una licencia de reutilización por terceros.
