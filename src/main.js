// Actual imports
import i18next from 'i18next';
import { KioskARWorld } from './modules/ar/ar.js';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './assets/locale/en.js';
import { fr } from './assets/locale/fr.js';

import './assets/css/main.css';

// Init the i!8n.
const i18nextDetectorOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'navigator', 'htmlTag'],

  // keys or params to lookup language from
  lookupQuerystring: 'lang',

  debug: true,

  // cache user language on (persisted during browser session)
  excludeCacheFor: ['cimode'], // languages to not persist (localStorage)

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,
};

const i18nextOptions = {
  // Ignore periods as that scopes i18n.
  keySeparator: false,
  detection: i18nextDetectorOptions,
  resources: {
    en,
    fr,
  },
};

let kioskARWorld = null;

i18next.use(LanguageDetector).init(i18nextOptions, function () {
  kioskARWorld = new KioskARWorld();
});
i18next.on('languageChanged', function (lng) {
  kioskARWorld.updateLanguageCallback();
});
