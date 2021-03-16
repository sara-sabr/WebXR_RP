// Actual imports
import { HomePage } from './modules/homepage/HomePage';
import { TranslationService } from './modules/translation/TranslationService';

// Assets
import './assets/css/main.css';
import RPLogo from './assets/images/RP_Logo_Wordmark-EN+FR.png';
import { ARController } from './modules/ar/Controller';

// Fix the image src link.
document.getElementById('rp-logo').setAttribute('src', RPLogo);

TranslationService.addConsumer(new HomePage());
TranslationService.addConsumer(ARController.getInstance());

TranslationService.setup();
