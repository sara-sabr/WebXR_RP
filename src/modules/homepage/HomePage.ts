import { ITranslate } from '../translation/ITranslate';
import i18next from 'i18next';

/**
 * Home page functions.
 */
export class HomePage implements ITranslate {
  /**
   * Home page translation key.
   */
  static readonly PREFIX_KEY = 'homepage.';

  translate(): void {
    // We need the keys, just use the english keys.
    const translations: {
      [key: string]: string;
    } = i18next.getResourceBundle('en', 'translation');

    for (const k in translations) {
      // If the key in our translation starts with a prefix key then we need to find
      // it in the HTML.
      if (k.startsWith(HomePage.PREFIX_KEY)) {
        const element = document.getElementById(k);
        if (element) {
          element.innerHTML = i18next.t(k);
        }
      }
    }
  }
}
