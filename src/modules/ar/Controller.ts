import {
  FreeCamera,
  Vector3,
  Engine,
  Scene,
  WebXRFeaturesManager,
  AbstractMesh,
  WebXRDefaultExperience,
  Observer,
  WebXRHitTest,
  SceneLoader,
  Quaternion,
  Sound,
  HemisphericLight,
  DirectionalLight,
  PointerInfo,
  WebXRState,
  IWebXRHitResult,
} from 'babylonjs';

import 'babylonjs-loaders'; // Required to load GLFT files

import i18next from 'i18next';
import { InteractionConfigurations } from './interaction/Configurations';
import { Interaction } from './interaction/Interaction';

import KioskAsset from '../../assets/models/RP_Kiosk.gltf';
import AgentAsset from '../../assets/models/Malcolm.gltf';
import { ARConstants } from '../Constants';
import { ITranslate } from '../translation/ITranslate';
import { ARUI } from './UI';
import { Microphone } from './Microphone';
import { MicrophoneState } from './MicrophoneState';

/**
 * AR world singleton class.
 */
export class ARController implements ITranslate {
  /**
   * Singleton reference.
   */
  private static INSTANCE: ARController;

  /**
   * The container.
   */
  private canvas: HTMLElement = document.getElementById('renderCanvas');

  /**
   * The BABYLON 3D engine.
   */
  private engine: Engine = null;

  /**
   * The scene being shown.
   */
  private scene: Scene = null;

  /**
   * Feature manager.
   */
  private featuresManager: WebXRFeaturesManager = null;

  /**
   * Kiosk object
   */
  private kiosk: AbstractMesh = null;

  /**
   * Agent object
   */
  private agent: AbstractMesh = null;

  /**
   * Default web experience.
   */
  private xr: WebXRDefaultExperience = null;

  /**
   * Get the Hit Test feature.
   */
  private xrHitTest: WebXRHitTest = null;

  /**
   * The listener attached to hit test.
   */
  private xrHitTestObserve: Observer<IWebXRHitResult[]> = null;

  /**
   * The listener attached to mouse down for kiosk placement.
   */
  private placeKioskPointerObserve: Observer<PointerInfo> = null;

  /**
   * The kiosk coordinates.
   */
  private kioskCoordinates = null;

  /**
   * Microphone global variable.
   */
  public isMicON = false;

  /**
   * Microphone module interactions.
   */
  private readonly microphone: Microphone = Microphone.SINGLETON;

  /**
   * All the configured interactions.
   */
  private interactionConfigurations: Map<string, Interaction> =
    InteractionConfigurations.getConfiguration();

  /**
   * Current interaction.
   */
  private currentInteraction: Interaction;

