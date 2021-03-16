const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');
const process = require('process');
const localeEn = require('./assets/locale/en.json');
const localeFr = require('./assets/locale/fr.json');

const apiKey = process.env.APIKEY;
const region = process.env.REGION;

const speechConfig = sdk.SpeechConfig.fromSubscription(apiKey, region);
speechConfig.speechSynthesisOutputFormat =
  sdk.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;

/**
 * Function to take the locale scripts and create mp3 files.
 * @param {*} translation The locale JSON object that contains the written script for the character to speak.
 * @param {*} language The language of the locale ("en" or "fr")
 */
function generateAudio(translation, language) {
  let destPath = '';

  if (language.includes('en')) {
    speechConfig.speechSynthesisVoiceName = 'en-CA-LiamNeural';
    destPath = 'src/assets/audio/en/';
  } else if (language.includes('fr')) {
    speechConfig.speechSynthesisVoiceName = 'fr-CA-AntoineNeural';
    destPath = 'src/assets/audio/fr/';
  }
  for (const key in translation) {
    if (key.endsWith('.message')) {
      const filename = destPath + key.substring(0, key.length - 7) + '.mp3';
      console.log('Creating audio file: ' + filename);
      const textToSpeech = translation[key].replace(/\n/g, '');
      synthesizeSpeech(filename, textToSpeech);
    } else {
      continue;
    }
  }
  return;
}
/**
 * Function that converts text to audio.
 * @param {*} filename The output location for the mp3 file.
 * @param {*} tts The text to be converted.
 */
function synthesizeSpeech(filename, tts) {
  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);

  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
  synthesizer.speakTextAsync(
    tts,
    (result) => {
      synthesizer.close();
      if (result) {
        // return result as stream
        return fs.createReadStream(filename);
      }
    },
    (error) => {
      console.log(error);
      synthesizer.close();
    }
  );
}

generateAudio(localeEn.translation, 'en');
generateAudio(localeFr.translation, 'fr');
