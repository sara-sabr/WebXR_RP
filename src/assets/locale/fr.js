import agentWelcome from '../audio/fr/agent.welcome.mp3';
import agentServiceETMS from '../audio/fr/agent.service.etms.mp3';

const fr = {
  translation: {
    // Intro
    'intro.dialog': 'Visez le plancher pour faire apparaître le kiosque.',
    // Welcome
    'agent.welcome.dialog':
      "Bienvenue au prototype de RA de l’équipe de recherche et prototypage. Je m'appelle Simon, votre agent virtuel. Comment puis-je vous aider?",
      'agent.welcome.audio': agentWelcome,
    // Service
    'agent.service.etms.dialog':
      'Vous avez sélectionné le service de surveillances des technologies émergentes.',
      'agent.service.etms.audio': agentServiceETMS,
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
      "Sélectionnez le bouton ci-dessous pour lancer l'application de RA!",
  },
};

export { fr };
