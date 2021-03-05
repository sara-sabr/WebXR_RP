// Actual imports
import i18next from 'i18next';
import { KioskARWorld } from './modules/ar/ar.js';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './assets/locale/en.js';
import { fr } from './assets/locale/fr.js';

import './assets/css/main.css';
import './assets/images/AR_ScanFloor_Icon.png';
import './assets/images/RP_Logo_Wordmark-EN+FR.png';

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
  // TODO: Create a loop for each key
  document.getElementById('t-header').innerHTML = i18next.t('t-header');
  document.getElementById('t-blurb').innerHTML = i18next.t('t-blurb');
  document.getElementById('t-device').innerHTML = i18next.t('t-device');
  document.getElementById('t-install').innerHTML = i18next.t('t-install');
  document.getElementById('t-desktop').innerHTML = i18next.t('t-desktop');
  document.getElementById('t-pcInstall').innerHTML = i18next.t('t-pcInstall');
  document.getElementById('t-preBtn').innerHTML = i18next.t('t-preBtn');
});
i18next.on('languageChanged', function (lng) {
  kioskARWorld.updateLanguageCallback();
});
