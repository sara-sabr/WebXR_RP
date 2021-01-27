// Get the canvas element

// TODO: Fix scalling
// TODO: Position kiosk
// TODO: Teleport/Place Kiosk 
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

  const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: 'immersive-ar',
    },
    optionalFeatures: true,
  });

  const fm = xr.baseExperience.featuresManager;

  const xrTest = fm.enableFeature(BABYLON.WebXRHitTest, 'latest');

  //  BABYLON.SceneLoader.Append("assets/models/", "SC_Kiosk.gltf", scene, function (scene) {
  //       scene.createDefaultCameraOrLight(true, true, true);
  //       scene.activeCamera.alpha += Math.PI;
  //   } )

  // const marker = BABYLON.MeshBuilder.CreateTorus('marker', {diameter: 0.15, thickness: 0.05});

  //   const marker = BABYLON.SceneLoader.Append("assets/models/", "SC_Kiosk.gltf", scene, function (scene) {
  //     scene.createDefaultCameraOrLight(true, true, true);

  // } );

  const kioskScale = 0.3;
  // TODO: Clean scaling 
  const marker = BABYLON.SceneLoader.ImportMeshAsync(null, "assets/models/", "SC_Kiosk.gltf").then((result) => {
    const kiosk = result.meshes[0]
    kiosk.scaling.x = kioskScale;
    kiosk.scaling.y = kioskScale;
    kiosk.scaling.z = -kioskScale;
    kiosk.position.z = 3;
    kiosk.id = "myKiosk"
    console.log("Z is :" + kiosk.position.z);
    // kiosk.setEnabled(false);
    kiosk.rotationQuaternion = new BABYLON.Quaternion();
  });

  xrTest.onHitTestResultObservable.add((results) => {
    if (results.length) {
      const kiosk = scene.getMeshByID("myKiosk");
      kiosk.setEnabled(true);
      hitTest = results[0];
      // console.log(marker.position.x + " " + marker.position.y + " " + marker.position.z)
      // console.log("Before Transformation :" + kiosk.position.z + " "+ kiosk.position.x + " " +  kiosk.position.y);
      kiosk.position.x = hitTest.position.x
      kiosk.position.y = hitTest.position.y
      kiosk.position.z = hitTest.position.z
      // hitTest.transformationMatrix.decompose(kiosk.scaling, kiosk.position, kiosk.rotationQuaternion);
      // hitTest.transformationMatrix.decompose({position: kiosk.position, rotation: kiosk.rotationQuaternion});
    
      // console.log("After Transformation :" + kiosk.position.z + " "+ kiosk.position.x + " " +  kiosk.position.y);
    } else {
      marker.isVisible = false;
    }
  });

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