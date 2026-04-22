import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { height, scene, width } from "./scene.js";
import * as THREE from 'three';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';

const loader = new GLTFLoader();
const fontLoader = new FontLoader();

async function loadModel(path, parent) {
    const gltf = await loader.loadAsync(path);
    parent.add(gltf.scene); // Add loaded scene to your three.js scene

    return gltf.scene;
}

function centerTextOrigin(textMesh)
{
    const geometry = textMesh.geometry;

    geometry.computeBoundingBox();

    const boundingBox = geometry.boundingBox;

    const width = boundingBox.max.x - boundingBox.min.x;
    const height = boundingBox.max.y - boundingBox.min.y;
    const depth = boundingBox.max.z - boundingBox.min.z;

    geometry.translate(
        -width / 2,
        -height / 2,
        -depth / 2
    );
}

function createRoundedBox(width, height, depth, radius)
{
    const shape = new THREE.Shape();

    const x = -width / 2;
    const y = -height / 2;

    shape.moveTo(x + radius, y);

    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);

    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);

    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);

    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: depth,
        bevelEnabled: false
    });

    const material = new THREE.MeshStandardMaterial({
        color: 0xF0C82B
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.x = -Math.PI / 2;

    return mesh;
}

//name platform
let namePlatform = createRoundedBox(23, 7, 3, 1);
// namePlatform.position.set(-worldSize.width / 2 + 20, 0.1, 0);
namePlatform.castShadow = true;
// initTransform(namePlatform);
scene.add(namePlatform);

// fisrt name
let Fname = fontLoader.load("fonts/dongle/Dongle_Bold.json", (font) => {
    const textGeometry = new TextGeometry('oscar', {
        font: font,
        size: 9,
        depth: 1.5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.07,
        bevelSegments: 3
    });

    const textMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    initTransform(textMesh);
    centerTextOrigin(textMesh);
    textMesh.position.set(namePlatform.position.x, 4, namePlatform.position.z);
    scene.add(textMesh);
});

//last name
let Lname = fontLoader.load("fonts/Finesse-Oblique/FinesseOblique_Regular.json", (font) => {
    const textGeometry = new TextGeometry('Castillejo', {
        font: font,
        size: 6,
        depth: 0,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.07,
        bevelSegments: 3
    });

    const textMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    initTransform(textMesh);
    centerTextOrigin(textMesh);
    textMesh.position.set(namePlatform.position.x, 0.1, 6);
    textMesh.receiveShadow = true;
    scene.add(textMesh);
});

//forklift
let forklift = await loadModel("models/Forklift.glb", scene);
forklift.position.set(0,0,14);
forklift.rotation.y = 0.78;
forklift.scale.set(1, 1, 1);
let baseCar;

forklift.castShadow = true;

//fork
let fork = await loadModel("models/Fork.glb", forklift);
fork.position.set(0, 0.3, 3.1); //Y min 0.3 - Y max 4

forklift.traverse((child) => {
    if(child.isMesh)
    {
        child.castShadow = true;
        if (child.name === "Cube" && child.parent?.name === "Base_Car") {
            baseCar = child;
        }
    }
});
//floor
const floorSize = 1024;
const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
const floorMaterial = new THREE.ShadowMaterial({
  opacity: 0.3
});
// floorMaterial.transparent = true;
const floor = new THREE.Mesh(floorGeometry, floorMaterial);

initTransform(floor);
floor.receiveShadow = true;
scene.add(floor);

// const axesHelper = new THREE.AxesHelper(20);
// scene.add(axesHelper);

//BOUNDING BOXES

const forkliftBox = new THREE.Box3().setFromObject(baseCar);
const platformBox = new THREE.Box3().setFromObject(namePlatform);

const helper = new THREE.Box3Helper(forkliftBox, 0xff0000);
scene.add(helper);


function initTransform(object)
{
    object.rotation.x = -Math.PI / 2;
    // object.position.y = 0;
    // object.rotateZ(Math.PI / 2);
}

export {forklift, fork, floor, forkliftBox, platformBox, baseCar}