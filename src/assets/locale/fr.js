import agentWelcome from '../audio/fr/welcome.mp3';
import agentServiceETMS from '../audio/fr/service.etms.mp3';
import agentServiceResearch from '../audio/fr/service.research.mp3';
import agentServiceTP from '../audio/fr/service.tp.mp3';
import agentServiceSP from '../audio/fr/service.sp.mp3';
import agentServiceReturn from '../audio/fr/service.return.mp3';

/**
 * French translations where fr.json and fr.js are merged by TranslationService.
 *
 * **Note**
 * Only place things here if they require JS functionality, otherwise place it in the fr.json file.
 * For example: webpack assets.
 */
const fr = {
  translation: {
    'welcome.audio': agentWelcome,
    'service.select.etms.audio': agentServiceETMS,
    'service.select.research.audio': agentServiceResearch,
    'service.select.tp.audio': agentServiceTP,
    'service.select.sp.audio': agentServiceSP,
    'service.select.return.audio': agentServiceReturn,
  },
};

export { fr };
