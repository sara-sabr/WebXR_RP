import {
  Engine,
  Scene,
  Sound,
  FreeCamera,
  Vector3,
  HemisphericLight,
  WebXRHitTest,
  Quaternion,
  SceneLoader,
  WebXRState,
  IWebXRHitResult, // eslint-disable-line
  WebXRDefaultExperience, // eslint-disable-line
  WebXRFeaturesManager, // eslint-disable-line
  DirectionalLight,
  AbstractMesh, // eslint-disable-line
  Observer, // eslint-disable-line
  PointerInfo, // eslint-disable-line
  EventState,// eslint-disable-line
} from 'babylonjs';

import {
  AdvancedDynamicTexture,
  Rectangle,
  TextBlock,
  Control,
  Button,
  Image,
} from 'babylonjs-gui';

import 'babylonjs-loaders'; // Required to load GLFT files
import KioskAsset from '../../assets/models/RP_Kiosk.gltf';
import AgentAsset from '../../assets/models/Malcolm.gltf';
import i18next from 'i18next';

/**
 * AR world code.
 */
function KioskARWorld() {
  /**
   * The container.
   */
  const canvas = document.getElementById('renderCanvas');

  /**
   * The BABYLON 3D engine.
   * @type {Engine}
   */
  let engine = null;

  /**
   * The scene being shown.
   * @type {Scene}
   */
  let scene = null;

  /**
   * The camera for the scene in the perspective of AR.
   * @type {Camera}
   */
  let camera = null;

  /**
   * Feature manager.
   * @type {WebXRFeaturesManager}
   */
  let featuresManager = null;

  /**
   * Kiosk object
   * @type {AbstractMesh}
   */
  let kiosk = null;

  /**
   * Agent object
   * @type {AbstractMesh}
   */
  let agent = null;

  /**
   * @type {WebXRDefaultExperience}
   */
  let xr = null;

  /**
   * Get the Hit Test feature.
   * @type {WebXRHitTest}
   */
  let xrHitTest = null;

  /**
   * The listener attached to hit test.
   * @type {Observer}
   */
  let xrHitTestObserve = null;

  /**
   * The listener attached to mouse down for kiosk placement.
   * @type {Observer}
   */
  let placeKioskPointerObserve = null;

  /**
   * The kiosk coordiantes.
   */
  let kioskCoordinates = null;

  /**
   * XR GUI
   * @type {AdvancedDynamicTexture}
   */
  let xrGUI = null;

  /**
   * XR GUI - "Dialog"
   * @type {TextBlock}
   */
  let xrDialogMessage = null;

  /**
   * Map of interactions used in the AR application
   */
  const interactionsMap = {
    intro: {
      dialog: 'intro.dialog',
    },
    welcome: {
      audioPath: 'agent.welcome.audio',
      soundObj: null,
      animation: 'Hello',
      dialog: 'agent.welcome.dialog',
    },
    // TO DO:
    // possibly add new animations to model for each service talking
    service_ETMS: {
      audioPath: 'agent.service.etms.audio',
      soundObj: null,
      animation: 'Talk',
      dialog: 'agent.service.etms.dialog',
    },
    service_Research: {
      audioPath: 'agent.service.research.audio',
      soundObj: null,
      animation: 'Talk',
      dialog: 'agent.service.research.dialog',
    },
    service_TP: {
      audioPath: 'agent.service.tp.audio',
      soundObj: null,
      animation: 'Talk',
      dialog: 'agent.service.tp.dialog',
    },
    service_SP: {
      audioPath: 'agent.service.sp.audio',
      soundObj: null,
      animation: 'Talk',
      dialog: 'agent.service.sp.dialog',
    },
    wave: {
      audioPath: 'agent.service.return.audio',
      soundObj: null,
      animation: 'Hello',
      dialog: 'agent.service.return.dialog',
    },
  };

  /**
   * Map of interactions used in the AR application
   */
  const buttonNamesMap = {
    btn_etms: {
      dialog: 'gui.button.etms.dialog',
    },
    btn_research: {
      dialog: 'gui.button.research.dialog',
    },
    btn_tp: {
      dialog: 'gui.button.tp.dialog',
    },
    btn_sp: {
      dialog: 'gui.button.sp.dialog',
    },
    btn_return: {
      dialog: 'gui.button.return.dialog',
    },
  };

  /**
   * Initializer.
   */
  const initFunction = async function () {
    try {
      engine = createDefaultEngine();
    } catch (e) {
      console.error('Cannot create the engine. ');
      console.error(e);
    }

    await createXRScene();
    await setupAssetKiosk();
    await setupHitTest();

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
      scene.render();
    });

    // Resize
    window.addEventListener('resize', function () {
      engine.resize();
    });

    // Initial.
    executeInteraction('intro');
  };

  /**
   * Create the default engine.
   *
   * @return {Engine} a configured engine.
   */
  const createDefaultEngine = function () {
    return new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false,
    });
  };

  /**
   * Create the XR scene.
   */
  const createXRScene = async function () {
    // This creates a basic Babylon Scene object (non-mesh)
    scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    camera = new FreeCamera('camera1', new Vector3(0, 1, -5), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Added directional light
    const dirLight = new DirectionalLight(
      'directionalLight',
      new Vector3(0, 0, 1),
      scene
    );
    dirLight.position = new Vector3(0, 5, -5);

    // Activate the AR experience.
    xr = await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: 'immersive-ar',
        referenceSpaceType: 'local-floor',
        onError: (error) => {
          alert(error);
        },
      },
      optionalFeatures: true,
    });
    //
    // Set the feature manager up.
    featuresManager = xr.baseExperience.featuresManager;
  };

  /**
   * Activate hit test and add listener.
   */
  const setupHitTest = async function () {
    xrHitTest = featuresManager.enableFeature(WebXRHitTest, 'latest');
    await createGUI();
    await setupAudio();
    await setEnableHitTest(true);
  };

  /**
   * Turn on or off the ghosting affect.
   *
   * @param {boolean} ghosting - true to enable ghosting, otherwise false.
   */
  const toggleKioskGhosting = async function (ghosting) {
    let ghostValue = 1;
    if (ghosting === true) {
      ghostValue = 0.1;
      // Remove scanARicon when ghosting begins
      xrGUI.removeControl(scanARicon);
    } else {
      // Added 'else' to bring back scanARicon when not ghosting
      xrGUI.addControl(scanARicon);
    }

    for (const child of kiosk.getChildMeshes()) {
      child.visibility = ghostValue;
    }
  };

  /**
   * Create the GUI.
   */
  const createGUI = async function () {
    // Initialize the GUI
    xrGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI');

    // Transparent dialog window
    const xrDialogTransparent = new Rectangle();
    xrDialogTransparent.width = 1;
    xrDialogTransparent.verticalAlignment = Control._VERTICAL_ALIGNMENT_BOTTOM;
    xrDialogTransparent.height = '20%';
    xrDialogTransparent.alpha = 0.65;
    xrDialogTransparent.thickness = 1;
    xrDialogTransparent.background = 'black';
    xrDialogTransparent.zIndex = 21;
    xrGUI.addControl(xrDialogTransparent);

    // Actual text
    xrDialogMessage = new TextBlock();
    xrDialogMessage.width = xrDialogTransparent.width;
    xrDialogMessage.verticalAlignment = xrDialogTransparent.verticalAlignment;
    xrDialogMessage.height = xrDialogTransparent.height;
    xrDialogMessage.zIndex = 100;
    xrDialogMessage.text = '';
    xrDialogMessage.color = 'white';
    xrDialogMessage.fontSize = '2%';
    xrGUI.addControl(xrDialogMessage);

    // Add scanARicon on GUI load
    xrGUI.addControl(scanARicon);
  };

  /**
   * Create the GUI - AR Scan Floor Icon
   */
  const scanARicon = new Image(
    'icon1',
    '/src/assets/images/AR_ScanFloor_Icon.png'
  );
  scanARicon.width = 0.65;
  scanARicon.height = 0.15;

  /**
   * Create the GUI - Buttons
   */
  // ETMS Button
  const xrButton1 = Button.CreateSimpleButton(
    'but1',
    i18next.t(buttonNamesMap.btn_etms.dialog)
  );
  xrButton1.top = '16%';
  xrButton1.left = '18%';
  xrButton1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  xrButton1.width = 0.3;
  xrButton1.height = 0.06;
  xrButton1.cornerRadius = 30;
  xrButton1.color = 'white';
  xrButton1.fontSize = '2%';
  xrButton1.fontWeight = 'bold';
  xrButton1.background = '#0072c1';
  xrButton1.onPointerDownObservable.add(() => {
    executeInteraction('service_ETMS');
    xrGUI.removeControl(xrButton1);
    xrGUI.removeControl(xrButton2);
    xrGUI.removeControl(xrButton3);
    xrGUI.removeControl(xrButton4);
    xrGUI.addControl(xrButton5);
  });
  // Research Button
  const xrButton2 = Button.CreateSimpleButton(
    'but2',
    i18next.t(buttonNamesMap.btn_research.dialog)
  );
  xrButton2.top = '16%';
  xrButton2.left = '-18%';
  xrButton2.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
  xrButton2.width = 0.3;
  xrButton2.height = 0.06;
  xrButton2.cornerRadius = 30;
  xrButton2.color = 'white';
  xrButton2.fontSize = '2%';
  xrButton2.fontWeight = 'bold';
  xrButton2.background = '#0072c1';
  xrButton2.onPointerDownObservable.add(() => {
    executeInteraction('service_Research');
    xrGUI.removeControl(xrButton1);
    xrGUI.removeControl(xrButton2);
    xrGUI.removeControl(xrButton3);
    xrGUI.removeControl(xrButton4);
    xrGUI.addControl(xrButton5);
  });
  // Technology Prototype Button
  const xrButton3 = Button.CreateSimpleButton(
    'but3',
    i18next.t(buttonNamesMap.btn_tp.dialog)
  );
  xrButton3.top = '24%';
  xrButton3.left = '18%';
  xrButton3.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  xrButton3.width = 0.3;
  xrButton3.height = 0.06;
  xrButton3.cornerRadius = 30;
  xrButton3.color = 'white';
  xrButton3.fontSize = '2%';
  xrButton3.fontWeight = 'bold';
  xrButton3.background = '#0072c1';
  xrButton3.onPointerDownObservable.add(() => {
    executeInteraction('service_TP');
    xrGUI.removeControl(xrButton1);
    xrGUI.removeControl(xrButton2);
    xrGUI.removeControl(xrButton3);
    xrGUI.removeControl(xrButton4);
    xrGUI.addControl(xrButton5);
  });
  // Solution Prototype Button
  const xrButton4 = Button.CreateSimpleButton(
    'but4',
    i18next.t(buttonNamesMap.btn_sp.dialog)
  );
  xrButton4.top = '24%';
  xrButton4.left = '-18%';
  xrButton4.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
  xrButton4.width = 0.3;
  xrButton4.height = 0.06;
  xrButton4.cornerRadius = 30;
  xrButton4.color = 'white';
  xrButton4.fontSize = '2%';
  xrButton4.fontWeight = 'bold';
  xrButton4.background = '#0072c1';
  xrButton4.onPointerDownObservable.add(() => {
    executeInteraction('service_SP');
    xrGUI.removeControl(xrButton1);
    xrGUI.removeControl(xrButton2);
    xrGUI.removeControl(xrButton3);
    xrGUI.removeControl(xrButton4);
    xrGUI.addControl(xrButton5);
  });
  // Return to Services Button
  const xrButton5 = Button.CreateSimpleButton(
    'but5',
    i18next.t(buttonNamesMap.btn_return.dialog)
  );
  xrButton5.top = '24%';
  xrButton5.width = 0.3;
  xrButton5.height = 0.06;
  xrButton5.cornerRadius = 30;
  xrButton5.color = 'white';
  xrButton5.fontSize = '2%';
  xrButton5.fontWeight = 'bold';
  xrButton5.background = '#0072c1';
  xrButton5.onPointerDownObservable.add(() => {
    executeInteraction('wave');
    xrGUI.addControl(xrButton1);
    xrGUI.addControl(xrButton2);
    xrGUI.addControl(xrButton3);
    xrGUI.addControl(xrButton4);
    xrGUI.removeControl(xrButton5);
  });

  /**
   * Update the dialog message and if present show the message.
   *
   * @param {string} text - text to show and if empty, hide the message dialog.
   */
  const updateDialogMessage = function (text) {
    if (text === '' || text === undefined) {
      xrDialogMessage.text = '';
      xrDialogMessage.parent.isVisible = false;
    } else {
      xrDialogMessage.text = text;
      xrDialogMessage.parent.isVisible = true;
    }
  };

  /**
   * Turn on or off hit test depending on present
   * state.
   *
   * @param {boolean}enabled - Turn on hit test.
   */
  const setEnableHitTest = async function (enabled) {
    if (enabled === true) {
      // Activate the observers only if they haven't been
      // activated.
      if (xrHitTestObserve === null) {
        xrHitTestObserve = xrHitTest.onHitTestResultObservable.add(
          hitTestObserverCallback
        );
      }
      if (placeKioskPointerObserve === null) {
        // Touch screen pointer event to place kiosk in AR at donut location
        placeKioskPointerObserve = scene.onPointerObservable.add(
          placeKioskPointerObserverCallback
        );
      }
    } else if (enabled === false) {
      // Force checking existance of 'enabled'.
      if (xrHitTestObserve !== null) {
        xrHitTest.onHitTestResultObservable.remove(xrHitTestObserve);
        xrHitTestObserve = null;
      }
      if (placeKioskPointerObserve !== null) {
        // Touch screen pointer event to place kiosk in AR at donut location
        scene.onPointerObservable.remove(placeKioskPointerObserve);
        placeKioskPointerObserve = null;
      }
    }
  };

  /**
   * Hit test observer callback on pointer interactions.
   *
   * @param {PointerInfo} eventData - the event data.
   * @param {EventState} eventState - the event state.
   */
  const placeKioskPointerObserverCallback = function (eventData, eventState) {
    if (eventData.event.type !== 'pointerdown') {
      // Ignore all non pointer down events.
      return;
    }

    if (kioskCoordinates && xr.baseExperience.state === WebXRState.IN_XR) {
      // Make kiosk visible in AR hit test and decompose the location matrix
      // If it already visible, don't make it visible again.
      toggleKioskGhosting(false);
      agent.setEnabled(true);
      // Play welcome interaction when kiosk is placed
      executeInteraction('welcome');
      // Remove scanARicon when kiosk placed
      xrGUI.removeControl(scanARicon);
      // Add GUI Buttons
      xrGUI.addControl(xrButton1);
      xrGUI.addControl(xrButton2);
      xrGUI.addControl(xrButton3);
      xrGUI.addControl(xrButton4);

      kioskCoordinates.transformationMatrix.decompose(
        undefined,
        kiosk.rotationQuaternion,
        kiosk.position
      );
      kioskCoordinates.transformationMatrix.decompose(
        undefined,
        agent.rotationQuaternion,
        agent.position
      );

      // Hit Test is done, so toggle it off.
      setEnableHitTest(false);
    }
  };

  /**
   * Hit test observer callback on possible "floor" found during hit test.
   * Note: This method is called a lot during hit test.
   *
   * @param {IWebXRHitResult[]} eventData - the event data
   */
  const hitTestObserverCallback = function (eventData) {
    if (eventData.length) {
      kiosk.setEnabled(true);
      toggleKioskGhosting(true);
      kioskCoordinates = eventData[0];
      kioskCoordinates.transformationMatrix.decompose(
        undefined,
        kiosk.rotationQuaternion,
        kiosk.position
      );
    } else {
      kiosk.setEnabled(false);
      kioskCoordinates = undefined;
      toggleKioskGhosting(false);
    }
  };

  /**
   * Initialize all audio within the interactions.
   */
  const setupAudio = async function () {
    for (const interactionKey in interactionsMap) {
      if (
        Object.prototype.hasOwnProperty.call(interactionsMap, interactionKey)
      ) {
        if (interactionsMap[interactionKey].audioPath) {
          if (interactionsMap[interactionKey].soundObj) {
            interactionsMap[interactionKey].soundObj.dispose();
          }

          interactionsMap[interactionKey].soundObj = new Sound(
            interactionKey,
            i18next.t(interactionsMap[interactionKey].audioPath),
            scene
          );
        }
      }
    }
  };

  /**
   * Execute the defined interaction.
   * @param {string} interactionKey - The JSON key for the interaction that needs to be executed.
   */
  const executeInteraction = async function (interactionKey) {
    // Address Chrome issue with Auto Play Security Policy.
    Engine.audioEngine.audioContext.resume();
    const interaction = interactionsMap[interactionKey];

    if (interaction.soundObj) {
      interaction.soundObj.play();
    }

    if (interaction.dialog) {
      updateDialogMessage(i18next.t(interaction.dialog));
    } else {
      updateDialogMessage('');
    }

    if (interaction.animation) {
      const agentAnimation = scene.getAnimationGroupByName(
        interactionsMap[interactionKey].animation
      );
      agentAnimation.start(
        false,
        1.0,
        agentAnimation.from,
        agentAnimation.to,
        false
      );
    }
  };

  /**
   * Setup the kiosk assets.
   */
  const setupAssetKiosk = async function () {
    // Create Kiosk model
    const kioskScale = 0.3;

    kiosk = (await SceneLoader.ImportMeshAsync(null, KioskAsset, '')).meshes[0];
    kiosk.scaling.x = kioskScale;
    kiosk.scaling.y = kioskScale;
    kiosk.scaling.z = -kioskScale;
    kiosk.id = 'myKiosk';
    kiosk.setEnabled(false);

    // Initially load the kiosk ghosted.
    toggleKioskGhosting(true);
    kiosk.rotationQuaternion = new Quaternion();

    const agentScale = 20;

    agent = (await SceneLoader.ImportMeshAsync(null, AgentAsset, '')).meshes[0];
    agent.scaling.x = agentScale;
    agent.scaling.y = agentScale;
    agent.scaling.z = -agentScale;
    agent.id = 'myHero';
    agent.setEnabled(false);
    agent.rotationQuaternion = new Quaternion();
    agent.rotation;

    const agentAnimation = scene.getAnimationGroupByName('Idle');
    agentAnimation.start(
      true,
      1.0,
      agentAnimation.from,
      agentAnimation.to,
      false
    );
  };

  /**
   * Fired to update any changes to languages.
   */
  this.updateLanguageCallback = function () {
    // Load the new language audio
    setupAudio();
  };

  // Execute the init function.
  (async () => {
    initFunction();
  })();
}

export { KioskARWorld };
