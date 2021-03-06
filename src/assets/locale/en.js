import agentWelcome from '../audio/en/welcome.mp3';
import agentServiceSelectETMS from '../audio/en/service.select.etms.mp3';
import agentServiceSelectResearch from '../audio/en/service.select.research.mp3';
import agentServiceSelectTP from '../audio/en/service.select.tp.mp3';
import agentServiceSelectSP from '../audio/en/service.select.sp.mp3';
import agentServiceSelectReturn from '../audio/en/service.select.return.mp3';
import agentRequestSent from '../audio/en/request.sent.mp3';
import agentResearchRequestSubmitted from '../audio/en/research.request.submitted.mp3';
import agentVerification from '../audio/en/verification.mp3';
import agentInputConfirmation from '../audio/en/input.confirmation.mp3';
import agentCallEnd from '../audio/en/call.end.mp3';
import agentPilot from '../audio/en/pilot.mp3';
import agentMainOptions from '../audio/en/main.select.msca.mp3';
import agentSurvey1 from '../audio/en/survey.q1.mp3';
import agentSurvey2 from '../audio/en/survey.q2.mp3';
import agentThankYou from '../audio/en/thankyou.mp3';

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
    'pilot.audio': agentPilot,
    'main.select.msca.audio': agentMainOptions,
    'service.select.etms.audio': agentServiceSelectETMS,
    'service.select.research.audio': agentServiceSelectResearch,
    'service.select.tp.audio': agentServiceSelectTP,
    'service.select.sp.audio': agentServiceSelectSP,
    'service.select.return.audio': agentServiceSelectReturn,
    'request.sent.audio': agentRequestSent,
    'research.request.submitted.audio': agentResearchRequestSubmitted,
    'verification.audio': agentVerification,
    'input.confirmation.audio': agentInputConfirmation,
    'call.end.audio': agentCallEnd,
    'survey.q1.audio': agentSurvey1,
    'survey.q2.audio': agentSurvey2,
    'thankyou.audio': agentThankYou,
  },
};

export { en };
