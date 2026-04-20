import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { moveCar } from './controller.js';
import { scene, camera,directionalLight, worldStart, worldSize, getWorldSize, setWorldSize, width, height, setWindowSize, frustumSize, worldDistanceToPixels } from './scene.js';
import { forklift } from './objects.js';
import { joystick, joystickInput } from './ui.js';
import { directPointLight } from 'three/tsl';



const main = document.querySelector('main');
const scrollHeight = main.scrollHeight - main.clientHeight;

const drivableHeight = worldSize.height - worldStart - worldStart;
const manualScrollHeight = drivableHeight * 1.15;
// const drivingScrollHeight = drivableHeight;
// const pageHeight = main.scrollHeight - main.clientHeight;
setWorldSize(getWorldSize(scrollHeight));

console.log(worldSize.height + " " + worldSize.width);

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
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.enabled = true;
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Responsive window
// const aspect = width / height;
window.addEventListener('resize', onWindowResize);

function onWindowResize(){
    setWindowSize(window.innerWidth, window.innerHeight);
    const aspect = width / height;

    camera.left = -frustumSize * aspect / 2
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;

    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const hero = document.getElementById("hero");

    hero.style.height = `${worldDistanceToPixels(35)}px`;
    
    const pageHeight = main.scrollHeight - main.clientHeight;
    setWorldSize(getWorldSize(pageHeight));
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

if(joystick !== undefined)
{
    joystick.on('start', ()=>{
        console.log("started");
        setDrivingState(true);
    });

    // joystick.on('end', ()=>{
    //     console.log("ended");
    //     setDrivingState(false);
    // });
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

//---------------------------------------------------------------------------------------------
// const drivingRange = maxForkliftZ - worldStart;
let targetCameraZ = camera.position.z;
const cameraOffset = 25;
const minCameraZ = worldStart + cameraOffset;
const maxCameraZ = worldSize.height - worldStart + cameraOffset;

const rendering = function() 
{
    stats.update();
    requestAnimationFrame(rendering);

    timer.update();
    const deltaTime = timer.getDelta();

    moveCar(keys, joystickInput, deltaTime);

    const currentScrollHeight = main.scrollHeight - main.clientHeight;

    
    const cameraRange = maxCameraZ - minCameraZ;

    // console.log(camera.position.z);
    // if(camera.position.z > 53)
    // {
    //     cntr_hint.classList.add('hidden');
    // }
    // else
    // {
    //     cntr_hint.classList.remove('hidden');
    // }

    if (isDriving)
    {
        // Follow forklift
        const desiredCameraZ = forklift.position.z + cameraOffset;

        const clampedCameraZ = THREE.MathUtils.clamp(
            desiredCameraZ,
            minCameraZ,
            maxCameraZ
        );

        camera.position.z += (clampedCameraZ - camera.position.z) * 0.2;

        // Sync scroll position with forklift progress
        const normalizedProgress = THREE.MathUtils.clamp(
            ((forklift.position.z + cameraOffset) - minCameraZ) / cameraRange,
            0,
            1
        );

        const newScrollTop = normalizedProgress * currentScrollHeight;

        main.scrollTo({
            top: newScrollTop,
            behavior: 'auto'
        });
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

    directionalLight.position.set(-15, 40, camera.position.z - 40);
    directionalLight.target.position.set(0, 0, camera.position.z - 40);

    renderer.render(scene, camera);
}

rendering();