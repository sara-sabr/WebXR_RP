import { ARController } from './Controller';
import { MicrophoneState } from './MicrophoneState';
import { ARUI } from './UI';
import audioBuffer from 'audiobuffer-to-wav';

/**
 * Micrphone module.
 */
export class Microphone {
  /**
   * Singleton.
   */
  public static readonly SINGLETON = new Microphone();

  /**
   * The microphone state.
   */
  private microphoneState: MicrophoneState = MicrophoneState.IDLE;

  /**
   * The current recorded audio.
   */
  private recordAudioChunks = [];

  /**
   * Audio context to convert.
   */
  private audioCtx = new window.AudioContext;

  /**
   * Browser media recorder.
   */
  private mediaRecorder: MediaRecorder;

  constructor() {
    // Request audio
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(this.setupRecordAudio.bind(this));
  }

  /**
   * Setup the audio recording feature on initialization.
   *
   * Note: This must be triggered by the event handler.
   *
   * @param stream the stream that's being initialized.
   */
  private setupRecordAudio(stream: MediaStream): void {

    // const options = { mimeType: 'audio/webm' };
    const options = {mimeType : 'audio/webm',
                    codecs : "opus"};

    const _self = Microphone.SINGLETON;
    _self.mediaRecorder = new MediaRecorder(stream, options);

    // Listeners.
    _self.mediaRecorder.addEventListener('dataavailable', function (e) {
      if (
        _self.microphoneState === MicrophoneState.FINISHING ||
        _self.microphoneState === MicrophoneState.IDLE
      ) {
        return;
      }

      if (e.data.size > 0) {
        _self.recordAudioChunks.push(e.data);
        ARUI.getInstance().setDebugText('Audio saved now ' + _self.recordAudioChunks.length);
      }

      if (_self.microphoneState === MicrophoneState.REQUEST_FINISH) {
        _self.mediaRecorder.stop();
      }
    });

    _self.mediaRecorder.addEventListener('stop', function () {
      _self.convertCurrentAudioToWav();
    });
  }

  public convertCurrentAudioToWav(): void {
    const blob = new Blob(this.recordAudioChunks, {type:'audio/wav; codec=audio/pcm; samplerate=16000'})

    var arrayBuffer;
    var fileReader = new FileReader();
    var _self = this;

    fileReader.onload = function(event) {
      arrayBuffer = event.target.result;
    };

    // Convert the webm to wav for Microsft support.
    fileReader.readAsArrayBuffer(blob);
    fileReader.onloadend=function(d){
      _self.audioCtx.decodeAudioData(
          fileReader.result as ArrayBuffer,
          function(buffer) {
              try {
                var wav = audioBuffer(buffer);
              } catch (e) {
                ARUI.getInstance().setDebugText(e.message);
                return;
              }

              ARUI.getInstance().setDebugText("Converted to WAV");
              var fileLink = document.createElement('a');
              var wavBlob = new Blob([wav],{type:'audio/wav; codec=audio/pcm; samplerate=16000'})
              const audioUrl2 = URL.createObjectURL(wavBlob);
              ARUI.getInstance().setDebugText("Created URL");
              fileLink.href = audioUrl2;
              fileLink.download = 'test';
              fileLink.click();

              ARUI.getInstance().setDebugText("Downloaded");
              _self.microphoneState = MicrophoneState.FINISHED;
              ARController.getInstance().triggerMicrophoneEvent(
                _self.microphoneState,
                wavBlob
              );

              _self.microphoneState = MicrophoneState.IDLE;

           },
          function(e){
            _self.microphoneState = MicrophoneState.IDLE;
            ARUI.getInstance().setDebugText(e.message);
          }
      );
    };
  }

  /**
   * Start the current audio recording.
   */
  public startAudioRecording(): void {
    this.microphoneState = MicrophoneState.STARTING;
    this.recordAudioChunks = [];
    this.mediaRecorder.start(1000);
    this.microphoneState = MicrophoneState.RECORDING;
  }

  /**
   * Stop the current audio recording.
   */
  public stopAudioRecording(): void {
    this.microphoneState = MicrophoneState.REQUEST_FINISH;
  }

  /**
   * @returns true when recording.
   */
  public isRecording(): boolean {
    return this.microphoneState === MicrophoneState.RECORDING;
  }
}
