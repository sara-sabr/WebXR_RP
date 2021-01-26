//import * as BABYLON from 'babylonjs';

// Get the canvas element
const canvas = document.getElementById("renderCanvas"); 

//TODO: Items that need to be rendered start in this function
var createScene = async function() {
        
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -5), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    var xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-ar",
        },
        //optionalFeatures: ["hit-test", "anchors"],
        optionalFeatures: true
    });

    const fm = xr.baseExperience.featuresManager;

    const xrTest = fm.enableFeature(BABYLON.WebXRHitTest, "latest");

/*
    // HIT TEST setup
    // featuresManager from the base webxr experience helper
    const hitTest = featuresManager.enableFeature(BABYLON.WebXRHitTest, "latest");


    // ANCHOR setup
    // featuresManager from the base webxr experience helper
    const anchorSystem = featuresManager.enableFeature(BABYLON.WebXRAnchorSystem, 'latest');    
    const model = BABYLON.MeshBuilder.CreateBox("box", options, scene); //scene is optional and defaults to the current scene
    const box = model.meshes[0];
    box.setEnabled(true);


    // PLANE DETECTION setup
    // featuresManager from the base webxr experience helper
    const planeDetector = featuresManager.enableFeature(BABYLON.WebXRPlaneDetector, "latest");
*/
    
    const marker = BABYLON.MeshBuilder.CreateTorus('marker', { diameter: 0.15, thickness: 0.05 });
    marker.isVisible = false;
    marker.rotationQuaternion = new BABYLON.Quaternion();

    xrTest.onHitTestResultObservable.add((results) => {
        if (results.length) {
            marker.isVisible = true;
            hitTest = results[0];
            hitTest.transformationMatrix.decompose(marker.scaling, marker.rotationQuaternion, marker.position);
        } else {
            marker.isVisible = false;
        }
    });
/*
    if (anchors){
        console.log("anchorsAttached");
        anchorSystem.onAnchorAddedObservable.add((anchor) => {
            // ... do what you want with the anchor after it was added
            console.log("attaching", anchor);
            box.isVisible = true;
            box.setEnabled(true);
            anchor.attachedNode = box;
        })
        anchorSystem.onAnchorRemovedObservable.add((anchor) => {
            // ... do what you want with the anchor after it was removed
        })
    }
*/
    return scene;
};

const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
// Add your code here matching the playground format
const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});