  /**
   * Reference to UI.
   */
  private arUI: ARUI;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    // Empty on purpose.
  }

  /**
   * Get the singleton instance.
   */
  public static getInstance(): ARController {
    if (!ARController.INSTANCE) {
      ARController.INSTANCE = new ARController();
      ARController.INSTANCE.setup();
    }

    return ARController.INSTANCE;
  }

  /**
   * Initializer.
   */
  public async setup(): Promise<void> {
    try {
      this.engine = this.createDefaultEngine();
    } catch (e) {
      throw new Error(e);
    }

    await this.createXRScene();
    await this.setupAssetKiosk();
    this.arUI = ARUI.getInstance();
    await this.arUI.setup(this);
    await this.setupHitTest();

    // Register a render loop to repeatedly render the scene
    this.engine.runRenderLoop(this.renderScene);

    // Resize
    window.addEventListener('resize', this.resizeEventHandler);

    // Initial.
    this.executeInteraction(ARConstants.INTERACTION_KIOSK);
  }

  /**
   * Render the scene.
   *
   * This method runs inside an event handler.
   */
  private async renderScene(): Promise<void> {
    ARController.getInstance().scene.render();
  }

  /**
   * Resize event handler.
   *
   * This method runs inside an event handler.
   */
  private resizeEventHandler(): void {
    ARController.getInstance().engine.resize();
  }

  /**
   * Create the default engine.
   *
   * @return {Engine} a configured engine.
   */
  private createDefaultEngine(): Engine {
    if (this.canvas && this.canvas instanceof HTMLCanvasElement) {
      return new Engine(this.canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        disableWebGL2Support: false,
      });
    }

    throw new Error(
      "Either DOM element with id 'renderCanvas' doesn't exist or it isn't a <canvas>"
    );
  }

  /**
   * Create the XR scene.
   */
  private async createXRScene(): Promise<void> {
    this.scene = new Scene(this.engine);

    // Setup the camera.
    const camera = new FreeCamera('pov-camera', new Vector3(0, 1, -5), this.scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(this.canvas, true);

    // Setup the lights.
    const light = new HemisphericLight('scene-light', new Vector3(0, 1, 0), this.scene);
    light.intensity = 0.7;
    const dirLight = new DirectionalLight('directionalLight', new Vector3(0, 0, 1), this.scene);
    dirLight.position = new Vector3(0, 5, -5);

    // Activate the AR experience.
    this.xr = await this.scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: 'immersive-ar',
        referenceSpaceType: 'local-floor',
        onError: (error) => {
          alert(error);
        },
      },
      optionalFeatures: true,
    });

    this.featuresManager = this.xr.baseExperience.featuresManager;
  }

  /**
   * Activate hit test and add listener.
   */
  private async setupHitTest(): Promise<void> {
    this.xrHitTest = this.featuresManager.enableFeature(WebXRHitTest, 'latest') as WebXRHitTest;

    await this.setEnableHitTest(true);
  }

  /**
   * Turn on or off the ghosting affect.
   *
   * @param ghosting - true to enable ghosting, otherwise false.
   */
  private async toggleKioskGhosting(ghosting: boolean): Promise<void> {
    let ghostValue = 1;
    if (ghosting === true) {
      ghostValue = 0.1;
    }

    await ARUI.getInstance().toggleKioskMode(ghosting);

    for (const child of this.kiosk.getChildMeshes()) {
      child.visibility = ghostValue;
    }
  }

  /**
   * Turn on or off hit test depending on present
   * state.
   *
   * @param enabled - Turn on hit test.
   */
  private async setEnableHitTest(enabled: boolean): Promise<void> {
    if (enabled === true) {
      // Activate the observers only if they haven't been
      // activated.
      if (this.xrHitTestObserve === null) {
        this.xrHitTestObserve = this.xrHitTest.onHitTestResultObservable.add(
          this.hitTestObserverCallback
        );
      }
      if (this.placeKioskPointerObserve === null) {
        // Touch screen pointer event to place kiosk in AR at donut location
        this.placeKioskPointerObserve = this.scene.onPointerObservable.add(
          this.placeKioskPointerObserverCallback
        );
      }
    } else if (enabled === false) {
      // Force checking existence of 'enabled'.
      if (this.xrHitTestObserve !== null) {
        this.xrHitTest.onHitTestResultObservable.remove(this.xrHitTestObserve);
        this.xrHitTestObserve = null;
      }
      if (this.placeKioskPointerObserve !== null) {
        // Touch screen pointer event to place kiosk in AR at donut location
        this.scene.onPointerObservable.remove(this.placeKioskPointerObserve);
        this.placeKioskPointerObserve = null;
      }
    }
  }

  /**
   * Note very redudamentary check as doesn't take into account proper get parameters.
   *
   * @returns true if debug=true set as a GET parameter.
   */
  public isDebugMode(): boolean {
    return window.location.href.indexOf('debug=true') >= 0;
  }

  /**
   * Trigger a microphone event.
   *
   * Probably better to do a observer pattern, but that can be done later.
   *
   * @param event the event requested.
   */
  public triggerMicrophoneEvent(event: MicrophoneState, data?: Blob): void {
    if (event === MicrophoneState.STARTING) {
      this.microphone.startAudioRecording();
    } else if (event === MicrophoneState.REQUEST_FINISH) {
      this.microphone.stopAudioRecording();
    } else if (event === MicrophoneState.FINISHED) {
      const formData = new FormData();
      formData.append('file', data);

      const fetchOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
        },
        body: formData,
      };
      ARUI.getInstance().setDebugText('Sending voice over');
      try {
        fetch(window['xrApiServer'] + 'audio/upload', fetchOptions)
          .then((data) => {
            ARUI.getInstance().setDebugText('Response done');
            return data.arrayBuffer();
          })
          .then((buffer) => {
            try {
              const soundObject = new Sound('chatbot-response', buffer, this.scene, () => {
                //will only run when the sound object has decoded and downloaded the audio
                soundObject.play();
              });
            } catch (ee) {
              ARUI.getInstance().setDebugText(ee);
            }
          });
      } catch (e) {
        ARUI.getInstance().setDebugText(e);
      }
    }
  }

  /**
   * Hit test observer callback on pointer interactions.
   *
   * This method runs inside an event handler.
   *
   * @param eventData - the event data.
   */
  private placeKioskPointerObserverCallback(eventData: PointerInfo): void {
    const that = ARController.getInstance();

    if (eventData.event.type !== 'pointerdown') {
      // Ignore all non pointer down events.
      return;
    }

    if (that.kioskCoordinates && that.xr.baseExperience.state === WebXRState.IN_XR) {
      // Make kiosk visible in AR hit test and decompose the location matrix
      // If it already visible, don't make it visible again.
      that.toggleKioskGhosting(false);
      that.agent.setEnabled(true);

      // Execute welcome interaction when kiosk is placed
      that.executeInteraction(ARConstants.INTERACTION_WELCOME);

      that.kioskCoordinates.transformationMatrix.decompose(
        undefined,
        that.kiosk.rotationQuaternion,
        that.kiosk.position
      );

      that.kioskCoordinates.transformationMatrix.decompose(
        undefined,
        that.agent.rotationQuaternion,
        that.agent.position
      );

      // Hit Test is done, so toggle it off.
      that.setEnableHitTest(false);
    }
  }

  /**
   * Hit test observer callback on possible "floor" found during hit test.
   * Note: This method is called a lot during hit test.
   *
   * This method runs inside an event handler.
   *
   * @param {IWebXRHitResult[]} eventData - the event data
   */
  private hitTestObserverCallback(eventData: IWebXRHitResult[]): void {
    const that = ARController.getInstance();
    if (eventData.length && that.kiosk) {
      that.kiosk.setEnabled(true);
      that.toggleKioskGhosting(true);
      that.kioskCoordinates = eventData[0];
      that.kioskCoordinates.transformationMatrix.decompose(
        undefined,
        that.kiosk.rotationQuaternion,
        that.kiosk.position
      );
    } else if (that.kiosk) {
      that.kiosk.setEnabled(false);
      that.kioskCoordinates = undefined;
      that.toggleKioskGhosting(false);
    }
  }

  /**
   * Initialize all audio within the interactions.
   */
  private async setupAudio(): Promise<void> {
    for (const interaction of Array.from(this.interactionConfigurations.values())) {
      // If audio is configured, delete it. This happens when language is toggled.
      if (interaction.soundObject) {
        interaction.soundObject.dispose();
        interaction.soundObject = undefined;
      }

      // Add the audio if it exists.
      const messageKey = interaction.name + ARConstants.SUFFIX_I18N_AUDIO;
      if (i18next.exists(messageKey)) {
        interaction.soundObject = new Sound(interaction.name, i18next.t(messageKey), this.scene);
      }
    }
  }

  /**
   * Execute the defined interaction.
   *
   * @param interactionKey - The JSON key for the interaction that needs to be executed.
   */
  public async executeInteraction(interactionKey: string): Promise<void> {
    const interaction: Interaction = this.interactionConfigurations.get(interactionKey);

    if (interaction === null || interaction === undefined) {
      return;
    }

    this.currentInteraction = interaction;

    // Execute before interaction hook.
    if (interaction.beforeInteraction) {
      interaction.beforeInteraction(interaction);
    }

    // Switch GUI.
    await this.refreshInteraction();

    // Animation
    if (interaction.animationKey) {
      const agentAnimation = this.scene.getAnimationGroupByName(interaction.animationKey);
      agentAnimation.start(false, 1.0, agentAnimation.from, agentAnimation.to, false);
    }

    // Sound.
    if (interaction.soundObject) {
      Engine.audioEngine.audioContext.resume();
      interaction.soundObject.play();
      interaction.soundObject.onEndedObservable.add(this.executeInteractionAfterSound);
    } else {
      this.executeInteractionAfterSound();
    }
  }

  /**
   * Fired after audio is completed.
   */
  private executeInteractionAfterSound(): void {
    const that = ARController.getInstance();
    const interaction = that.currentInteraction;

    // Execute after interaction hook.
    if (interaction.afterInteraction) {
      interaction.afterInteraction(interaction);
    }

    // Execute after next hook.
    if (interaction.nextInteraction) {
      that.executeInteraction(interaction.nextInteraction);
    }
  }

  /**
   * Setup the kiosk assets.
   */
  private async setupAssetKiosk(): Promise<void> {
    // Create Kiosk model
    const kioskScale = 0.3;

    this.kiosk = (await SceneLoader.ImportMeshAsync(null, KioskAsset, '')).meshes[0];
    this.kiosk.scaling = new Vector3(kioskScale, kioskScale, -kioskScale);
    this.kiosk.setEnabled(false);

    // Initially load the kiosk ghosted.
    this.toggleKioskGhosting(true);
    this.kiosk.rotationQuaternion = new Quaternion();

    const agentScale = 20;

    this.agent = (await SceneLoader.ImportMeshAsync(null, AgentAsset, '')).meshes[0];
    this.agent.scaling = new Vector3(agentScale, agentScale, -agentScale);
    this.agent.setEnabled(false);
    this.agent.rotationQuaternion = new Quaternion();
    this.agent.rotation;

    const agentAnimation = this.scene.getAnimationGroupByName('Idle');
    agentAnimation.start(true, 1.0, agentAnimation.from, agentAnimation.to, false);
  }

  public translate(): void {
    this.setupAudio();
    if (this.arUI) {
      this.arUI.updateDialogMessage(this.currentInteraction);
    }
  }

  /**
   * Exit full screen.
   */
  public exit(): void {
    const button = document.getElementsByClassName('babylonVRicon')[0] as HTMLInputElement;
    button.click();
  }

  public async refreshInteraction(): Promise<void> {
    // Switch GUI.
    await this.arUI.updateGUI(this.currentInteraction);
  }
}
