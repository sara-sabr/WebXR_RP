// Actual imports
import { EventBus } from './modules/eventbus/bus.js';
import { KioskARWorld } from './modules/ar/ar.js';
import './assets/css/main.css';

// Initialize the event bus.
const eventBus = new EventBus(3);
eventBus.subscribe('test', 1, function () {
  console.log({ data });
  console.log({ data });
});
new KioskARWorld();
