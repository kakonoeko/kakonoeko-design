'use strict';
const cookieInfoClose = document.querySelector('[data-close-cookie-info]');
if (cookieInfoClose) cookieInfoClose.addEventListener('click', () => document.getElementById('cookie-info').remove());
