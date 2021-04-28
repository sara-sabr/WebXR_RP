import agentWelcome from '../audio/fr/welcome.mp3';
import agentServiceSelectETMS from '../audio/fr/service.select.etms.mp3';
import agentServiceSelectResearch from '../audio/fr/service.select.research.mp3';
import agentServiceSelectTP from '../audio/fr/service.select.tp.mp3';
import agentServiceSelectSP from '../audio/fr/service.select.sp.mp3';
import agentServiceSelectReturn from '../audio/fr/service.select.return.mp3';
import agentRequestSent from '../audio/fr/request.sent.mp3';
import agentResearchRequestSubmitted from '../audio/fr/research.request.submitted.mp3';
import agentVerification from '../audio/fr/verification.mp3';
import agentInputConfirmation from '../audio/en/input.confirmation.mp3';

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
    'service.select.etms.audio': agentServiceSelectETMS,
    'service.select.research.audio': agentServiceSelectResearch,
    'service.select.tp.audio': agentServiceSelectTP,
    'service.select.sp.audio': agentServiceSelectSP,
    'service.select.return.audio': agentServiceSelectReturn,
    'request.sent.audio': agentRequestSent,
    'research.request.submitted.audio': agentResearchRequestSubmitted,
    'verification.audio': agentVerification,
    'input.confirmation.audio': agentInputConfirmation,
  },
};

export { fr };
