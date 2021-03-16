export class ARConstants {
  /**
   * Suffix keys that represent an audio file.
   */
  static readonly SUFFIX_I18N_AUDIO = '.audio';

  /**
   * Suffix keys that represents a message to show.
   */
  static readonly SUFFIX_I18N_MESSAGE = '.message';

  /**
   * Choice menus alreays have [interaction name].choice.[key] format.
   */
  static readonly CHOICE_I18N_PATTTERN = '.choice.';

  /**
   * Kiosk interaction.
   */
  static readonly INTERACTION_KIOSK = 'intro';

  /**
   * Welcome interaction.
   */
  static readonly INTERACTION_WELCOME = 'welcome';

  /**
   * Select Research interaction.
   */
  static readonly INTERACTION_SELECT_ETMS = 'service.select.etms';

  /**
   * Select Research interaction.
   */
  static readonly INTERACTION_SELECT_RESEARCH = 'service.select.research';

  /**
   * Select technology prototype interaction.
   */
  static readonly INTERACTION_SELECT_TP = 'service.select.tp';

  /**
   * Select solution prototype interaction.
   */
  static readonly INTERACTION_SELECT_SP = 'service.select.sp';

  /**
   * Service Selection interaction.
   */
  static readonly INTERACTION_SERVICE_CHOICE = 'service';

  /**
   * Service Selection Return interaction.
   */
  static readonly INTERACTION_SERVICE_RETURN = 'service.select.return';

  /**
   * Service Research interaction.
   */
  static readonly INTERACTION_ETMS_CHOICE = 'service.etms';

  /**
   * Service Research interaction.
   */
  static readonly INTERACTION_RESEARCH_CHOICE = 'service.research';

  /**
   * Service tp interaction.
   */
  static readonly INTERACTION_TP_CHOICE = 'service.tp';

  /**
   * Service sp interaction.
   */
  static readonly INTERACTION_SP_CHOICE = 'service.sp';

  /**
   * Main Menu interaction.
   */
  static readonly INTERACTION_MAIN_MENU = 'mainMenu';
}
