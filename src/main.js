// Actual imports
import i18next from 'i18next';
import { KioskARWorld } from './modules/ar/ar.js';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './assets/locale/en.js';
import { fr } from './assets/locale/fr.js';

import './assets/css/main.css';

// Init the i!8n.
const i18nextOptions = {
  // order and from where user language should be detected
  order: [
    'querystring',
    'localStorage',
    'sessionStorage',
    'navigator',
    'htmlTag',
  ],

  // keys or params to lookup language from
  lookupQuerystring: 'lang',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  debug: true,

  // cache user language on (persisted during browser session)
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'], // languages to not persist (localStorage)

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  resources: {
    en: { en },
    fr: { fr },
  },
};

i18next
  .use(LanguageDetector)
  .init(i18nextOptions)
  .then(function () {
    console.log(i18nextOptions);
    console.log(i18next.t('agent.welcome.dialog'));

    new KioskARWorld();
  });
