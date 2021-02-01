// Get the canvas element

// TODO: Fix scalling
// TODO: Modular code 



const canvas = document.getElementById('renderCanvas');

let engine = null;
let scene = null;
let sceneToRender = null;
const createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false
  });
};

// TODO: Items that need to be rendered start in this function
const createScene = async function () {
  // This creates a basic Babylon Scene object (non-mesh)
  const scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 1, -5), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Added directional light
  var dirLight = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(0, 0, 1), scene);
  dirLight.position = new BABYLON.Vector3(0, 5, -5);

  const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: 'immersive-ar',
    },
    optionalFeatures: true,
  });

  const fm = xr.baseExperience.featuresManager;

  const xrTest = fm.enableFeature(BABYLON.WebXRHitTest, 'latest');

  // Create donut - original hit test
  const marker = BABYLON.MeshBuilder.CreateTorus('marker', { diameter: 0.15, thickness: 0.05, tessellation: 60 });
  marker.isVisible = false;
  marker.rotationQuaternion = new BABYLON.Quaternion();

  // Mesh material
  var material = new BABYLON.StandardMaterial(scene);
  material.alpha = 1;
  material.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  marker.material = material;
  
  // TODO: Clean scaling 
  var model = null;

  // Set kiosk scale value
  const kioskScale = 0.3;

  // Load kiosk mesh
  BABYLON.SceneLoader.ImportMeshAsync(null, "assets/models/", "SC_Kiosk.gltf").then((result) => {
    const kiosk = result.meshes[0]
    kiosk.scaling.x = kioskScale;
    kiosk.scaling.y = kioskScale;
    kiosk.scaling.z = -kioskScale;
    kiosk.id = "myKiosk";
    kiosk.setEnabled(false);
    model = kiosk;
    kiosk.rotationQuaternion = new BABYLON.Quaternion();
    kiosk.rotation;
  });

  // Place objects in AR if plane detected/generated
  xrTest.onHitTestResultObservable.add((results) => {
    if (results.length) {
      // make donut visible in AR hit test and decompose the location matrix
      marker.isVisible = true;
      hitTest = results[0];
      hitTest.transformationMatrix.decompose(marker.scaling, marker.rotationQuaternion, marker.position);
    } else {
      marker.isVisible = false;
      //model.setEnabled(false);
    }
  });

 // Touch screen pointer event to place kiosk in AR at donut location
 scene.onPointerDown = (evt, pickInfo) => {
  if (hitTest && xr.baseExperience.state === BABYLON.WebXRState.IN_XR) {
      // make kiosk visible in AR hit test and decompose the location matrix
      const kiosk = scene.getMeshByID("myKiosk");
      kiosk.setEnabled(true);
      //kiosk.position.y = hitTest.position.y + 0.5;
      hitTest.transformationMatrix.decompose(undefined, kiosk.rotationQuaternion, kiosk.position);     
  }
}

  return scene;
};

initFunction = async function () {
  const asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log('the available createEngine function failed. Creating the default engine instead');
      return createDefaultEngine();
    }
  };

  engine = await asyncEngineCreation();
  if (!engine) {
    throw new Error('engine should not be null.');
  }
  scene = createScene();
};
initFunction().then(() => {
  scene.then((returnedScene) => {
    sceneToRender = returnedScene;
  });

  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
});

// Resize
window.addEventListener('resize', function () {
  engine.resize();
});