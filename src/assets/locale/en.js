import HelloMessage from '../audio/Hello.mp3';

const en = {
  translation: {
    // Intro
    'intro.dialog': 'Scan the floor to place the kiosk',
    // Welcome
    'agent.welcome.dialog':
      "Welcome to ITRP AR. \n\nI'm Simon, your virtual agent. \n\nHow can I help you?",
    'agent.welcome.audio': HelloMessage,
    // Service
    'agent.service.etms.dialog':
      'You have selected monitoring emerging technologies',
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
    't-preBtn': 'Select the button below to launch the AR application!',
  },
};

export { en };
