import { loaderEvents } from './loading.js';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { moveCar } from './controller.js';
import { scene, camera,directionalLight, worldStart, worldSize, getWorldSize, setWorldSize, width, height, setWindowSize, frustumSize, worldDistanceToPixels } from './scene.js';
import { forklift, fork } from './objects.js';
import { moveJoystick, joystickInput } from './ui.js';
import { directPointLight } from 'three/tsl';


loaderEvents.addEventListener("finished", () => {
    console.log("loading finished");
});


const main = document.querySelector('main');
const scrollHeight = main.scrollHeight - main.clientHeight;

const drivableHeight = worldSize.height - worldStart - worldStart;
const manualScrollHeight = drivableHeight * 1.15;
// const drivingScrollHeight = drivableHeight;
// const pageHeight = main.scrollHeight - main.clientHeight;
setWorldSize(getWorldSize(scrollHeight));

const timer = new THREE.Timer();
timer.connect(document);
timer.reset();
// Rendering ------------------------------------------------------------------------
const canvas = document.querySelector('#bg');

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    // alpha: true
});
// renderer.setClearColor("#3e71b4");
renderer.setClearColor(0x000000, 0); 

console.log(window.innerWidth);
console.log(window.innerHeight);

renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.enabled = true;

// const isMobile = /Mobi|Android/i.test(navigator.userAgent);
// console.log(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
// renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

//Responsive window
let lastHeight = window.innerHeight;
let lastWidth = window.innerWidth;

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    const newHeight = window.innerHeight;
    const newWidth = window.innerWidth;

    const widthChanged = Math.abs(newWidth - lastWidth) > 1;
    const heightChangedALot = Math.abs(newHeight - lastHeight) > 100;

    // ❌ Ignore ONLY small height changes (URL bar)
    if (!widthChanged && !heightChangedALot) return;

    lastHeight = newHeight;
    lastWidth = newWidth;

    setWindowSize(newWidth, newHeight);

    const aspect = width / height;

    const referenceHeight = 951;
    const heightRatio = height / referenceHeight;

    const clampedRatio = THREE.MathUtils.clamp(heightRatio, 0.7, 1.1);
    const frustumSize = 70 * THREE.MathUtils.lerp(1, clampedRatio, 0.3);

    // Camera
    camera.left = -frustumSize * aspect / 2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;

    camera.updateProjectionMatrix();

    // Renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // World
    const pageHeight = main.scrollHeight - main.clientHeight;
    setWorldSize(getWorldSize(pageHeight));

    // Hero
    const hero = document.getElementById("hero");
    hero.style.height = `${worldDistanceToPixels(35)}px`;
}

// Controls --------------------------------------------------------------------------------
const keys = {
    "w" : false,
    "a" : false,
    "s" : false,
    "d" : false,
    "i" : false,
    "k" : false
};

let isDriving = false;

window.addEventListener('keydown', (e) => {
    if (isTyping(e)) return;

    if(!(e.key in keys)) return;

    keys[e.key] = true;
    setDrivingState(true); 
});

window.addEventListener('keyup', (e) => 
{
    if (isTyping(e)) return;

    if (!(e.key in keys)) return;

    keys[e.key] = false;
});

window.addEventListener('wheel', () => {
    setDrivingState(false);
});

if(moveJoystick !== undefined)
{
    moveJoystick.setOnStart(() => {
        setDrivingState(true);
    });

//     // joystick.on('end', ()=>{
//     //     console.log("ended");
//     //     setDrivingState(false);
//     // });
}

// reset keys on different events
window.addEventListener('blur', () => {
    stopAllInput();
    setDrivingState(false);
});

window.addEventListener('contextmenu', () => {
    stopAllInput();
    setDrivingState(false);
});

window.addEventListener('mouseup', () => {
    stopAllInput();
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAllInput();
        setDrivingState(false);
    }
});
//-----

let targetScrollY = main.scrollTop;

main.addEventListener('touchmove', () => {
    setDrivingState(false);
}, { passive: false });

main.addEventListener('scroll', () => {
    if (isDriving) return;

    targetScrollY = main.scrollTop;
});


function setDrivingState(driving)
{
    isDriving = driving;

    if (isDriving)
    {
        main.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }
    else
    {
        main.style.overflow = '';
        document.body.style.overflow = '';
    }
}

function stopAllInput() {
    Object.keys(keys).forEach(k => keys[k] = false);
}

// UI config ------------------------------------------------------------------------------------
// console.log(worldDistanceToPixels(40));
const hero = document.getElementById("hero");

hero.style.height = `${worldDistanceToPixels(35)}px`;


