import agentWelcome from '../audio/en/agent.welcome.mp3';
import agentServiceETMS from '../audio/en/agent.service.etms.mp3';
import agentServiceResearch from '../audio/en/agent.service.research.mp3';
import agentServiceTP from '../audio/en/agent.service.tp.mp3';
import agentServiceSP from '../audio/en/agent.service.sp.mp3';
import agentServiceReturn from '../audio/en/agent.service.return.mp3';

const en = {
  translation: {
    // Intro
    'intro.dialog': 'Scan the floor to place the kiosk',
    // Welcome
    'agent.welcome.dialog':
      "Welcome to ITRP AR. \n\nI'm Simon, your virtual agent. \n\nHow can I help you?",
    'agent.welcome.audio': agentWelcome,
    // Service - ETMS
    'agent.service.etms.dialog':
      'You have selected monitoring emerging technologies',
    'agent.service.etms.audio': agentServiceETMS,
    // Service - Research
    'agent.service.research.dialog':
      'You have selected Research',
    'agent.service.research.audio': agentServiceResearch,
    // Service - Technology Prototyping
    'agent.service.tp.dialog':
      'You have selected Technology Prototyping',
    'agent.service.tp.audio': agentServiceTP,
    // Service - Solution Prototyping
    'agent.service.sp.dialog':
      'You have selected Solution Prototyping',
    'agent.service.sp.audio': agentServiceSP,
    // Service - Return
    'agent.service.return.dialog':
      'What other service would you like to get help with?',
    'agent.service.return.audio': agentServiceReturn,
    // Landing Page
    't-header': 'R&P WebAR Prototype',
    't-blurb':
      'This is a prototype and does not imply any possibility of a future ESDC service where augmented/mixed reality is available/offered. The purpose of this prototype is to push the boundaries and see what a given technology could do.',
    't-device': 'Minimum device requirements',
    't-install':
      'Install <strong><a href="https://apps.apple.com/us/app/webxr-viewer/id1295998056">WebXR Viewer</a></strong>',
    't-desktop': 'Desktop',
    't-pcInstall':
      '<strong>Chrome 87+</strong> with <strong><a href="https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=en">WebXR API Emulator</a></strong> installed and configured.',
    't-preBtn': 'Select the button below to launch the AR application!'
  },
};

export { en };
