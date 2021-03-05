import agentWelcome from '../audio/en/agent.welcome.mp3';
import agentServiceETMS from '../audio/en/agent.service.etms.mp3';
import agentServiceResearch from '../audio/en/agent.service.research.mp3';
import agentServiceTP from '../audio/en/agent.service.tp.mp3';
import agentServiceSP from '../audio/en/agent.service.sp.mp3';
import agentServiceReturn from '../audio/en/agent.service.return.mp3';
import * as data from './en.json';

const en = {
  translation: {
    // Intro
    'intro.dialog': data.default.translation['intro.dialog'],
    // Welcome
    'agent.welcome.dialog': data.default.translation['agent.welcome.dialog'],
    'agent.welcome.audio': agentWelcome,
    // Service - ETMS
    'agent.service.etms.dialog':
      data.default.translation['agent.service.etms.dialog'],
    'agent.service.etms.audio': agentServiceETMS,
    // Service - Research
    'agent.service.research.dialog':
      data.default.translation['agent.service.research.dialog'],
    'agent.service.research.audio': agentServiceResearch,
    // Service - Technology Prototyping
    'agent.service.tp.dialog':
      data.default.translation['agent.service.tp.dialog'],
    'agent.service.tp.audio': agentServiceTP,
    // Service - Solution Prototyping
    'agent.service.sp.dialog':
      data.default.translation['agent.service.sp.dialog'],
    'agent.service.sp.audio': agentServiceSP,
    // Service - Return
    'agent.service.return.dialog':
      data.default.translation['agent.service.return.dialog'],
    'agent.service.return.audio': agentServiceReturn,
    // GUI Buttons
    // Button - ETMS
    'gui.button.etms.dialog':
      data.default.translation['gui.button.etms.dialog'],
    // Button - Research
    'gui.button.research.dialog':
      data.default.translation['gui.button.research.dialog'],
    // Button - Technology Prototype
    'gui.button.tp.dialog': data.default.translation['gui.button.tp.dialog'],
    // Button - Solution Prototype
    'gui.button.sp.dialog': data.default.translation['gui.button.sp.dialog'],
    // Button - Return
    'gui.button.return.dialog':
      data.default.translation['gui.button.return.dialog'],
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
