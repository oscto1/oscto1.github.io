import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { moveCar } from './controller.js';
import { scene, camera,directionalLight, worldStart, worldSize, getWorldSize, setWorldSize } from './scene.js';
import { forklift } from './objects.js';
import { worldDistanceToPixels, joystick, joystickInput } from './ui.js';
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
    // powerPreference: "high-performance"
});
renderer.setClearColor("#3e71b4");
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.enabled = true;
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setPixelRatio(2);

//Responsive window
// const aspect = width / height;
// window.addEventListener('resize', () => {

//     // Ignore tiny height-only changes caused by mobile browser UI
//     if (Math.abs(width - lastWidth) < 5 && Math.abs(height - lastHeight) < 80)
//     {
//         return;
//     }

//     lastWidth = width;
//     lastHeight = height;

//     // const aspect = width / height;
// // console.log(width);
//     renderer.setSize(width, height);

//     camera.left = -frustumSize * aspect / 2;
//     camera.right = frustumSize * aspect / 2;
//     camera.top = frustumSize / 2;
//     camera.bottom = -frustumSize / 2;

//     camera.updateProjectionMatrix();
// })


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
    if(!(e.key in keys)) return;

    keys[e.key] = true;
    setDrivingState(true); 
});

window.addEventListener('keyup', (e) => 
{
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

// UI config ------------------------------------------------------------------------------------
// console.log(worldDistanceToPixels(40));
const hero = document.getElementById("hero");

hero.style.height = `${worldDistanceToPixels(35)}px`;


const stats = new Stats();
document.body.appendChild(stats.dom);

const cntr_hint = document.querySelector("#controls_div");

//---------------------------------------------------------------------------------------------
// const drivingRange = maxForkliftZ - worldStart;
let targetCameraZ = camera.position.z;

const rendering = function() 
{
    stats.update();
    requestAnimationFrame(rendering);

    timer.update();
    const deltaTime = timer.getDelta();

    moveCar(keys, joystickInput, deltaTime);


    if (!isDriving)
    {
        const currentScrollHeight = main.scrollHeight - main.clientHeight;
        const scrollPercent = currentScrollHeight > 0 ? main.scrollTop / currentScrollHeight : 0;

        targetCameraZ = worldStart + 25 - ((scrollPercent * manualScrollHeight));
        camera.position.z = targetCameraZ;
    }

    if (isDriving && forklift.position.z > worldStart && forklift.position.z < worldSize.height - worldStart)
    {
        cntr_hint.classList.add('hidden');

        const currentScrollHeight = main.scrollHeight - main.clientHeight;

        const targetDrivingZ = forklift.position.z + 25;
        camera.position.z += (targetDrivingZ - camera.position.z) * 0.2;

        const maxForkliftZ = worldSize.height - 25;
        const drivingRange = maxForkliftZ - worldStart;

        const normalizedProgress = Math.min(Math.max((forklift.position.z - worldStart) / drivingRange, 0), 1);

        const newScrollTop = normalizedProgress * currentScrollHeight;

        main.scrollTo({
            top: newScrollTop,
            behavior: 'auto'
        });
    }
    else{
        cntr_hint.classList.remove('hidden');
    }

    directionalLight.position.set(-15, 40, camera.position.z - 40);
    directionalLight.target.position.set(0, 0, camera.position.z - 40);
    // directionalLight.lookAt(0,0,camera.position.z - 40);

    // const targetQuaternion = new THREE.Quaternion();
    // console.log(directionalLight.getWorldQuaternion(targetQuaternion));
    // // console.log(camera.position);
    // console.log(directionalLight.rotation);

    renderer.render(scene, camera);
}

rendering();