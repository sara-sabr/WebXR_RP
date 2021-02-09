// Actual imports
import { EventBus } from './modules/eventbus/bus.js';
import { KioskARWorld } from './modules/ar/ar.js';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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

  // cache user language on
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'], // languages to not persist (localStorage)

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,
};

i18next.use(LanguageDetector).init(i18nextOptions);

// Initialize the event bus.
const eventBus = new EventBus(3);
eventBus.subscribe('test', 1, function () {
  console.log({ data });
  console.log({ data });
});
new KioskARWorld();
