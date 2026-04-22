import { Vector3, MathUtils } from "three"; // THREE from 'three';
import { forklift, fork } from "./objects.js";
import { worldSize } from "./scene.js";


let velocity = 0;
let acceleration = 0.03;
let friction = 0.95;

const maxSpeed = 0.8; 
const forward = new Vector3();


export function moveCar(keys, joystickInput, deltaTime)
{
    const dt = deltaTime * 60;

    const turnInput = (keys['a'] ? 1 : 0) - (keys['d'] ? 1 : 0) + (-joystickInput.turn);
    
    // console.log(keys['s']);
    if (keys['w'] || joystickInput.forward < 0)
    {
        velocity += acceleration * Math.max(1, joystickInput.forward) * dt;
    }

    if (keys['s'] || joystickInput.forward > 0)
    {
        velocity -= acceleration * Math.max(1, joystickInput.forward) * dt;
    }

    velocity *= Math.pow(friction, dt);

    const speed = Math.abs(velocity);

    // normalize speed (0 > 1)
    const t = Math.min(speed / maxSpeed, 1);

    // scale steering strength
    const steerStrength = 0.03 * t * dt;

    forward.set(0, 0, 1).applyQuaternion(forklift.quaternion);
    forklift.position.addScaledVector(forward, velocity * dt);

    // rotation
    forklift.rotation.y += turnInput * steerStrength * Math.sign(velocity);
    // if (keys['a']) forklift.rotation.y += steerStrength * Math.sign(velocity);
    // if (keys['d']) forklift.rotation.y -= steerStrength * Math.sign(velocity);

    // forkcontrol
    let forkpos = fork.position;
    if ((keys['i'] || joystickInput.rise) && forkpos.y <= 4)
    {
        fork.position.set(0, forkpos.y+= (0.15 * dt), 3.1);
    }
    if ((keys['k'] || joystickInput.lower) && forkpos.y >= 0.3)
    {
        fork.position.set(0, forkpos.y-=(0.15 * dt), 3.1);
    }

    forklift.position.x = MathUtils.clamp(
        forklift.position.x,
        -worldSize.width / 2,
        worldSize.width / 2
    );

    forklift.position.z = MathUtils.clamp(
        forklift.position.z,
        0,
        worldSize.height
    );
}