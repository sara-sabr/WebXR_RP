import {
  Engine,
  Scene,
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
  Mesh, // eslint-disable-line
  PointerInfo, // eslint-disable-line
  EventState,// eslint-disable-line
} from 'babylonjs';

import {
  AdvancedDynamicTexture,
  Rectangle,
  TextBlock,
  Control,
} from 'babylonjs-gui';

import 'babylonjs-loaders'; // Required to load GLFT files
import KioskAsset from '../../assets/models/SC_Kiosk.gltf';

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
   * Kiosk object
   * @type {AbstractMesh}
   */
  let kioskCopy = null;

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

    // Set the feature manager up.
    featuresManager = xr.baseExperience.featuresManager;
  };

  /**
   * Activate hit test and add listener.
   */
  const setupHitTest = async function () {
    xrHitTest = featuresManager.enableFeature(WebXRHitTest, 'latest');

    const baseKiosk = await setupAssetKiosk();

    kioskCopy = baseKiosk.clone('ghost');
    console.log(kioskCopy);
    for (const child of kioskCopy.getChildMeshes()) {
      child.material = new BABYLON.StandardMaterial('mat');
      child.material.alpha = 0.25;
    }

    kioskCopy.rotationQuaternion = new BABYLON.Quaternion();

    kioskCopy.setEnabled(true);

    await createGUI();
    await setEnableHitTest(true);
  };

  /**
   * Create the GUI.
   */
  const createGUI = async function () {
    // Initialize the GUI
    xrGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI');

    const xrDialog = new Rectangle();
    xrDialog.width = 1;
    xrDialog.verticalAlignment = Control._VERTICAL_ALIGNMENT_BOTTOM;
    xrDialog.height = '200px';
    xrDialog.color = 'white';
    xrDialog.alpha = 0.4;
    xrDialog.thickness = 1;
    xrDialog.background = 'black';
    xrGUI.addControl(xrDialog);

    xrDialogMessage = new TextBlock();
    xrDialogMessage.text = '';
    xrDialogMessage.color = 'white';
    xrDialogMessage.fontSize = 24;
    xrDialog.addControl(xrDialogMessage);
  };

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
        updateDialogMessage(
          'Welcome to Service Canada AR \n\n Scan the floor to place your kiosk'
        );
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
        updateDialogMessage('');
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
      kiosk.setEnabled(true);
      kioskCoordinates.transformationMatrix.decompose(
        undefined,
        kiosk.rotationQuaternion,
        kiosk.position
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
      // Make donut visible in AR hit test and decompose the location matrix
      kioskCopy.setEnabled(true);
      kioskCoordinates = eventData[0];
      kioskCoordinates.transformationMatrix.decompose(
        undefined,
        kioskCopy.rotationQuaternion,
        kioskCopy.position
      );
    } else {
      // Hide the marker.
      kioskCopy.setEnabled(false);
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
    kiosk.rotationQuaternion = new Quaternion();

    return kiosk;
  };

  // Execute the init function.
  (async () => {
    console.log('Init');
    initFunction();
  })();
}

export { KioskARWorld };
