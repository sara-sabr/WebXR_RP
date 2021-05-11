import { ARController } from "./Controller";
import { MicrophoneState } from "./MicrophoneState";
import { ARUI } from "./UI";

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
   private microphoneState:MicrophoneState = MicrophoneState.IDLE;

   /**
    * The current recorded audio.
    */
   private recordAudioChunks = [];

   /**
    * Browser media recorder.
    */
   private mediaRecorder:MediaRecorder;

   constructor() {
    // Request audio
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(this.setupRecordAudio.bind(this));
   }


  /**
   * Setup the audio recording feature on initialization.
   *
   * Note: This must be triggered by the event handler.
   *
   * @param stream the stream that's being initialized.
   */
   private setupRecordAudio(stream):void {
    const options = {mimeType: 'audio/webm'};
    var _self = this;
    _self.mediaRecorder = new MediaRecorder(stream, options);

    // Listeners.
    _self.mediaRecorder.addEventListener('dataavailable', function(e:BlobEvent) {
        if(_self.microphoneState === MicrophoneState.FINISHING || _self.microphoneState === MicrophoneState.IDLE) {
            return;
        }

        if (e.data.size > 0) {
            _self.recordAudioChunks.push(e.data);
            ARUI.getInstance().setDebugText('Audio saved now ' + _self.recordAudioChunks.length);
        }

        if(_self.microphoneState === MicrophoneState.REQUEST_FINISH) {
          _self.mediaRecorder.stop();
        }
    });

    _self.mediaRecorder.addEventListener('stop', function() {
        _self.microphoneState = MicrophoneState.FINISHED;
        ARController.getInstance().triggerMicrophoneEvent(_self.microphoneState, _self.recordAudioChunks);
        _self.microphoneState = MicrophoneState.IDLE;
    });
  }

  /**
   * Start the current audio recording.
   */
  public startAudioRecording():void {
    this.microphoneState = MicrophoneState.STARTING;
    this.recordAudioChunks = [];
    this.mediaRecorder.start(1000);
    this.microphoneState = MicrophoneState.RECORDING;
  }

  /**
   * Stop the current audio recording.
   */
  public stopAudioRecording():void {
    this.microphoneState = MicrophoneState.REQUEST_FINISH;
  }

  /**
   * @returns true when recording.
   */
  public isRecording():boolean {
    return this.microphoneState === MicrophoneState.RECORDING;
  }
}