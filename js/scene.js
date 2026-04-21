import * as THREE from 'three';
const scene = new THREE.Scene();

let width = window.innerWidth;
let height = window.innerHeight;

function setWindowSize(newWidth, newHeight){
    width = newWidth;
    height = newHeight;
}

const worldStart = 28;

let worldSize = {
    width: 0,
    height: 0
};

function setWorldSize(newWorldSize)
{
    worldSize.width = newWorldSize.width;
    worldSize.height = newWorldSize.height;
}

// const isMobile = 
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

//camera ------------------------------------------------------------------------

const referenceHeight = 951;
const heightRatio = height / referenceHeight;

// only partially apply scaling (20–30%)
const frustumSize = 70 * THREE.MathUtils.lerp(1, heightRatio, 0.3);

const aspect = width / height;
const camera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2, // left
    frustumSize  * aspect / 2,  // right
    frustumSize / 2,           // top
    -frustumSize / 2,          // bottom
    0.1,                       // near
    1000)                      // far );
camera.position.set(0, 45, 0);

const adjustedWorldStart = worldStart + (1 - heightRatio) * 15;

camera.lookAt(0,0, camera.position.z - adjustedWorldStart);
scene.add(camera);



//light ------------------------------------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);

directionalLight.position.set(camera.position.x - 15, camera.position.y - 5, camera.position.z - 46);

// const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper);

directionalLight.castShadow = true;
// console.log(worldSize.);
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;
directionalLight.shadow.radius = 4;

directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 200;

directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -50;
scene.add(directionalLight);
scene.add(directionalLight.target);


// let worldSize = getWorldSize();
// window.addEventListener('resize', () => {
//     // resizeRenderer();
//     worldSize = getWorldSize();
// });

function getWorldSize(pageHeight)
{
    const visibleWidth = camera.right - camera.left;

    const baseHeight = pageHeight * 1.4;

    // Portrait screens get larger world height
    const aspect = window.innerHeight / window.innerWidth;

    const aspectFactor = THREE.MathUtils.clamp(aspect, 1.3, 1.4);

    return {
        width: visibleWidth,
        height: pixelsToWorldDistance(baseHeight)
    };
}

function getVisibleWorldHeight()
{
    return camera.top - camera.bottom;
}


function pageYToWorldZ(pageY)
{
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    return (pageY / scrollHeight) * worldSize.height;
}

function getPixelsPerWorldUnit()
{
    return window.innerHeight / getVisibleWorldHeight();
}

function worldDistanceToPixels(worldDistance)
{
    return worldDistance * getPixelsPerWorldUnit();
}

function pixelsToWorldDistance(pixels){
    return pixels / getPixelsPerWorldUnit();
}

export {scene, camera, frustumSize, directionalLight, width, height, worldStart, getVisibleWorldHeight, worldDistanceToPixels, isTouchDevice, worldSize, getWorldSize, setWorldSize, setWindowSize };