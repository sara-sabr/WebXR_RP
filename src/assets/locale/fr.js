import agentWelcome from '../audio/fr/agent.welcome.mp3';
import agentServiceETMS from '../audio/fr/agent.service.etms.mp3';
import agentServiceResearch from '../audio/fr/agent.service.research.mp3';
import agentServiceTP from '../audio/fr/agent.service.tp.mp3';
import agentServiceSP from '../audio/fr/agent.service.sp.mp3';
import agentServiceReturn from '../audio/fr/agent.service.return.mp3';
import * as data from "./fr.json"; 

const fr = {
  translation: {
    // Intro
    'intro.dialog': data.default.translation["intro.dialog"],
    // Welcome
    'agent.welcome.dialog': data.default.translation["agent.welcome.dialog"],
    'agent.welcome.audio': agentWelcome,
    // Service - ETMS
    'agent.service.etms.dialog': data.default.translation["agent.service.etms.dialog"],
    'agent.service.etms.audio': agentServiceETMS,
    // Service - Research
    'agent.service.research.dialog': data.default.translation["agent.service.research..dialog"],
    'agent.service.research.audio': agentServiceResearch,
    // Service - Technology Prototyping
    'agent.service.tp.dialog': data.default.translation["agent.service.tp..dialog"],
    'agent.service.tp.audio': agentServiceTP,
    // Service - Solution Prototyping
    'agent.service.sp.dialog': data.default.translation["agent.service.sp.dialog"],
    'agent.service.sp.audio': agentServiceSP,
    // Service - Return
    'agent.service.return.dialog': data.default.translation["agent.service.return.dialog"],
    'agent.service.return.audio': agentServiceReturn,
    // Landing Page
    't-header': 'Recherche & prototypage - Prototype WebXR',
    't-blurb':
      "Il s'agit d'un prototype et n'implique en aucune façon qu'un tel service à EDSC sera offert où la réalité augmentée est disponible.\n\n L'objectif de ce prototype est de faire évoluer les limites et de voir ce qu'une technologie donnée pourrait faire.",
    't-device': "Exigences minimales de l'appareil",
    't-install':
      'Installer <strong><a href="https://apps.apple.com/us/app/webxr-viewer/id1295998056">WebXR Viewer</a></strong>',
    't-desktop': 'Ordinateur de bureau',
    't-pcInstall':
      '<strong>Chrome 87+</strong> avec <strong><a href="https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=fr">WebXR API Emulator</a></strong> installé et configuré.',
    't-preBtn':
      "Sélectionnez le bouton ci-dessous pour lancer l'application de RA!"

  },
};

export { fr };
