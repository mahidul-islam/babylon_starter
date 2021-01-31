import { Engine } from "@babylonjs/core/Engines/engine";
import { getSceneModuleWithName } from "./createScene";

export const babylonInit = async (): Promise<void>  => {
    // get the module to load
    const createSceneModule = await getSceneModuleWithName();

    // Execute the pretasks, if defined
    await Promise.all(createSceneModule.preTasks || []);
    // Get the canvas element
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    // Generate the BABYLON 3D engine
    const engine = new Engine(canvas, true);

    // Create the scene
    const scene = await createSceneModule.createScene(engine, canvas);

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

babylonInit().then(() => {
    // scene started rendering, everything is initialized
});
