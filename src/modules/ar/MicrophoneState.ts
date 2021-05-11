/**
 * Represents the state of the microphone on the device.
 */
export enum MicrophoneState {
    /** Currently starting but not recording yet. */
    STARTING,
    /** Currently recording. */
    RECORDING,
    /** A request was made to finish the recording. */
    REQUEST_FINISH,
    /** Currently finishing recording. */
    FINISHING,
    /** Finished recording and can access buffer for the audio. */
    FINISHED,
    /** Idle when not recording at all and potientially nothing in buffer. */
    IDLE
}
