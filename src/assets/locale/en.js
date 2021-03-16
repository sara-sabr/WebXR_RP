import agentWelcome from '../audio/en/welcome.mp3';
import agentServiceETMS from '../audio/en/service.etms.mp3';
import agentServiceResearch from '../audio/en/service.research.mp3';
import agentServiceTP from '../audio/en/service.tp.mp3';
import agentServiceSP from '../audio/en/service.sp.mp3';
import agentServiceReturn from '../audio/en/service.return.mp3';

/**
 * English translations where en.json and en.js are merged by TranslationService.
 *
 * **Note**
 * Only place things here if they require JS functionality, otherwise place it in the en.json file.
 * For example: webpack assets.
 */
const en = {
  translation: {
    'welcome.audio': agentWelcome,
    'service.select.etms.audio': agentServiceETMS,
    'service.select.research.audio': agentServiceResearch,
    'service.select.tp.audio': agentServiceTP,
    'service.select.sp.audio': agentServiceSP,
    'service.select.return.audio': agentServiceReturn,
  },
};

export { en };
