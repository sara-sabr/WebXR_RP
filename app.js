// Get the canvas element

// TODO: Fix scalling
// TODO: Modular code 

// Character animations by Mixamo: https://www.mixamo.com/

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

  const marker = BABYLON.MeshBuilder.CreateTorus('marker', {
    diameter: 0.15,
    thickness: 0.05
  });
  marker.isVisible = false;
  marker.rotationQuaternion = new BABYLON.Quaternion();

  // Create Kiosk model
  const kioskScale = 0.3;

  // TODO: Clean scaling 
  var model = null;

  //GUI

  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  var rect1 = new BABYLON.GUI.Rectangle();
  rect1.width = 0.5;
  rect1.height = "500px";
  rect1.color = "white";
  rect1.thickness = 1;
  rect1.background = "black";
  advancedTexture.addControl(rect1);

  var infoText = new BABYLON.GUI.TextBlock();
  infoText.text = "Welcome to Service Canada AR \n\n Scan the floor to place your kiosk";
  infoText.color = "white";
  infoText.fontSize = 24;
  rect1.addControl(infoText);

  var btn = BABYLON.GUI.Button.CreateSimpleButton("but1", "OK");
  btn.width = "150px";
  btn.height = "40px";
  btn.color = "white";
  btn.top = 100;
  btn.background = "green";
  btn.onPointerUpObservable.add(function () {
     rect1.isVisible = false;
  });
  rect1.addControl(btn);

 



  // Import Kiosk model
  BABYLON.SceneLoader.ImportMeshAsync(null, "assets/models/", "SC_Kiosk_round.gltf").then((result) => {
    const kiosk = result.meshes[0]
    //Scale the model down        
    kiosk.scaling.scaleInPlace(0.27);
    // kiosk.scaling.x = kioskScale;
    // kiosk.scaling.y = kioskScale;
    // kiosk.scaling.z = -kioskScale;
    kiosk.id = "myKiosk";
    kiosk.setEnabled(false);
    model = kiosk;
    kiosk.rotationQuaternion = new BABYLON.Quaternion();
    kiosk.rotation;
  });

  // Import Character model
  BABYLON.SceneLoader.ImportMesh("", "assets/models/", "spiderman_anims-03.gltf", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
    var hero = newMeshes[0];
    //Scale the model down        
    hero.scaling.scaleInPlace(1.5);

    hero.id = "myHero";
    hero.setEnabled(false);
    
    //Lock camera on the character 
    //camera1.target = hero;

    //Get the Idle animation Group
    const idleAnim = scene.getAnimationGroupByName("Idle");
    //Play the Idle animation  
    idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

    hero.rotationQuaternion = new BABYLON.Quaternion();
    hero.rotation;
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

      const hero = scene.getMeshByID("myHero");
      hero.setEnabled(true);

      //kiosk.position.y = hitTest.position.y + 0.5;
      hitTest.transformationMatrix.decompose(undefined, kiosk.rotationQuaternion, kiosk.position); 
      hitTest.transformationMatrix.decompose(undefined, hero.rotationQuaternion, hero.position);
      
      // play wave animation 
      const idleAnim = scene.getAnimationGroupByName("Wave");
      idleAnim.start(false, 1.0, idleAnim.from, idleAnim.to, false);   
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