const stats = new Stats();
document.body.appendChild(stats.dom);

const cntr_hint = document.querySelector("#controls_div");

//form
const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    
    await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    form.style.display = "none";
    document.getElementById("success-message").style.display = "block";
});

function isTyping(e) {
    const tag = e.target.tagName;
    return tag === "INPUT" || tag === "TEXTAREA";
}

let links = document.querySelectorAll('.nav-link');

links.forEach((link) => {
    link.addEventListener('click', ()=>{
        stopAllInput();
        setDrivingState(false);
    });
})

//glow ---------------------------------------------------------------------------------------------
const glow = document.getElementById("forklift-glow");

const tempVector = new THREE.Vector3();
// let blobTimer = 0;
let blobX = 0;
let blobY = 0;
function updateBlobPosition(deltaTime) {
    tempVector.copy(forklift.position).project(camera);

    const targetX = (tempVector.x * 0.5 + 0.5) * window.innerWidth;
    const targetY = (-tempVector.y * 0.5 + 0.5) * window.innerHeight;

    const smoothFactor = 1 - Math.exp(-15 * deltaTime);

    blobX += (targetX - blobX) * smoothFactor;
    blobY += (targetY - blobY) * smoothFactor;

    glow.style.transform = `translate(-50%, -50%) translate(${blobX}px, ${blobY}px)`;
}

// light - dark mode transition
const lightTop = [44,115,210];
const lightBottom = [196,156,248];

const darkTop = [10,20,40];
const darkBottom = [80,40,120];

function updateThemeFromFork(forkHeight){
    const t = (forkHeight - 0.3) / (4 - 0.3);
    const clampedT = Math.max(0, Math.min(1, t));

    const top = lerpColor(lightTop, darkTop, clampedT);
    const bottom = lerpColor(lightBottom, darkBottom, clampedT);

    document.documentElement.style.setProperty(
    '--bg-top',
    `rgb(${top[0]}, ${top[1]}, ${top[2]})`
    );

    document.documentElement.style.setProperty(
    '--bg-bottom',
    `rgb(${bottom[0]}, ${bottom[1]}, ${bottom[2]})`
    );

    // navbar uses same as top
    document.documentElement.style.setProperty(
    '--nav-color',
    `rgba(${top[0]}, ${top[1]}, ${top[2]}, 0.8)`
    );
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function lerpColor(c1, c2, t) {
    return [
        lerp(c1[0], c2[0], t),
        lerp(c1[1], c2[1], t),
        lerp(c1[2], c2[2], t)
    ];
}

// -------------------------------------------------------------------------
// const drivingRange = maxForkliftZ - worldStart;
let targetCameraZ = camera.position.z;
const cameraOffset = 25;

const minCameraZ = worldStart + cameraOffset;
const maxCameraZ = worldSize.height - worldStart + cameraOffset;



const rendering = function() 
{
    // stats.update();
    requestAnimationFrame(rendering);

    // console.log("here");

    timer.update();
    const deltaTime = timer.getDelta();

    moveCar(keys, joystickInput, deltaTime);

    const currentScrollHeight = main.scrollHeight - main.clientHeight;

    
    const cameraRange = maxCameraZ - minCameraZ;

    if (isDriving)
    {
        const desiredCameraZ = forklift.position.z + cameraOffset;

        const clampedCameraZ = THREE.MathUtils.clamp(
            desiredCameraZ,
            minCameraZ,
            maxCameraZ
        );

        const smoothFactor = 1 - Math.exp(-10 * deltaTime);
        camera.position.z += (clampedCameraZ - camera.position.z) * smoothFactor;

        const normalizedProgress = THREE.MathUtils.clamp(
            ((forklift.position.z + cameraOffset) - minCameraZ) / cameraRange,
            0,
            1
        );

        const newScrollTop = normalizedProgress * currentScrollHeight;

        if (Math.abs(newScrollTop - main.scrollTop) > 1) {
            main.scrollTop = newScrollTop;
        }
    }
    else
    {
        // Sync camera position with manual scroll
        const scrollPercent = currentScrollHeight > 0
            ? main.scrollTop / currentScrollHeight
            : 0;

        targetCameraZ = THREE.MathUtils.lerp(
            minCameraZ,
            maxCameraZ,
            scrollPercent
        );

        camera.position.z = targetCameraZ;
    }

    updateBlobPosition(deltaTime);
    updateThemeFromFork(fork.position.y);

    directionalLight.position.set(-15, 40, camera.position.z - 40);
    directionalLight.target.position.set(0, 0, camera.position.z - 40);

    renderer.render(scene, camera);
    stats.update();
}

rendering();