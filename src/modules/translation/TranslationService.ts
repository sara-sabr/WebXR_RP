import i18next, { InitOptions } from 'i18next';
import { en } from '../../assets/locale/en.js';
import * as enJson from '../../assets/locale/en.json';
import { fr } from '../../assets/locale/fr.js';
import * as frJson from '../../assets/locale/fr.json';
import { ITranslate } from './ITranslate';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

export class TranslationService {
  /**
   * Translation objects
   */
  private static readonly CONSUMERS: ITranslate[] = [];

  /**
   * Element for switch language.
   */
  static readonly DOM_ELEMENT = document.getElementById('homepage.toggleLanguage');

  /**
   * Language detection options.
   */
  private static readonly DETECTION_OPTION = {
    // order and from where user language should be detected
    order: ['querystring', 'navigator', 'htmlTag'],

    // keys or params to lookup language from
    lookupQuerystring: 'lang',

    // cache user language on (persisted during browser session)
    excludeCacheFor: ['cimode'], // languages to not persist (localStorage)

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement,
  };

  /**
   * I18Next settings.
   */
  private static readonly OPTIONS: InitOptions = {
    // Ignore periods as that scopes i18n.
    keySeparator: false,
    detection: TranslationService.DETECTION_OPTION,
  };

  /**
   * Add the consumer to the list.
   *
   * @param obj consumer
   */
  static addConsumer(obj: ITranslate): void {
    TranslationService.CONSUMERS.push(obj);
  }

  /**
   * Changed language, so inform all the language objects.
   */
  private static updateLanguages(): void {
    for (const obj of TranslationService.CONSUMERS) {
      obj.translate();
    }
  }

  /**
   * Get the current language.
   *
   * @returns the current language without the locality.
   */
  static getCurrentLanguage(): string {
    const idx = i18next.language.indexOf('-');

    if (idx > 0) {
      return i18next.language.substring(0, i18next.language.indexOf('-'));
    } else {
      return i18next.language;
    }
  }

  /**
   * Switch the language.
   *
   * @param event DOM event
   */
  private static switchLanguage(event: Event): void {
    const language = TranslationService.getCurrentLanguage() === 'en' ? 'fr' : 'en';
    i18next.changeLanguage(language);
    event.preventDefault();
  }

  /**
   * Language change event.
   *
   * @param lng the language code
   */
  private static languageChangeEvent(): void {
    TranslationService.updateLanguages();
  }

  /**
   * Setup the service.
   */
  static async setup(): Promise<void> {
    // Shallow merge the js and json objects together.
    Object.assign(en.translation, enJson.default.translation);
    Object.assign(fr.translation, frJson.default.translation);

    TranslationService.OPTIONS.resources = { en, fr };

    i18next
      .use(I18nextBrowserLanguageDetector)
      .init(TranslationService.OPTIONS, TranslationService.languageChangeEvent);

    i18next.on('languageChanged', TranslationService.languageChangeEvent);

    if (TranslationService.DOM_ELEMENT) {
      TranslationService.DOM_ELEMENT.addEventListener('click', TranslationService.switchLanguage);
    }
  }
}
